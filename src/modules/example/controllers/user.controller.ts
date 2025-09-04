import { User } from '../models/User';
import { UserRepository } from '../repositories/user.repository';

// Instancia del repositorio de usuario
const userRepository = new UserRepository();

// Controlador para manejar las operaciones relacionadas con usuarios
export const userController = {
  // Obtener todos los usuarios
  getUsers: async (): Promise<User[]> => {
    try {
      return await userRepository.getUsers();
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  },

  // Obtener un usuario por ID
  getUserById: async (id: number): Promise<User> => {
    try {
      return await userRepository.getUserById(id);
    } catch (error) {
      console.error(`Error fetching user with id ${id}:`, error);
      throw error;
    }
  },

  // Crear un nuevo usuario
  createUser: async (userData: Omit<User, 'id'>): Promise<User> => {
    try {
      return await userRepository.createUser(userData);
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  },

  // Actualizar un usuario existente
  updateUser: async (id: number, userData: Partial<User>): Promise<User> => {
    try {
      return await userRepository.updateUser(id, userData);
    } catch (error) {
      console.error(`Error updating user with id ${id}:`, error);
      throw error;
    }
  },

  // Eliminar un usuario
  deleteUser: async (id: number): Promise<any> => {
    try {
      await userRepository.deleteUser(id);
      return true;
    } catch (error) {
      console.error(`Error deleting user with id ${id}:`, error);
      throw error;
    }
  },
};
