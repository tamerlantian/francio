import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ErrorAlertProps {
  message: string;
  onDismiss?: () => void;
}

export const ErrorAlert: React.FC<ErrorAlertProps> = ({ message, onDismiss }) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons name="alert-circle" size={24} color="#FFFFFF" />
      </View>
      <Text style={styles.message}>{message}</Text>
      {onDismiss && (
        <TouchableOpacity style={styles.closeButton} onPress={onDismiss}>
          <Ionicons name="close" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#D32F2F',
    borderRadius: 8,
    padding: 12,
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  iconContainer: {
    marginRight: 12,
  },
  message: {
    color: '#FFFFFF',
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
  },
  closeButton: {
    padding: 4,
  },
});
