import { useMutation } from '@tanstack/react-query';
import { authController } from '../controllers/auth.controller';
import { ForgotPasswordFormValues } from '../models/Auth';
import { useToast } from '@/src/shared/hooks/use-toast.hook';
import { ApiErrorResponse } from '@/src/core/interfaces/api.interface';
import { useRouter } from 'expo-router';

// Hook para manejar la recuperación de contraseña
export const useForgotPassword = () => {
  const toast = useToast();
  const router = useRouter();

  const forgotPasswordMutation = useMutation({
    mutationFn: (data: ForgotPasswordFormValues) => authController.forgotPassword(data),
    onSuccess: () => {
      toast.success('Se ha enviado un correo con instrucciones para recuperar tu contraseña');
      router.replace('/(auth)/login');
    },
    onError: (error: any) => {
      const errorData = error as ApiErrorResponse;
      toast.error(errorData?.mensaje || 'Error al solicitar recuperación de contraseña');
    },
  });

  return {
    forgotPassword: forgotPasswordMutation.mutate,
    isLoading: forgotPasswordMutation.isPending,
    isError: forgotPasswordMutation.isError,
    error: forgotPasswordMutation.error,
  };
};
