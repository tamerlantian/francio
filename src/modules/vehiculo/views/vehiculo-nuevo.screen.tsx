import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { VehiculoWizard } from '../components/vehiculo-wizard';
import { Vehiculo } from '../interfaces/vehiculo.interface';
import { useCreateVehiculo } from '../view-models/vehiculo.view-model';
import { router } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import { ConfirmationDialog } from '@/src/shared/components/ui/dialog/ConfirmationDialog';

export default function VehiculoNuevoScreen() {
  const { mutateAsync: createVehiculo } = useCreateVehiculo();
  const [hasChanges, setHasChanges] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: Partial<Vehiculo>) => {
    try {
      setIsSubmitting(true);
      await createVehiculo(data as Vehiculo);
      // Navigate back to vehiculo list after successful creation
      router.back();
    } catch (error) {
      console.error('Error al crear vehículo:', error);
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (hasChanges) {
      setShowConfirmDialog(true);
    } else {
      router.back();
    }
  };

  const handleConfirmCancel = () => {
    setShowConfirmDialog(false);
    router.back();
  };

  const handleFormChange = (hasChanged: boolean) => {
    setHasChanges(hasChanged);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }} edges={['left', 'right']}>
      <View style={styles.container}>
        <VehiculoWizard
          mode="create"
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          onFormChange={handleFormChange}
          isLoading={isSubmitting}
        />
      </View>

      <ConfirmationDialog
        visible={showConfirmDialog}
        title="¿Descartar cambios?"
        message="Tienes cambios sin guardar. ¿Estás seguro de que deseas salir sin guardar?"
        confirmText="Descartar"
        cancelText="Seguir editando"
        onConfirm={handleConfirmCancel}
        onCancel={() => setShowConfirmDialog(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#FFFFFF',
  },
});
