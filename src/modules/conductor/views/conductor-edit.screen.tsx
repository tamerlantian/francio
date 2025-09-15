import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ConductorWizard } from '../components/conductor-wizard';
import { Conductor } from '../interfaces/conductor.interface';
import { useConductorById, useUpdateConductor } from '../view-models/conductor.view-model';
import { router } from 'expo-router';
import { LoadingSpinner } from '@/src/shared/components/ui/loading/LoadingSpinner';
import { ErrorState } from '@/src/shared/components/ui/error-state/ErrorState';
import { View, StyleSheet } from 'react-native';
import { ConfirmationDialog } from '@/src/shared/components/ui/dialog/ConfirmationDialog';
import { ErrorAlert } from '@/src/shared/components/ui/alert/ErrorAlert';
import { ApiErrorResponse } from '@/src/core/interfaces/api.interface';

interface ConductorEditScreenProps {
  conductorId: string;
}

export default function ConductorEditScreen({ conductorId }: ConductorEditScreenProps) {
  // Obtenemos los datos del conductor usando el ID
  const { conductor, isLoading, isError } = useConductorById(conductorId);
  const [hasChanges, setHasChanges] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { mutateAsync: updateConductor } = useUpdateConductor();

  const handleSubmit = async (data: Partial<Conductor>) => {
    try {
      setIsSubmitting(true);
      setErrorMessage(null);
      // Aseguramos que el ID esté presente en los datos
      if (conductor && data) {
        await updateConductor({ ...conductor, ...data } as Conductor);
        router.back();
      }
    } catch (error) {
      const errorParsed = error as ApiErrorResponse;
      setErrorMessage(
        errorParsed?.mensaje
          ? errorParsed?.mensaje
          : 'Ha ocurrido un error al actualizar el conductor. Por favor, inténtalo de nuevo.',
      );
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

  // Si está cargando, mostramos un indicador
  if (isLoading) {
    return <LoadingSpinner message="Cargando datos del conductor..." />;
  }

  // Si hay un error, mostramos un mensaje
  if (isError || !conductor) {
    return (
      <ErrorState
        title="Error al cargar el conductor"
        subtitle="No se pudo encontrar la información del conductor solicitado"
        onRetry={() => router.back()}
      />
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }} edges={['top', 'left', 'right']}>
      {/* <BackHeader title="Editar Conductor" onBack={handleCancel} /> */}
      {/* {errorMessage && (
        <ErrorAlert message={errorMessage} onDismiss={() => setErrorMessage(null)} />
      )} */}
      <View style={styles.container}>
        <ConductorWizard
          mode="edit"
          initialData={conductor}
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
    backgroundColor: '#FFFFFF',
  },
});
