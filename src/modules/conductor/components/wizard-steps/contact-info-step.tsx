import { useSeleccionarCiudad } from '@/src/modules/vertical/hooks/use-vertical.hook';
import { FormInputController } from '@/src/shared/components/ui/form/FormInputController';
import { FormSelectorController } from '@/src/shared/components/ui/form/FormSelectorController';
import React, { useEffect } from 'react';
import { Control, FieldErrors, useWatch } from 'react-hook-form';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { Conductor } from '../../interfaces/conductor.interface';

interface ContactInfoStepProps {
  control: Control<Partial<Conductor>>;
  errors: FieldErrors<Partial<Conductor>>;
  onValidationChange: (_isValid: boolean) => void;
}

export const ContactInfoStep: React.FC<ContactInfoStepProps> = ({
  control,
  errors,
  onValidationChange,
}) => {
  // Ciudad selector data
  const {
    ciudadOptions,
    isLoading: isLoadingCiudad,
    error: errorCiudad,
    refetch: refetchCiudad,
  } = useSeleccionarCiudad();

  // Watch form values for validation
  const watchedValues = useWatch({
    control,
    name: ['correo', 'direccion', 'ciudad'],
  });

  // Notify parent of validation changes based on form errors and required values
  useEffect(() => {
    const contactInfoFields = ['correo', 'direccion', 'ciudad'];

    // Check for errors
    const hasErrors = contactInfoFields.some(field => errors[field as keyof Partial<Conductor>]);

    // Check if required fields have values
    const hasRequiredValues = contactInfoFields.every((field, index) => {
      const value = watchedValues[index];
      return value && value.toString().trim() !== '';
    });

    const isValid = !hasErrors && hasRequiredValues;
    onValidationChange(isValid);
  }, [errors, errors.ciudad, errors.correo, errors.direccion, watchedValues, onValidationChange]);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.description}>Información de contacto y ubicación del conductor</Text>

      {/* Correo Electrónico */}
      <FormInputController
        control={control}
        name="correo"
        label="Correo Electrónico *"
        error={errors.correo}
        placeholder="ejemplo@correo.com"
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="email"
        rules={{
          required: 'Este campo es obligatorio',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Correo electrónico inválido',
          },
        }}
      />

      {/* Teléfono */}
      <FormInputController
        control={control}
        name="telefono"
        label="Teléfono"
        error={errors.telefono}
        placeholder="Ej: 604 123 4567"
        keyboardType="phone-pad"
      />

      {/* Dirección */}
      <FormInputController
        control={control}
        name="direccion"
        label="Dirección *"
        error={errors.direccion}
        placeholder="Ej: Calle 123 # 45-67"
        multiline
        numberOfLines={2}
        textAlignVertical="top"
        rules={{
          required: 'Este campo es obligatorio',
          minLength: {
            value: 10,
            message: 'La dirección debe tener al menos 10 caracteres',
          },
        }}
      />

      {/* Barrio */}
      <FormInputController
        control={control}
        name="barrio"
        label="Barrio"
        error={errors.barrio}
        placeholder="Ej: El Poblado"
        autoCapitalize="words"
      />

      {/* Ciudad */}
      <FormSelectorController
        control={control}
        name="ciudad"
        label="Ciudad *"
        placeholder="Selecciona la ciudad"
        options={ciudadOptions}
        error={errors.ciudad}
        rules={{ required: 'Este campo es obligatorio' }}
        isLoading={isLoadingCiudad}
        onRetry={refetchCiudad}
        emptyOptionsMessage="No hay ciudades disponibles"
        apiError={errorCiudad}
      />

      {/* <View style={styles.infoBox}>
        <Text style={styles.infoText}>
          💡 Asegúrate de que la información de contacto esté actualizada para poder comunicarse con
          el conductor cuando sea necesario.
        </Text>
      </View> */}
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
  infoBox: {
    backgroundColor: '#F0F8FF',
    padding: 16,
    borderRadius: 8,
    marginTop: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#0066CC',
  },
  infoText: {
    fontSize: 13,
    color: '#0066CC',
    lineHeight: 18,
  },
});
