import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { VehiculoResponse } from '../interfaces/vehiculo.interface';
import { vehiculoStyles } from '../styles/vehiculo.style';

// Función para formatear fecha de vencimiento
const formatExpirationDate = (dateString: string | null | undefined) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = date.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return 'Vencida';
  if (diffDays <= 30) return `${diffDays}d`;
  if (diffDays <= 365) return `${Math.ceil(diffDays / 30)}m`;
  return `${Math.ceil(diffDays / 365)}a`;
};

// Función para obtener el color del estado según vencimiento
const getStatusColor = (dateString: string | null | undefined) => {
  if (!dateString) return '#666';
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = date.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return '#F44336'; // Rojo - vencida
  if (diffDays <= 30) return '#FF9800'; // Naranja - próximo a vencer
  return '#4CAF50'; // Verde - vigente
};

interface VehiculoCardProps {
  vehiculo: VehiculoResponse;
  onPress?: (_vehiculo: VehiculoResponse) => void;
}

export const VehiculoCard = ({ vehiculo, onPress }: VehiculoCardProps) => {
  const tecnicomecanicaColor = getStatusColor(vehiculo.vence_tecnicomecanica);
  const polizaColor = getStatusColor(vehiculo.vence_poliza);

  return (
    <TouchableOpacity
      style={vehiculoStyles.compactCard}
      onPress={() => onPress && onPress(vehiculo)}
      activeOpacity={0.7}
    >
      {/* Header compacto con placa y modelo */}
      <View style={vehiculoStyles.compactHeader}>
        <View style={vehiculoStyles.vehicleInfo}>
          <Text style={vehiculoStyles.vehiclePlate} numberOfLines={1}>
            {vehiculo.placa}
          </Text>
          <Text style={vehiculoStyles.vehicleModel} numberOfLines={1}>
            {vehiculo.modelo}{' '}
            {vehiculo.modelo_repotenciado ? `(${vehiculo.modelo_repotenciado})` : ''}
          </Text>
        </View>
        <View style={vehiculoStyles.statusContainer}>
          <View
            style={[
              vehiculoStyles.statusDot,
              { backgroundColor: vehiculo.verificado ? '#4CAF50' : '#F44336' },
            ]}
          />
        </View>
      </View>

      {/* Información clave en grid compacto */}
      <View style={vehiculoStyles.infoGrid}>
        <View style={vehiculoStyles.infoItem}>
          <Text style={vehiculoStyles.infoLabel}>Motor</Text>
          <Text style={vehiculoStyles.infoValue} numberOfLines={1}>
            {vehiculo.motor}
          </Text>
        </View>
        <View style={vehiculoStyles.infoItem}>
          <Text style={vehiculoStyles.infoLabel}>Capacidad</Text>
          <Text style={vehiculoStyles.infoValue} numberOfLines={1}>
            {vehiculo.capacidad} kg
          </Text>
        </View>
        <View style={vehiculoStyles.infoItem}>
          <Text style={vehiculoStyles.infoLabel}>Ejes</Text>
          <Text style={vehiculoStyles.infoValue} numberOfLines={1}>
            {vehiculo.ejes}
          </Text>
        </View>
        <View style={vehiculoStyles.infoItem}>
          <Text style={vehiculoStyles.infoLabel}>Tipo</Text>
          <Text style={vehiculoStyles.infoValue} numberOfLines={1}>
            {vehiculo.propio ? 'Propio' : 'Tercero'}
          </Text>
        </View>
      </View>

      {/* Información de vencimientos */}
      <View style={vehiculoStyles.expirationGrid}>
        <View style={vehiculoStyles.expirationItem}>
          <Text style={vehiculoStyles.expirationLabel}>Tecnomecánica</Text>
          <Text
            style={[vehiculoStyles.expirationValue, { color: tecnicomecanicaColor }]}
            numberOfLines={1}
          >
            {formatExpirationDate(vehiculo.vence_tecnicomecanica)}
          </Text>
        </View>
        <View style={vehiculoStyles.expirationItem}>
          <Text style={vehiculoStyles.expirationLabel}>Póliza</Text>
          <Text style={[vehiculoStyles.expirationValue, { color: polizaColor }]} numberOfLines={1}>
            {formatExpirationDate(vehiculo.vence_poliza)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
