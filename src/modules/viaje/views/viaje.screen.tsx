import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useViaje } from '../view-models/viaje.view-model';
import { viajeStyles } from '../styles/viaje.style';
import { Ionicons } from '@expo/vector-icons';
import { Viaje } from '../interfaces/viaje.interface';
// import { router } from 'expo-router';
import React from 'react';

// Función para formatear fecha
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

// Componente para renderizar cada item de la lista de viajes
const ViajeItem = ({ viaje }: { viaje: Viaje }) => {
  const { datos } = viaje;

  return (
    <TouchableOpacity
      style={viajeStyles.travelCard}
      onPress={() => {
        // Aquí se puede navegar al detalle del viaje
        // router.push(`/viaje/${datos.id}`);
        console.log(`Ver detalle del viaje ${datos.id}`);
      }}
    >
      {/* Travel Header */}
      <View style={viajeStyles.travelHeader}>
        <View style={viajeStyles.travelRouteContainer}>
          <View style={viajeStyles.travelRoute}>
            <Text style={viajeStyles.origin}>{datos.ciudad_origen__nombre}</Text>
            <Ionicons
              name="arrow-forward"
              size={16}
              color="#0066cc"
              style={viajeStyles.arrowIcon}
            />
            <Text style={viajeStyles.destination}>{datos.ciudad_destino__nombre}</Text>
          </View>
          <Text style={viajeStyles.travelDate}>{formatDate(datos.fecha)}</Text>
        </View>
      </View>

      {/* Travel Details */}
      <View style={viajeStyles.travelDetails}>
        <View style={viajeStyles.detailRow}>
          <Text style={viajeStyles.label}>Cliente:</Text>
          <Text style={viajeStyles.value}>{datos.cliente}</Text>
        </View>
        <View style={viajeStyles.detailRow}>
          <Text style={viajeStyles.label}>Servicio:</Text>
          <Text style={viajeStyles.value}>{datos.servicio__nombre}</Text>
        </View>
        <View style={viajeStyles.detailRow}>
          <Text style={viajeStyles.label}>Producto:</Text>
          <Text style={viajeStyles.value}>{datos.producto__nombre}</Text>
        </View>

        {/* Metrics Grid */}
        <View style={viajeStyles.metricsGrid}>
          <View style={viajeStyles.metricItem}>
            <Text style={viajeStyles.metricValue}>{datos.unidades}</Text>
            <Text style={viajeStyles.metricLabel}>Unidades</Text>
          </View>
          <View style={viajeStyles.metricItem}>
            <Text style={viajeStyles.metricValue}>{datos.peso}kg</Text>
            <Text style={viajeStyles.metricLabel}>Peso</Text>
          </View>
          <View style={viajeStyles.metricItem}>
            <Text style={viajeStyles.metricValue}>{datos.volumen}m³</Text>
            <Text style={viajeStyles.metricLabel}>Volumen</Text>
          </View>
          <View style={viajeStyles.metricItem}>
            <Text style={viajeStyles.metricValue}>{datos.puntos_entrega}</Text>
            <Text style={viajeStyles.metricLabel}>Puntos</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

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
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      <View style={viajeStyles.container}>
        <View style={viajeStyles.header}>
          <Text style={viajeStyles.title}>Viajes</Text>
        </View>

        {viajes.length > 0 ? (
          <FlatList
            data={viajes}
            keyExtractor={item => item.datos.id.toString()}
            renderItem={({ item }) => <ViajeItem viaje={item} />}
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
