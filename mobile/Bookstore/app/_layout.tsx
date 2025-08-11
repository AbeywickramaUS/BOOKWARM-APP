import { Stack } from "expo-router";

export default function RootLayout() {
  return (
      <Stack screenOptions={ {headerShown: true} }> 
        <Stack.Screen name="index" options={{ title: "Welcome to BookWarm Mobile!" }} />
        <Stack.Screen name="books" options={{ title: "Books" }} />
        <Stack.Screen name="library" options={{ title: "My Library" }} />
      </Stack>
  );
}
