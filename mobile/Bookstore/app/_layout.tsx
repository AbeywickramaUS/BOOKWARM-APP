import { SplashScreen, Stack, useRouter, useSegments } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import SafeScreen from "../../component/SafeScreen";
import { StatusBar } from "expo-status-bar";
import {useAuthStore} from "../../store/authStore";
import { useEffect } from "react";
import { useFonts } from "expo-font";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const router = useRouter();
  const segments = useSegments();

  const { user, checkAuth, token } = useAuthStore();

  const [fontsLoaded] = useFonts({
    'Roboto': require('../../assets/fonts/Roboto.ttf'),
    'Roboto-Bold': require('../../assets/fonts/Roboto-Bold.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    const inAuthScreen = segments[0] === "(auth)";
    const isSignedIn = user && token;

    if (!isSignedIn && !inAuthScreen) {
      router.replace("/(auth)");
    }
    else if (isSignedIn && inAuthScreen) {
      router.replace("/books");
    }
  }, [user, token, segments, router]);


  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar style="dark"/>
        <SafeScreen>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="tabs" />
            <Stack.Screen name="auth" />
          </Stack>
        </SafeScreen>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}