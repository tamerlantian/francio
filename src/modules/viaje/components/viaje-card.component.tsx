import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Viaje } from '../interfaces/viaje.interface';
import { viajeStyles } from '../styles/viaje.style';
import { Ionicons } from '@expo/vector-icons';
import { dateUtil } from '@/src/shared/utils/date.util';

interface ViajeCardProps {
  viaje: Viaje;
  onPress: (_viaje: Viaje) => void;
}

export const ViajeCard = ({ viaje, onPress }: ViajeCardProps) => {
  const { datos } = viaje;

  const handleCardPress = () => {
    onPress(viaje);
  };

  return (
    <TouchableOpacity style={viajeStyles.travelCard} onPress={handleCardPress}>
      {/* Travel Header */}
      <View style={viajeStyles.travelHeader}>
        <View style={viajeStyles.travelRouteContainer}>
          <View style={viajeStyles.travelRoute}>
            <Text style={viajeStyles.origin}>{datos.ciudad_origen__nombre}</Text>
            <Ionicons
              name="arrow-forward"
              size={16}
              color="#0066cc"
              style={viajeStyles.arrowIcon}
            />
            <Text style={viajeStyles.destination}>{datos.ciudad_destino__nombre}</Text>
          </View>
          <Text style={viajeStyles.travelDate}>{dateUtil.formatDate(datos.fecha)}</Text>
        </View>

        {/* Payment Badge */}
        <View style={styles.paymentBadge}>
          <Text style={styles.paymentText}>${datos.pago?.toLocaleString('es-CO') || '0'}</Text>
        </View>
      </View>

      {/* Travel Details */}
      <View style={viajeStyles.travelDetails}>
        <View style={viajeStyles.detailRow}>
          <Text style={viajeStyles.label}>Cliente:</Text>
          <Text style={viajeStyles.value}>{datos.cliente}</Text>
        </View>
        <View style={viajeStyles.detailRow}>
          <Text style={viajeStyles.label}>Servicio:</Text>
          <Text style={viajeStyles.value}>{datos.servicio__nombre}</Text>
        </View>
        <View style={viajeStyles.detailRow}>
          <Text style={viajeStyles.label}>Producto:</Text>
          <Text style={viajeStyles.value}>{datos.producto__nombre}</Text>
        </View>

        {/* Metrics Grid */}
        <View style={viajeStyles.metricsGrid}>
          <View style={viajeStyles.metricItem}>
            <Text style={viajeStyles.metricValue}>{datos.unidades}</Text>
            <Text style={viajeStyles.metricLabel}>Unidades</Text>
          </View>
          <View style={viajeStyles.metricItem}>
            <Text style={viajeStyles.metricValue}>{datos.peso}kg</Text>
            <Text style={viajeStyles.metricLabel}>Peso</Text>
          </View>
          <View style={viajeStyles.metricItem}>
            <Text style={viajeStyles.metricValue}>{datos.volumen}kg</Text>
            <Text style={viajeStyles.metricLabel}>Volumen</Text>
          </View>
          <View style={viajeStyles.metricItem}>
            <Text style={viajeStyles.metricValue}>{datos.puntos_entrega}</Text>
            <Text style={viajeStyles.metricLabel}>Puntos</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  paymentBadge: {
    backgroundColor: '#e6f7ee',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  paymentText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#00a650',
  },
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
