import React from 'react';
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useUpdateUser, useUser } from '../view-models/user.view-model';
import { userDetailStyles } from '../styles/user-detail.style';

interface UserDetailProps {
  userId: number;
  onBack?: () => void;
}

export const UserDetail = ({ userId, onBack }: UserDetailProps) => {
  // Utilizamos el hook del ViewModel que implementa React Query
  const { 
    data: user, 
    isLoading, 
    isError, 
    error, 
    refetch 
  } = useUser(userId);
  
  // Hook para actualizar usuario
  const updateUserMutation = useUpdateUser();

  // Ejemplo de actualización de usuario (en una aplicación real, esto vendría de un formulario)
  const handleUpdateUsername = () => {
    if (user) {
      updateUserMutation.mutate({
        id: user.id,
        userData: { 
          username: `${user.username}_updated` 
        }
      });
    }
  };

  // Si está cargando, mostrar indicador
  if (isLoading) {
    return (
      <View style={userDetailStyles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // Si hay un error, mostrar mensaje
  if (isError) {
    return (
      <View style={userDetailStyles.centered}>
        <Text style={userDetailStyles.errorText}>Error: {error.message}</Text>
        <TouchableOpacity style={userDetailStyles.button} onPress={() => refetch()}>
          <Text style={userDetailStyles.buttonText}>Reintentar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!user) {
    return (
      <View style={userDetailStyles.centered}>
        <Text style={userDetailStyles.errorText}>Usuario no encontrado</Text>
        {onBack && (
          <TouchableOpacity style={userDetailStyles.button} onPress={onBack}>
            <Text style={userDetailStyles.buttonText}>Volver</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }

  return (
    <ScrollView style={userDetailStyles.container}>
      <View style={userDetailStyles.header}>
        <Text style={userDetailStyles.title}>Detalle del Usuario</Text>
        {onBack && (
          <TouchableOpacity style={userDetailStyles.backButton} onPress={onBack}>
            <Text style={userDetailStyles.backButtonText}>Volver</Text>
          </TouchableOpacity>
        )}
      </View>
      
      <View style={userDetailStyles.card}>
        <View style={userDetailStyles.row}>
          <Text style={userDetailStyles.label}>Nombre:</Text>
          <Text style={userDetailStyles.value}>{user.name}</Text>
        </View>
        
        <View style={userDetailStyles.row}>
          <Text style={userDetailStyles.label}>Usuario:</Text>
          <Text style={userDetailStyles.value}>{user.username}</Text>
        </View>
        
        <View style={userDetailStyles.row}>
          <Text style={userDetailStyles.label}>Email:</Text>
          <Text style={userDetailStyles.value}>{user.email}</Text>
        </View>
      </View>
      
      <TouchableOpacity 
        style={userDetailStyles.updateButton}
        onPress={handleUpdateUsername}
        disabled={updateUserMutation.isPending}
      >
        <Text style={userDetailStyles.buttonText}>
          {updateUserMutation.isPending ? 'Actualizando...' : 'Actualizar Usuario'}
        </Text>
      </TouchableOpacity>
      
      {updateUserMutation.isSuccess && (
        <Text style={userDetailStyles.successText}>¡Usuario actualizado correctamente!</Text>
      )}
      
      {updateUserMutation.isError && (
        <Text style={userDetailStyles.errorText}>
          Error al actualizar: {updateUserMutation.error.message}
        </Text>
      )}
    </ScrollView>
  );
};