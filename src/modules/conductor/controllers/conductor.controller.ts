import { ApiQueryParametros } from '@/src/core/interfaces/api.interface';
import { ConductorRepository } from '../repositories/conductor.repository';
import { Conductor } from '../interfaces/conductor.interface';

// Controlador para manejar las operaciones relacionadas con conductores
export const conductorController = {
  // Obtener lista de conductores
  getConductores: async (params: ApiQueryParametros = {}): Promise<any> => {
    try {
      const response = await ConductorRepository.getInstance().getConductores(params);
      return response;
    } catch (error) {
      console.log(error);
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

  // Crear un nuevo conductor
  createConductor: async (data: Conductor) => {
    try {
      const response = await ConductorRepository.getInstance().createConductor(data);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Obtener un conductor por su ID
  getConductorById: async (id: string) => {
    try {
      const response = await ConductorRepository.getInstance().getConductorById(id);
      console.log(response);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Actualizar un conductor existente
  updateConductor: async (data: Conductor) => {
    try {
      const response = await ConductorRepository.getInstance().updateConductor(data);
      return response;
    } catch (error) {
      throw error;
    }
  },
};
