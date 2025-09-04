import { Redirect } from 'expo-router';
import { useAuth } from '@/src/modules/auth/views/AuthProvider';
import { View, ActivityIndicator } from 'react-native';

export default function Index() {
  const { isAuthenticated, loading } = useAuth();

  // Show loading indicator while checking authentication status
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // Redirect based on authentication status
  return <Redirect href={isAuthenticated ? '/(app)/(tabs)' : '/(auth)/login'} />;
}
