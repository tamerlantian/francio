import CustomBottomSheet from '@/src/shared/components/bottom-sheet/bottom-sheet';
import { Ionicons } from '@expo/vector-icons';
import BottomSheet from '@gorhom/bottom-sheet';
import { useRef, useState } from 'react';
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ConductorCard } from '../components/conductor-card';
import ConductorFormulario from '../components/conductor-formulario';
import { Conductor } from '../interfaces/conductor.interface';
import { conductorStyles } from '../styles/conductor.style';
import { useConductor } from '../view-models/conductor.view-model';
// Componente principal de la pantalla de conductores
export default function ConductorScreen() {
  // Utilizamos el ViewModel para obtener los datos
  const { conductores, isLoading, isError, refetch } = useConductor();
  const bottomSheetRef = useRef<BottomSheet>(null);

  // Estado para manejar el modo del formulario y el conductor seleccionado
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');
  const [selectedConductor, setSelectedConductor] = useState<Conductor | null>(null);
  const [isFormLoading, setIsFormLoading] = useState(false);

  // Función para abrir el modal de creación
  const handleOpenCreateModal = () => {
    setFormMode('create');
    setSelectedConductor(null);
    bottomSheetRef.current?.expand();
  };

  // Función para abrir el modal de edición
  const handleOpenEditModal = (conductor: Conductor) => {
    setFormMode('edit');
    setSelectedConductor(conductor);
    bottomSheetRef.current?.expand();
  };

  // Función para cerrar el bottom sheet
  const handleCloseModal = () => {
    bottomSheetRef.current?.close();
    setSelectedConductor(null);
  };

  // Función para manejar el envío del formulario
  const handleFormSubmit = async (data: any) => {
    setIsFormLoading(true);
    try {
      // TODO: Implementar la lógica de guardado/actualización
      console.log('Datos del formulario:', data);
      console.log('Modo:', formMode);

      // Simular una operación async
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Cerrar el modal y refrescar los datos
      handleCloseModal();
      refetch();
    } catch (error) {
      console.error('Error al guardar conductor:', error);
    } finally {
      setIsFormLoading(false);
    }
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
              <ConductorCard conductor={item} onPress={handleOpenEditModal} />
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
        <TouchableOpacity style={conductorStyles.addButton} onPress={handleOpenCreateModal}>
          <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <CustomBottomSheet ref={bottomSheetRef} initialSnapPoints={['85%']}>
        <ConductorFormulario
          initialData={selectedConductor || undefined}
          onSubmit={handleFormSubmit}
          onCancel={handleCloseModal}
          isLoading={isFormLoading}
          mode={formMode}
        />
      </CustomBottomSheet>
    </SafeAreaView>
  );
}
