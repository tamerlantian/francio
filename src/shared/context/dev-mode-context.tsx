import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { updateApiBaseUrl } from '@/src/config/environment';

// URLs de los endpoints
export const ENDPOINTS = {
  PRODUCTION: 'https://reddocapi.co/',
  DEVELOPMENT: 'http://reddocapi.online/',
};

const DEV_MODE_STORAGE_KEY = '@dev_mode_enabled';

interface DevModeContextType {
  isDeveloperMode: boolean;
  toggleDeveloperMode: () => Promise<void>;
  currentEndpoint: string;
}

const DevModeContext = createContext<DevModeContextType | undefined>(undefined);

export const DevModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDeveloperMode, setIsDeveloperMode] = useState<boolean>(false);

  // Carga el estado guardado al iniciar la aplicación
  useEffect(() => {
    const loadDevModeState = async () => {
      try {
        const savedMode = await AsyncStorage.getItem(DEV_MODE_STORAGE_KEY);
        if (savedMode !== null) {
          setIsDeveloperMode(JSON.parse(savedMode));
          updateApiBaseUrl(JSON.parse(savedMode));
        }
      } catch (error) {
        console.error('Error loading developer mode state:', error);
      }
    };

    loadDevModeState();
  }, []);

  // Alterna entre modo desarrollador y normal
  const toggleDeveloperMode = async () => {
    try {
      const newMode = !isDeveloperMode;
      await AsyncStorage.setItem(DEV_MODE_STORAGE_KEY, JSON.stringify(newMode));
      setIsDeveloperMode(newMode);
    } catch (error) {
      console.error('Error saving developer mode state:', error);
    }
  };

  // URL del endpoint actual basado en el modo seleccionado
  const currentEndpoint = isDeveloperMode ? ENDPOINTS.DEVELOPMENT : ENDPOINTS.PRODUCTION;

  return (
    <DevModeContext.Provider value={{ isDeveloperMode, toggleDeveloperMode, currentEndpoint }}>
      {children}
    </DevModeContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useDevMode = (): DevModeContextType => {
  const context = useContext(DevModeContext);
  if (context === undefined) {
    throw new Error('useDevMode must be used within a DevModeProvider');
  }
  return context;
};
