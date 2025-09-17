import React from 'react';
import { Control, Controller, FieldError, FieldPath, FieldValues } from 'react-hook-form';
import { FormSearchableSelector, SearchableOption } from './FormSearchableSelector';

interface FormSearchableSelectorControllerProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  placeholder?: string;
  searchPlaceholder?: string;
  options: SearchableOption[];
  error?: FieldError;
  rules?: Record<string, any>;
  isLoading?: boolean;
  isSearching?: boolean;
  onRetry?: () => void;
  onSearch?: (_searchTerm: string) => void;
  emptyOptionsMessage?: string;
  noResultsMessage?: string;
  minSearchLength?: number;
  searchDebounceMs?: number;
  apiError?: Error | null;
  restoreInitialOptions?: () => void;
  allowDeselection?: boolean; // Permite deseleccionar la opción actual
  clearSelectionText?: string; // Texto del botón de limpiar selección
}

export const FormSearchableSelectorController = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  searchPlaceholder,
  options,
  error,
  rules,
  isLoading,
  isSearching,
  onRetry,
  onSearch,
  emptyOptionsMessage,
  noResultsMessage,
  minSearchLength,
  searchDebounceMs,
  apiError,
  restoreInitialOptions,
  allowDeselection,
  clearSelectionText,
}: FormSearchableSelectorControllerProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, value } }) => (
        <FormSearchableSelector
          label={label}
          placeholder={placeholder}
          searchPlaceholder={searchPlaceholder}
          options={options}
          value={value}
          onValueChange={onChange}
          onSearch={onSearch}
          error={error?.message || (apiError ? 'Error al cargar opciones' : undefined)}
          isLoading={isLoading}
          isSearching={isSearching}
          onRetry={onRetry}
          emptyOptionsMessage={emptyOptionsMessage}
          noResultsMessage={noResultsMessage}
          minSearchLength={minSearchLength}
          searchDebounceMs={searchDebounceMs}
          restoreInitialOptions={restoreInitialOptions}
          allowDeselection={allowDeselection}
          clearSelectionText={clearSelectionText}
        />
      )}
    />
  );
};
