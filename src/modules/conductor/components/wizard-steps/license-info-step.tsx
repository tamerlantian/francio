import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Conductor } from '../../interfaces/conductor.interface';
import { Ionicons } from '@expo/vector-icons';

interface LicenseInfoStepProps {
  data: Partial<Conductor>;
  onDataChange: (data: Partial<Conductor>) => void;
  onValidationChange: (isValid: boolean) => void;
}

// Categorías de licencia más comunes
const CATEGORIAS_LICENCIA = [
  'A1', 'A2', 'B1', 'B2', 'B3', 'C1', 'C2', 'C3'
];

export const LicenseInfoStep: React.FC<LicenseInfoStepProps> = ({
  data,
  onDataChange,
  onValidationChange,
}) => {
  // Simple validation function
  const validateForm = (formData: Partial<Conductor>) => {
    const isLicenseValid = formData.numero_licencia && formData.numero_licencia.length >= 5;
    const isCategoryValid = formData.categoria_licencia;
    const isDateValid = formData.fecha_vence_licencia && validateFechaVencimiento(formData.fecha_vence_licencia) === true;
    const isValid = !!(isLicenseValid && isCategoryValid && isDateValid);
    onValidationChange(isValid);
    return isValid;
  };

  // Handle field changes
  const handleFieldChange = (fieldName: string, value: string) => {
    const updatedData = { ...data, [fieldName]: value };
    onDataChange(updatedData);
    validateForm(updatedData);
  };

  // Handle category selection
  const handleCategorySelect = (categoria: string) => {
    handleFieldChange('categoria_licencia', categoria);
  };

  // Función para validar fecha de vencimiento
  const validateFechaVencimiento = (fecha: string) => {
    if (!fecha) return 'La fecha de vencimiento es obligatoria';
    
    const fechaVencimiento = new Date(fecha);
    const hoy = new Date();
    
    if (fechaVencimiento <= hoy) {
      return 'La licencia debe estar vigente (fecha futura)';
    }
    
    return true;
  };

  // Función para formatear fecha
  const formatearFecha = (texto: string) => {
    // Remover caracteres no numéricos
    const numeros = texto.replace(/\D/g, '');
    
    // Formatear como YYYY-MM-DD
    if (numeros.length >= 8) {
      const year = numeros.substring(0, 4);
      const month = numeros.substring(4, 6);
      const day = numeros.substring(6, 8);
      return `${year}-${month}-${day}`;
    }
    
    return numeros;
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.description}>Información sobre la licencia de conducción</Text>

      {/* Número de Licencia */}
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Número de Licencia *</Text>
        <TextInput
          style={styles.input}
          value={data.numero_licencia || ''}
          onChangeText={value => handleFieldChange('numero_licencia', value)}
          placeholder="Ej: 12345678"
          keyboardType="numeric"
          maxLength={15}
        />
      </View>

      {/* Categoría de Licencia */}
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Categoría de Licencia *</Text>
        <TextInput
          style={styles.input}
          value={data.categoria_licencia || ''}
          onChangeText={value => handleFieldChange('categoria_licencia', value)}
          placeholder="Selecciona o escribe la categoría"
          autoCapitalize="characters"
        />
        
        {/* Botones de categorías comunes */}
        <View style={styles.categoriesContainer}>
          <Text style={styles.categoriesLabel}>Categorías comunes:</Text>
          <View style={styles.categoriesGrid}>
            {CATEGORIAS_LICENCIA.map(categoria => (
              <TouchableOpacity
                key={categoria}
                style={[
                  styles.categoryButton,
                  data.categoria_licencia === categoria && styles.categoryButtonSelected,
                ]}
                onPress={() => handleCategorySelect(categoria)}
              >
                <Text
                  style={[
                    styles.categoryButtonText,
                    data.categoria_licencia === categoria && styles.categoryButtonTextSelected,
                  ]}
                >
                  {categoria}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>

      {/* Fecha de Vencimiento */}
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Fecha de Vencimiento *</Text>
        <TextInput
          style={styles.input}
          value={data.fecha_vence_licencia || ''}
          onChangeText={texto => {
            const fechaFormateada = formatearFecha(texto);
            handleFieldChange('fecha_vence_licencia', fechaFormateada);
          }}
          placeholder="YYYY-MM-DD (Ej: 2025-12-31)"
          keyboardType="numeric"
          maxLength={10}
        />
        <View style={styles.dateHelper}>
          <Ionicons name="calendar-outline" size={16} color="#666" />
          <Text style={styles.dateHelperText}>Formato: Año-Mes-Día (YYYY-MM-DD)</Text>
        </View>
      </View>

      {/* Información adicional */}
      <View style={styles.infoBox}>
        <Ionicons name="information-circle-outline" size={20} color="#0066CC" />
        <View style={styles.infoContent}>
          <Text style={styles.infoTitle}>Información importante</Text>
          <Text style={styles.infoText}>
            • Verifica que la licencia esté vigente{'\n'}
            • La categoría debe corresponder al tipo de vehículo{'\n'}
            • Mantén una copia física disponible
          </Text>
        </View>
      </View>

      {/* Categorías de licencia explicación */}
      <View style={styles.helpBox}>
        <Text style={styles.helpTitle}>Categorías de Licencia:</Text>
        <Text style={styles.helpText}>
          <Text style={styles.helpBold}>A1, A2:</Text> Motocicletas{'\n'}
          <Text style={styles.helpBold}>B1, B2, B3:</Text> Automóviles y camionetas{'\n'}
          <Text style={styles.helpBold}>C1, C2, C3:</Text> Camiones y vehículos de carga
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
  categoriesContainer: {
    marginTop: 12,
  },
  categoriesLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    backgroundColor: '#FFFFFF',
  },
  categoryButtonSelected: {
    backgroundColor: '#0066CC',
    borderColor: '#0066CC',
  },
  categoryButtonText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  categoryButtonTextSelected: {
    color: '#FFFFFF',
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
