import { useSeleccionarIdentificacion } from '@/src/modules/vertical/hooks/use-vertical.hook';
import { FormInputController } from '@/src/shared/components/ui/form/FormInputController';
import { FormSelectorController } from '@/src/shared/components/ui/form/FormSelectorController';
import React, { useEffect } from 'react';
import { Control, FieldErrors, useWatch } from 'react-hook-form';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { Conductor } from '../../interfaces/conductor.interface';

interface PersonalInfoStepProps {
  control: Control<Partial<Conductor>>;
  errors: FieldErrors<Partial<Conductor>>;
  onValidationChange: (_isValid: boolean) => void;
}

export const PersonalInfoStep: React.FC<PersonalInfoStepProps> = ({
  control,
  errors,
  onValidationChange,
}) => {
  // Identification selector data
  const {
    identificacionOptions,
    isLoading: isLoadingIdentificacion,
    error: errorIdentificacion,
    refetch: refetchIdentificacion,
  } = useSeleccionarIdentificacion();

  // Watch form values for validation
  const watchedValues = useWatch({
    control,
    name: ['identificacion', 'nombre1', 'apellido1', 'numero_identificacion'],
  });

  // Notify parent of validation changes based on form errors and required values
  useEffect(() => {
    const personalInfoFields = ['identificacion', 'nombre1', 'apellido1', 'numero_identificacion'];

    // Check for errors
    const hasErrors = personalInfoFields.some(field => errors[field as keyof Partial<Conductor>]);

    // Check if required fields have values
    const hasRequiredValues = personalInfoFields.every((field, index) => {
      const value = watchedValues[index];
      return value && value.toString().trim() !== '';
    });

    const isValid = !hasErrors && hasRequiredValues;
    onValidationChange(isValid);
  }, [
    errors,
    errors.apellido1,
    errors.identificacion,
    errors.nombre1,
    errors.numero_identificacion,
    watchedValues,
    onValidationChange,
  ]);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.description}>Ingresa la información personal básica del conductor</Text>

      {/* Tipo de Identificación */}
      <FormSelectorController
        control={control}
        name="identificacion"
        label="Tipo de identificación *"
        placeholder="Selecciona el tipo de identificación"
        options={identificacionOptions}
        error={errors.identificacion}
        rules={{ required: 'Este campo es obligatorio' }}
        isLoading={isLoadingIdentificacion}
        onRetry={refetchIdentificacion}
        emptyOptionsMessage="No hay tipos de identificación disponibles"
        apiError={errorIdentificacion}
      />

      {/* Número de Identificación */}
      <FormInputController
        control={control}
        name="numero_identificacion"
        label="Número de identificación *"
        error={errors.numero_identificacion}
        placeholder="Ingresa el número de identificación"
        keyboardType="numeric"
        maxLength={15}
        rules={{ required: 'Este campo es obligatorio' }}
      />

      {/* Primer Nombre */}
      <FormInputController
        control={control}
        name="nombre1"
        label="Primer nombre *"
        error={errors.nombre1}
        placeholder="Ingresa el primer nombre"
        autoCapitalize="words"
        rules={{ required: 'Este campo es obligatorio' }}
      />

      {/* Segundo Nombre */}
      <FormInputController
        control={control}
        name="nombre2"
        label="Segundo nombre"
        error={errors.nombre2}
        placeholder="Ingresa el segundo nombre (opcional)"
        autoCapitalize="words"
      />

      {/* Primer Apellido */}
      <FormInputController
        control={control}
        name="apellido1"
        label="Primer apellido *"
        error={errors.apellido1}
        placeholder="Ingresa el primer apellido"
        autoCapitalize="words"
        rules={{ required: 'Este campo es obligatorio' }}
      />

      {/* Segundo Apellido */}
      <FormInputController
        control={control}
        name="apellido2"
        label="Segundo apellido"
        error={errors.apellido2}
        placeholder="Ingresa el segundo apellido (opcional)"
        autoCapitalize="words"
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
