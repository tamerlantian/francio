import { ToastProvider } from '@/src/shared/context';
import { DevModeProvider } from '@/src/shared/context/dev-mode-context';
import { QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { queryClient } from '../src/config/react.query';
import { AuthProvider } from '../src/modules/auth/views/AuthProvider';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <QueryClientProvider client={queryClient}>
        <ToastProvider>
          <BottomSheetModalProvider>
            <DevModeProvider>
              {/* <AuthProvider> */}
              <Stack>
                <Stack.Screen options={{ headerShown: false }} name="index" />
                <Stack.Screen options={{ headerShown: false }} name="(app)" />
                <Stack.Screen options={{ headerShown: false }} name="(auth)" />
              </Stack>
              {/* </AuthProvider> */}
            </DevModeProvider>
          </BottomSheetModalProvider>
        </ToastProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
