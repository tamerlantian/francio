import { ErrorState } from '@/src/shared/components/ui/error-state/ErrorState';
import { LoadingSpinner } from '@/src/shared/components/ui/loading/LoadingSpinner';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { FlatList, RefreshControl, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { VehiculoCard } from '../components/vehiculo-card';
import { VehiculoResponse } from '../interfaces/vehiculo.interface';
import { vehiculoStyles } from '../styles/vehiculo.style';
import { useVehiculo } from '../view-models/vehiculo.view-model';

// Componente principal de la pantalla de vehículos
export default function VehiculoScreen() {
  // Utilizamos el ViewModel para obtener los datos
  const { vehiculos, isLoading, isError, refetch } = useVehiculo();

  // Función para navegar a la pantalla de creación
  const handleOpenCreate = () => {
    router.push('/(app)/(vehiculo)/nuevo');
  };

  // Función para navegar a la pantalla de edición
  const handleOpenEdit = (vehiculo: VehiculoResponse) => {
    // router.push(`/(app)/(vehiculo)/editar/${vehiculo.id}`);
  };

  // Si está cargando, mostramos un indicador
  if (isLoading) {
    return <LoadingSpinner message="Cargando vehículos..." />;
  }

  // Si hay un error, mostramos un mensaje
  if (isError) {
    return (
      <ErrorState
        title="Ocurrió un error al cargar los vehículos"
        subtitle="Verifica tu conexión a internet e intenta nuevamente"
        onRetry={() => refetch()}
      />
    );
  }

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: '#f5f5f5' }}
      edges={['left', 'right', 'bottom']}
    >
      <View style={vehiculoStyles.container}>
        <View style={vehiculoStyles.header}>
          <Text style={vehiculoStyles.title}>Vehículos</Text>
        </View>

        <FlatList
          data={vehiculos}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => <VehiculoCard vehiculo={item} onPress={handleOpenEdit} />}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={{ flex: 1, justifyContent: 'center', minHeight: 300 }}>
              <View style={vehiculoStyles.emptyContainer}>
                <Ionicons name="car-outline" size={48} color="#666" />
                <Text style={vehiculoStyles.emptyText}>No hay vehículos disponibles</Text>
              </View>
            </View>
          }
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={() => refetch()}
              colors={['#0066cc']} // Android
              tintColor="#0066cc" // iOS
              title="Actualizando vehículos..." // iOS
              titleColor="#666" // iOS
            />
          }
        />

        {/* Botón flotante para agregar un nuevo vehículo */}
        <TouchableOpacity style={vehiculoStyles.addButton} onPress={handleOpenCreate}>
          <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
