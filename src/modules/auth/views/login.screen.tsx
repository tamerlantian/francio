import CustomBottomSheet from '@/src/shared/components/bottom-sheet/bottom-sheet';
import { DevModeSelector } from '@/src/shared/components/bottom-sheet/dev-mode-selector';
import { FormButton } from '@/src/shared/components/ui/button/FormButton';
import { FormInputController } from '@/src/shared/components/ui/form/FormInputController';
import { PasswordInputController } from '@/src/shared/components/ui/form/PasswordInputController';
import { Ionicons } from '@expo/vector-icons';
import BottomSheet from '@gorhom/bottom-sheet';
import { router } from 'expo-router';
import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LoginFormValues } from '../interfaces/auth.interface';
import { loginStyles } from '../styles/login.style';
import { useLogin } from '../view-models/login.view-model';

export const LoginScreen = () => {
  // ViewModel para login
  const { login, isLoading } = useLogin();

  // Referencia al bottom sheet
  const bottomSheetRef = useRef<BottomSheet>(null);

  // Función para abrir el bottom sheet
  const handleOpenDevModeSheet = () => {
    bottomSheetRef.current?.expand();
  };

  // Función para cerrar el bottom sheet
  const handleCloseDevModeSheet = () => {
    bottomSheetRef.current?.close();
  };

  // Configurar React Hook Form
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormValues>({
    defaultValues: {
      username: '',
      password: '',
    },
    mode: 'onChange',
  });

  // Manejar envío del formulario
  const onSubmit = (data: LoginFormValues) => {
    login(data);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* Botón de modo desarrollador */}
      <TouchableOpacity style={loginStyles.devModeButton} onPress={handleOpenDevModeSheet}>
        <Ionicons name="settings" size={24} color="#666" className="mt-6" />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={loginStyles.container} keyboardShouldPersistTaps="handled">
        <View style={loginStyles.logoContainer}>
          <Image source={require('../../../../assets/images/icon.png')} style={loginStyles.logo} />
        </View>

        <Text style={loginStyles.title}>Iniciar Sesión</Text>

        {/* Campo de email */}
        <FormInputController<LoginFormValues>
          control={control}
          name="username"
          label="Correo electrónico"
          placeholder="john.doe@example.com"
          keyboardType="email-address"
          autoCapitalize="none"
          error={errors.username}
          rules={{
            required: 'El correo electrónico es obligatorio',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Correo electrónico inválido',
            },
          }}
        />

        {/* Campo de contraseña */}
        <PasswordInputController<LoginFormValues>
          control={control}
          name="password"
          label="Contraseña"
          placeholder="**************"
          error={errors.password}
          rules={{
            required: 'La contraseña es obligatoria',
            minLength: {
              value: 6,
              message: 'La contraseña debe tener al menos 6 caracteres',
            },
          }}
        />
        {/* Enlace para recuperar contraseña */}
        <TouchableOpacity
          style={loginStyles.forgotPassword}
          onPress={() => {
            router.push('/(auth)/forgot-password');
          }}
        >
          <Text style={loginStyles.forgotPasswordText}>¿Olvidaste tu contraseña?</Text>
        </TouchableOpacity>

        {/* Botón de login */}
        <FormButton
          title="Iniciar Sesión"
          onPress={handleSubmit(onSubmit)}
          disabled={!isValid}
          isLoading={isLoading}
        />

        {/* Enlace para registrarse */}
        <View style={loginStyles.footer}>
          <Text style={loginStyles.footerText}>¿No tienes una cuenta?</Text>
          <TouchableOpacity
            onPress={() => {
              router.push('/(auth)/register');
            }}
          >
            <Text style={loginStyles.footerLink}>Regístrate</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Sheet para el selector de modo desarrollador */}
      <CustomBottomSheet ref={bottomSheetRef} initialSnapPoints={['40%']}>
        <DevModeSelector onClose={handleCloseDevModeSheet} />
      </CustomBottomSheet>
    </SafeAreaView>
  );
};
