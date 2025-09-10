import { ApiQueryParametros, ApiResponse } from '@/src/core/interfaces/api.interface';
import { HttpBaseRepository } from '../../../core/repositories/http-base.repository';
import { VehiculoResponse, VehiculoSelector } from '../interfaces/vehiculo.interface';

/**
 * Repositorio para manejar las operaciones de API relacionadas con vehículos
 * Implementa el patrón Singleton para evitar múltiples instancias
 */
export class VehiculoRepository extends HttpBaseRepository {
  private static instance: VehiculoRepository;

  /**
   * Constructor privado para evitar instanciación directa
   */
  private constructor() {
    super();
  }

  /**
   * Obtiene la instancia única del repositorio
   * @returns La instancia única de VehiculoRepository
   */
  public static getInstance(): VehiculoRepository {
    if (!VehiculoRepository.instance) {
      VehiculoRepository.instance = new VehiculoRepository();
    }
    return VehiculoRepository.instance;
  }

  /**
   * Obtiene la lista de vehículos
   * @param params Parámetros de consulta opcionales
   * @returns Promise con la respuesta de vehículos
   */
  async getVehiculos(params: ApiQueryParametros = {}) {
    return this.get<ApiResponse<VehiculoResponse>>('vertical/vehiculo/', params);
  }

  /**
   * Obtiene la lista de vehículos para seleccionar
   * @param params Parámetros de consulta opcionales
   * @returns Promise con la respuesta de vehículos
   */
  async getVehiculosSelector(params: ApiQueryParametros = {}) {
    return this.get<VehiculoSelector[]>('vertical/vehiculo/seleccionar/', params);
  }
}
