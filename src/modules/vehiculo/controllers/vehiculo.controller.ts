import { ApiQueryParametros } from '@/src/core/interfaces/api.interface';
import { VehiculoRepository } from '../repositories/vehiculo.repository';

// Controlador para manejar las operaciones relacionadas con vehículos
export const vehiculoController = {
  // Obtener lista de vehículos
  getVehiculos: async (params: ApiQueryParametros = {}): Promise<any> => {
    try {
      const response = await VehiculoRepository.getInstance().getVehiculos(params);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Obtener lista de vehículos para seleccionar
  getVehiculosSelector: async (params: ApiQueryParametros = {}) => {
    try {
      const response = await VehiculoRepository.getInstance().getVehiculosSelector(params);
      return response;
    } catch (error) {
      throw error;
    }
  },
};
