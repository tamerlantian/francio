import CustomBottomSheet from '@/src/shared/components/bottom-sheet/bottom-sheet';
import { FormSearchableSelectorController } from '@/src/shared/components/ui/form/FormSearchableSelectorController';
import { useSearchableSelector } from '@/src/shared/hooks/use-searchable-selector.hook';
import { Ionicons } from '@expo/vector-icons';
import BottomSheet from '@gorhom/bottom-sheet';
import React, { forwardRef } from 'react';
import { useForm } from 'react-hook-form';
import { StyleSheet, Text, View } from 'react-native';
import { Viaje } from '../interfaces/viaje.interface';
import { FormButton } from '@/src/shared/components/ui/button/FormButton';
import { useCurrentUser } from '../../auth/view-models/auth.view-model';

export interface AsignarViajeFormValues {
  conductor_id: string;
  vehiculo_id: string;
  viaje_id: number;
}

interface AsignarViajeSheetProps {
  viaje: Viaje | null;
  onAceptar: (_data: AsignarViajeFormValues) => void;
  onClose?: () => void;
  isLoading?: boolean;
}

export const AsignarViajeSheet = forwardRef<BottomSheet, AsignarViajeSheetProps>(
  ({ viaje, onAceptar, onClose, isLoading = false }, ref) => {
    // Configuración de React Hook Form
    const { data: user } = useCurrentUser();
    const {
      control,
      handleSubmit,
      reset,
      formState: { errors, isValid },
    } = useForm<AsignarViajeFormValues>({
      defaultValues: {
        viaje_id: viaje?.datos.id || 0,
        conductor_id: '',
        vehiculo_id: '',
      },
      mode: 'onChange',
    });
    // Configuración de los selectores de búsqueda
    const conductorSelector = useSearchableSelector({
      endpoint: 'vertical/conductor/seleccionar/',
      labelField: 'nombre_corto',
      valueField: 'id',
      searchParam: 'nombre_corto__icontains',
      initialParams: {
        usuario_id: user?.id,
      },
      minSearchLength: 0,
      searchDebounceMs: 300,
      transformData(data) {
        return data.map(item => ({
          label: item.nombre_corto,
          value: item.id,
        }));
      },
    });

    const vehiculoSelector = useSearchableSelector({
      endpoint: 'vertical/vehiculo/seleccionar/',
      labelField: 'placa',
      valueField: 'id',
      searchParam: 'placa__icontains',
      initialParams: {
        usuario_id: user?.id,
      },
      minSearchLength: 0,
      searchDebounceMs: 300,
      transformData(data) {
        return data.map(item => ({
          label: `${item.placa}`,
          value: item.id,
        }));
      },
    });

    // Manejar el envío del formulario
    const onSubmit = (data: AsignarViajeFormValues) => {
      onAceptar(data);
    };

    const onCloseSheet = () => {
      onClose?.();
      reset();
    };

    // En lugar de retornar null, mostramos el componente con un estado de carga o vacío
    // Esto evita que el bottom sheet se cierre cuando viaje es null inicialmente

    return (
      <CustomBottomSheet ref={ref} initialSnapPoints={['30%', '50%']} onDismiss={onCloseSheet}>
        <View style={styles.bottomSheetContent}>
          <Text style={styles.bottomSheetTitle}>Asignar viaje</Text>
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
            <FormSearchableSelectorController
              control={control}
              name="conductor_id"
              label="Conductor"
              placeholder="Seleccionar conductor"
              searchPlaceholder="Buscar conductor..."
              options={conductorSelector.options}
              isLoading={conductorSelector.isLoading}
              isSearching={conductorSelector.isSearching}
              onSearch={conductorSelector.search}
              onRetry={conductorSelector.retry}
              restoreInitialOptions={conductorSelector.restoreInitialOptions}
              emptyOptionsMessage="No hay conductores disponibles"
              noResultsMessage="No se encontraron conductores"
              apiError={conductorSelector.error}
              error={errors.conductor_id}
              rules={{ required: 'El conductor es obligatorio' }}
            />

            <FormSearchableSelectorController
              control={control}
              name="vehiculo_id"
              label="Vehículo"
              placeholder="Seleccionar vehículo"
              searchPlaceholder="Buscar vehículo..."
              options={vehiculoSelector.options}
              isLoading={vehiculoSelector.isLoading}
              isSearching={vehiculoSelector.isSearching}
              onSearch={vehiculoSelector.search}
              onRetry={vehiculoSelector.retry}
              restoreInitialOptions={vehiculoSelector.restoreInitialOptions}
              emptyOptionsMessage="No hay vehículos disponibles"
              noResultsMessage="No se encontraron vehículos"
              apiError={vehiculoSelector.error}
              error={errors.vehiculo_id}
              rules={{ required: 'El vehículo es obligatorio' }}
            />
          </View>

          <FormButton
            onPress={handleSubmit(onSubmit)}
            isLoading={isLoading}
            disabled={!isValid}
            title="Aceptar viaje"
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
    marginBottom: 8,
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
    marginBottom: 14,
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
