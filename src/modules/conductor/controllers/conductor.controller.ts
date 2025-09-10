import { ApiQueryParametros } from '@/src/core/interfaces/api.interface';
import { ConductorRepository } from '../repositories/conductor.repository';

// Controlador para manejar las operaciones relacionadas con conductores
export const conductorController = {
  // Obtener lista de conductores
  getConductores: async (params: ApiQueryParametros = {}): Promise<any> => {
    try {
      const response = await ConductorRepository.getInstance().getConductores(params);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Obtener lista de conductores para seleccionar
  getConductoresSelector: async (params: ApiQueryParametros = {}) => {
    try {
      const response = await ConductorRepository.getInstance().getConductoresSelector(params);
      return response;
    } catch (error) {
      throw error;
    }
  },
};
