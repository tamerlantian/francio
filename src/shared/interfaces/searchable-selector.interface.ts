/**
 * Configuration interface for searchable selector components
 */
export interface SearchableSelectorConfig {
  /** API endpoint for fetching data */
  endpoint: string;
  /** Field name to use as display label */
  labelField: string;
  /** Field name to use as option value */
  valueField: string;
  /** Additional fields to include in search text */
  searchableFields?: readonly string[] | string[];
  /** Separate endpoint for search operations (optional) */
  searchEndpoint?: string;
  /** Query parameter name for search term (default: 'search') */
  searchParam?: string;
  /** Initial query parameters to include in all requests */
  initialParams?: Record<string, any>;
  /** Custom data transformation function */
  transformData?: (_data: any[]) => SearchableOption[];
  /** Minimum characters required to trigger search (default: 2) */
  minSearchLength?: number;
  /** Debounce delay in milliseconds (default: 300) */
  searchDebounceMs?: number;
}

/**
 * Option interface for searchable selector
 */
export interface SearchableOption {
  /** Display text for the option */
  label: string;
  /** Value to be stored when option is selected */
  value: string;
  /** Additional searchable text (optional) */
  searchableText?: string;
}

/**
 * API response structures that the hook can handle
 */
export interface ApiResponse<T> {
  data?: T[];
  results?: T[];
  items?: T[];
}

/**
 * Hook return interface
 */
export interface UseSearchableSelectorReturn {
  /** Available options to display */
  options: SearchableOption[];
  /** Loading state for initial data fetch */
  isLoading: boolean;
  /** Loading state for search operations */
  isSearching: boolean;
  /** Error state */
  error: Error | null;
  /** Function to perform search */
  search: (_searchTerm: string) => void;
  /** Function to retry failed requests */
  retry: () => void;
  /** Function to refetch initial data */
  refetch: () => void;
  /** Function to restore initial options when search is cancelled */
  restoreInitialOptions: () => void;
}

/**
 * Common field mapping configurations for different entity types
 */
export const COMMON_FIELD_MAPPINGS = {
  /** Standard ID-Name mapping */
  ID_NAME: {
    labelField: 'name',
    valueField: 'id',
    searchableFields: ['name'],
  },
  /** Standard ID-Title mapping */
  ID_TITLE: {
    labelField: 'title',
    valueField: 'id',
    searchableFields: ['title'],
  },
  /** User entity mapping */
  USER: {
    labelField: 'full_name',
    valueField: 'id',
    searchableFields: ['full_name', 'email', 'username'],
  },
  /** Location entity mapping */
  LOCATION: {
    labelField: 'name',
    valueField: 'id',
  },
  /** Vehicle entity mapping */
  VEHICLE: {
    labelField: 'placa',
    valueField: 'id',
    searchableFields: ['placa', 'modelo', 'chasis'],
  },
  /** Conductor entity mapping */
  CONDUCTOR: {
    labelField: 'full_name',
    valueField: 'id',
    searchableFields: ['full_name', 'cedula', 'telefono'],
  },
} as const;

/**
 * Utility type for creating strongly typed selector configurations
 */
export type TypedSearchableSelectorConfig<T = any> = Omit<
  SearchableSelectorConfig,
  'transformData'
> & {
  transformData?: (_data: T[]) => SearchableOption[];
};
