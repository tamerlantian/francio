import { useQuery } from '@tanstack/react-query';
import { authController } from '../controllers/auth.controller';
import { AuthState } from '../models/Auth';
import { useLogin } from './login.view-model';
import { authKeys } from '../constants/auth-keys';

// Hook para verificar el estado de autenticación
export const useAuthStatus = () => {
  return useQuery({
    queryKey: authKeys.session(),
    queryFn: authController.isAuthenticated,
    staleTime: 5 * 60 * 1000, // 5 minutos
  });
};

// Hook para obtener el usuario actual
export const useCurrentUser = () => {
  return useQuery({
    queryKey: authKeys.user(),
    queryFn: authController.getCurrentUser,
    staleTime: 5 * 60 * 1000, // 5 minutos
  });
};

// Hook para manejar el estado global de autenticación
export const useAuthState = (): AuthState => {
  const { data: isAuthenticated = false, isLoading: isAuthLoading } = useAuthStatus();
  const { data: user = null, isLoading: isUserLoading } = useCurrentUser();
  const { error } = useLogin();

  return {
    isAuthenticated,
    user,
    loading: isAuthLoading || isUserLoading,
    error: error ? (error as Error).message : null,
  };
};
