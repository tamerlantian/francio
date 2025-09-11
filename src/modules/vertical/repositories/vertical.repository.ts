import { HttpBaseRepository } from '@/src/core/repositories/http-base.repository';
import { Seleccionar } from '@/src/shared/interfaces/seleccionar.interface';
import { SeleccionarCiudad } from '../interfaces/ciudad.interface';

/**
 * Repositorio para manejar las operaciones de API relacionadas con autenticación
 * Implementa el patrón Singleton para evitar múltiples instancias
 */
class VerticalRepository extends HttpBaseRepository {
  private static instance: VerticalRepository;

  /**
   * Constructor privado para evitar instanciación directa
   */
  private constructor() {
    super();
  }

  /**
   * Obtiene la instancia única del repositorio
   * @returns La instancia única de AuthRepository
   */
  public static getInstance(): VerticalRepository {
    if (!VerticalRepository.instance) {
      VerticalRepository.instance = new VerticalRepository();
    }
    return VerticalRepository.instance;
  }

  /**
   * Obtiene la lista de identificaciones para seleccionar
   * @returns Promise con la respuesta de identificaciones
   */
  async getSeleccionarIdentificacion(): Promise<Seleccionar[]> {
    try {
      const response = await this.get<Seleccionar[]>('vertical/identificacion/seleccionar/');
      return response;
    } catch (error) {
      console.log('error', error);
      throw error;
    }
  }

  /**
   * Obtiene la lista de categorias de licencia para seleccionar
   * @returns Promise con la respuesta de categorias de licencia
   */
  async getSeleccionarCategoriaLicencia(): Promise<Seleccionar[]> {
    try {
      const response = await this.get<Seleccionar[]>('vertical/categoria_licencia/seleccionar/');
      return response;
    } catch (error) {
      console.log('error', error);
      throw error;
    }
  }

  /**
   * Obtiene la lista de ciudades para seleccionar
   * @returns Promise con la respuesta de ciudades
   */
  async getSeleccionarCiudad(): Promise<SeleccionarCiudad[]> {
    try {
      const response = await this.get<SeleccionarCiudad[]>('vertical/ciudad/seleccionar/');
      return response;
    } catch (error) {
      console.log('error', error);
      throw error;
    }
  }
}

export default VerticalRepository.getInstance();
