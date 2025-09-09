import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Conductor } from '../interfaces/conductor.interface';
import { conductorStyles } from '../styles/conductor.style';

// Función para formatear fecha
const formatDate = (dateString: string | null | undefined) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

interface ConductorCardProps {
  conductor: Conductor;
  onPress?: (_conductor: Conductor) => void;
}

export const ConductorCard = ({ conductor, onPress }: ConductorCardProps) => {
  // Nombre completo del conductor
  const nombreCompleto = `${conductor.nombre1} ${conductor.nombre2 ? conductor.nombre2 + ' ' : ''}
    ${conductor.apellido1} ${conductor.apellido2 || ''}`.trim();

  // Estado del conductor (activo/inactivo)
  const isActive = !conductor.estado_inactivo;

  return (
    <TouchableOpacity
      style={conductorStyles.conductorCard}
      onPress={() => onPress && onPress(conductor)}
    >
      {/* Conductor Header */}
      <View style={conductorStyles.conductorHeader}>
        <View style={conductorStyles.nameContainer}>
          <Text style={conductorStyles.fullName}>{nombreCompleto}</Text>
          <Text style={conductorStyles.identification}>
            {conductor.identificacion__nombre}: {conductor.numero_identificacion}
          </Text>
        </View>
        <View
          style={[
            conductorStyles.statusBadge,
            { backgroundColor: isActive ? '#e6f7ff' : '#fff1f0' },
          ]}
        >
          <Text style={[conductorStyles.statusText, { color: isActive ? '#0066cc' : '#f5222d' }]}>
            {isActive ? 'Activo' : 'Inactivo'}
          </Text>
        </View>
      </View>

      {/* Conductor Details */}
      <View style={conductorStyles.conductorDetails}>
        <View style={conductorStyles.detailRow}>
          <Text style={conductorStyles.label}>Ciudad:</Text>
          <Text style={conductorStyles.value}>{conductor.ciudad__nombre}</Text>
        </View>
        <View style={conductorStyles.detailRow}>
          <Text style={conductorStyles.label}>Estado:</Text>
          <Text style={conductorStyles.value}>{conductor.ciudad__estado__nombre}</Text>
        </View>
        <View style={conductorStyles.detailRow}>
          <Text style={conductorStyles.label}>Tipo:</Text>
          <Text style={conductorStyles.value}>{conductor.propio ? 'Propio' : 'Externo'}</Text>
        </View>

        {/* License Info */}
        <View style={conductorStyles.licenseInfo}>
          <View style={conductorStyles.licenseRow}>
            <Text style={conductorStyles.licenseLabel}>Licencia:</Text>
            <Text style={conductorStyles.licenseValue}>{conductor.numero_licencia}</Text>
          </View>
          <View style={conductorStyles.licenseRow}>
            <Text style={conductorStyles.licenseLabel}>Categoría:</Text>
            <Text style={conductorStyles.licenseValue}>{conductor.categoria_licencia}</Text>
          </View>
          <View style={conductorStyles.licenseRow}>
            <Text style={conductorStyles.licenseLabel}>Vence:</Text>
            <Text style={conductorStyles.licenseValue}>
              {formatDate(conductor.fecha_vence_licencia)}
            </Text>
          </View>
        </View>

        {/* Contact Buttons */}
        <View style={conductorStyles.contactContainer}>
          {conductor.celular && (
            <TouchableOpacity
              style={conductorStyles.contactButton}
              onPress={() => console.log(`Llamar a ${conductor.celular}`)}
            >
              <Ionicons name="call-outline" size={16} color="#0066cc" />
              <Text style={conductorStyles.contactButtonText}>{conductor.celular}</Text>
            </TouchableOpacity>
          )}
          {conductor.correo && (
            <TouchableOpacity
              style={conductorStyles.contactButton}
              onPress={() => console.log(`Enviar correo a ${conductor.correo}`)}
            >
              <Ionicons name="mail-outline" size={16} color="#0066cc" />
              <Text style={conductorStyles.contactButtonText}>Correo</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};
