import { Stack } from 'expo-router';

export default function VehiculoLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="nuevo" options={{ headerShown: false }} />
    </Stack>
  );
}
