import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import CustomBottomSheet from '../../../shared/components/bottom-sheet/bottom-sheet';
import { useCreateUser } from '../view-models/user.view-model';

export interface UserFormSheetRef {
  open: () => void;
  close: () => void;
}

interface UserFormSheetProps {
  onSuccess?: () => void;
}

const UserFormSheet = forwardRef<UserFormSheetRef, UserFormSheetProps>(({ onSuccess }, ref) => {
  // Referencias y estados
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');

  // Hook para crear usuario
  const createUserMutation = useCreateUser();

  // Exponer métodos al componente padre
  useImperativeHandle(ref, () => ({
    open: () => {
      bottomSheetRef.current?.expand();
    },
    close: () => {
      bottomSheetRef.current?.close();
    },
  }));

  // Manejar envío del formulario
  const handleSubmit = () => {
    if (!name || !email || !username) {
      // Aquí podrías mostrar un mensaje de error
      return;
    }

    createUserMutation.mutate(
      {
        name,
        email,
        username,
      },
      {
        onSuccess: () => {
          // Limpiar formulario
          setName('');
          setEmail('');
          setUsername('');

          // Cerrar bottom sheet
          bottomSheetRef.current?.close();

          // Notificar al componente padre
          onSuccess?.();
        },
      },
    );
  };

  return (
    <CustomBottomSheet ref={bottomSheetRef} initialSnapPoints={['70%']}>
      <View style={styles.container}>
        <Text style={styles.title}>Crear nuevo usuario</Text>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Nombre</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Ingresa el nombre"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Ingresa el email"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Usuario</Text>
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={setUsername}
            placeholder="Ingresa el nombre de usuario"
            autoCapitalize="none"
          />
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit}
          disabled={createUserMutation.isPending}
        >
          <Text style={styles.buttonText}>
            {createUserMutation.isPending ? 'Creando...' : 'Crear usuario'}
          </Text>
        </TouchableOpacity>

        {createUserMutation.isError && (
          <Text style={styles.errorText}>Error: {createUserMutation.error.message}</Text>
        )}
      </View>
    </CustomBottomSheet>
  );
});

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#333',
    textAlign: 'center',
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#555',
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  button: {
    backgroundColor: '#1890ff',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  errorText: {
    color: '#ff4d4f',
    marginTop: 16,
    textAlign: 'center',
  },
});

// Agregar displayName para evitar advertencia de lint
UserFormSheet.displayName = 'UserFormSheet';

export default UserFormSheet;
