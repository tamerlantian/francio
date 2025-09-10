import React, { forwardRef, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Viaje } from '../interfaces/viaje.interface';
import CustomBottomSheet from '@/src/shared/components/bottom-sheet/bottom-sheet';
import BottomSheet from '@gorhom/bottom-sheet';
import { Ionicons } from '@expo/vector-icons';
import { useForm } from 'react-hook-form';
import { FormSelectorController } from '@/src/shared/components/ui/form/FormSelectorController';

interface FormValues {
  conductor: string;
  vehiculo: string;
}

interface AsignarViajeSheetProps {
  viaje: Viaje | null;
  selectedConductor: string;
  selectedVehiculo: string;
  onConductorChange: (_value: string) => void;
  onVehiculoChange: (_value: string) => void;
  onAceptar: (_data: FormValues) => void;
  conductoresOptions: { label: string; value: string }[];
  vehiculosOptions: { label: string; value: string }[];
}

export const AsignarViajeSheet = forwardRef<BottomSheet, AsignarViajeSheetProps>(
  (
    {
      viaje,
      selectedConductor,
      selectedVehiculo,
      onConductorChange,
      onVehiculoChange,
      onAceptar,
      conductoresOptions,
      vehiculosOptions,
    },
    ref,
  ) => {
    // Configuración de React Hook Form
    const {
      control,
      handleSubmit,
      formState: { errors, isValid },
      setValue,
      watch,
    } = useForm<FormValues>({
      defaultValues: {
        conductor: selectedConductor,
        vehiculo: selectedVehiculo,
      },
      mode: 'onChange',
    });

    // Observar cambios en los campos para actualizar el estado externo
    const conductorValue = watch('conductor');
    const vehiculoValue = watch('vehiculo');

    useEffect(() => {
      if (conductorValue !== selectedConductor) {
        onConductorChange(conductorValue);
      }
    }, [conductorValue, selectedConductor, onConductorChange]);

    useEffect(() => {
      if (vehiculoValue !== selectedVehiculo) {
        onVehiculoChange(vehiculoValue);
      }
    }, [vehiculoValue, selectedVehiculo, onVehiculoChange]);

    // Actualizar valores del formulario cuando cambian las props
    useEffect(() => {
      setValue('conductor', selectedConductor);
      setValue('vehiculo', selectedVehiculo);
    }, [selectedConductor, selectedVehiculo, setValue]);

    // Manejar el envío del formulario
    const onSubmit = (data: FormValues) => {
      onAceptar(data);
    };

    if (!viaje) return null;

    return (
      <CustomBottomSheet ref={ref} initialSnapPoints={['30%', '50%']}>
        <View style={styles.bottomSheetContent}>
          <Text style={styles.bottomSheetTitle}>Asignar Viaje</Text>
          <View style={styles.bottomSheetSubtitleContainer}>
            <Text style={styles.bottomSheetSubtitle}>{viaje.datos.ciudad_origen__nombre}</Text>
            <Ionicons name="arrow-forward" size={16} color="#0066cc" style={styles.arrowIcon} />
            <Text style={styles.bottomSheetSubtitle}>{viaje.datos.ciudad_destino__nombre}</Text>
          </View>

          <View style={styles.selectorsContainer}>
            <FormSelectorController
              control={control}
              name="conductor"
              label="Conductor"
              placeholder="Seleccionar conductor"
              options={conductoresOptions}
              error={errors.conductor}
              rules={{ required: 'El conductor es obligatorio' }}
            />

            <FormSelectorController
              control={control}
              name="vehiculo"
              label="Vehículo"
              placeholder="Seleccionar vehículo"
              options={vehiculosOptions}
              error={errors.vehiculo}
              rules={{ required: 'El vehículo es obligatorio' }}
            />
          </View>

          <TouchableOpacity
            style={[styles.acceptButton, !isValid && styles.acceptButtonDisabled]}
            onPress={handleSubmit(onSubmit)}
            disabled={!isValid}
          >
            <Text style={[styles.acceptButtonText, !isValid && styles.acceptButtonTextDisabled]}>
              Aceptar Viaje
            </Text>
          </TouchableOpacity>
        </View>
      </CustomBottomSheet>
    );
  },
);

// Agregar displayName para evitar advertencia de lint
AsignarViajeSheet.displayName = 'AsignarViajeSheet';

const styles = StyleSheet.create({
  bottomSheetContent: {
    flex: 1,
    paddingHorizontal: 16,
  },
  bottomSheetTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 8,
  },
  bottomSheetSubtitleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
  },
  arrowIcon: {
    marginHorizontal: 8,
    marginTop: 2,
  },
  bottomSheetSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
  },
  selectorsContainer: {
    marginBottom: 24,
  },
  acceptButton: {
    backgroundColor: '#0066cc',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 20,
  },
  acceptButtonDisabled: {
    backgroundColor: '#cccccc',
  },
  acceptButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  acceptButtonTextDisabled: {
    color: '#999999',
  },
});
