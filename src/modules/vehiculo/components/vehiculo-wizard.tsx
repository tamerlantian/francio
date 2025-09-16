import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useForm } from 'react-hook-form';
import { Vehiculo } from '../interfaces/vehiculo.interface';
import { BasicInfoStep } from './wizard-steps/basic-info-step';
import { TechnicalInfoStep } from './wizard-steps/technical-info-step';
import { DocumentsInfoStep } from './wizard-steps/documents-info-step';

interface VehiculoWizardProps {
  initialData?: Partial<Vehiculo>;
  onSubmit: (_data: Partial<Vehiculo>) => void;
  onCancel: () => void;
  isLoading?: boolean;
  mode: 'create' | 'edit';
  onFormChange?: (_hasChanges: boolean) => void;
}

const STEPS = [
  { id: 1, title: 'Información básica', icon: 'car-outline' },
  { id: 2, title: 'Información técnica', icon: 'settings-outline' },
  { id: 3, title: 'Documentos', icon: 'document-text-outline' },
];

export const VehiculoWizard: React.FC<VehiculoWizardProps> = ({
  initialData = {},
  onSubmit,
  onCancel,
  isLoading = false,
  mode,
  onFormChange,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [stepValidation, setStepValidation] = useState<Record<number, boolean>>({});

  // Centralized form management
  const {
    control,
    formState: { errors, isDirty },
    handleSubmit,
    reset,
  } = useForm<Partial<Vehiculo>>({
    mode: 'onChange',
    defaultValues: initialData,
  });

  // Notify parent component about form changes
  useEffect(() => {
    if (onFormChange) {
      onFormChange(isDirty);
    }
  }, [isDirty, onFormChange]);

  // Initialize form data only once
  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      reset(initialData);
    }
  }, [initialData, reset]);

  // Función para validar un paso
  const validateStep = useCallback((step: number, isValid: boolean) => {
    setStepValidation(prev => ({ ...prev, [step]: isValid }));
  }, []);

  // Memoized validation callbacks for each step
  const validateStep1 = useCallback((isValid: boolean) => validateStep(1, isValid), [validateStep]);
  const validateStep2 = useCallback((isValid: boolean) => validateStep(2, isValid), [validateStep]);
  const validateStep3 = useCallback((isValid: boolean) => validateStep(3, isValid), [validateStep]);

  // Función para ir al siguiente paso
  const handleNext = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  // Función para ir al paso anterior
  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Función para finalizar el wizard
  const handleFinish = () => {
    handleSubmit(data => {
      // Set default values for required fields
      const processedData = {
        ...data,
        propio: data.propio || false,
        remolque: data.remolque || false,
      };

      console.log('Processed Data:', processedData);

      onSubmit(processedData);
    })();
  };

  // Renderizar el indicador de progreso
  const renderProgressIndicator = () => {
    return (
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View
            style={[styles.progressFill, { width: `${(currentStep / STEPS.length) * 100}%` }]}
          />
        </View>
        <Text style={styles.progressText}>
          Paso {currentStep} de {STEPS.length}
        </Text>
      </View>
    );
  };

  const cancelWizard = () => {
    onCancel();
    setCurrentStep(1);
    reset();
  };

  // Renderizar los pasos
  const renderStepIndicators = () => {
    return (
      <View style={styles.stepIndicators}>
        {STEPS.map((step, index) => (
          <View key={step.id} style={styles.stepIndicatorContainer}>
            <View
              style={[
                styles.stepIndicator,
                currentStep >= step.id && styles.stepIndicatorActive,
                stepValidation[step.id] && styles.stepIndicatorCompleted,
              ]}
            >
              <Ionicons
                name={stepValidation[step.id] ? 'checkmark' : (step.icon as any)}
                size={16}
                color={
                  stepValidation[step.id] ? '#FFFFFF' : currentStep >= step.id ? '#0066CC' : '#999'
                }
              />
            </View>
            {index < STEPS.length - 1 && (
              <View
                style={[styles.stepConnector, currentStep > step.id && styles.stepConnectorActive]}
              />
            )}
          </View>
        ))}
      </View>
    );
  };

  // Renderizar el contenido del paso actual
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <BasicInfoStep control={control} errors={errors} onValidationChange={validateStep1} />
        );
      case 2:
        return (
          <TechnicalInfoStep control={control} errors={errors} onValidationChange={validateStep2} />
        );
      case 3:
        return (
          <DocumentsInfoStep control={control} errors={errors} onValidationChange={validateStep3} />
        );
      default:
        return null;
    }
  };

  // Renderizar los botones de navegación
  const renderNavigationButtons = () => {
    const isLastStep = currentStep === STEPS.length;
    const canProceed = stepValidation[currentStep] || mode === 'edit';

    return (
      <View style={styles.navigationContainer}>
        <View style={styles.buttonRow}>
          {currentStep > 1 && (
            <TouchableOpacity
              style={[styles.button, styles.secondaryButton]}
              onPress={handlePrevious}
            >
              <Ionicons name="chevron-back" size={20} color="#0066CC" />
              <Text style={styles.secondaryButtonText}>Anterior</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={cancelWizard}>
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.button,
              styles.primaryButton,
              (!canProceed || isLoading) && styles.buttonDisabled,
            ]}
            onPress={isLastStep ? handleFinish : handleNext}
            disabled={!canProceed || isLoading}
          >
            <Text style={styles.primaryButtonText}>
              {isLastStep ? (mode === 'create' ? 'Crear' : 'Guardar') : 'Siguiente'}
            </Text>
            {!isLastStep && <Ionicons name="chevron-forward" size={20} color="#FFFFFF" />}
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>{mode === 'create' ? 'Nuevo vehículo' : 'Editar vehículo'}</Text>
        {renderProgressIndicator()}
        {renderStepIndicators()}
      </View>

      {/* Contenido del paso */}
      <View style={styles.stepContent}>
        <Text style={styles.stepTitle}>{STEPS[currentStep - 1].title}</Text>
        {renderStepContent()}
      </View>

      {/* Botones de navegación */}
      {renderNavigationButtons()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  progressContainer: {
    marginBottom: 20,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#E5E5E5',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#0066CC',
    borderRadius: 2,
  },
  progressText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#666',
    marginTop: 8,
  },
  stepIndicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  stepIndicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepIndicator: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F5F5F5',
    borderWidth: 2,
    borderColor: '#E5E5E5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepIndicatorActive: {
    borderColor: '#0066CC',
    backgroundColor: '#F0F8FF',
  },
  stepIndicatorCompleted: {
    backgroundColor: '#0066CC',
    borderColor: '#0066CC',
  },
  stepConnector: {
    width: 20,
    height: 2,
    backgroundColor: '#E5E5E5',
  },
  stepConnectorActive: {
    backgroundColor: '#0066CC',
  },
  stepContent: {
    flex: 1,
    padding: 20,
  },
  stepTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
  },
  navigationContainer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    paddingBottom: Platform.OS === 'android' ? 25 : 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: 80,
    justifyContent: 'center',
  },
  primaryButton: {
    backgroundColor: '#0066CC',
    flex: 1,
    marginLeft: 8,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#0066CC',
    flex: 1,
    marginRight: 8,
  },
  cancelButton: {
    backgroundColor: 'transparent',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    marginRight: 4,
  },
  secondaryButtonText: {
    color: '#0066CC',
    fontWeight: '600',
    marginLeft: 4,
  },
  cancelButtonText: {
    color: '#666',
    fontWeight: '500',
  },
});
