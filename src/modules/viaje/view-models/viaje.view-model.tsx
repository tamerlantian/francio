import { useQuery } from '@tanstack/react-query';
import { viajeController } from '../controllers/viaje.controller';

export const viajeKeys = {
  all: ['viajes'] as const,
  list: () => [...viajeKeys.all, 'list'] as const,
  detail: (id: string) => [...viajeKeys.all, 'detail', id] as const,
};

export const useViaje = () => {
  // Query para obtener la lista de viajes
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: viajeKeys.list(),
    queryFn: () =>
      viajeController.getViajes({ estado_aceptado: 'Fasle', solicitud_transporte: 'True' }),
  });

  return {
    viajes: data?.viajes || [],
    total: data?.total || 0,
    isLoading,
    isError,
    error,
    refetch,
  };
};
