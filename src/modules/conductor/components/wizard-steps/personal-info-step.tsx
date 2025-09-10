import React, { useCallback, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { FormInputController } from '../../../../shared/components/ui/form/FormInputController';
import { Conductor } from '../../interfaces/conductor.interface';

interface PersonalInfoStepProps {
  data: Partial<Conductor>;
  onDataChange: (_data: Partial<Conductor>) => void;
  onValidationChange: (_isValid: boolean) => void;
}

export const PersonalInfoStep: React.FC<PersonalInfoStepProps> = ({
  data,
  onDataChange,
  onValidationChange,
}) => {
  // Use a ref to prevent initial render updates
  const isInitialRender = useRef(true);

  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<Partial<Conductor>>({
    mode: 'onChange',
    defaultValues: {
      numero_identificacion: data.numero_identificacion || '',
      nombre1: data.nombre1 || '',
      nombre2: data.nombre2 || '',
      apellido1: data.apellido1 || '',
      apellido2: data.apellido2 || '',
      nombre_corto: data.nombre_corto || '',
    },
  });

  // Memoize the submit handler to prevent it from changing on each render
  const onSubmit = useCallback(
    (formData: Partial<Conductor>) => {
      onDataChange(formData);
    },
    [onDataChange],
  );

  // Only update parent when form values actually change, not on every render
  useEffect(() => {
    // Skip the initial render to prevent update loops
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    // Use handleSubmit to properly process the form data
    const timeoutId = setTimeout(() => {
      handleSubmit(onSubmit)();
    }, 100); // Small delay to prevent rapid updates

    return () => clearTimeout(timeoutId);
  }, [handleSubmit, onSubmit, isValid]); // Only run when validation changes

  // Update validation status
  useEffect(() => {
    onValidationChange(isValid);
  }, [isValid, onValidationChange]);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.description}>Ingresa la información personal básica del conductor</Text>

      {/* Número de Identificación */}
      <FormInputController
        control={control}
        name="numero_identificacion"
        label="Número de Identificación *"
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
        label="Primer Nombre *"
        error={errors.nombre1}
        placeholder="Ingresa el primer nombre"
        autoCapitalize="words"
        rules={{ required: 'Este campo es obligatorio' }}
      />

      {/* Segundo Nombre */}
      <FormInputController
        control={control}
        name="nombre2"
        label="Segundo Nombre"
        error={errors.nombre2}
        placeholder="Ingresa el segundo nombre (opcional)"
        autoCapitalize="words"
      />

      {/* Primer Apellido */}
      <FormInputController
        control={control}
        name="apellido1"
        label="Primer Apellido *"
        error={errors.apellido1}
        placeholder="Ingresa el primer apellido"
        autoCapitalize="words"
        rules={{ required: 'Este campo es obligatorio' }}
      />

      {/* Segundo Apellido */}
      <FormInputController
        control={control}
        name="apellido2"
        label="Segundo Apellido"
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
  fieldContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
    color: '#333',
  },
  inputError: {
    borderColor: '#FF3B30',
    backgroundColor: '#FFF5F5',
  },
  inputReadonly: {
    backgroundColor: '#F8F9FA',
    color: '#666',
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  helpText: {
    color: '#999',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
    fontStyle: 'italic',
  },
});
