import { Ionicons } from '@expo/vector-icons';
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import { useVehiculo } from '../view-models/vehiculo.view-model';
import { vehiculoStyles } from '../styles/vehiculo.style';
import { Vehiculo } from '../interfaces/vehiculo.interface';

// Componente para mostrar un vehículo en la lista
const VehiculoCard = ({
  vehiculo,
  onPress,
}: {
  vehiculo: any;
  onPress: (_vehiculo: any) => void;
}) => {
  return (
    <TouchableOpacity
      style={vehiculoStyles.card}
      onPress={() => onPress(vehiculo)}
      activeOpacity={0.7}
    >
      <View style={vehiculoStyles.cardContent}>
        <View style={vehiculoStyles.cardHeader}>
          <Text style={vehiculoStyles.cardTitle}>{vehiculo.placa}</Text>
          <Text style={vehiculoStyles.cardSubtitle}>{vehiculo.marca__nombre}</Text>
        </View>
        <View style={vehiculoStyles.cardBody}>
          <Text style={vehiculoStyles.cardText}>Modelo: {vehiculo.modelo}</Text>
          <Text style={vehiculoStyles.cardText}>Tipo: {vehiculo.tipo_vehiculo__nombre}</Text>
          <Text style={vehiculoStyles.cardText}>Capacidad: {vehiculo.capacidad_carga} kg</Text>
        </View>
      </View>
      <Ionicons name="chevron-forward" size={24} color="#0066cc" />
    </TouchableOpacity>
  );
};

// Componente principal de la pantalla de vehículos
export default function VehiculoScreen() {
  // Utilizamos el ViewModel para obtener los datos
  const {
    vehiculos,
    isLoading: isLoadingVehiculos,
    isError: isErrorVehiculos,
    refetch: refetchVehiculos,
  } = useVehiculo();

  // Manejar la selección de un vehículo
  const handleVehiculoPress = (vehiculo: Vehiculo) => {
    console.log('Vehículo seleccionado:', vehiculo);
    // Aquí se podría navegar a una pantalla de detalle o mostrar un modal
  };

  // Si está cargando, mostramos un indicador
  if (isLoadingVehiculos) {
    return (
      <View style={vehiculoStyles.loadingContainer}>
        <ActivityIndicator size="large" color="#0066cc" />
        <Text style={{ marginTop: 10 }}>Cargando vehículos...</Text>
      </View>
    );
  }

  // Si hay un error, mostramos un mensaje
  if (isErrorVehiculos) {
    return (
      <View style={vehiculoStyles.emptyContainer}>
        <Ionicons name="alert-circle-outline" size={48} color="#F44336" />
        <Text style={vehiculoStyles.emptyText}>Ocurrió un error al cargar los vehículos</Text>
        <TouchableOpacity
          style={{ marginTop: 16, padding: 10, backgroundColor: '#0066cc', borderRadius: 8 }}
          onPress={() => refetchVehiculos()}
        >
          <Text style={{ color: 'white' }}>Intentar nuevamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f5f5' }} edges={['left', 'right']}>
      <View style={vehiculoStyles.container}>
        <View style={vehiculoStyles.header}>
          <Text style={vehiculoStyles.title}>Vehículos</Text>
        </View>

        {vehiculos.length > 0 ? (
          <FlatList
            data={vehiculos}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
              <VehiculoCard vehiculo={item} onPress={handleVehiculoPress} />
            )}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View style={vehiculoStyles.emptyContainer}>
            <Ionicons name="car-outline" size={48} color="#666" />
            <Text style={vehiculoStyles.emptyText}>No hay vehículos disponibles</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
