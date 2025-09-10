export interface Conductor {
  id: number;
  identificacion: number;
  identificacion__nombre: string;
  digito_verificacion: number;
  ciudad: number;
  ciudad__nombre: string;
  ciudad__estado__nombre: string;
  rh: number;
  rh__nombre: string;
  rh__codigo: string;
  numero_identificacion: string;
  nombre_corto: string;
  nombre1: string;
  nombre2: string;
  apellido1: string;
  apellido2: string;
  direccion: string;
  barrio: string;
  telefono: string;
  celular: string;
  correo: string;
  numero_licencia: string;
  categoria_licencia: string;
  fecha_nacimiento: string;
  fecha_vence_licencia: string;
  fecha_expedicion_licencia: string;
  fecha_ingreso: any;
  fecha_retiro: any;
  propio: boolean;
  estado_inactivo: boolean;
  estado_revisado: boolean;
  comentario: string | null;
  conductor: boolean;
}

export interface ConductorResponse {
  apellido1: string;
  apellido2: string;
  barrio: string;
  categoria_licencia: number;
  categoria_licencia__nombre: string;
  celular: string;
  ciudad: number;
  ciudad__nombre: string;
  correo: string;
  direccion: string;
  fecha_vence_licencia: string;
  id: number;
  identificacion: number;
  nombre1: string;
  nombre2: string;
  nombre_corto: string;
  numero_identificacion: string;
  numero_licencia: string;
  telefono: string;
}

export interface ConductorSelector {
  id: number;
  nombre_corto: string;
}
