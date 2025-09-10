import { ApiQueryParametros } from '@/src/core/interfaces/api.interface';
import { HttpBaseRepository } from '../../../core/repositories/http-base.repository';

/**
 * Repositorio para manejar las operaciones de API relacionadas con autenticación
 * Implementa el patrón Singleton para evitar múltiples instancias
 */
export class ViajeRepository extends HttpBaseRepository {
  private static instance: ViajeRepository;

  /**
   * Constructor privado para evitar instanciación directa
   */
  private constructor() {
    super();
  }

  /**
   * Obtiene la instancia única del repositorio
   * @returns La instancia única de ViajeRepository
   */
  public static getInstance(): ViajeRepository {
    if (!ViajeRepository.instance) {
      ViajeRepository.instance = new ViajeRepository();
    }
    return ViajeRepository.instance;
  }

  /**
   * Realiza el login del usuario
   * @param credentials Credenciales de login (email y password)
   * @returns Promise con la respuesta del login
   */
  async getViajes(params: ApiQueryParametros = {}) {
    return this.get<any>('vertical/viaje/lista/', params);
  }

  async aceptarViaje(viajeId: number, conductorId: number, vehiculoId: number) {
    return this.post<any>('vertical/viaje/aceptar/', {
      viaje_id: viajeId,
      conductor_id: conductorId,
      vehiculo_id: vehiculoId,
    });
  }
}
