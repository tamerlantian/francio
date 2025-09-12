import { ApiQueryParametros } from '@/src/core/interfaces/api.interface';
import { ViajeRepository } from '../repositories/viaje.repository';
import transporteRepository from '../../transporte/repositories/transporte.repository';

// Controlador para manejar las operaciones relacionadas con autenticación
export const viajeController = {
  // Realizar login de usuario
  getViajes: async (params: ApiQueryParametros) => {
    try {
      const response = await ViajeRepository.getInstance().getViajes(params);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Realizar login de usuario
  aceptarViaje: async (
    viajeId: number,
    conductorId: number,
    vehiculoId: number,
    schemaName: string,
  ) => {
    try {
      const response = await ViajeRepository.getInstance().aceptarViaje(
        viajeId,
        conductorId,
        vehiculoId,
      );
      await transporteRepository.nuevoViaje(viajeId, schemaName);
      return response;
    } catch (error) {
      throw error;
    }
  },
};
