import { HttpBaseRepository } from '../../../core/repositories/http-base.repository';
import { User } from '../models/User';

/**
 * Repositorio para manejar las operaciones de API relacionadas con usuarios
 */
export class UserRepository extends HttpBaseRepository {
  /**
   * Obtener todos los usuarios
   * @returns Promise con la lista de usuarios
   */
  async getUsers(): Promise<User[]> {
    return this.get<User[]>('users');
  }

  /**
   * Obtener un usuario por ID
   * @param id ID del usuario
   * @returns Promise con los datos del usuario
   */
  async getUserById(id: number): Promise<User> {
    return this.get<User>(`users/${id}`);
  }

  /**
   * Crear un nuevo usuario
   * @param userData Datos del usuario a crear
   * @returns Promise con el usuario creado
   */
  async createUser(userData: Omit<User, 'id'>): Promise<User> {
    return this.post<User>('users', userData);
  }

  /**
   * Actualizar un usuario existente
   * @param id ID del usuario
   * @param userData Datos actualizados del usuario
   * @returns Promise con el usuario actualizado
   */
  async updateUser(id: number, userData: Partial<User>): Promise<User> {
    return this.put<User>(`users/${id}`, userData);
  }

  /**
   * Actualizar parcialmente un usuario
   * @param id ID del usuario
   * @param userData Datos parciales del usuario
   * @returns Promise con el usuario actualizado
   */
  async patchUser(id: number, userData: Partial<User>): Promise<User> {
    return this.patch<User>(`users/${id}`, userData);
  }

  /**
   * Eliminar un usuario
   * @param id ID del usuario
   * @returns Promise con la respuesta de eliminación
   */
  async deleteUser(id: number): Promise<any> {
    return this.delete(`users/${id}`);
  }
}
