import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        {/* Main Screens */}
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />

        {/* Client Screens */}
        <Stack.Screen
          name="client/binarycourse"
          options={{
            headerShown: true,
            title: 'Binary Course', // Header title
          }}
        />
        <Stack.Screen
          name="client/binarysignal"
          options={{
            headerShown: true,
            title: 'Binary Signal', // Header title
          }}
        />
        <Stack.Screen
          name="client/fxcourse"
          options={{
            headerShown: true,
            title: 'FX Course', // Header title
          }}
        />
        <Stack.Screen
          name="client/fxsignal"
          options={{
            headerShown: true,
            title: 'FX Signal', // Header title
          }}
        />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
