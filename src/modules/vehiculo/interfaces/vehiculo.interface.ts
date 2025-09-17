export interface Vehiculo {
  id: number;
  fecha_registro: string;
  placa: string;
  modelo: number;
  modelo_repotenciado: string | null;
  motor: string;
  chasis: string;
  ejes: number;
  peso_vacio: number;
  capacidad: number;
  poliza: string;
  vence_poliza: string;
  tecnicomecanica: string;
  vence_tecnicomecanica: string;
  propio: boolean;
  remolque: boolean;
  carroceria: string;
  color: string;
  combustible: string;
  configuracion: string;
  linea: string;
  marca: string;
  // verificado: boolean;
}

export interface VehiculoResponse {
  capacidad: number;
  carroceria: number;
  carroceria__codigo?: string;
  carroceria__nombre: string;
  chasis: string;
  color: number;
  color__codigo?: string;
  color__nombre: string;
  combustible: number;
  combustible__codigo?: string;
  combustible__nombre: string;
  configuracion: number;
  configuracion__codigo?: string;
  configuracion__nombre: string;
  ejes: number;
  id: number;
  linea: number;
  linea__codigo?: string;
  linea__nombre: string;
  marca: number;
  marca__codigo?: string;
  marca__nombre: string;
  modelo: number;
  modelo_repotenciado?: null;
  motor: string;
  peso_vacio: number;
  placa: string;
  poliza: string;
  propio: boolean;
  remolque: boolean;
  tecnicomecanica: string;
  vence_poliza: string;
  vence_tecnicomecanica: string;
}

export interface VehiculoSelector {
  id: number;
  placa: string;
}
