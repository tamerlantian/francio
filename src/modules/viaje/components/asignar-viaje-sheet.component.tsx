import CustomBottomSheet from '@/src/shared/components/bottom-sheet/bottom-sheet';
import { FormSelectorController } from '@/src/shared/components/ui/form/FormSelectorController';
import { Ionicons } from '@expo/vector-icons';
import BottomSheet from '@gorhom/bottom-sheet';
import React, { forwardRef } from 'react';
import { useForm } from 'react-hook-form';
import { StyleSheet, Text, View } from 'react-native';
import { Viaje } from '../interfaces/viaje.interface';
import { FormButton } from '@/src/shared/components/ui/button/FormButton';
import { useAceptarViaje } from '../view-models/viaje.view-model';

export interface AsignarViajeFormValues {
  conductor_id: string;
  vehiculo_id: string;
  viaje_id: number;
}

interface AsignarViajeSheetProps {
  viaje: Viaje | null;
  onAceptar: (_data: AsignarViajeFormValues) => void;
  conductoresOptions: { label: string; value: string }[];
  vehiculosOptions: { label: string; value: string }[];
}

export const AsignarViajeSheet = forwardRef<BottomSheet, AsignarViajeSheetProps>(
  ({ viaje, onAceptar, conductoresOptions, vehiculosOptions }, ref) => {
    // Configuración de React Hook Form
    const {
      control,
      handleSubmit,
      formState: { errors, isValid },
    } = useForm<AsignarViajeFormValues>({
      defaultValues: {
        viaje_id: viaje?.datos.id || 0,
        conductor_id: '',
        vehiculo_id: '',
      },
      mode: 'onChange',
    });
    const { isLoading } = useAceptarViaje();

    // Manejar el envío del formulario
    const onSubmit = (data: AsignarViajeFormValues) => {
      onAceptar(data);
    };

    // En lugar de retornar null, mostramos el componente con un estado de carga o vacío
    // Esto evita que el bottom sheet se cierre cuando viaje es null inicialmente

    return (
      <CustomBottomSheet ref={ref} initialSnapPoints={['30%', '50%']}>
        <View style={styles.bottomSheetContent}>
          <Text style={styles.bottomSheetTitle}>Asignar Viaje</Text>
          <View style={styles.bottomSheetSubtitleContainer}>
            <Text style={styles.bottomSheetSubtitle}>
              {viaje?.datos?.ciudad_origen__nombre || 'Cargando...'}
            </Text>
            <Ionicons name="arrow-forward" size={16} color="#0066cc" style={styles.arrowIcon} />
            <Text style={styles.bottomSheetSubtitle}>
              {viaje?.datos?.ciudad_destino__nombre || 'Cargando...'}
            </Text>
          </View>

          <View style={styles.selectorsContainer}>
            <FormSelectorController
              control={control}
              name="conductor_id"
              label="Conductor"
              placeholder="Seleccionar conductor"
              options={conductoresOptions}
              error={errors.conductor_id}
              rules={{ required: 'El conductor es obligatorio' }}
            />

            <FormSelectorController
              control={control}
              name="vehiculo_id"
              label="Vehículo"
              placeholder="Seleccionar vehículo"
              options={vehiculosOptions}
              error={errors.vehiculo_id}
              rules={{ required: 'El vehículo es obligatorio' }}
            />
          </View>

          <FormButton
            onPress={handleSubmit(onSubmit)}
            isLoading={isLoading}
            disabled={!isValid}
            title="Aceptar Viaje"
          />
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
