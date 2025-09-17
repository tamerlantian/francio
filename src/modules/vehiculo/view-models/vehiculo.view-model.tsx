import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { vehiculoController } from '../controllers/vehiculo.controller';
import { Vehiculo } from '../interfaces/vehiculo.interface';
import { useToast } from '@/src/shared/hooks/use-toast.hook';
import { ApiErrorResponse } from '@/src/core/interfaces/api.interface';
import { mapVehiculoResponseVehiculo } from '../utils/vehiculo-mapper.util';
import { useCurrentUser } from '../../auth/view-models/auth.view-model';

export const vehiculoKeys = {
  all: ['vehiculos'] as const,
  list: () => [...vehiculoKeys.all, 'list'] as const,
  detail: (id: string) => [...vehiculoKeys.all, 'detail', id] as const,
  selector: () => [...vehiculoKeys.all, 'selector'] as const,
};

export const useVehiculo = () => {
  const { data: user } = useCurrentUser();

  // Query para obtener la lista de vehículos
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: vehiculoKeys.list(),
    queryFn: () => vehiculoController.getVehiculos({ usuario_id: user?.id }),
  });

  return {
    vehiculos: data?.results || [],
    total: data?.total || 0,
    isLoading,
    isError,
    error,
    refetch,
  };
};

// Función para obtener un vehículo por su ID
export const useVehiculoById = (id: string) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: vehiculoKeys.detail(id),
    queryFn: async () => {
      const response = await vehiculoController.getVehiculoById(id);
      console.log(response);
      return mapVehiculoResponseVehiculo(response);
    },
    enabled: !!id,
  });

  return {
    vehiculo: data,
    isLoading,
    isError,
    error,
  };
};

/**
 * Crea un nuevo vehículo
 */
export const useCreateVehiculo = () => {
  const queryClient = useQueryClient();
  const toast = useToast();
  const { mutateAsync, isError, error } = useMutation({
    mutationFn: (data: Vehiculo) => vehiculoController.createVehiculo(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: vehiculoKeys.list() });
      toast.success('Vehículo creado exitosamente');
    },
    onError: (error: unknown) => {
      const errorParsed = error as ApiErrorResponse;
      toast.error(errorParsed?.mensaje || 'Error al crear el vehículo');
    },
  });

  return {
    mutateAsync,
    isError,
    error,
  };
};

/**
 * Hook para actualizar un vehículo existente
 */
export const useUpdateVehiculo = () => {
  const queryClient = useQueryClient();
  const toast = useToast();
  const { mutateAsync, isError, error } = useMutation({
    mutationFn: (data: Vehiculo) => vehiculoController.updateVehiculo(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: vehiculoKeys.list() });
      queryClient.invalidateQueries({ queryKey: vehiculoKeys.detail(variables.id.toString()) });
      toast.success('Vehículo actualizado exitosamente');
    },
    onError: (error: unknown) => {
      const errorParsed = error as ApiErrorResponse;
      toast.error(errorParsed?.mensaje || 'Error al actualizar el vehículo');
    },
  });

  return {
    mutateAsync,
    isError,
    error,
  };
};

/**
 * Hook para obtener la lista de vehículos para el selector
 */
export const useVehiculosSelector = () => {
  const { data: user } = useCurrentUser();
  // Query para obtener la lista de vehículos para el selector
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: vehiculoKeys.selector(),
    queryFn: () => vehiculoController.getVehiculosSelector({ usuario_id: user?.id }),
  });

  // Transformar los datos al formato esperado por el selector
  const vehiculosOptions =
    data?.map(vehiculo => ({
      label: `${vehiculo.placa}`,
      value: vehiculo.id.toString(),
    })) || [];

  return {
    vehiculosOptions,
    isLoading,
    isError,
    error,
    refetch,
  };
};
