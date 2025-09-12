export interface Datos {
  id: number;
  fecha: string;
  numero_identificacion: string | null;
  cliente: string | null;
  unidades: number;
  peso: number;
  volumen: number;
  puntos_entrega: number;
  comentario: string | null;
  propuestas: number;
  estado_aceptado: boolean;
  flete: number;
  pago: number;
  schema_name: string;
  contenedor_id: number;
  ciudad_origen_id: number;
  ciudad_origen__nombre: string;
  ciudad_destino_id: number;
  ciudad_destino__nombre: string;
  servicio_id: number;
  servicio__nombre: string;
  producto_id: number;
  producto__nombre: string;
  empaque_id: number;
  empaque__nombre: string;
  usuario_id: number;
  usuario__nombre_corto: string;
}

export interface Viaje {
  datos: Datos;
}

export interface ViajeListResponse {
  viajes: Viaje[];
  total: number;
}
