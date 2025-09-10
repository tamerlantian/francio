import React from 'react';
import { View, Text, StyleSheet, ScrollView, Switch } from 'react-native';
import { Conductor } from '../../interfaces/conductor.interface';

interface ConfigurationStepProps {
  data: Partial<Conductor>;
  onDataChange: (data: Partial<Conductor>) => void;
  onValidationChange: (isValid: boolean) => void;
}

export const ConfigurationStep: React.FC<ConfigurationStepProps> = ({
  data,
  onDataChange,
  onValidationChange,
}) => {
  // Handle switch changes
  const handleSwitchChange = (fieldName: string, value: boolean) => {
    const updatedData = { ...data, [fieldName]: value };
    onDataChange(updatedData);
    // This step is always valid since these are optional configurations
    onValidationChange(true);
  };

  // Set initial validation state
  React.useEffect(() => {
    onValidationChange(true);
  }, [onValidationChange]);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.description}>
        Configura el estado del conductor en el sistema
      </Text>

      {/* Estado del conductor */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Estado del Conductor</Text>
        <Text style={styles.sectionDescription}>
          Define el estado actual del conductor en el sistema
        </Text>

        {/* Conductor Activo */}
        <View style={styles.switchContainer}>
          <View style={styles.switchTextContainer}>
            <Text style={styles.switchLabel}>Conductor Activo</Text>
            <Text style={styles.switchDescription}>
              El conductor puede operar vehículos de la empresa
            </Text>
          </View>
          <Switch
            value={data.conductor !== undefined ? data.conductor : true}
            onValueChange={(value) => handleSwitchChange('conductor', value)}
            trackColor={{ false: '#E5E7EB', true: '#10B981' }}
            thumbColor={data.conductor !== undefined ? (data.conductor ? '#FFFFFF' : '#9CA3AF') : '#FFFFFF'}
            ios_backgroundColor="#E5E7EB"
          />
        </View>

        {/* Estado Inactivo */}
        <View style={styles.switchContainer}>
          <View style={styles.switchTextContainer}>
            <Text style={styles.switchLabel}>Estado Inactivo</Text>
            <Text style={styles.switchDescription}>
              El conductor no está disponible para servicios
            </Text>
          </View>
          <Switch
            value={data.estado_inactivo || false}
            onValueChange={(value) => handleSwitchChange('estado_inactivo', value)}
            trackColor={{ false: '#E5E7EB', true: '#EF4444' }}
            thumbColor={data.estado_inactivo ? '#FFFFFF' : '#9CA3AF'}
            ios_backgroundColor="#E5E7EB"
          />
        </View>
      </View>

      {/* Resumen de configuración */}
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryTitle}>Resumen de Configuración</Text>
        <View style={styles.summaryContent}>
          <Text style={styles.summaryItem}>
            Conductor: {(data.conductor !== undefined ? data.conductor : true) ? '✓ Activo' : '✗ Inactivo'}
          </Text>
          <Text style={[styles.summaryItem, data.estado_inactivo && styles.inactiveText]}>
            Estado: {data.estado_inactivo ? 'Inactivo' : 'Activo'}
          </Text>
        </View>

        <View style={styles.noteContainer}>
          <Text style={styles.noteTitle}>Nota:</Text>
          <Text style={styles.noteText}>
            • El rol de conductor es requerido para operar vehículos{'\n'}
            • Los cambios se aplicarán al guardar el formulario
          </Text>
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
  summaryContainer: {
    backgroundColor: '#F8F9FA',
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
  },
  summaryTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  summaryContent: {
    gap: 8,
  },
  summaryItem: {
    fontSize: 13,
    color: '#333',
    marginBottom: 4,
  },
  inactiveText: {
    color: '#EF4444',
  },
  noteContainer: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  noteTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  noteText: {
    fontSize: 12,
    color: '#666',
    lineHeight: 16,
  },
});
