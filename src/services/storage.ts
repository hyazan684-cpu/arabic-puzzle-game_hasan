import AsyncStorage from '@react-native-async-storage/async-storage';
import { GameState, Settings, Stats, StorageKey } from '../types';

const KEYS: Record<StorageKey, string> = {
  game_state: 'game_state',
  settings: 'settings',
  stats: 'stats',
};

async function setItem<T>(key: StorageKey, value: T): Promise<void> {
  try {
    await AsyncStorage.setItem(KEYS[key], JSON.stringify(value));
  } catch (e) {
    console.warn('storage.setItem error', key, e);
    throw e;
  }
}

async function getItem<T>(key: StorageKey): Promise<T | null> {
  try {
    const raw = await AsyncStorage.getItem(KEYS[key]);
    if (!raw) return null;
    return JSON.parse(raw) as T;
  } catch (e) {
    console.warn('storage.getItem error', key, e);
    return null;
  }
}

async function removeItem(key: StorageKey): Promise<void> {
  try {
    await AsyncStorage.removeItem(KEYS[key]);
  } catch (e) {
    console.warn('storage.removeItem error', key, e);
  }
}

export async function saveGameState(state: GameState): Promise<void> {
  return setItem<GameState>('game_state', state);
}

export async function loadGameState(): Promise<GameState | null> {
  return getItem<GameState>('game_state');
}

export async function saveSettings(settings: Settings): Promise<void> {
  return setItem<Settings>('settings', settings);
}

export async function loadSettings(): Promise<Settings | null> {
  return getItem<Settings>('settings');
}

export async function saveStats(stats: Stats): Promise<void> {
  return setItem<Stats>('stats', stats);
}

export async function loadStats(): Promise<Stats | null> {
  return getItem<Stats>('stats');
}

export async function clearAll(): Promise<void> {
  try {
    await AsyncStorage.multiRemove(Object.values(KEYS));
  } catch (e) {
    console.warn('storage.clearAll error', e);
  }
}

export default {
  saveGameState,
  loadGameState,
  saveSettings,
  loadSettings,
  saveStats,
  loadStats,
  clearAll,
};
