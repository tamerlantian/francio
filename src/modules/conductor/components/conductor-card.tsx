import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { ConductorResponse } from '../interfaces/conductor.interface';
import { conductorStyles } from '../styles/conductor.style';

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

interface ConductorCardProps {
  conductor: ConductorResponse;
  onPress?: (conductor: ConductorResponse) => void;
}

export const ConductorCard = ({ conductor, onPress }: ConductorCardProps) => {
  // Nombre completo del conductor
  const nombreCompleto = `${conductor.nombre1} ${
    conductor.nombre2 ? conductor.nombre2 + ' ' : ''
  }${conductor.apellido1} ${conductor.apellido2 || ''}`.trim();

  return (
    <TouchableOpacity
      style={conductorStyles.compactCard}
      onPress={() => onPress && onPress(conductor)}
      activeOpacity={0.7}
    >
      {/* Header compacto con nombre y estado */}
      <View style={conductorStyles.compactHeader}>
        <View style={conductorStyles.driverInfo}>
          <Text style={conductorStyles.driverName} numberOfLines={1}>
            {nombreCompleto}
          </Text>
          <Text style={conductorStyles.driverLocation} numberOfLines={1}>
            {conductor.ciudad__nombre}, {conductor.direccion}
          </Text>
        </View>
        <View style={conductorStyles.statusContainer}></View>
      </View>

      {/* Información clave en grid compacto */}
      <View style={conductorStyles.infoGrid}>
        <View style={conductorStyles.infoItem}>
          <Text style={conductorStyles.infoLabel}>ID</Text>
          <Text style={conductorStyles.infoValue} numberOfLines={1}>
            {conductor.numero_identificacion}
          </Text>
        </View>
        <View style={conductorStyles.infoItem}>
          <Text style={conductorStyles.infoLabel}>Licencia</Text>
          <Text style={conductorStyles.infoValue} numberOfLines={1}>
            {conductor.numero_licencia}
          </Text>
        </View>
        <View style={conductorStyles.infoItem}>
          <Text style={conductorStyles.infoLabel}>Categoría</Text>
          <Text style={conductorStyles.infoValue} numberOfLines={1}>
            {conductor.categoria_licencia__nombre}
          </Text>
        </View>
        <View style={conductorStyles.infoItem}>
          <Text style={conductorStyles.infoLabel}>Vence en</Text>
          <Text numberOfLines={1}>{formatExpirationDate(conductor.fecha_vence_licencia)}</Text>
        </View>
      </View>

      {/* Footer con tipo y contacto rápido */}
      {/* <View style={conductorStyles.compactFooter}>
        <View style={conductorStyles.quickActions}>
          {conductor.celular && (
            <TouchableOpacity
              style={conductorStyles.quickActionButton}
              onPress={() => console.log(`Llamar a ${conductor.celular}`)}
            >
              <Ionicons name="call" size={16} color="#0066cc" />
            </TouchableOpacity>
          )}
          {conductor.correo && (
            <TouchableOpacity
              style={conductorStyles.quickActionButton}
              onPress={() => console.log(`Enviar correo a ${conductor.correo}`)}
            >
              <Ionicons name="mail" size={16} color="#0066cc" />
            </TouchableOpacity>
          )}
        </View>
      </View> */}
    </TouchableOpacity>
  );
};
