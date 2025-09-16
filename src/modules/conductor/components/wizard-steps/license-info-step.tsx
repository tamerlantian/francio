import { useSeleccionarCategoriaLicencia } from '@/src/modules/vertical/hooks/use-vertical.hook';
import { FormDatePickerController } from '@/src/shared/components/ui/form/FormDatePickerController';
import { FormInputController } from '@/src/shared/components/ui/form/FormInputController';
import { FormSelectorController } from '@/src/shared/components/ui/form/FormSelectorController';
import React, { useEffect } from 'react';
import { Control, FieldErrors, useWatch } from 'react-hook-form';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { Conductor } from '../../interfaces/conductor.interface';

interface LicenseInfoStepProps {
  control: Control<Partial<Conductor>>;
  errors: FieldErrors<Partial<Conductor>>;
  onValidationChange: (_isValid: boolean) => void;
}

export const LicenseInfoStep: React.FC<LicenseInfoStepProps> = ({
  control,
  errors,
  onValidationChange,
}) => {
  const {
    categoriaLicenciaOptions,
    isLoading: isLoadingCategoriaLicencia,
    error: errorCategoriaLicencia,
    refetch: refetchCategoriaLicencia,
  } = useSeleccionarCategoriaLicencia();

  const validateFechaVencimiento = (fecha: string) => {
    if (!fecha) return 'La fecha de vencimiento es obligatoria';
    try {
      const fechaVencimiento = new Date(fecha);
      const hoy = new Date();
      if (isNaN(fechaVencimiento.getTime())) {
        return 'Formato de fecha inválido';
      }
      if (fechaVencimiento <= hoy) {
        return 'La licencia debe estar vigente (fecha futura)';
      }
      return true;
    } catch {
      return 'Formato de fecha inválido';
    }
  };

  // Watch form values for validation
  const watchedValues = useWatch({
    control,
    name: ['numero_licencia', 'categoria_licencia', 'fecha_vence_licencia'],
  });

  // Notify parent of validation changes based on form errors and required values
  useEffect(() => {
    const licenseInfoFields = ['numero_licencia', 'categoria_licencia', 'fecha_vence_licencia'];

    // Check for errors
    const hasErrors = licenseInfoFields.some(field => errors[field as keyof Partial<Conductor>]);

    // Check if required fields have values
    const hasRequiredValues = licenseInfoFields.every((field, index) => {
      const value = watchedValues[index];
      return value && value.toString().trim() !== '';
    });

    const isValid = !hasErrors && hasRequiredValues;
    onValidationChange(isValid);
  }, [
    errors,
    errors.numero_licencia,
    errors.categoria_licencia,
    errors.fecha_vence_licencia,
    watchedValues,
    onValidationChange,
  ]);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.description}>Información sobre la licencia de conducción</Text>

      <FormInputController
        control={control}
        name="numero_licencia"
        label="Número de licencia *"
        error={errors.numero_licencia}
        placeholder="Ej: 12345678"
        keyboardType="numeric"
        maxLength={15}
        rules={{
          required: 'Este campo es obligatorio',
          minLength: {
            value: 5,
            message: 'El número de licencia debe tener al menos 5 caracteres',
          },
        }}
      />

      <FormSelectorController
        control={control}
        name="categoria_licencia"
        label="Categoría de licencia *"
        placeholder="Selecciona la categoría de licencia"
        options={categoriaLicenciaOptions}
        error={errors.categoria_licencia}
        rules={{ required: 'Este campo es obligatorio' }}
        isLoading={isLoadingCategoriaLicencia}
        onRetry={refetchCategoriaLicencia}
        emptyOptionsMessage="No hay categorías de licencia disponibles"
        apiError={errorCategoriaLicencia}
      />

      <FormDatePickerController
        control={control}
        name="fecha_vence_licencia"
        label="Fecha de vencimiento *"
        placeholder="Seleccionar fecha de vencimiento"
        error={errors.fecha_vence_licencia}
        rules={{
          required: 'Este campo es obligatorio',
          validate: validateFechaVencimiento,
        }}
        minimumDate={new Date()}
        format="YYYY-MM-DD"
      />

      {/* <View style={styles.infoBox}>
        <Ionicons name="information-circle-outline" size={20} color="#0066CC" />
        <View style={styles.infoContent}>
          <Text style={styles.infoTitle}>Información importante</Text>
          <Text style={styles.infoText}>
            • Verifica que la licencia esté vigente{'\n'}• La categoría debe corresponder al tipo de
            vehículo{'\n'}• Mantén una copia física disponible
          </Text>
        </View>
      </View>

      <View style={styles.helpBox}>
        <Text style={styles.helpTitle}>Categorías de Licencia:</Text>
        <Text style={styles.helpText}>
          <Text style={styles.helpBold}>A1, A2:</Text> Motocicletas{'\n'}
          <Text style={styles.helpBold}>B1, B2, B3:</Text> Automóviles y camionetas{'\n'}
          <Text style={styles.helpBold}>C1, C2, C3:</Text> Camiones y vehículos de carga
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
  dateHelper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    marginLeft: 4,
  },
  dateHelperText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: '#F0F8FF',
    padding: 16,
    borderRadius: 8,
    marginTop: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#0066CC',
  },
  infoContent: {
    flex: 1,
    marginLeft: 12,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0066CC',
    marginBottom: 4,
  },
  infoText: {
    fontSize: 13,
    color: '#0066CC',
    lineHeight: 18,
  },
  helpBox: {
    backgroundColor: '#F8F9FA',
    padding: 16,
    borderRadius: 8,
    marginTop: 16,
  },
  helpTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  helpText: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
  },
  helpBold: {
    fontWeight: '600',
    color: '#333',
  },
});
