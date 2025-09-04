import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { userController } from '../controllers/user.controller';
import { User } from '../models/User';

// Claves para las queries de React Query
export const userKeys = {
  all: ['users'] as const,
  lists: () => [...userKeys.all, 'list'] as const,
  list: (filters: string) => [...userKeys.lists(), { filters }] as const,
  details: () => [...userKeys.all, 'detail'] as const,
  detail: (id: number) => [...userKeys.details(), id] as const,
};

// Hook para obtener todos los usuarios
export const useUsers = () => {
  return useQuery({
    queryKey: userKeys.lists(),
    queryFn: userController.getUsers,
  });
};

// Hook para obtener un usuario por ID
export const useUser = (id: number) => {
  return useQuery({
    queryKey: userKeys.detail(id),
    queryFn: () => userController.getUserById(id),
    enabled: !!id, // Solo ejecuta la query si hay un ID
  });
};

// Hook para crear un nuevo usuario
export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userData: Omit<User, 'id'>) => userController.createUser(userData),
    onSuccess: () => {
      // Invalida la caché de la lista de usuarios para forzar una recarga
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
    },
  });
};

// Hook para actualizar un usuario
export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, userData }: { id: number; userData: Partial<User> }) =>
      userController.updateUser(id, userData),
    onSuccess: (data, variables) => {
      // Actualiza la caché para el usuario específico y la lista
      queryClient.invalidateQueries({ queryKey: userKeys.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
    },
  });
};

// Hook para eliminar un usuario
export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => userController.deleteUser(id),
    onSuccess: (_, id) => {
      // Invalida la caché para el usuario eliminado y la lista
      queryClient.invalidateQueries({ queryKey: userKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
    },
  });
};
