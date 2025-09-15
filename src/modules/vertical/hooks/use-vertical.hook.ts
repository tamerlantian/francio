import { useQuery } from '@tanstack/react-query';
import generalRepository from '../repositories/vertical.repository';

const verticalKeys = {
  all: ['vertical'] as const,
  identificacion: () => [...verticalKeys.all, 'identificacion'] as const,
  categoriaLicencia: () => [...verticalKeys.all, 'categoriaLicencia'] as const,
  ciudad: () => [...verticalKeys.all, 'ciudad'] as const,
  carroceria: () => [...verticalKeys.all, 'carroceria'] as const,
  color: () => [...verticalKeys.all, 'color'] as const,
  combustible: () => [...verticalKeys.all, 'combustible'] as const,
  configuracion: () => [...verticalKeys.all, 'configuracion'] as const,
  linea: () => [...verticalKeys.all, 'linea'] as const,
  marca: () => [...verticalKeys.all, 'marca'] as const,
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
      label: `${ciudad.nombre} - ${ciudad.estado__nombre}`,
      value: ciudad.id.toString(),
    })) || [];

  return { ciudadOptions, isLoading, error, refetch };
};

export const useSeleccionarCarroceria = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: verticalKeys.carroceria(),
    queryFn: () => generalRepository.getSeleccionarCarroceria(),
  });

  const carroceriaOptions =
    data?.map(carroceria => ({
      label: carroceria.nombre,
      value: carroceria.id.toString(),
    })) || [];

  return { carroceriaOptions, isLoading, error, refetch };
};

export const useSeleccionarColor = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: verticalKeys.color(),
    queryFn: () => generalRepository.getSeleccionarColor(),
  });

  const colorOptions =
    data?.map(color => ({
      label: color.nombre,
      value: color.id.toString(),
    })) || [];

  return { colorOptions, isLoading, error, refetch };
};

export const useSeleccionarCombustible = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: verticalKeys.combustible(),
    queryFn: () => generalRepository.getSeleccionarCombustible(),
  });

  const combustibleOptions =
    data?.map(combustible => ({
      label: combustible.nombre,
      value: combustible.id.toString(),
    })) || [];

  return { combustibleOptions, isLoading, error, refetch };
};

export const useSeleccionarConfiguracion = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: verticalKeys.configuracion(),
    queryFn: () => generalRepository.getSeleccionarConfiguracion(),
  });

  const configuracionOptions =
    data?.map(configuracion => ({
      label: configuracion.nombre,
      value: configuracion.id.toString(),
    })) || [];

  return { configuracionOptions, isLoading, error, refetch };
};

export const useSeleccionarLinea = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: verticalKeys.linea(),
    queryFn: () => generalRepository.getSeleccionarLinea(),
  });

  const lineaOptions =
    data?.map(linea => ({
      label: linea.nombre,
      value: linea.id.toString(),
    })) || [];

  return { lineaOptions, isLoading, error, refetch };
};

export const useSeleccionarMarca = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: verticalKeys.marca(),
    queryFn: () => generalRepository.getSeleccionarMarca(),
  });

  const marcaOptions =
    data?.map(marca => ({
      label: marca.nombre,
      value: marca.id.toString(),
    })) || [];

  return { marcaOptions, isLoading, error, refetch };
};
