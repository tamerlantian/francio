import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useForm } from 'react-hook-form';
import { FormSearchableSelectorController } from './FormSearchableSelectorController';
import { useSearchableSelector } from '../../hooks/use-searchable-selector.hook';
import { COMMON_FIELD_MAPPINGS } from '../../interfaces/searchable-selector.interface';

// Example form data interface
interface ExampleFormData {
  conductorId: string;
  vehiculoId: string;
  ciudadId: string;
}

// Example usage component
export const SearchableSelectorExample = () => {
  const { control, handleSubmit, formState: { errors } } = useForm<ExampleFormData>();

  // Example 1: Conductor selector with search
  const conductorSelector = useSearchableSelector({
    endpoint: 'conductores',
    ...COMMON_FIELD_MAPPINGS.CONDUCTOR,
    searchParam: 'search',
    minSearchLength: 2,
    searchDebounceMs: 300,
    initialParams: { active: true },
  });

  // Example 2: Vehicle selector with custom transformation
  const vehiculoSelector = useSearchableSelector({
    endpoint: 'vehiculos',
    labelField: 'display_name',
    valueField: 'id',
    searchableFields: ['placa', 'modelo', 'chasis'],
    searchParam: 'q',
    transformData: (data: any[]) => 
      data.map(item => ({
        label: `${item.placa} - ${item.modelo}`,
        value: item.id,
        searchableText: `${item.placa} ${item.modelo} ${item.chasis}`,
      })),
  });

  // Example 3: City selector with separate search endpoint
  const ciudadSelector = useSearchableSelector({
    endpoint: 'ciudades',
    searchEndpoint: 'ciudades/search',
    ...COMMON_FIELD_MAPPINGS.LOCATION,
    minSearchLength: 3,
  });

  const onSubmit = (data: ExampleFormData) => {
    console.log('Form submitted:', data);
  };

  return (
    <View style={styles.container}>
      {/* Conductor Selector */}
      <FormSearchableSelectorController
        control={control}
        name="conductorId"
        label="Conductor"
        placeholder="Seleccionar conductor..."
        searchPlaceholder="Buscar por nombre, cédula o teléfono..."
        options={conductorSelector.options}
        isLoading={conductorSelector.isLoading}
        isSearching={conductorSelector.isSearching}
        error={errors.conductorId}
        onSearch={conductorSelector.search}
        onRetry={conductorSelector.retry}
        emptyOptionsMessage="No hay conductores disponibles"
        noResultsMessage="No se encontraron conductores"
        rules={{ required: 'Debe seleccionar un conductor' }}
      />

      {/* Vehicle Selector */}
      <FormSearchableSelectorController
        control={control}
        name="vehiculoId"
        label="Vehículo"
        placeholder="Seleccionar vehículo..."
        searchPlaceholder="Buscar por placa, modelo o chasis..."
        options={vehiculoSelector.options}
        isLoading={vehiculoSelector.isLoading}
        isSearching={vehiculoSelector.isSearching}
        error={errors.vehiculoId}
        onSearch={vehiculoSelector.search}
        onRetry={vehiculoSelector.retry}
        rules={{ required: 'Debe seleccionar un vehículo' }}
      />

      {/* City Selector */}
      <FormSearchableSelectorController
        control={control}
        name="ciudadId"
        label="Ciudad"
        placeholder="Seleccionar ciudad..."
        searchPlaceholder="Buscar ciudad..."
        options={ciudadSelector.options}
        isLoading={ciudadSelector.isLoading}
        isSearching={ciudadSelector.isSearching}
        error={errors.ciudadId}
        onSearch={ciudadSelector.search}
        onRetry={ciudadSelector.retry}
        minSearchLength={3}
        rules={{ required: 'Debe seleccionar una ciudad' }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
