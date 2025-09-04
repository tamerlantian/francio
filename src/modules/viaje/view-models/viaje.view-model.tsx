import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Viaje, ViajeListResponse } from '../interfaces/viaje.interface';

export const viajeKeys = {
  all: ['viajes'] as const,
  list: () => [...viajeKeys.all, 'list'] as const,
  detail: (id: string) => [...viajeKeys.all, 'detail', id] as const,
};

// Datos de ejemplo para simular la respuesta de la API
const mockViajes: Viaje[] = [
  {
    datos: {
      id: 1,
      fecha: '2025-09-10',
      cliente: 'Empresa ABC S.A.S',
      unidades: 50,
      peso: 1200,
      volumen: 800,
      puntos_entrega: 3,
      comentario: 'Entrega urgente',
      propuestas: 2,
      estado_aceptado: false,
      ciudad_origen_id: 1,
      ciudad_origen__nombre: 'Bogotá',
      ciudad_destino_id: 2,
      ciudad_destino__nombre: 'Medellín',
      servicio_id: 1,
      servicio__nombre: 'Transporte Terrestre',
      producto_id: 1,
      producto__nombre: 'Productos Farmacéuticos',
      empaque_id: 1,
      empaque__nombre: 'Cajas de Cartón',
      usuario_id: 1,
      usuario__nombre_corto: 'Juan P.',
    },
  },
  {
    datos: {
      id: 2,
      fecha: '2025-09-15',
      cliente: 'Distribuidora XYZ Ltda',
      unidades: 25,
      peso: 800,
      volumen: 600,
      puntos_entrega: 2,
      propuestas: 0,
      estado_aceptado: false,
      ciudad_origen_id: 2,
      ciudad_origen__nombre: 'Medellín',
      ciudad_destino_id: 3,
      ciudad_destino__nombre: 'Cali',
      servicio_id: 2,
      servicio__nombre: 'Carga Refrigerada',
      producto_id: 2,
      producto__nombre: 'Alimentos Perecederos',
      empaque_id: 2,
      empaque__nombre: 'Contenedores Térmicos',
      usuario_id: 2,
      usuario__nombre_corto: 'María L.',
    },
  },
  {
    datos: {
      id: 3,
      fecha: '2025-09-20',
      cliente: 'Comercializadora DEF',
      unidades: 100,
      peso: 2000,
      volumen: 1500,
      puntos_entrega: 5,
      propuestas: 5,
      estado_aceptado: true,
      ciudad_origen_id: 3,
      ciudad_origen__nombre: 'Cali',
      ciudad_destino_id: 4,
      ciudad_destino__nombre: 'Cartagena',
      servicio_id: 1,
      servicio__nombre: 'Transporte Terrestre',
      producto_id: 3,
      producto__nombre: 'Productos Industriales',
      empaque_id: 3,
      empaque__nombre: 'Pallets de Madera',
      usuario_id: 3,
      usuario__nombre_corto: 'Carlos R.',
    },
  },
];

// Función para simular la obtención de viajes desde una API
const fetchViajes = async (): Promise<ViajeListResponse> => {
  // Simulamos un delay para imitar una llamada a API real
  await new Promise(resolve => setTimeout(resolve, 800));
  return {
    viajes: mockViajes,
    total: mockViajes.length,
  };
};

export const useViaje = () => {
  // We'll use queryClient later for mutations
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const queryClient = useQueryClient();

  // Query para obtener la lista de viajes
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: viajeKeys.list(),
    queryFn: fetchViajes,
  });

  // Función para obtener un viaje específico por ID
  const getViajeById = (id: number) => {
    return data?.viajes.find(viaje => viaje.datos.id === id);
  };

  return {
    viajes: data?.viajes || [],
    total: data?.total || 0,
    isLoading,
    isError,
    error,
    refetch,
    getViajeById,
  };
};
