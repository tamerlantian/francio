import { Stack } from 'expo-router';

export default function ConductorLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="nuevo" options={{ headerShown: false }} />
      <Stack.Screen name="editar/[id]" options={{ headerShown: false }} />
    </Stack>
  );
}
