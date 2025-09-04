// Definición del modelo de usuario
export interface User {
  id: number;
  name: string;
  email: string;
  username: string;
}

// Tipo para la respuesta de la API
export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}
