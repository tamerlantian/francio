export interface Datos {
  id: number;
  fecha: string;
  cliente: string;
  unidades: number;
  peso: number;
  volumen: number;
  puntos_entrega: number;
  comentario?: string;
  propuestas: number;
  estado_aceptado: boolean;
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
  pago: number;
}

export interface Viaje {
  datos: Datos;
}

export interface ViajeListResponse {
  viajes: Viaje[];
  total: number;
}
