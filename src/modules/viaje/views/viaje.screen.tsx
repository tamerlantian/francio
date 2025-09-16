import { useConductoresSelector } from '@/src/modules/conductor/view-models/conductor.view-model';
import { useVehiculosSelector } from '@/src/modules/vehiculo/view-models/vehiculo.view-model';
import { EmptyState } from '@/src/shared/components/ui/empty-state/EmptyState';
import { ErrorState } from '@/src/shared/components/ui/error-state/ErrorState';
import { LoadingSpinner } from '@/src/shared/components/ui/loading/LoadingSpinner';
import BottomSheet from '@gorhom/bottom-sheet';
import React, { useEffect, useRef, useState } from 'react';
import { FlatList, RefreshControl, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  AsignarViajeFormValues,
  AsignarViajeSheet,
} from '../components/asignar-viaje-sheet.component';
import { ViajeCard } from '../components/viaje-card.component';
import { Viaje } from '../interfaces/viaje.interface';
import { viajeStyles } from '../styles/viaje.style';
import { useAceptarViaje, useViaje } from '../view-models/viaje.view-model';

// Componente principal de la pantalla de viajes
export default function ViajeScreen() {
  // Utilizamos los ViewModels para obtener los datos
  const {
    viajes,
    isLoading: isLoadingViajes,
    isError: isErrorViajes,
    refetch: refetchViajes,
  } = useViaje();
  const {
    conductoresOptions,
    isLoading: isLoadingConductores,
    isError: isErrorConductores,
    refetch: refetchConductores,
  } = useConductoresSelector();
  const { vehiculosOptions, refetch: refetchVehiculos } = useVehiculosSelector();
  // Usar el hook para aceptar viajes
  const { aceptarViaje, isLoading: isLoadingAceptar } = useAceptarViaje();

  // Estado para el viaje seleccionado
  const [selectedViaje, setSelectedViaje] = useState<Viaje | null>(null);

  // Referencia al bottom sheet
  const bottomSheetRef = useRef<BottomSheet>(null);

  // Manejar la selección de un viaje
  const handleViajePress = (viaje: Viaje) => {
    // Simplemente actualizamos el estado
    setSelectedViaje(viaje);
  };

  // useEffect para expandir el bottom sheet cuando selectedViaje cambia
  useEffect(() => {
    if (selectedViaje) {
      bottomSheetRef.current?.expand();
    }
  }, [selectedViaje]);

  // Función para limpiar el viaje seleccionado cuando se cierra el bottom sheet
  const handleBottomSheetClose = () => {
    setSelectedViaje(null);
  };

  // Función para manejar el pull-to-refresh
  const handleRefresh = () => {
    refetchViajes();
    refetchVehiculos();
    refetchConductores();
  };

  // Manejar la aceptación del viaje
  const handleAceptar = (formData: AsignarViajeFormValues) => {
    if (selectedViaje) {
      // Llamar a la mutación para aceptar el viaje
      aceptarViaje(
        {
          viajeId: selectedViaje.datos.id,
          conductorId: parseInt(formData.conductor_id),
          vehiculoId: parseInt(formData.vehiculo_id),
          schemaName: selectedViaje.datos.schema_name,
        },
        {
          onSuccess: () => {
            // Cerrar el bottom sheet cuando la operación sea exitosa
            bottomSheetRef.current?.close();
          },
        },
      );
    }
  };

  // Estado de carga combinado
  const isLoading = isLoadingViajes || isLoadingConductores;
  const isError = isErrorViajes || isErrorConductores;

  // Si está cargando, mostramos un indicador
  if (isLoading) {
    return <LoadingSpinner message="Cargando viajes..." />;
  }

  // Si hay un error, mostramos un mensaje
  if (isError) {
    return (
      <ErrorState
        title="Ocurrió un error al cargar los viajes"
        subtitle="Verifica tu conexión a internet e intenta nuevamente"
        onRetry={() => refetchViajes()}
      />
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f5f5' }} edges={['left', 'right']}>
      <View style={viajeStyles.container}>
        <View style={viajeStyles.header}>
          <Text style={viajeStyles.title}>Viajes</Text>
        </View>

        <FlatList
          data={viajes}
          keyExtractor={item => item.datos.id.toString()}
          renderItem={({ item }) => <ViajeCard viaje={item} onPress={handleViajePress} />}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={{ flex: 1, justifyContent: 'center', minHeight: 300 }}>
              <EmptyState
                icon="car-outline"
                title="No tienes viajes disponibles"
                subtitle="Desliza hacia abajo para actualizar"
              />
            </View>
          }
          refreshControl={
            <RefreshControl
              refreshing={isLoadingViajes}
              onRefresh={handleRefresh}
              colors={['#0066cc']} // Android
              tintColor="#0066cc" // iOS
              title="Actualizando viajes..." // iOS
              titleColor="#666" // iOS
            />
          }
        />

        {/* Bottom Sheet para asignar viaje */}
        <AsignarViajeSheet
          ref={bottomSheetRef}
          viaje={selectedViaje}
          onAceptar={handleAceptar}
          onClose={handleBottomSheetClose}
          conductoresOptions={conductoresOptions}
          vehiculosOptions={vehiculosOptions}
          isLoading={isLoadingAceptar}
        />
      </View>
    </SafeAreaView>
  );
}
