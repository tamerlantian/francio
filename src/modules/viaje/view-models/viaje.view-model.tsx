import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { viajeController } from '../controllers/viaje.controller';
import { useToast } from '@/src/shared/hooks/use-toast.hook';
import { ApiErrorResponse } from '@/src/core/interfaces/api.interface';

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
      viajeController.getViajes({ estado_aceptado: 'False', solicitud_transporte: 'True' }),
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

export const useAceptarViaje = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  const {
    mutate,
    isPending: isLoading,
    isError,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: ({
      viajeId,
      conductorId,
      vehiculoId,
    }: {
      viajeId: number;
      conductorId: number;
      vehiculoId: number;
    }) => {
      return viajeController.aceptarViaje(viajeId, conductorId, vehiculoId);
    },
    onSuccess: () => {
      // Invalidar la consulta de viajes para que se actualice la lista
      queryClient.invalidateQueries({ queryKey: viajeKeys.list() });
      toast.success('Viaje aceptado exitosamente');
    },
    onError: (error: unknown) => {
      const errorParsed = error as ApiErrorResponse;
      toast.error(errorParsed?.mensaje || 'Error al aceptar el viaje');
    },
  });

  return {
    aceptarViaje: mutate,
    isLoading,
    isError,
    error,
    isSuccess,
  };
};
