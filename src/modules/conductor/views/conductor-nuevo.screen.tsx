import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ConductorWizard } from '../components/conductor-wizard';
import { Conductor } from '../interfaces/conductor.interface';
import { useCreateConductor } from '../view-models/conductor.view-model';
import { router } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import { ConfirmationDialog } from '@/src/shared/components/ui/dialog/ConfirmationDialog';

export default function ConductorNuevoScreen() {
  const { mutateAsync: createConductor } = useCreateConductor();
  const [hasChanges, setHasChanges] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: Partial<Conductor>) => {
    try {
      setIsSubmitting(true);
      await createConductor(data as Conductor);
      // Navigate back to conductor list after successful creation
      router.back();
    } catch (error) {
      console.error('Error al crear conductor:', error);
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
      {/* <BackHeader title="Nuevo Conductor" onBack={handleCancel} /> */}
      {/* {errorMessage && (
        <ErrorAlert message={errorMessage} onDismiss={() => setErrorMessage(null)} />
      )} */}
      <View style={styles.container}>
        <ConductorWizard
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
