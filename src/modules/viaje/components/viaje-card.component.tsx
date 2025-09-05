import { Text, TouchableOpacity, View } from 'react-native';
import { Viaje } from '../interfaces/viaje.interface';
import { viajeStyles } from '../styles/viaje.style';
import { Ionicons } from '@expo/vector-icons';
import { dateUtil } from '@/src/shared/utils/date.util';

export const ViajeCard = ({ viaje }: { viaje: Viaje }) => {
  const { datos } = viaje;

  return (
    <TouchableOpacity
      style={viajeStyles.travelCard}
      onPress={() => {
        // Aquí se puede navegar al detalle del viaje
        // router.push(`/viaje/${datos.id}`);
        console.log(`Ver detalle del viaje ${datos.id}`);
      }}
    >
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
            <Text style={viajeStyles.metricValue}>{datos.volumen}m³</Text>
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
