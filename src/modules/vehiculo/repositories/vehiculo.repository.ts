import { ApiQueryParametros, ApiResponse } from '@/src/core/interfaces/api.interface';
import { HttpBaseRepository } from '../../../core/repositories/http-base.repository';
import { Vehiculo, VehiculoResponse, VehiculoSelector } from '../interfaces/vehiculo.interface';

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

  /**
   * Crea un nuevo vehículo
   * @param data Datos del vehículo a crear
   * @returns Promise con la respuesta de la creación del vehículo
   */
  async createVehiculo(data: Vehiculo) {
    return this.post<ApiResponse<VehiculoResponse>>('vertical/vehiculo/', data);
  }

  /**
   * Obtiene un vehículo por su ID
   * @param id ID del vehículo
   * @returns Promise con la respuesta del vehículo
   */
  async getVehiculoById(id: string) {
    return this.get<VehiculoResponse>(`vertical/vehiculo/${id}/`);
  }

  /**
   * Actualiza un vehículo existente
   * @param data Datos del vehículo a actualizar
   * @returns Promise con la respuesta de la actualización del vehículo
   */
  async updateVehiculo(data: VehiculoResponse) {
    return this.put<VehiculoResponse>(`vertical/vehiculo/${data.id}/`, data);
  }
}
