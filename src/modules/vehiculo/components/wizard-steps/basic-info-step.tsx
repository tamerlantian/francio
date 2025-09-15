import { FormInputController } from '@/src/shared/components/ui/form/FormInputController';
import React, { useEffect } from 'react';
import { Control, FieldErrors, useWatch } from 'react-hook-form';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { Vehiculo } from '../../interfaces/vehiculo.interface';

interface BasicInfoStepProps {
  control: Control<Partial<Vehiculo>>;
  errors: FieldErrors<Partial<Vehiculo>>;
  onValidationChange: (_isValid: boolean) => void;
}

export const BasicInfoStep: React.FC<BasicInfoStepProps> = ({
  control,
  errors,
  onValidationChange,
}) => {
  // Watch form values for validation
  const watchedValues = useWatch({
    control,
    name: ['placa', 'modelo', 'motor', 'chasis'],
  });

  // Notify parent of validation changes based on form errors and required values
  useEffect(() => {
    const basicInfoFields = ['placa', 'modelo', 'motor', 'chasis'];

    // Check for errors
    const hasErrors = basicInfoFields.some(field => errors[field as keyof Partial<Vehiculo>]);

    // Check if required fields have values
    const hasRequiredValues = basicInfoFields.every((field, index) => {
      const value = watchedValues[index];
      return value && value.toString().trim() !== '';
    });

    const isValid = !hasErrors && hasRequiredValues;
    onValidationChange(isValid);
  }, [
    errors,
    errors.placa,
    errors.modelo,
    errors.motor,
    errors.chasis,
    watchedValues,
    onValidationChange,
  ]);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.description}>Ingresa la información básica del vehículo</Text>

      {/* Placa */}
      <FormInputController
        control={control}
        name="placa"
        label="Placa *"
        error={errors.placa}
        placeholder="Ingresa la placa del vehículo"
        autoCapitalize="characters"
        maxLength={10}
        rules={{ required: 'Este campo es obligatorio' }}
      />

      {/* Modelo */}
      <FormInputController
        control={control}
        name="modelo"
        label="Modelo *"
        error={errors.modelo}
        placeholder="Ingresa el modelo del vehículo"
        autoCapitalize="words"
        rules={{ required: 'Este campo es obligatorio' }}
      />

      {/* Modelo Repotenciado */}
      <FormInputController
        control={control}
        name="modelo_repotenciado"
        label="Modelo Repotenciado"
        error={errors.modelo_repotenciado}
        placeholder="Ingresa el modelo repotenciado (opcional)"
        autoCapitalize="words"
      />

      {/* Motor */}
      <FormInputController
        control={control}
        name="motor"
        label="Motor *"
        error={errors.motor}
        placeholder="Ingresa el número del motor"
        rules={{ required: 'Este campo es obligatorio' }}
      />

      {/* Chasis */}
      <FormInputController
        control={control}
        name="chasis"
        label="Chasis *"
        error={errors.chasis}
        placeholder="Ingresa el número del chasis"
        rules={{ required: 'Este campo es obligatorio' }}
      />
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
});
