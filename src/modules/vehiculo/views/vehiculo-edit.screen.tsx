import { ApiErrorResponse } from '@/src/core/interfaces/api.interface';
import { ConfirmationDialog } from '@/src/shared/components/ui/dialog/ConfirmationDialog';
import { ErrorState } from '@/src/shared/components/ui/error-state/ErrorState';
import { LoadingSpinner } from '@/src/shared/components/ui/loading/LoadingSpinner';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { VehiculoWizard } from '../components/vehiculo-wizard';
import { Vehiculo } from '../interfaces/vehiculo.interface';
import { useUpdateVehiculo, useVehiculoById } from '../view-models/vehiculo.view-model';

interface VehiculoEditScreenProps {
  vehiculoId: string;
}

export default function VehiculoEditScreen({ vehiculoId }: VehiculoEditScreenProps) {
  // Obtenemos los datos del vehículo usando el ID
  const { vehiculo, isLoading, isError } = useVehiculoById(vehiculoId);
  const [hasChanges, setHasChanges] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { mutateAsync: updateVehiculo } = useUpdateVehiculo();

  const handleSubmit = async (data: Partial<Vehiculo>) => {
    try {
      setIsSubmitting(true);
      // Aseguramos que el ID esté presente en los datos
      if (vehiculo && data) {
        await updateVehiculo({ ...vehiculo, ...data } as Vehiculo);
        router.back();
      }
    } catch (error) {
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
    return <LoadingSpinner message="Cargando datos del vehículo..." />;
  }

  // Si hay un error, mostramos un mensaje
  if (isError || !vehiculo) {
    return (
      <ErrorState
        title="Error al cargar el vehículo"
        subtitle="No se pudo encontrar la información del vehículo solicitado"
        onRetry={() => router.back()}
      />
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }} edges={['top', 'left', 'right']}>
      <View style={styles.container}>
        <VehiculoWizard
          mode="edit"
          initialData={vehiculo}
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
