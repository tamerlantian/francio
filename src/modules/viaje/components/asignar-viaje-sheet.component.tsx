import React, { forwardRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Viaje } from '../interfaces/viaje.interface';
import CustomBottomSheet from '@/src/shared/components/bottom-sheet/bottom-sheet';
import { FormSelector } from '@/src/shared/components/ui/form/FormSelector';
import BottomSheet from '@gorhom/bottom-sheet';
import { Ionicons } from '@expo/vector-icons';

interface AsignarViajeSheetProps {
  viaje: Viaje | null;
  selectedConductor: string;
  selectedVehiculo: string;
  onConductorChange: (_value: string) => void;
  onVehiculoChange: (_value: string) => void;
  onAceptar: () => void;
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
            <FormSelector
              label="Conductor"
              placeholder="Seleccionar conductor"
              options={conductoresOptions}
              value={selectedConductor}
              onValueChange={onConductorChange}
            />

            <FormSelector
              label="Vehículo"
              placeholder="Seleccionar vehículo"
              options={vehiculosOptions}
              value={selectedVehiculo}
              onValueChange={onVehiculoChange}
            />
          </View>

          <TouchableOpacity
            style={[
              styles.acceptButton,
              (!selectedConductor || !selectedVehiculo) && styles.acceptButtonDisabled,
            ]}
            onPress={onAceptar}
            disabled={!selectedConductor || !selectedVehiculo}
          >
            <Text
              style={[
                styles.acceptButtonText,
                (!selectedConductor || !selectedVehiculo) && styles.acceptButtonTextDisabled,
              ]}
            >
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
