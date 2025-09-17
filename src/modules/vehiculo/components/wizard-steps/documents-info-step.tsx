import { FormDatePickerController } from '@/src/shared/components/ui/form/FormDatePickerController';
import { FormInputController } from '@/src/shared/components/ui/form/FormInputController';
import React, { useEffect } from 'react';
import { Control, FieldErrors, useWatch } from 'react-hook-form';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { VehiculoResponse } from '../../interfaces/vehiculo.interface';

interface DocumentsInfoStepProps {
  control: Control<Partial<VehiculoResponse>>;
  errors: FieldErrors<Partial<VehiculoResponse>>;
  onValidationChange: (_isValid: boolean) => void;
}

export const DocumentsInfoStep: React.FC<DocumentsInfoStepProps> = ({
  control,
  errors,
  onValidationChange,
}) => {
  // Watch form values for validation
  const watchedValues = useWatch({
    control,
    name: ['poliza', 'vence_poliza', 'tecnicomecanica', 'vence_tecnicomecanica'],
  });

  // Notify parent of validation changes based on form errors and required values
  useEffect(() => {
    const documentsFields = ['poliza', 'vence_poliza', 'tecnicomecanica', 'vence_tecnicomecanica'];

    // Check for errors
    const hasErrors = documentsFields.some(
      field => errors[field as keyof Partial<VehiculoResponse>],
    );

    // Check if required fields have values
    const hasRequiredValues = documentsFields.every((field, index) => {
      const value = watchedValues[index];
      return value && value.toString().trim() !== '';
    });

    const isValid = !hasErrors && hasRequiredValues;
    onValidationChange(isValid);
  }, [
    errors,
    errors.poliza,
    errors.vence_poliza,
    errors.tecnicomecanica,
    errors.vence_tecnicomecanica,
    watchedValues,
    onValidationChange,
  ]);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.description}>Ingresa la información de documentos del vehículo</Text>

      {/* Póliza Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Póliza de seguro</Text>

        <FormInputController
          control={control}
          name="poliza"
          label="Número de póliza *"
          error={errors.poliza}
          placeholder="Ingresa el número de la póliza"
          rules={{ required: 'Este campo es obligatorio' }}
        />

        <FormDatePickerController
          control={control}
          name="vence_poliza"
          label="Fecha de vencimiento póliza *"
          error={errors.vence_poliza}
          placeholder="Selecciona la fecha de vencimiento"
          rules={{ required: 'Este campo es obligatorio' }}
          minimumDate={new Date()}
        />
      </View>

      {/* Tecnomecánica Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Revisión tecnomecánica</Text>

        <FormInputController
          control={control}
          name="tecnicomecanica"
          label="Número de tecnomecánica *"
          error={errors.tecnicomecanica}
          placeholder="Ingresa el número de la tecnomecánica"
          rules={{ required: 'Este campo es obligatorio' }}
        />

        <FormDatePickerController
          control={control}
          name="vence_tecnicomecanica"
          label="Fecha de vencimiento tecnomecánica *"
          error={errors.vence_tecnicomecanica}
          placeholder="Selecciona la fecha de vencimiento"
          rules={{ required: 'Este campo es obligatorio' }}
          minimumDate={new Date()}
        />
      </View>

      {/* Verificación Section */}
      {/* <View style={styles.section}>
        <Text style={styles.sectionTitle}>Estado de Verificación</Text>

        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>¿Vehículo verificado?</Text>
          <Switch
            value={watchedValues[4] || false}
            onValueChange={value => {
              // This would be handled by the form controller
              // For now, we'll use a basic implementation
            }}
            trackColor={{ false: '#E5E5E5', true: '#4CAF50' }}
            thumbColor={watchedValues[4] ? '#FFFFFF' : '#FFFFFF'}
          />
        </View>

        <Text style={styles.helpText}>
          Marca esta opción si el vehículo ha sido verificado y aprobado por las autoridades
          competentes.
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
  section: {
    marginBottom: 24,
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
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    marginBottom: 8,
  },
  switchLabel: {
    fontSize: 14,
    color: '#333',
    flex: 1,
    fontWeight: '500',
  },
  helpText: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
    lineHeight: 16,
  },
});
