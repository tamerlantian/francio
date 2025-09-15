export interface Vehiculo {
  id: number;
  fecha_registro: string;
  placa: string;
  modelo: string;
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
  carroceria: number;
  color: number;
  combustible: number;
  configuracion: number;
  linea: number;
  marca: number;
  verificado: boolean;
}

export interface VehiculoResponse {
  id: number;
  fecha_registro: string;
  placa: string;
  modelo: string;
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
  carroceria_id: number;
  color_id: number;
  combustible_id: number;
  configuracion_id: number;
  linea_id: number;
  marca_id: number;
  verificado: boolean;
}

export interface VehiculoSelector {
  id: number;
  placa: string;
}
