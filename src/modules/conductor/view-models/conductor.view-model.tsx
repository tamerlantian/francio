import { useQuery } from '@tanstack/react-query';
import { conductorController } from '../controllers/conductor.controller';
import { Conductor } from '../interfaces/conductor.interface';

export const conductorKeys = {
  all: ['conductores'] as const,
  list: () => [...conductorKeys.all, 'list'] as const,
  detail: (id: string) => [...conductorKeys.all, 'detail', id] as const,
  selector: () => [...conductorKeys.all, 'selector'] as const,
};

export const useConductor = () => {
  // Query para obtener la lista de conductores
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: conductorKeys.list(),
    queryFn: () => conductorController.getConductores(),
  });

  return {
    conductores: data?.results || [],
    total: data?.total || 0,
    isLoading,
    isError,
    error,
    refetch,
  };
};

// Función para obtener un conductor por su ID
export const useConductorById = (id: string) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: conductorKeys.detail(id),
    queryFn: async () => {
      const response = await conductorController.getConductores({ id });
      return response.conductores?.[0] || null;
    },
    enabled: !!id,
  });

  return {
    conductor: data as Conductor | null,
    isLoading,
    isError,
    error,
  };
};

/**
 * Hook para obtener la lista de conductores para el selector
 */
export const useConductoresSelector = () => {
  // Query para obtener la lista de conductores para el selector
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: conductorKeys.selector(),
    queryFn: () => conductorController.getConductoresSelector(),
  });

  // Transformar los datos al formato esperado por el selector
  const conductoresOptions =
    data?.map(conductor => ({
      label: `${conductor.nombre_corto}`,
      value: conductor.id.toString(),
    })) || [];

  return {
    conductoresOptions,
    isLoading,
    isError,
    error,
    refetch,
  };
};
