import { ErrorState } from '@/src/shared/components/ui/error-state/ErrorState';
import { LoadingSpinner } from '@/src/shared/components/ui/loading/LoadingSpinner';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { FlatList, RefreshControl, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ConductorCard } from '../components/conductor-card';
import { ConductorResponse } from '../interfaces/conductor.interface';
import { conductorStyles } from '../styles/conductor.style';
import { useConductor } from '../view-models/conductor.view-model';
// Componente principal de la pantalla de conductores
export default function ConductorScreen() {
  // Utilizamos el ViewModel para obtener los datos
  const { conductores, isLoading, isError, refetch } = useConductor();

  // Función para navegar a la pantalla de creación
  const handleOpenCreate = () => {
    router.push('/(app)/(conductor)/nuevo');
  };

  // Función para navegar a la pantalla de edición
  const handleOpenEdit = (conductor: ConductorResponse) => {
    router.push(`/(app)/(conductor)/editar/${conductor.id}`);
  };

  // Si está cargando, mostramos un indicador
  if (isLoading) {
    return <LoadingSpinner message="Cargando conductores..." />;
  }

  // Si hay un error, mostramos un mensaje
  if (isError) {
    return (
      <ErrorState
        title="Ocurrió un error al cargar los conductores"
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
      <View style={conductorStyles.container}>
        <View style={conductorStyles.header}>
          <Text style={conductorStyles.title}>Conductores</Text>
        </View>

        <FlatList
          data={conductores}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => <ConductorCard conductor={item} onPress={handleOpenEdit} />}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={{ flex: 1, justifyContent: 'center', minHeight: 300 }}>
              <View style={conductorStyles.emptyContainer}>
                <Ionicons name="person-outline" size={48} color="#666" />
                <Text style={conductorStyles.emptyText}>No hay conductores disponibles</Text>
              </View>
            </View>
          }
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={() => refetch()}
              colors={['#0066cc']} // Android
              tintColor="#0066cc" // iOS
              title="Actualizando conductores..." // iOS
              titleColor="#666" // iOS
            />
          }
        />

        {/* Botón flotante para agregar un nuevo conductor */}
        <TouchableOpacity style={conductorStyles.addButton} onPress={handleOpenCreate}>
          <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
