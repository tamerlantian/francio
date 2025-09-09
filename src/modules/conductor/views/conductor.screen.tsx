import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useConductor } from '../view-models/conductor.view-model';
import { conductorStyles } from '../styles/conductor.style';
import { Ionicons } from '@expo/vector-icons';
import { ConductorCard } from '../components/conductor-card';
import { router } from 'expo-router';
import { useRef } from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import CustomBottomSheet from '@/src/shared/components/bottom-sheet/bottom-sheet';
import ConductorFormulario from '../components/conductor-formulario';
// Componente principal de la pantalla de conductores
export default function ConductorScreen() {
  // Utilizamos el ViewModel para obtener los datos
  const { conductores, isLoading, isError, refetch } = useConductor();
  const bottomSheetRef = useRef<BottomSheet>(null);

  // Función para abrir el bottom sheet
  const handleOpenDevModeSheet = () => {
    bottomSheetRef.current?.expand();
  };

  // Función para cerrar el bottom sheet
  const handleCloseDevModeSheet = () => {
    bottomSheetRef.current?.close();
  };

  // Si está cargando, mostramos un indicador
  if (isLoading) {
    return (
      <View style={conductorStyles.loadingContainer}>
        <ActivityIndicator size="large" color="#0066cc" />
        <Text style={{ marginTop: 10 }}>Cargando conductores...</Text>
      </View>
    );
  }

  // Si hay un error, mostramos un mensaje
  if (isError) {
    return (
      <View style={conductorStyles.emptyContainer}>
        <Ionicons name="alert-circle-outline" size={48} color="#F44336" />
        <Text style={conductorStyles.emptyText}>Ocurrió un error al cargar los conductores</Text>
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
      <View style={conductorStyles.container}>
        <View style={conductorStyles.header}>
          <Text style={conductorStyles.title}>Conductores</Text>
        </View>

        {conductores.length > 0 ? (
          <FlatList
            data={conductores}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
              <ConductorCard
                conductor={item}
                onPress={conductor => console.log(`Ver detalle del conductor ${conductor.id}`)}
              />
            )}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View style={conductorStyles.emptyContainer}>
            <Ionicons name="person-outline" size={48} color="#666" />
            <Text style={conductorStyles.emptyText}>No hay conductores disponibles</Text>
          </View>
        )}

        {/* Botón flotante para agregar un nuevo conductor */}
        <TouchableOpacity style={conductorStyles.addButton} onPress={handleOpenDevModeSheet}>
          <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <CustomBottomSheet ref={bottomSheetRef} initialSnapPoints={['40%']}>
        <ConductorFormulario />
      </CustomBottomSheet>
    </SafeAreaView>
  );
}
