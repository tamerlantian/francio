import { FormInputController } from '@/src/shared/components/ui/form/FormInputController';
import { FormSelectorController } from '@/src/shared/components/ui/form/FormSelectorController';
import {
  useSeleccionarCarroceria,
  useSeleccionarColor,
  useSeleccionarCombustible,
  useSeleccionarConfiguracion,
  useSeleccionarLinea,
  useSeleccionarMarca,
} from '@/src/modules/vertical/hooks/use-vertical.hook';
import React, { useEffect } from 'react';
import { Control, FieldErrors, useWatch } from 'react-hook-form';
import { ScrollView, StyleSheet, Text, View, Switch } from 'react-native';
import { Vehiculo } from '../../interfaces/vehiculo.interface';

interface TechnicalInfoStepProps {
  control: Control<Partial<Vehiculo>>;
  errors: FieldErrors<Partial<Vehiculo>>;
  onValidationChange: (_isValid: boolean) => void;
}

export const TechnicalInfoStep: React.FC<TechnicalInfoStepProps> = ({
  control,
  errors,
  onValidationChange,
}) => {
  // Load selector options
  const { carroceriaOptions, isLoading: isLoadingCarroceria } = useSeleccionarCarroceria();
  const { colorOptions, isLoading: isLoadingColor } = useSeleccionarColor();
  const { combustibleOptions, isLoading: isLoadingCombustible } = useSeleccionarCombustible();
  const { configuracionOptions, isLoading: isLoadingConfiguracion } = useSeleccionarConfiguracion();
  const { lineaOptions, isLoading: isLoadingLinea } = useSeleccionarLinea();
  const { marcaOptions, isLoading: isLoadingMarca } = useSeleccionarMarca();
  // Watch form values for validation
  const watchedValues = useWatch({
    control,
    name: [
      'ejes',
      'peso_vacio',
      'capacidad',
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
    const technicalInfoFields = [
      'ejes',
      'peso_vacio',
      'capacidad',
      'carroceria',
      'color',
      'combustible',
      'configuracion',
      'linea',
      'marca',
    ];

    // Check for errors
    const hasErrors = technicalInfoFields.some(field => errors[field as keyof Partial<Vehiculo>]);

    // Check if required fields have values
    const hasRequiredValues = technicalInfoFields.every((_, index) => {
      const value = watchedValues[index];
      if (typeof value === 'number') {
        return value !== undefined && value !== null;
      }
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
        label="Número de Ejes *"
        error={errors.ejes}
        placeholder="Ingresa el número de ejes"
        keyboardType="numeric"
        rules={{
          required: 'Este campo es obligatorio',
          min: { value: 1, message: 'Debe tener al menos 1 eje' },
        }}
      />

      {/* Peso Vacío */}
      <FormInputController
        control={control}
        name="peso_vacio"
        label="Peso Vacío (kg) *"
        error={errors.peso_vacio}
        placeholder="Ingresa el peso vacío en kilogramos"
        keyboardType="numeric"
        rules={{
          required: 'Este campo es obligatorio',
          min: { value: 1, message: 'El peso debe ser mayor a 0' },
        }}
      />

      {/* Capacidad */}
      <FormInputController
        control={control}
        name="capacidad"
        label="Capacidad de Carga (kg) *"
        error={errors.capacidad}
        placeholder="Ingresa la capacidad de carga en kilogramos"
        keyboardType="numeric"
        rules={{
          required: 'Este campo es obligatorio',
          min: { value: 1, message: 'La capacidad debe ser mayor a 0' },
        }}
      />

      {/* Switches Section */}
      <View style={styles.switchSection}>
        <Text style={styles.sectionTitle}>Características del Vehículo</Text>

        {/* Propio Switch */}
        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>¿Es vehículo propio?</Text>
          <Switch
            value={watchedValues[3] || false}
            onValueChange={value => {
              // This would be handled by the form controller
              // For now, we'll use a basic implementation
            }}
            trackColor={{ false: '#E5E5E5', true: '#0066CC' }}
            thumbColor={watchedValues[3] ? '#FFFFFF' : '#FFFFFF'}
          />
        </View>

        {/* Remolque Switch */}
        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>¿Tiene remolque?</Text>
          <Switch
            value={watchedValues[4] || false}
            onValueChange={value => {
              // This would be handled by the form controller
              // For now, we'll use a basic implementation
            }}
            trackColor={{ false: '#E5E5E5', true: '#0066CC' }}
            thumbColor={watchedValues[4] ? '#FFFFFF' : '#FFFFFF'}
          />
        </View>
      </View>

      {/* Vehicle Attributes Section */}
      <View style={styles.idsSection}>
        <Text style={styles.sectionTitle}>Atributos del Vehículo</Text>

        <FormSelectorController
          control={control}
          name="carroceria"
          label="Carrocería *"
          error={errors.carroceria}
          placeholder="Selecciona una carrocería"
          options={carroceriaOptions}
          isLoading={isLoadingCarroceria}
          rules={{
            required: 'Este campo es obligatorio',
          }}
        />

        <FormSelectorController
          control={control}
          name="color"
          label="Color *"
          error={errors.color}
          placeholder="Selecciona un color"
          options={colorOptions}
          isLoading={isLoadingColor}
          rules={{
            required: 'Este campo es obligatorio',
          }}
        />

        <FormSelectorController
          control={control}
          name="combustible"
          label="Combustible *"
          error={errors.combustible}
          placeholder="Selecciona un combustible"
          options={combustibleOptions}
          isLoading={isLoadingCombustible}
          rules={{
            required: 'Este campo es obligatorio',
          }}
        />

        <FormSelectorController
          control={control}
          name="configuracion"
          label="Configuración *"
          error={errors.configuracion}
          placeholder="Selecciona una configuración"
          options={configuracionOptions}
          isLoading={isLoadingConfiguracion}
          rules={{
            required: 'Este campo es obligatorio',
          }}
        />

        <FormSelectorController
          control={control}
          name="linea"
          label="Línea *"
          error={errors.linea}
          placeholder="Selecciona una línea"
          options={lineaOptions}
          isLoading={isLoadingLinea}
          rules={{
            required: 'Este campo es obligatorio',
          }}
        />

        <FormSelectorController
          control={control}
          name="marca"
          label="Marca *"
          error={errors.marca}
          placeholder="Selecciona una marca"
          options={marcaOptions}
          isLoading={isLoadingMarca}
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
