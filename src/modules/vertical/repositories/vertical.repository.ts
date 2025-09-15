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

  /**
   * Obtiene la lista de carrocerías para seleccionar
   * @returns Promise con la respuesta de carrocerías
   */
  async getSeleccionarCarroceria(): Promise<Seleccionar[]> {
    try {
      const response = await this.get<Seleccionar[]>('vertical/carroceria/seleccionar/');
      return response;
    } catch (error) {
      console.log('error al obtener carrocerias', error);
      throw error;
    }
  }

  /**
   * Obtiene la lista de colores para seleccionar
   * @returns Promise con la respuesta de colores
   */
  async getSeleccionarColor(): Promise<Seleccionar[]> {
    try {
      const response = await this.get<Seleccionar[]>('vertical/color/seleccionar/');
      return response;
    } catch (error) {
      console.log('error al obtener colores', error);
      throw error;
    }
  }

  /**
   * Obtiene la lista de combustibles para seleccionar
   * @returns Promise con la respuesta de combustibles
   */
  async getSeleccionarCombustible(): Promise<Seleccionar[]> {
    try {
      const response = await this.get<Seleccionar[]>('vertical/combustible/seleccionar/');
      return response;
    } catch (error) {
      console.log('error al obtener combustibles', error);
      throw error;
    }
  }

  /**
   * Obtiene la lista de configuraciones para seleccionar
   * @returns Promise con la respuesta de configuraciones
   */
  async getSeleccionarConfiguracion(): Promise<Seleccionar[]> {
    try {
      const response = await this.get<Seleccionar[]>(
        'vertical/vehiculo_configuracion/seleccionar/',
      );
      return response;
    } catch (error) {
      console.log('error al obtener configuraciones', error);
      throw error;
    }
  }

  /**
   * Obtiene la lista de líneas para seleccionar
   * @returns Promise con la respuesta de líneas
   */
  async getSeleccionarLinea(): Promise<Seleccionar[]> {
    try {
      const response = await this.get<Seleccionar[]>('vertical/linea/seleccionar/');
      return response;
    } catch (error) {
      console.log('error al obtener lineas', error);
      throw error;
    }
  }

  /**
   * Obtiene la lista de marcas para seleccionar
   * @returns Promise con la respuesta de marcas
   */
  async getSeleccionarMarca(): Promise<Seleccionar[]> {
    try {
      const response = await this.get<Seleccionar[]>('vertical/marca/seleccionar/');
      return response;
    } catch (error) {
      console.log('error al obtener marcas', error);
      throw error;
    }
  }
}

export default VerticalRepository.getInstance();
