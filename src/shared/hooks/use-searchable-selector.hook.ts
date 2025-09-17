import { HttpBaseRepository } from '@/src/core/repositories/http-base.repository';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  SearchableOption,
  SearchableSelectorConfig,
  UseSearchableSelectorReturn,
} from '../interfaces/searchable-selector.interface';

export const useSearchableSelector = (
  config: SearchableSelectorConfig,
): UseSearchableSelectorReturn => {
  const [options, setOptions] = useState<SearchableOption[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [lastSearchTerm, setLastSearchTerm] = useState('');
  const [initialized, setInitialized] = useState(false);

  const repositoryRef = useRef<HttpBaseRepository | null>(null);
  const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const configRef = useRef(config);
  // Referencias para mantener las opciones iniciales
  const initialOptionsRef = useRef<SearchableOption[]>([]);
  const hasInitialValueRef = useRef<boolean>(false);

  // Update config ref when config changes
  useEffect(() => {
    configRef.current = config;
  }, [config]);

  // Initialize repository
  useEffect(() => {
    repositoryRef.current = new HttpBaseRepository();
  }, []);

  // Transform raw API data to SearchableOption format
  const transformToOptions = useCallback((data: any[]): SearchableOption[] => {
    const currentConfig = configRef.current;
    if (currentConfig.transformData) {
      return currentConfig.transformData(data);
    }

    return data.map(item => ({
      label: item[currentConfig.labelField] || '',
      value: item[currentConfig.valueField] || '',
      searchableText: currentConfig.searchableFields
        ? currentConfig.searchableFields.map(field => item[field]).join(' ')
        : undefined,
    }));
  }, []);

  // Fetch initial data
  const fetchInitialData = useCallback(async () => {
    if (!repositoryRef.current) return;

    try {
      setIsLoading(true);
      setError(null);
      const currentConfig = configRef.current;

      const response = await repositoryRef.current.get<any>(
        currentConfig.endpoint,
        currentConfig.initialParams || {},
      );

      let data: any[] = [];
      if (Array.isArray(response)) {
        data = response;
      } else if (response.data && Array.isArray(response.data)) {
        data = response.data;
      } else if (response.results && Array.isArray(response.results)) {
        data = response.results;
      } else if (response.items && Array.isArray(response.items)) {
        data = response.items;
      }

      const transformedOptions = transformToOptions(data);
      setOptions(transformedOptions);

      // Guardar las opciones iniciales para poder restaurarlas después
      if (!hasInitialValueRef.current) {
        initialOptionsRef.current = transformedOptions;
        hasInitialValueRef.current = true;
      }

      setInitialized(true);
    } catch (err) {
      console.error('Error fetching initial data:', err);
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, [transformToOptions]);

  // Search function
  const search = useCallback(
    async (searchTerm: string) => {
      if (!repositoryRef.current || !searchTerm.trim()) {
        return;
      }

      const currentConfig = configRef.current;
      const minLength = currentConfig.minSearchLength || 2;
      if (searchTerm.length < minLength) {
        return;
      }

      // Prevent duplicate searches
      if (searchTerm === lastSearchTerm) {
        return;
      }

      try {
        setIsSearching(true);
        setError(null);
        setLastSearchTerm(searchTerm);

        // Use search endpoint if provided, otherwise use main endpoint with search param
        const endpoint = currentConfig.searchEndpoint || currentConfig.endpoint;
        const searchParam = currentConfig.searchParam || 'search';

        const params = {
          ...currentConfig.initialParams,
          [searchParam]: searchTerm,
        };

        const response = await repositoryRef.current.get<any>(endpoint, params);

        // Handle different response structures
        let data: any[] = [];
        if (Array.isArray(response)) {
          data = response;
        } else if (response.data && Array.isArray(response.data)) {
          data = response.data;
        } else if (response.results && Array.isArray(response.results)) {
          data = response.results;
        } else if (response.items && Array.isArray(response.items)) {
          data = response.items;
        }

        const transformedOptions = transformToOptions(data);
        setOptions(transformedOptions);
      } catch (err) {
        console.error('Error searching:', err);
        setError(err as Error);
      } finally {
        setIsSearching(false);
      }
    },
    [transformToOptions, lastSearchTerm],
  );

  // Debounced search
  const debouncedSearch = useCallback(
    (searchTerm: string) => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }

      if (!searchTerm.trim()) {
        // Si se borra la búsqueda, restaurar las opciones iniciales
        if (lastSearchTerm && initialized) {
          // Restaurar las opciones iniciales en lugar de hacer una nueva petición
          setOptions(initialOptionsRef.current);
          setLastSearchTerm('');
        }
        return;
      }

      const currentConfig = configRef.current;
      const debounceMs = currentConfig.searchDebounceMs || 300;
      searchTimeoutRef.current = setTimeout(() => {
        search(searchTerm);
      }, debounceMs);
    },
    [search, lastSearchTerm, initialized],
  );

  // Retry function
  const retry = useCallback(() => {
    if (lastSearchTerm) {
      search(lastSearchTerm);
    } else {
      fetchInitialData();
    }
  }, [lastSearchTerm, search, fetchInitialData]);

  // Refetch function (always fetches initial data)
  const refetch = useCallback(() => {
    setLastSearchTerm('');
    fetchInitialData();
  }, [fetchInitialData]);

  // Initial data fetch
  useEffect(() => {
    if (!initialized) {
      fetchInitialData();
    }
  }, [fetchInitialData, initialized]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  // Función para restaurar las opciones iniciales
  const restoreInitialOptions = useCallback(() => {
    if (hasInitialValueRef.current) {
      setOptions(initialOptionsRef.current);
      setLastSearchTerm('');
    }
  }, []);

  return {
    options,
    isLoading,
    isSearching,
    error,
    search: debouncedSearch,
    retry,
    refetch,
    restoreInitialOptions,
  };
};
