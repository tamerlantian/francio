import { VehiculoResponse } from '../interfaces/vehiculo.interface';

/**
 * Convierte un objeto VehiculoResponse a Vehiculo, asegurando que los tipos sean correctos
 * @param response Respuesta del API
 * @returns Objeto Vehiculo con los tipos correctos
 */
export const mapVehiculoResponseVehiculo = (response: VehiculoResponse): VehiculoResponse => {
  return {
    id: response.id,
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
    carroceria: response.carroceria,
    carroceria__nombre: response.carroceria__nombre,
    color: response.color,
    color__nombre: response.color__nombre,
    combustible: response.combustible,
    combustible__nombre: response.combustible__nombre,
    configuracion: response.configuracion,
    configuracion__nombre: response.configuracion__nombre,
    linea: response.linea,
    linea__nombre: response.linea__nombre,
    marca: response.marca,
    marca__nombre: response.marca__nombre,
    // verificado: response.verificado,
  };
};
