import { ApiQueryParametros } from '@/src/core/interfaces/api.interface';
import { VehiculoRepository } from '../repositories/vehiculo.repository';
import { Vehiculo, VehiculoResponse } from '../interfaces/vehiculo.interface';

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
      console.log(error);
      throw error;
    }
  },

  // Crear un nuevo vehículo
  createVehiculo: async (data: Vehiculo) => {
    try {
      const response = await VehiculoRepository.getInstance().createVehiculo(data);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Obtener un vehículo por su ID
  getVehiculoById: async (id: string) => {
    try {
      const response = await VehiculoRepository.getInstance().getVehiculoById(id);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Actualizar un vehículo existente
  updateVehiculo: async (data: VehiculoResponse) => {
    try {
      const response = await VehiculoRepository.getInstance().updateVehiculo(data);
      return response;
    } catch (error) {
      throw error;
    }
  },
};
