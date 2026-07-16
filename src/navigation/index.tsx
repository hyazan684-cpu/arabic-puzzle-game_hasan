import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

// Simple placeholder screens to ensure the navigator mounts even if real screens
// are not present yet. These are intentionally minimal and will be replaced by
// the real implementations when they are added to the repo.
const Placeholder: React.FC<{ title: string }> = ({ title }) => (
  <View style={styles.container}>
    <Text style={styles.text}>{title}</Text>
  </View>
);

const OnboardingScreen = () => <Placeholder title="Onboarding" />;
const WorldMapScreen = () => <Placeholder title="World Map" />;
const IslandScreen = () => <Placeholder title="Island" />;
const LevelScreen = () => <Placeholder title="Level" />;
const SettingsScreen = () => <Placeholder title="Settings" />;
const StatsScreen = () => <Placeholder title="Stats" />;

const Stack = createStackNavigator<any>();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Onboarding" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="WorldMap" component={WorldMapScreen} />
      <Stack.Screen name="Island" component={IslandScreen} />
      <Stack.Screen name="Level" component={LevelScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="Stats" component={StatsScreen} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  text: {
    fontSize: 18,
    color: '#333'
  }
});
