import { ApiQueryParametros } from '@/src/core/interfaces/api.interface';
import { HttpBaseRepository } from '../../../core/repositories/http-base.repository';

/**
 * Repositorio para manejar las operaciones de API relacionadas con conductores
 * Implementa el patrón Singleton para evitar múltiples instancias
 */
export class ConductorRepository extends HttpBaseRepository {
  private static instance: ConductorRepository;

  /**
   * Constructor privado para evitar instanciación directa
   */
  private constructor() {
    super();
  }

  /**
   * Obtiene la instancia única del repositorio
   * @returns La instancia única de ConductorRepository
   */
  public static getInstance(): ConductorRepository {
    if (!ConductorRepository.instance) {
      ConductorRepository.instance = new ConductorRepository();
    }
    return ConductorRepository.instance;
  }

  /**
   * Obtiene la lista de conductores
   * @param params Parámetros de consulta opcionales
   * @returns Promise con la respuesta de conductores
   */
  async getConductores(params: ApiQueryParametros = {}): Promise<any> {
    return this.get<any>('vertical/conductor/', params);
  }
}
