import { useQuery } from '@tanstack/react-query';

export const vehiculoKeys = {
  all: ['vehiculos'] as const,
  list: () => [...vehiculoKeys.all, 'list'] as const,
  selector: () => [...vehiculoKeys.all, 'selector'] as const,
};

/**
 * Hook para obtener la lista de vehículos para el selector
 * Nota: Actualmente usa datos mockeados hasta que se implemente el endpoint
 */
export const useVehiculosSelector = () => {
  // Query para obtener la lista de vehículos para el selector
  // Por ahora usamos datos mockeados
  const { data, isLoading, isError, error } = useQuery({
    queryKey: vehiculoKeys.selector(),
    queryFn: () => {
      // Simulamos una respuesta de API
      return Promise.resolve({
        vehiculos: [
          { id: 1, placa: 'ABC-123', modelo: 'Chevrolet NPR' },
          { id: 2, placa: 'DEF-456', modelo: 'Ford Cargo' },
          { id: 3, placa: 'GHI-789', modelo: 'Isuzu NLR' },
          { id: 4, placa: 'JKL-012', modelo: 'Mitsubishi Canter' },
        ],
      });
    },
  });

  // Transformar los datos al formato esperado por el selector
  const vehiculosOptions =
    data?.vehiculos?.map((vehiculo: any) => ({
      label: `${vehiculo.placa} - ${vehiculo.modelo}`,
      value: vehiculo.id.toString(),
    })) || [];

  return {
    vehiculosOptions,
    isLoading,
    isError,
    error,
  };
};
