import { Redirect } from 'expo-router';
import React from 'react';

export default function AppIndex() {
  // Redirect to tabs by default when accessing /(app)
  return <Redirect href="/(app)/(tabs)" />;
}
