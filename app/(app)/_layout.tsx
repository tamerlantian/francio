import { useAuth } from '@/src/modules/auth/views/AuthProvider';
import { View, ActivityIndicator } from 'react-native';
import { Stack } from 'expo-router';
import React from 'react';

export default function AppLayout() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(conductor)" options={{ headerShown: false }} />
    </Stack>
  );
}
