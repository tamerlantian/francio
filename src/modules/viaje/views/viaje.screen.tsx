import { useConductoresSelector } from '@/src/modules/conductor/view-models/conductor.view-model';
import { useVehiculosSelector } from '@/src/modules/vehiculo/view-models/vehiculo.view-model';
import { Ionicons } from '@expo/vector-icons';
import BottomSheet from '@gorhom/bottom-sheet';
import React, { useRef, useState } from 'react';
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from 'react-native';
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
  } = useConductoresSelector();
  const { vehiculosOptions } = useVehiculosSelector();
  // Usar el hook para aceptar viajes
  const { aceptarViaje } = useAceptarViaje();

  // Estado para el viaje seleccionado
  const [selectedViaje, setSelectedViaje] = useState<Viaje | null>(null);

  // Referencia al bottom sheet
  const bottomSheetRef = useRef<BottomSheet>(null);

  // Manejar la selección de un viaje
  const handleViajePress = (viaje: Viaje) => {
    setSelectedViaje(viaje);
    console.log(selectedViaje);
    bottomSheetRef.current?.expand();
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
    return (
      <View style={viajeStyles.loadingContainer}>
        <ActivityIndicator size="large" color="#0066cc" />
        <Text style={{ marginTop: 10 }}>Cargando viajes...</Text>
      </View>
    );
  }

  // Si hay un error, mostramos un mensaje
  if (isError) {
    return (
      <View style={viajeStyles.emptyContainer}>
        <Ionicons name="alert-circle-outline" size={48} color="#F44336" />
        <Text style={viajeStyles.emptyText}>Ocurrió un error al cargar los viajes</Text>
        <TouchableOpacity
          style={{ marginTop: 16, padding: 10, backgroundColor: '#0066cc', borderRadius: 8 }}
          onPress={() => refetchViajes()}
        >
          <Text style={{ color: 'white' }}>Intentar nuevamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f5f5' }} edges={['left', 'right']}>
      <View style={viajeStyles.container}>
        <View style={viajeStyles.header}>
          <Text style={viajeStyles.title}>Viajes</Text>
        </View>

        {viajes.length > 0 ? (
          <FlatList
            data={viajes}
            keyExtractor={item => item.datos.id.toString()}
            renderItem={({ item }) => <ViajeCard viaje={item} onPress={handleViajePress} />}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View style={viajeStyles.emptyContainer}>
            <Ionicons name="car-outline" size={48} color="#666" />
            <Text style={viajeStyles.emptyText}>No tienes viajes disponibles</Text>
          </View>
        )}

        {/* Bottom Sheet para asignar viaje */}
        <AsignarViajeSheet
          ref={bottomSheetRef}
          viaje={selectedViaje}
          onAceptar={handleAceptar}
          conductoresOptions={conductoresOptions}
          vehiculosOptions={vehiculosOptions}
        />
      </View>
    </SafeAreaView>
  );
}
