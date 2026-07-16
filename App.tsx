import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { I18nManager, LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation';
import { GameProvider } from './src/contexts/GameContext';
import * as SplashScreen from 'expo-splash-screen';
import { Asset } from 'expo-asset';
import AnimatedSplash from './src/components/AnimatedSplash';

LogBox.ignoreLogs(['Non-serializable values were found in the navigation state']);

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [ready, setReady] = useState(false);
  const [showLottie, setShowLottie] = useState(true);

  useEffect(() => {
    async function prepare() {
      try {
        if (!I18nManager.isRTL) I18nManager.forceRTL(true);
        await Asset.loadAsync([require('./assets/splash.png'), require('./assets/icon.png')]);
      } catch (e) {
        console.warn(e);
      } finally {
        setReady(true);
      }
    }
    prepare();
  }, []);

  if (!ready) return null;

  if (showLottie) {
    return (
      <GameProvider>
        <AnimatedSplash onFinish={() => setShowLottie(false)} />
      </GameProvider>
    );
  }

  return (
    <GameProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </GameProvider>
  );
}
