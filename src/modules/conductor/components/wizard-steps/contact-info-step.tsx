import { FormInputController } from '@/src/shared/components/ui/form/FormInputController';
import { FormSearchableSelectorController } from '@/src/shared/components/ui/form/FormSearchableSelectorController';
import { useSearchableSelector } from '@/src/shared/hooks/use-searchable-selector.hook';
import { COMMON_FIELD_MAPPINGS } from '@/src/shared/interfaces/searchable-selector.interface';
import React, { useEffect } from 'react';
import { Control, FieldErrors, useWatch } from 'react-hook-form';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { Conductor } from '../../interfaces/conductor.interface';

interface ContactInfoStepProps {
  control: Control<Partial<Conductor>>;
  errors: FieldErrors<Partial<Conductor>>;
  initialData?: Partial<Conductor>;
  onValidationChange: (_isValid: boolean) => void;
}

export const ContactInfoStep: React.FC<ContactInfoStepProps> = ({
  control,
  errors,
  initialData,
  onValidationChange,
}) => {
  // Ciudad searchable selector
  const ciudadSelector = useSearchableSelector({
    endpoint: 'vertical/ciudad/seleccionar/',
    ...COMMON_FIELD_MAPPINGS.LOCATION,
    searchParam: 'nombre__icontains',
    initialParams: { nombre__icontains: initialData?.ciudad__nombre },
    minSearchLength: 1,
    searchDebounceMs: 300,
    transformData(data) {
      return data.map(item => ({
        label: `${item.nombre} - ${item.estado__nombre}`,
        value: item.id,
      }));
    },
  });

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
        label="Correo electrónico *"
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
      <FormSearchableSelectorController
        control={control}
        name="ciudad"
        label="Ciudad"
        placeholder="Seleccione una ciudad"
        searchPlaceholder="Buscar ciudad..."
        options={ciudadSelector.options}
        isLoading={ciudadSelector.isLoading}
        isSearching={ciudadSelector.isSearching}
        onSearch={ciudadSelector.search}
        onRetry={ciudadSelector.retry}
        restoreInitialOptions={ciudadSelector.restoreInitialOptions}
        emptyOptionsMessage="No hay ciudades disponibles"
        noResultsMessage="No se encontraron ciudades"
        apiError={ciudadSelector.error}
        rules={{
          required: 'La ciudad es requerida',
        }}
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
