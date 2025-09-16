import { Vehiculo, VehiculoResponse } from '../interfaces/vehiculo.interface';

/**
 * Convierte un objeto VehiculoResponse a Vehiculo, asegurando que los tipos sean correctos
 * @param response Respuesta del API
 * @returns Objeto Vehiculo con los tipos correctos
 */
export const mapVehiculoResponseVehiculo = (response: VehiculoResponse): Vehiculo => {
  return {
    id: response.id,
    fecha_registro: '',
    placa: response.placa,
    modelo: response.modelo,
    modelo_repotenciado: response.modelo_repotenciado,
    motor: response.motor,
    chasis: response.chasis,
    ejes: response.ejes,
    peso_vacio: response.peso_vacio,
    capacidad: response.capacidad,
    poliza: response.poliza,
    vence_poliza: response.vence_poliza,
    tecnicomecanica: response.tecnicomecanica,
    vence_tecnicomecanica: response.vence_tecnicomecanica,
    propio: response.propio,
    remolque: response.remolque,
    carroceria: response.carroceria ? String(response.carroceria) : '',
    color: response.color ? String(response.color) : '',
    combustible: response.combustible ? String(response.combustible) : '',
    configuracion: response.configuracion ? String(response.configuracion) : '',
    linea: response.linea ? String(response.linea) : '',
    marca: response.marca ? String(response.marca) : '',
    // verificado: response.verificado,
  };
};
