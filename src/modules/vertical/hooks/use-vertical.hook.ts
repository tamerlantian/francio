import { useQuery } from '@tanstack/react-query';
import generalRepository from '../repositories/vertical.repository';

const verticalKeys = {
  all: ['vertical'] as const,
  identificacion: () => [...verticalKeys.all, 'identificacion'] as const,
  categoriaLicencia: () => [...verticalKeys.all, 'categoriaLicencia'] as const,
  ciudad: () => [...verticalKeys.all, 'ciudad'] as const,
};

export const useSeleccionarIdentificacion = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: verticalKeys.identificacion(),
    queryFn: () => generalRepository.getSeleccionarIdentificacion(),
  });

  const identificacionOptions =
    data?.map(identificacion => ({
      label: identificacion.nombre,
      value: identificacion.id.toString(),
    })) || [];

  return { identificacionOptions, isLoading, error, refetch };
};

export const useSeleccionarCategoriaLicencia = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: verticalKeys.categoriaLicencia(),
    queryFn: () => generalRepository.getSeleccionarCategoriaLicencia(),
  });

  const categoriaLicenciaOptions =
    data?.map(categoriaLicencia => ({
      label: categoriaLicencia.nombre,
      value: categoriaLicencia.id.toString(),
    })) || [];

  return { categoriaLicenciaOptions, isLoading, error, refetch };
};

export const useSeleccionarCiudad = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: verticalKeys.ciudad(),
    queryFn: () => generalRepository.getSeleccionarCiudad(),
  });

  const ciudadOptions =
    data?.map(ciudad => ({
      label: ciudad.nombre,
      value: ciudad.id.toString(),
    })) || [];

  return { ciudadOptions, isLoading, error, refetch };
};
