import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'react-native';
import MusicScreen from './src/screens/MusicScreen';
import MoodScreen from './src/screens/MoodScreen';
import RecommendationsScreen from './src/screens/RecommendationsScreen';
import ItemDetailsScreen from './src/screens/ItemDetailsScreen';
import HistoryScreen from './src/screens/HistoryScreen';
import { StoreProvider, useStoreContext } from './src/store/StoreProvider';
import { ThemeToggle } from './src/components/ThemeToggle';

export type RootStackParamList = {
  Music: undefined;
  Mood: { albumId: string };
  Recommendations: { recommendationId: string };
  ItemDetails: { itemId: string; itemType: 'food' | 'drink'; recommendationId: string };
  History: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function AppNavigator() {
  const { preferences } = useStoreContext();
  const colorScheme = useColorScheme();
  const chosen = preferences.theme;
  const navTheme = chosen === 'system' ? (colorScheme === 'dark' ? DarkTheme : DefaultTheme) : (chosen === 'dark' ? DarkTheme : DefaultTheme);

  return (
    <NavigationContainer theme={navTheme}>
      <StatusBar style={navTheme === DarkTheme ? 'light' : 'dark'} />
      <Stack.Navigator>
        <Stack.Screen name="Music" component={MusicScreen} options={{ title: 'Музыка', headerRight: () => <ThemeToggle /> }} />
        <Stack.Screen name="Mood" component={MoodScreen} options={{ title: 'Настроение' }} />
        <Stack.Screen name="Recommendations" component={RecommendationsScreen} options={{ title: 'Рекомендации' }} />
        <Stack.Screen name="ItemDetails" component={ItemDetailsScreen} options={{ title: 'Детали' }} />
        <Stack.Screen name="History" component={HistoryScreen} options={{ title: 'История' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <AppNavigator />
    </StoreProvider>
  );
}