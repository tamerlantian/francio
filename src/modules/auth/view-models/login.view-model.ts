import { useToast } from '@/src/shared/hooks/use-toast.hook';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { LoginCredentials } from '../models/Auth';
import { authController } from '../controllers/auth.controller';
import { authKeys } from '../constants/auth-keys';
import { ApiErrorResponse } from '@/src/core/interfaces/api.interface';

// Hook para manejar el login
export const useLogin = () => {
  const queryClient = useQueryClient();
  const toast = useToast();
  const router = useRouter();

  const loginMutation = useMutation({
    mutationFn: (credentials: LoginCredentials) => authController.login(credentials),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authKeys.session() });
      queryClient.invalidateQueries({ queryKey: authKeys.user() });
      router.replace('/(app)/(tabs)');
      toast.success('Inicio de sesión exitoso');
    },
    onError: (error: any) => {
      const errorData = error as ApiErrorResponse;
      toast.error(errorData?.mensaje || 'Error al iniciar sesión');
    },
  });

  return {
    login: loginMutation.mutate,
    isLoading: loginMutation.isPending,
    isError: loginMutation.isError,
    error: loginMutation.error,
  };
};
