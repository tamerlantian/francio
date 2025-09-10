import React from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native';
import { Conductor } from '../../interfaces/conductor.interface';

interface ContactInfoStepProps {
  data: Partial<Conductor>;
  onDataChange: (_data: Partial<Conductor>) => void;
  onValidationChange: (_isValid: boolean) => void;
}

export const ContactInfoStep: React.FC<ContactInfoStepProps> = ({
  data,
  onDataChange,
  onValidationChange,
}) => {
  // Simple validation function
  const validateForm = (formData: Partial<Conductor>) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const isEmailValid = formData.correo && emailRegex.test(formData.correo);
    const isAddressValid = formData.direccion && formData.direccion.length >= 10;
    const isValid = !!(isEmailValid && isAddressValid);
    onValidationChange(isValid);
    return isValid;
  };

  // Handle field changes
  const handleFieldChange = (fieldName: string, value: string) => {
    const updatedData = { ...data, [fieldName]: value };
    onDataChange(updatedData);
    validateForm(updatedData);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.description}>Información de contacto y ubicación del conductor</Text>

      {/* Correo Electrónico */}
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Correo Electrónico *</Text>
        <TextInput
          style={styles.input}
          value={data.correo || ''}
          onChangeText={value => handleFieldChange('correo', value)}
          placeholder="ejemplo@correo.com"
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
        />
      </View>

      {/* Teléfono */}
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Teléfono</Text>
        <TextInput
          style={styles.input}
          value={data.telefono || ''}
          onChangeText={value => handleFieldChange('telefono', value)}
          placeholder="Ej: 604 123 4567"
          keyboardType="phone-pad"
        />
      </View>

      {/* Celular */}
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Celular</Text>
        <TextInput
          style={styles.input}
          value={data.celular || ''}
          onChangeText={value => handleFieldChange('celular', value)}
          placeholder="Ej: 300 123 4567"
          keyboardType="phone-pad"
        />
      </View>

      {/* Dirección */}
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Dirección *</Text>
        <TextInput
          style={styles.input}
          value={data.direccion || ''}
          onChangeText={value => handleFieldChange('direccion', value)}
          placeholder="Ej: Calle 123 # 45-67"
          multiline
          numberOfLines={2}
          textAlignVertical="top"
        />
      </View>

      {/* Barrio */}
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Barrio</Text>
        <TextInput
          style={styles.input}
          value={data.barrio || ''}
          onChangeText={value => handleFieldChange('barrio', value)}
          placeholder="Ej: El Poblado"
          autoCapitalize="words"
        />
      </View>

      {/* Ciudad */}
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Ciudad</Text>
        <TextInput
          style={styles.input}
          value={data.ciudad__nombre || ''}
          onChangeText={value => handleFieldChange('ciudad__nombre', value)}
          placeholder="Ej: Medellín"
          autoCapitalize="words"
        />
      </View>

      {/* Departamento */}
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Departamento</Text>
        <TextInput
          style={styles.input}
          value={data.ciudad__estado__nombre || ''}
          onChangeText={value => handleFieldChange('ciudad__estado__nombre', value)}
          placeholder="Ej: Antioquia"
          autoCapitalize="words"
        />
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.infoText}>
          💡 Asegúrate de que la información de contacto esté actualizada para poder comunicarse con
          el conductor cuando sea necesario.
        </Text>
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
  errorText: {
    color: '#FF3B30',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
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
