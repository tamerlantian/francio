import { useQuery } from '@tanstack/react-query';
import { vehiculoController } from '../controllers/vehiculo.controller';
import { Vehiculo } from '../interfaces/vehiculo.interface';

export const vehiculoKeys = {
  all: ['vehiculos'] as const,
  list: () => [...vehiculoKeys.all, 'list'] as const,
  detail: (id: string) => [...vehiculoKeys.all, 'detail', id] as const,
  selector: () => [...vehiculoKeys.all, 'selector'] as const,
};

export const useVehiculo = () => {
  // Query para obtener la lista de vehículos
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: vehiculoKeys.list(),
    queryFn: () => vehiculoController.getVehiculos(),
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
      const response = await vehiculoController.getVehiculos({ id });
      return response.vehiculos?.[0] || null;
    },
    enabled: !!id,
  });

  return {
    vehiculo: data as Vehiculo | null,
    isLoading,
    isError,
    error,
  };
};

/**
 * Hook para obtener la lista de vehículos para el selector
 */
export const useVehiculosSelector = () => {
  // Query para obtener la lista de vehículos para el selector
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: vehiculoKeys.selector(),
    queryFn: () => vehiculoController.getVehiculosSelector(),
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
