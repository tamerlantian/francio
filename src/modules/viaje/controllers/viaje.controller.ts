import { ApiQueryParametros } from '@/src/core/interfaces/api.interface';
import { ViajeRepository } from '../repositories/viaje.repository';

// Controlador para manejar las operaciones relacionadas con autenticación
export const viajeController = {
  // Realizar login de usuario
  getViajes: async (params: ApiQueryParametros): Promise<any> => {
    try {
      const response = await ViajeRepository.getInstance().getViajes(params);
      return response;
    } catch (error) {
      throw error;
    }
  },
};
