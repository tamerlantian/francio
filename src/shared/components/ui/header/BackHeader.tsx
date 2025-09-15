import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

interface BackHeaderProps {
  title: string;
  onBack?: () => void;
}

export const BackHeader: React.FC<BackHeaderProps> = ({ title, onBack }) => {
  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <Ionicons name="chevron-back" size={24} color="#0066CC" />
      </TouchableOpacity>
      {/* <Text style={styles.title}>{title}</Text> */}
      <View style={styles.placeholder} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    padding: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    flex: 1,
    textAlign: 'center',
  },
  placeholder: {
    width: 32, // Mismo ancho que el botón de retroceso para mantener el título centrado
  },
});
