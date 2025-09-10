export interface Vehiculo {
  id: number;
  placa: string;
  modelo: string;
  marca: number;
  marca__nombre: string;
  tipo_vehiculo: number;
  tipo_vehiculo__nombre: string;
  capacidad_carga: number;
  capacidad_volumen: number;
  anio_modelo: number;
  color: string;
  estado_inactivo: boolean;
  comentario: string | null;
}

export interface VehiculoResponse {
  id: number;
  placa: string;
  modelo: string;
  marca: number;
  marca__nombre: string;
  tipo_vehiculo: number;
  tipo_vehiculo__nombre: string;
  capacidad_carga: number;
  capacidad_volumen: number;
  anio_modelo: number;
  color: string;
}

export interface VehiculoSelector {
  id: number;
  placa: string;
}
