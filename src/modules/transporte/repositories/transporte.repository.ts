import { ApiResponse } from '@/src/core/interfaces/api.interface';
import { HttpBaseRepository } from '@/src/core/repositories/http-base.repository';
import { buildUrlWithSubdomain } from '@/src/shared/utils/url-builder.util';

/**
 * Repositorio para manejar las operaciones de API relacionadas con transporte
 * Implementa el patrón Singleton para evitar múltiples instancias
 */
class TransporteRepository extends HttpBaseRepository {
  private static instance: TransporteRepository;

  /**
   * Constructor privado para evitar instanciación directa
   */
  private constructor() {
    super();
  }

  /**
   * Obtiene la instancia única del repositorio
   * @returns La instancia única de TransporteRepository
   */
  public static getInstance(): TransporteRepository {
    if (!TransporteRepository.instance) {
      TransporteRepository.instance = new TransporteRepository();
    }
    return TransporteRepository.instance;
  }

  /**
   * Crea un nuevo viaje
   * @param viajeId ID del viaje
   */
  async nuevoViaje(viajeId: number, schema: string) {
    const url = await buildUrlWithSubdomain(schema, 'transporte/despacho/nuevo-viaje/');
    return this.post<ApiResponse<any>>(url, { viaje_id: viajeId });
  }
}

export default TransporteRepository.getInstance();
