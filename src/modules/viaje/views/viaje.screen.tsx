import { Ionicons } from '@expo/vector-icons';
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { viajeStyles } from '../styles/viaje.style';
import { useViaje } from '../view-models/viaje.view-model';
import React, { useRef, useState } from 'react';
import { ViajeCard } from '../components/viaje-card.component';
import { Viaje } from '../interfaces/viaje.interface';
import BottomSheet from '@gorhom/bottom-sheet';
import { AsignarViajeSheet } from '../components/asignar-viaje-sheet.component';

// Componente principal de la pantalla de viajes
export default function ViajeScreen() {
  // Utilizamos el ViewModel para obtener los datos
  const { viajes, isLoading, isError, refetch } = useViaje();

  // Estado para el viaje seleccionado
  const [selectedViaje, setSelectedViaje] = useState<Viaje | null>(null);
  const [selectedConductor, setSelectedConductor] = useState('');
  const [selectedVehiculo, setSelectedVehiculo] = useState('');

  // Referencia al bottom sheet
  const bottomSheetRef = useRef<BottomSheet>(null);

  // Data mockeada para conductores
  const conductoresOptions = [
    { label: 'Juan Pérez - CC 12345678', value: '1' },
    { label: 'María García - CC 87654321', value: '2' },
    { label: 'Carlos López - CC 11223344', value: '3' },
    { label: 'Ana Rodríguez - CC 44556677', value: '4' },
  ];

  // Data mockeada para vehículos
  const vehiculosOptions = [
    { label: 'ABC-123 - Chevrolet NPR', value: '1' },
    { label: 'DEF-456 - Ford Cargo', value: '2' },
    { label: 'GHI-789 - Isuzu NLR', value: '3' },
    { label: 'JKL-012 - Mitsubishi Canter', value: '4' },
  ];

  // Manejar la selección de un viaje
  const handleViajePress = (viaje: Viaje) => {
    setSelectedViaje(viaje);
    setSelectedConductor('');
    setSelectedVehiculo('');
    bottomSheetRef.current?.expand();
  };

  // Manejar la aceptación del viaje
  const handleAceptar = () => {
    if (selectedViaje) {
      console.log('Viaje aceptado:', {
        viajeId: selectedViaje.datos.id,
        conductor: selectedConductor,
        vehiculo: selectedVehiculo,
      });
      bottomSheetRef.current?.close();
    }
  };

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
          onPress={() => refetch()}
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
          selectedConductor={selectedConductor}
          selectedVehiculo={selectedVehiculo}
          onConductorChange={setSelectedConductor}
          onVehiculoChange={setSelectedVehiculo}
          onAceptar={handleAceptar}
          conductoresOptions={conductoresOptions}
          vehiculosOptions={vehiculosOptions}
        />
      </View>
    </SafeAreaView>
  );
}
