import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch } from 'react-native';
import { Control, FieldErrors, useController } from 'react-hook-form';
import { Conductor } from '../../interfaces/conductor.interface';

interface ConfigurationStepProps {
  control: Control<Partial<Conductor>>;
  errors: FieldErrors<Partial<Conductor>>;
  onValidationChange: (_isValid: boolean) => void;
}

export const ConfigurationStep: React.FC<ConfigurationStepProps> = ({
  control,
  onValidationChange,
}) => {
  // Este paso siempre es válido ya que son configuraciones opcionales
  useEffect(() => {
    onValidationChange(true);
  }, [onValidationChange]);

  // Usar useController para manejar el campo verificado
  const { field } = useController({
    control,
    name: 'verificado',
    defaultValue: false,
  });

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.description}>Configura el estado de verificación del conductor</Text>

      {/* Estado de verificación */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Verificación del Conductor</Text>
        <Text style={styles.sectionDescription}>
          Indica si el conductor ha sido verificado en el sistema
        </Text>

        {/* Conductor Verificado */}
        <View style={styles.switchContainer}>
          <View style={styles.switchTextContainer}>
            <Text style={styles.switchLabel}>Conductor Verificado</Text>
            <Text style={styles.switchDescription}>
              El conductor ha sido verificado y sus datos han sido validados
            </Text>
          </View>
          <Switch
            value={field.value}
            onValueChange={field.onChange}
            trackColor={{ false: '#E5E7EB', true: '#10B981' }}
            thumbColor={field.value ? '#FFFFFF' : '#9CA3AF'}
            ios_backgroundColor="#E5E7EB"
          />
        </View>
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
  sectionContainer: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  sectionDescription: {
    fontSize: 13,
    color: '#666',
    marginBottom: 16,
    lineHeight: 18,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    marginBottom: 12,
  },
  switchTextContainer: {
    flex: 1,
  },
  switchLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  switchDescription: {
    fontSize: 12,
    color: '#666',
    lineHeight: 16,
  },
});
