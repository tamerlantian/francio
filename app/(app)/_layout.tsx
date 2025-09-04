import { useAuth } from '@/src/modules/auth/views/AuthProvider';
import { View, ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

// Componente personalizado para el contenido del drawer
function CustomDrawerContent(props: any) {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between' }}>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <View style={{ paddingBottom: 20 }}>
        <TouchableOpacity
          style={{
            padding: 20,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
          }}
          onPress={handleLogout}
        >
          <Ionicons name="exit-outline" size={24} color="#1890ff" />
          <Text style={{ color: '#1890ff', fontSize: 14 }}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function AppLayout() {
  const { isAuthenticated, loading } = useAuth();

  // Show loading indicator while checking authentication
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // Only render the protected content if authenticated
  if (!isAuthenticated) {
    return null; // Don't render anything while redirecting
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          headerShown: true,
          drawerType: 'front',
          drawerStyle: {
            width: '70%',
          },
          drawerItemStyle: {
            borderRadius: 12, // Bordes redondeados
            marginVertical: 5, // Separación entre items
          },
        }}
        drawerContent={props => <CustomDrawerContent {...props} />}
      >
        <Drawer.Screen
          name="(tabs)"
          options={{
            drawerLabel: 'Dashboard',
            headerShown: true,
            headerTitle: '',
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
