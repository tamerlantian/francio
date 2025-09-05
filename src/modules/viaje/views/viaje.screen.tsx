import { Ionicons } from '@expo/vector-icons';
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { viajeStyles } from '../styles/viaje.style';
import { useViaje } from '../view-models/viaje.view-model';
// import { router } from 'expo-router';
import React from 'react';
import { ViajeCard } from '../components/viaje-card.component';

// Componente principal de la pantalla de viajes
export default function ViajeScreen() {
  // Utilizamos el ViewModel para obtener los datos
  const { viajes, isLoading, isError, refetch } = useViaje();

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
    <SafeAreaView
      style={{ flex: 1, backgroundColor: '#f5f5f5' }}
      edges={['left', 'right', 'bottom']}
    >
      <View style={viajeStyles.container}>
        <View style={viajeStyles.header}>
          <Text style={viajeStyles.title}>Viajes</Text>
        </View>

        {viajes.length > 0 ? (
          <FlatList
            data={viajes}
            keyExtractor={item => item.datos.id.toString()}
            renderItem={({ item }) => <ViajeCard viaje={item} />}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View style={viajeStyles.emptyContainer}>
            <Ionicons name="car-outline" size={48} color="#666" />
            <Text style={viajeStyles.emptyText}>No tienes viajes disponibles</Text>
          </View>
        )}

        {/* Botón flotante para agregar un nuevo viaje */}
        <TouchableOpacity
          style={viajeStyles.addButton}
          onPress={() => {
            // Aquí se puede navegar a la pantalla de crear viaje
            // router.push('/viaje/nuevo');
            console.log('Crear nuevo viaje');
          }}
        >
          <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
