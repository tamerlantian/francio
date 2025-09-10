import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface ErrorStateProps {
  title: string;
  subtitle?: string;
  buttonText?: string;
  onRetry?: () => void;
  icon?: keyof typeof Ionicons.glyphMap;
  iconColor?: string;
  style?: any;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title,
  subtitle,
  buttonText = 'Intentar nuevamente',
  onRetry,
  icon = 'alert-circle-outline',
  iconColor = '#F44336',
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <Ionicons name={icon} size={48} color={iconColor} />
      <Text style={styles.title}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      {onRetry && (
        <TouchableOpacity style={styles.button} onPress={onRetry}>
          <Text style={styles.buttonText}>{buttonText}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  title: {
    fontSize: 16,
    color: '#666',
    marginTop: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
    textAlign: 'center',
  },
  button: {
    marginTop: 16,
    padding: 12,
    backgroundColor: '#0066cc',
    borderRadius: 8,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
});
