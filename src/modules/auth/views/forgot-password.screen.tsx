import { FormButton } from '@/src/shared/components/ui/button/FormButton';
import { FormInputController } from '@/src/shared/components/ui/form/FormInputController';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ForgotPasswordFormValues } from '../models/Auth';
import { loginStyles } from '../styles/login.style';
import { useForgotPassword } from '../view-models/forgot-password.view-model';

export const ForgotPasswordScreen = () => {
  // ViewModel para recuperación de contraseña
  const { forgotPassword, isLoading } = useForgotPassword();

  // Configurar React Hook Form
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ForgotPasswordFormValues>({
    defaultValues: {
      username: '',
    },
    mode: 'onChange',
  });

  // Manejar envío del formulario
  const onSubmit = (data: ForgotPasswordFormValues) => {
    forgotPassword(data);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={loginStyles.container} keyboardShouldPersistTaps="handled">
        <View style={loginStyles.logoContainer}>
          <Image source={require('../../../../assets/images/icon.png')} style={loginStyles.logo} />
        </View>

        <Text style={loginStyles.title}>Recuperar Contraseña</Text>
        <Text
          style={{
            textAlign: 'center',
            marginBottom: 20,
            color: '#666',
            fontSize: 16,
          }}
        >
          Ingresa tu correo electrónico y te enviaremos instrucciones para restablecer tu contraseña
        </Text>

        {/* Campo de email */}
        <FormInputController<ForgotPasswordFormValues>
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

        {/* Botón de enviar */}
        <FormButton
          title="Enviar Instrucciones"
          onPress={handleSubmit(onSubmit)}
          disabled={!isValid}
          isLoading={isLoading}
        />

        {/* Enlace para volver al login */}
        <View style={loginStyles.footer}>
          <TouchableOpacity
            onPress={() => {
              router.back();
            }}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 20,
            }}
          >
            <Ionicons name="arrow-back" size={16} color="#007aff" />
            <Text style={[loginStyles.footerLink, { marginLeft: 5 }]}>Volver a Iniciar Sesión</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
