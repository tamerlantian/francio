import CustomBottomSheet from '@/src/shared/components/bottom-sheet/bottom-sheet';
import { DevModeSelector } from '@/src/shared/components/bottom-sheet/dev-mode-selector';
import { FormButton } from '@/src/shared/components/ui/button/FormButton';
import { FormInputController } from '@/src/shared/components/ui/form/FormInputController';
import { PasswordInputController } from '@/src/shared/components/ui/form/PasswordInputController';
import { Ionicons } from '@expo/vector-icons';
import BottomSheet from '@gorhom/bottom-sheet';
import Checkbox from 'expo-checkbox';
import { router } from 'expo-router';
import React, { useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RegisterFormValues } from '../interfaces/auth.interface';
import { loginStyles } from '../styles/login.style';
import { useRegister } from '../view-models/register.view-model';

export const RegisterScreen = () => {
  // ViewModel para registro
  const { register, isLoading } = useRegister();

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
    watch,
    formState: { errors, isValid },
  } = useForm<RegisterFormValues>({
    defaultValues: {
      username: '',
      password: '',
      aplicacion: 'reddoc',
      confirmarPassword: '',
      aceptarTerminosCondiciones: false,
    },
    mode: 'onChange',
  });

  // Obtener el valor actual de password para comparar con confirmPassword
  const password = watch('password');

  // Manejar envío del formulario
  const onSubmit = (data: RegisterFormValues) => {
    // Transformar los datos al formato esperado por el método register
    register({
      username: data.username,
      password: data.password,
      confirmarPassword: data.confirmarPassword,
      aceptarTerminosCondiciones: data.aceptarTerminosCondiciones,
      aplicacion: data.aplicacion,
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* Botón de modo desarrollador */}
      <TouchableOpacity style={loginStyles.devModeButton} onPress={handleOpenDevModeSheet}>
        <Ionicons name="settings" size={24} color="#666" className="mt-6" />
      </TouchableOpacity>

      <View style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={loginStyles.container}
          keyboardShouldPersistTaps="handled"
        >
          <View style={loginStyles.logoContainer}>
            <Image
              source={require('../../../../assets/images/icon.png')}
              style={loginStyles.logo}
            />
          </View>

          <Text style={loginStyles.title}>Crear Cuenta</Text>

          {/* Campo de email */}
          <FormInputController<RegisterFormValues>
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
          <PasswordInputController<RegisterFormValues>
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

          {/* Campo de confirmar contraseña */}
          <PasswordInputController<RegisterFormValues>
            control={control}
            name="confirmarPassword"
            label="Confirmar contraseña"
            placeholder="**************"
            error={errors.confirmarPassword}
            rules={{
              required: 'Debes confirmar tu contraseña',
              validate: (value: string) => value === password || 'Las contraseñas no coinciden',
            }}
          />

          {/* Checkbox para términos y condiciones */}
          <Controller
            control={control}
            name="aceptarTerminosCondiciones"
            rules={{ required: 'Debes aceptar los términos y condiciones' }}
            render={({ field: { onChange, value } }) => (
              <View style={loginStyles.checkboxContainer}>
                <Checkbox
                  value={value}
                  onValueChange={onChange}
                  color={value ? '#4630EB' : undefined}
                  style={loginStyles.checkbox}
                />
                <View style={loginStyles.termsContainer}>
                  <Text style={loginStyles.termsText}>
                    Acepto los{' '}
                    <Text
                      style={loginStyles.termsLink}
                      onPress={() => console.log('Términos presionados')}
                    >
                      términos y condiciones
                    </Text>
                  </Text>
                  {errors.aceptarTerminosCondiciones && (
                    <Text style={loginStyles.errorText}>
                      {errors.aceptarTerminosCondiciones.message}
                    </Text>
                  )}
                </View>
              </View>
            )}
          />

          {/* Botón de registro */}
          <FormButton
            title="Registrarse"
            onPress={handleSubmit(onSubmit)}
            disabled={!isValid}
            isLoading={isLoading}
          />

          {/* Enlace para iniciar sesión */}
          <View style={loginStyles.footer}>
            <Text style={loginStyles.footerText}>¿Ya tienes una cuenta?</Text>
            <TouchableOpacity
              onPress={() => {
                router.push('/(auth)/login');
              }}
            >
              <Text style={loginStyles.footerLink}>Iniciar Sesión</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* Bottom Sheet para el selector de modo desarrollador */}
        <CustomBottomSheet ref={bottomSheetRef} initialSnapPoints={['40%']}>
          <DevModeSelector onClose={handleCloseDevModeSheet} />
        </CustomBottomSheet>
      </View>
    </SafeAreaView>
  );
};
