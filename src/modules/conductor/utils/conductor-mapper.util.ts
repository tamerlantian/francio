import { Conductor, ConductorResponse } from '../interfaces/conductor.interface';

/**
 * Convierte un objeto ConductorResponse a Conductor, asegurando que los tipos sean correctos
 * @param response Respuesta del API
 * @returns Objeto Conductor con los tipos correctos
 */
export const mapConductorResponseToConductor = (response: ConductorResponse): Conductor => {
  return {
    id: response.id,
    identificacion: response.identificacion ? String(response.identificacion) : '',
    identificacion__nombre: '',
    digito_verificacion: '',
    verificado: false,
    ciudad: response.ciudad ? String(response.ciudad) : '',
    ciudad__nombre: response.ciudad__nombre,
    ciudad__estado__nombre: '',
    numero_identificacion: response.numero_identificacion,
    nombre_corto: response.nombre_corto,
    nombre1: response.nombre1,
    nombre2: response.nombre2 || '',
    apellido1: response.apellido1,
    apellido2: response.apellido2 || '',
    direccion: response.direccion,
    barrio: response.barrio || '',
    telefono: response.telefono || '',
    correo: response.correo || '',
    numero_licencia: response.numero_licencia || '',
    // Convertir explícitamente a string para que funcione con los selectores
    categoria_licencia: response.categoria_licencia ? String(response.categoria_licencia) : '',
    fecha_vence_licencia: response.fecha_vence_licencia || '',
  };
};
