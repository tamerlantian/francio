import { FormInputController } from '@/src/shared/components/ui/form/FormInputController';
import React, { useEffect } from 'react';
import { Control, Controller, FieldErrors, useWatch } from 'react-hook-form';
import { ScrollView, StyleSheet, Text, View, Switch } from 'react-native';
import { VehiculoResponse } from '../../interfaces/vehiculo.interface';
import { useSearchableSelector } from '@/src/shared/hooks/use-searchable-selector.hook';
import { FormSearchableSelectorController } from '@/src/shared/components/ui/form/FormSearchableSelectorController';

interface TechnicalInfoStepProps {
  control: Control<Partial<VehiculoResponse>>;
  errors: FieldErrors<Partial<VehiculoResponse>>;
  initialData?: Partial<VehiculoResponse>;
  onValidationChange: (_isValid: boolean) => void;
}

export const TechnicalInfoStep: React.FC<TechnicalInfoStepProps> = ({
  control,
  errors,
  initialData,
  onValidationChange,
}) => {
  const carroceriaSelector = useSearchableSelector({
    endpoint: 'vertical/carroceria/seleccionar/',
    labelField: 'nombre',
    valueField: 'id',
    searchParam: 'nombre__icontains',
    initialParams: {
      nombre__icontains: initialData?.carroceria__nombre ? initialData.carroceria__nombre : '',
    },
    minSearchLength: 1,
    searchDebounceMs: 300,
  });

  // Searchable selectors
  // Usando un patrón común para todos los selectores con nombre
  const colorSelector = useSearchableSelector({
    endpoint: 'vertical/color/seleccionar/',
    labelField: 'nombre',
    valueField: 'id',
    searchParam: 'nombre__icontains',
    initialParams: initialData?.color__nombre
      ? { nombre__icontains: initialData.color__nombre }
      : undefined,
    minSearchLength: 0,
    searchDebounceMs: 300,
  });

  const combustibleSelector = useSearchableSelector({
    endpoint: 'vertical/combustible/seleccionar/',
    labelField: 'nombre',
    valueField: 'id',
    searchParam: 'nombre__icontains',
    initialParams: initialData?.combustible__nombre
      ? { nombre__icontains: initialData.combustible__nombre }
      : undefined,
    minSearchLength: 0,
    searchDebounceMs: 300,
  });

  const configuracionSelector = useSearchableSelector({
    endpoint: 'vertical/vehiculo_configuracion/seleccionar/',
    labelField: 'nombre',
    valueField: 'id',
    searchParam: 'nombre__icontains',
    initialParams: initialData?.configuracion__nombre
      ? { nombre__icontains: initialData.configuracion__nombre }
      : undefined,
    minSearchLength: 0,
    searchDebounceMs: 300,
  });

  const lineaSelector = useSearchableSelector({
    endpoint: 'vertical/linea/seleccionar/',
    labelField: 'nombre',
    valueField: 'id',
    searchParam: 'nombre__icontains',
    initialParams: initialData?.linea__nombre
      ? { nombre__icontains: initialData.linea__nombre }
      : undefined,
    minSearchLength: 0,
    searchDebounceMs: 300,
  });

  const marcaSelector = useSearchableSelector({
    endpoint: 'vertical/marca/seleccionar/',
    labelField: 'nombre',
    valueField: 'id',
    searchParam: 'nombre__icontains',
    initialParams: initialData?.marca__nombre
      ? { nombre__icontains: initialData.marca__nombre }
      : undefined,
    minSearchLength: 0,
    searchDebounceMs: 300,
  });
  // Watch form values for validation
  const watchedValues = useWatch({
    control,
    name: [
      'ejes',
      'peso_vacio',
      'capacidad',
      'propio',
      'remolque',
      'carroceria',
      'color',
      'combustible',
      'configuracion',
      'linea',
      'marca',
    ],
  });

  // Notify parent of validation changes based on form errors and required values
  useEffect(() => {
    // Define required fields
    const requiredFields = {
      ejes: watchedValues[0],
      peso_vacio: watchedValues[1],
      capacidad: watchedValues[2],
      carroceria: watchedValues[5],
      color: watchedValues[6],
      combustible: watchedValues[7],
      configuracion: watchedValues[8],
      linea: watchedValues[9],
      marca: watchedValues[10],
    };

    // Check for errors in any required field
    const hasErrors = Object.keys(requiredFields).some(
      field => errors[field as keyof Partial<VehiculoResponse>],
    );

    // Check if all required fields have values
    const hasRequiredValues = Object.entries(requiredFields).every(([_field, value]) => {
      // For numeric fields
      if (typeof value === 'number') {
        return value !== undefined && value !== null;
      }
      // For string fields
      return value !== undefined && value !== null && value !== '';
    });

    const isValid = !hasErrors && hasRequiredValues;
    onValidationChange(isValid);
  }, [
    errors,
    errors.ejes,
    errors.peso_vacio,
    errors.capacidad,
    errors.carroceria,
    errors.color,
    errors.combustible,
    errors.configuracion,
    errors.linea,
    errors.marca,
    watchedValues,
    onValidationChange,
  ]);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.description}>Ingresa la información técnica del vehículo</Text>

      {/* Ejes */}
      <FormInputController
        control={control}
        name="ejes"
        label="Número de ejes *"
        error={errors.ejes}
        placeholder="Ingresa el número de ejes"
        keyboardType="numeric"
        isNumeric={true}
        rules={{
          required: 'Este campo es obligatorio',
          min: { value: 1, message: 'Debe tener al menos 1 eje' },
        }}
      />

      {/* Peso Vacío */}
      <FormInputController
        control={control}
        name="peso_vacio"
        label="Peso vacío (kg) *"
        error={errors.peso_vacio}
        placeholder="Ingresa el peso vacío en kilogramos"
        keyboardType="numeric"
        isNumeric={true}
        rules={{
          required: 'Este campo es obligatorio',
          min: { value: 1, message: 'El peso debe ser mayor a 0' },
        }}
      />

      {/* Capacidad */}
      <FormInputController
        control={control}
        name="capacidad"
        label="Capacidad de carga (kg) *"
        error={errors.capacidad}
        placeholder="Ingresa la capacidad de carga en kilogramos"
        keyboardType="numeric"
        isNumeric={true}
        rules={{
          required: 'Este campo es obligatorio',
          min: { value: 1, message: 'La capacidad debe ser mayor a 0' },
        }}
      />

      {/* Switches Section */}
      <View style={styles.switchSection}>
        <Text style={styles.sectionTitle}>Características del vehículo</Text>

        {/* Propio Switch */}
        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>¿Es vehículo propio?</Text>
          <Controller
            control={control}
            name="propio"
            render={({ field }) => (
              <Switch
                value={field.value || false}
                onValueChange={field.onChange}
                trackColor={{ false: '#E5E7EB', true: '#10B981' }}
                thumbColor={field.value ? '#FFFFFF' : '#9CA3AF'}
                ios_backgroundColor="#E5E7EB"
              />
            )}
          />
        </View>

        {/* Remolque Switch */}
        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>¿Tiene remolque?</Text>
          <Controller
            control={control}
            name="remolque"
            render={({ field }) => (
              <Switch
                value={field.value || false}
                onValueChange={field.onChange}
                trackColor={{ false: '#E5E7EB', true: '#10B981' }}
                thumbColor={field.value ? '#FFFFFF' : '#9CA3AF'}
                ios_backgroundColor="#E5E7EB"
              />
            )}
          />
        </View>
      </View>

      {/* Vehicle Attributes Section */}
      <View style={styles.idsSection}>
        <Text style={styles.sectionTitle}>Atributos del vehículo</Text>

        <FormSearchableSelectorController
          control={control}
          name="carroceria"
          label="Carrocería"
          placeholder="Seleccione una carrocería"
          searchPlaceholder="Buscar carrocería..."
          options={carroceriaSelector.options}
          isLoading={carroceriaSelector.isLoading}
          isSearching={carroceriaSelector.isSearching}
          onSearch={carroceriaSelector.search}
          onRetry={carroceriaSelector.retry}
          restoreInitialOptions={carroceriaSelector.restoreInitialOptions}
          emptyOptionsMessage="No hay carrocerías disponibles"
          noResultsMessage="No se encontraron carrocerías"
          apiError={carroceriaSelector.error}
          rules={{
            required: 'La carrocería es requerida',
          }}
        />

        <FormSearchableSelectorController
          control={control}
          name="color"
          label="Color *"
          placeholder="Seleccione un color"
          searchPlaceholder="Buscar color..."
          options={colorSelector.options}
          isLoading={colorSelector.isLoading}
          isSearching={colorSelector.isSearching}
          onSearch={colorSelector.search}
          onRetry={colorSelector.retry}
          restoreInitialOptions={colorSelector.restoreInitialOptions}
          emptyOptionsMessage="No hay colores disponibles"
          noResultsMessage="No se encontraron colores"
          apiError={colorSelector.error}
          rules={{
            required: 'Este campo es obligatorio',
          }}
        />

        <FormSearchableSelectorController
          control={control}
          name="combustible"
          label="Combustible *"
          placeholder="Seleccione un combustible"
          searchPlaceholder="Buscar combustible..."
          options={combustibleSelector.options}
          isLoading={combustibleSelector.isLoading}
          isSearching={combustibleSelector.isSearching}
          onSearch={combustibleSelector.search}
          onRetry={combustibleSelector.retry}
          restoreInitialOptions={combustibleSelector.restoreInitialOptions}
          emptyOptionsMessage="No hay combustibles disponibles"
          noResultsMessage="No se encontraron combustibles"
          apiError={combustibleSelector.error}
          rules={{
            required: 'Este campo es obligatorio',
          }}
        />

        <FormSearchableSelectorController
          control={control}
          name="configuracion"
          label="Configuración *"
          placeholder="Seleccione una configuración"
          searchPlaceholder="Buscar configuración..."
          options={configuracionSelector.options}
          isLoading={configuracionSelector.isLoading}
          isSearching={configuracionSelector.isSearching}
          onSearch={configuracionSelector.search}
          onRetry={configuracionSelector.retry}
          restoreInitialOptions={configuracionSelector.restoreInitialOptions}
          emptyOptionsMessage="No hay configuraciones disponibles"
          noResultsMessage="No se encontraron configuraciones"
          apiError={configuracionSelector.error}
          rules={{
            required: 'Este campo es obligatorio',
          }}
        />

        <FormSearchableSelectorController
          control={control}
          name="linea"
          label="Línea *"
          placeholder="Seleccione una línea"
          searchPlaceholder="Buscar línea..."
          options={lineaSelector.options}
          isLoading={lineaSelector.isLoading}
          isSearching={lineaSelector.isSearching}
          onSearch={lineaSelector.search}
          onRetry={lineaSelector.retry}
          restoreInitialOptions={lineaSelector.restoreInitialOptions}
          emptyOptionsMessage="No hay líneas disponibles"
          noResultsMessage="No se encontraron líneas"
          apiError={lineaSelector.error}
          rules={{
            required: 'Este campo es obligatorio',
          }}
        />

        <FormSearchableSelectorController
          control={control}
          name="marca"
          label="Marca *"
          placeholder="Seleccione una marca"
          searchPlaceholder="Buscar marca..."
          options={marcaSelector.options}
          isLoading={marcaSelector.isLoading}
          isSearching={marcaSelector.isSearching}
          onSearch={marcaSelector.search}
          onRetry={marcaSelector.retry}
          restoreInitialOptions={marcaSelector.restoreInitialOptions}
          emptyOptionsMessage="No hay marcas disponibles"
          noResultsMessage="No se encontraron marcas"
          apiError={marcaSelector.error}
          rules={{
            required: 'Este campo es obligatorio',
          }}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 24,
    textAlign: 'center',
    lineHeight: 20,
  },
  switchSection: {
    marginVertical: 20,
  },
  idsSection: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    marginBottom: 12,
  },
  switchLabel: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
});
