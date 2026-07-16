import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { GameState, Settings, Stats } from '../types';
import storage from '../services/storage';

type GameContextValue = {
  state: GameState;
  setState: (fn: (prev: GameState) => GameState) => void;
  saveState: () => Promise<void>;
  updateSettings: (patch: Partial<Settings>) => Promise<void>;
};

const DEFAULT_SETTINGS: Settings = { sound: true, music: true, language: 'ar' };
const DEFAULT_STATS: Stats = { totalStars: 0, playedLevels: {} };

const DEFAULT_STATE: GameState = {
  islands: [],
  currentIslandId: null,
  currentLevelId: null,
  settings: DEFAULT_SETTINGS,
  stats: DEFAULT_STATS,
};

const GameContext = createContext<GameContextValue | undefined>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, setStateInternal] = useState<GameState>(DEFAULT_STATE);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const [gs, settings, stats] = await Promise.all([
          storage.loadGameState(),
          storage.loadSettings(),
          storage.loadStats(),
        ]);

        if (!mounted) return;

        setStateInternal((prev) => ({
          ...prev,
          ...(gs || {}),
          settings: settings || prev.settings,
          stats: stats || prev.stats,
        }));
      } catch (e) {
        console.warn('GameProvider.load error', e);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, []);

  // wrapper to set state with function
  const setState = (fn: (prev: GameState) => GameState) => {
    setStateInternal((prev) => {
      const next = fn(prev);
      return next;
    });
  };

  const saveState = async () => {
    try {
      await storage.saveGameState(state);
    } catch (e) {
      console.warn('saveState error', e);
    }
  };

  const updateSettings = async (patch: Partial<Settings>) => {
    const nextSettings = { ...state.settings, ...patch };
    setStateInternal((prev) => ({ ...prev, settings: nextSettings }));
    try {
      await storage.saveSettings(nextSettings);
    } catch (e) {
      console.warn('updateSettings error', e);
    }
  };

  // Persist stats whenever they change
  useEffect(() => {
    async function persistStats() {
      try {
        await storage.saveStats(state.stats);
      } catch (e) {
        console.warn('persistStats error', e);
      }
    }
    persistStats();
  }, [state.stats]);

  const value: GameContextValue = {
    state,
    setState,
    saveState,
    updateSettings,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used within GameProvider');
  return ctx;
}
