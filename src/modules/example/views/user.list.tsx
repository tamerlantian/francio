import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { User } from '../models/User';
import { useDeleteUser, useUsers } from '../view-models/user.view-model';
import { userListStyles } from '../styles/user-list.style';

interface UserListProps {
  onSelectUser?: (_userId: number) => void;
}

export const UserList = ({ onSelectUser }: UserListProps) => {
  // Utilizamos el hook del ViewModel que implementa React Query
  const { data: users, isLoading, isError, error, refetch } = useUsers();

  // Hook para eliminar usuarios
  const deleteUserMutation = useDeleteUser();

  // Manejador para eliminar un usuario
  const handleDeleteUser = (id: number) => {
    deleteUserMutation.mutate(id);
  };

  // Renderizado de cada item de la lista
  const renderItem = ({ item }: { item: User }) => (
    <TouchableOpacity
      style={userListStyles.userItem}
      onPress={() => onSelectUser && onSelectUser(item.id)}
      activeOpacity={onSelectUser ? 0.7 : 1}
    >
      <View style={userListStyles.userInfo}>
        <Text style={userListStyles.userName}>{item.name}</Text>
        <Text style={userListStyles.userEmail}>{item.email}</Text>
      </View>
      <TouchableOpacity
        style={userListStyles.deleteButton}
        onPress={e => {
          e.stopPropagation();
          handleDeleteUser(item.id);
        }}
        disabled={deleteUserMutation.isPending}
      >
        <Text style={userListStyles.deleteButtonText}>Eliminar</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  // Si está cargando, mostrar indicador
  if (isLoading) {
    return (
      <View style={userListStyles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // Si hay un error, mostrar mensaje
  if (isError) {
    return (
      <View style={userListStyles.centered}>
        <Text style={userListStyles.errorText}>Error: {error.message}</Text>
        <TouchableOpacity style={userListStyles.retryButton} onPress={() => refetch()}>
          <Text style={userListStyles.retryButtonText}>Reintentar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={userListStyles.container}>
      <Text style={userListStyles.title}>Lista de Usuarios</Text>
      <FlatList
        data={users}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={refetch} />}
        ListEmptyComponent={
          <Text style={userListStyles.emptyText}>No hay usuarios disponibles</Text>
        }
      />
    </View>
  );
};
