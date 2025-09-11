import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Animated,
  Dimensions,
  Easing,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';

interface FormDatePickerProps {
  label: string;
  placeholder?: string;
  value?: string;
  onValueChange: (value: string) => void;
  error?: string;
  minimumDate?: Date;
  maximumDate?: Date;
  mode?: 'date' | 'time' | 'datetime';
  format?: 'YYYY-MM-DD' | 'DD/MM/YYYY' | 'MM/DD/YYYY';
}

export const FormDatePicker = ({
  label,
  placeholder = 'Seleccionar fecha...',
  value,
  onValueChange,
  error,
  minimumDate,
  maximumDate,
  mode = 'date',
  format = 'YYYY-MM-DD',
}: FormDatePickerProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(value ? new Date(value) : new Date());

  // Animaciones
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(Dimensions.get('window').height)).current;

  // Formatear fecha según el formato especificado
  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    switch (format) {
      case 'DD/MM/YYYY':
        return `${day}/${month}/${year}`;
      case 'MM/DD/YYYY':
        return `${month}/${day}/${year}`;
      case 'YYYY-MM-DD':
      default:
        return `${year}-${month}-${day}`;
    }
  };

  // Efectos de animación cuando el modal cambia de visibilidad
  useEffect(() => {
    if (modalVisible) {
      // Animación de entrada
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 400,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 400,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // Animación de salida
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          easing: Easing.in(Easing.ease),
          useNativeDriver: true,
          delay: 50,
        }),
        Animated.timing(slideAnim, {
          toValue: Dimensions.get('window').height,
          duration: 300,
          easing: Easing.in(Easing.cubic),
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [modalVisible, fadeAnim, slideAnim]);

  // Abrir modal
  const openModal = () => {
    if (value) {
      setSelectedDate(new Date(value));
    }
    setModalVisible(true);
  };

  // Cerrar modal
  const closeModal = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        easing: Easing.in(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: Dimensions.get('window').height,
        duration: 300,
        easing: Easing.in(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start(() => {
      setModalVisible(false);
    });
  };

  // Manejar cambio de fecha
  const handleDateChange = (event: any, date?: Date) => {
    if (Platform.OS === 'android') {
      setModalVisible(false);
    }

    if (date) {
      setSelectedDate(date);
      if (Platform.OS === 'android') {
        onValueChange(formatDate(date));
      }
    }
  };

  // Confirmar selección (iOS)
  const confirmSelection = () => {
    onValueChange(formatDate(selectedDate));
    closeModal();
  };

  // Cancelar selección (iOS)
  const cancelSelection = () => {
    if (value) {
      setSelectedDate(new Date(value));
    }
    closeModal();
  };

  const displayValue = value ? formatDate(new Date(value)) : '';

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>{label}</Text>

      <TouchableOpacity
        style={[styles.selector, error ? styles.selectorError : null]}
        onPress={openModal}
        activeOpacity={0.7}
      >
        <View style={styles.selectorContent}>
          <Ionicons name="calendar-outline" size={20} color="#666" style={styles.calendarIcon} />
          <Text style={[styles.selectorText, !displayValue && styles.placeholderText]}>
            {displayValue || placeholder}
          </Text>
        </View>
        <Ionicons name="chevron-down" size={20} color="#666" />
      </TouchableOpacity>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      {Platform.OS === 'ios' ? (
        <Modal
          visible={modalVisible}
          animationType="none"
          transparent={true}
          onRequestClose={closeModal}
        >
          <Animated.View style={[styles.modalContainer, { opacity: fadeAnim }]}>
            <Animated.View
              style={[styles.modalContent, { transform: [{ translateY: slideAnim }] }]}
            >
              <View style={styles.modalHeader}>
                <TouchableOpacity onPress={cancelSelection} style={styles.headerButton}>
                  <Text style={styles.cancelButtonText}>Cancelar</Text>
                </TouchableOpacity>
                <Text style={styles.modalTitle}>{label}</Text>
                <TouchableOpacity onPress={confirmSelection} style={styles.headerButton}>
                  <Text style={styles.confirmButtonText}>Confirmar</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.datePickerContainer}>
                <DateTimePicker
                  value={selectedDate}
                  mode={mode}
                  display="spinner"
                  onChange={handleDateChange}
                  minimumDate={minimumDate}
                  maximumDate={maximumDate}
                  textColor="#333"
                />
              </View>
            </Animated.View>
          </Animated.View>
        </Modal>
      ) : (
        modalVisible && (
          <DateTimePicker
            value={selectedDate}
            mode={mode}
            display="default"
            onChange={handleDateChange}
            minimumDate={minimumDate}
            maximumDate={maximumDate}
          />
        )
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 8,
    color: '#555',
    fontWeight: '500',
  },
  selector: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectorError: {
    borderColor: '#ff3b30',
    backgroundColor: '#fff5f5',
  },
  selectorContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  calendarIcon: {
    marginRight: 8,
  },
  selectorText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  placeholderText: {
    color: '#999',
  },
  errorText: {
    color: '#ff3b30',
    fontSize: 14,
    marginTop: 5,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingBottom: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flex: 1,
    textAlign: 'center',
  },
  headerButton: {
    minWidth: 80,
  },
  cancelButtonText: {
    fontSize: 16,
    color: '#666',
  },
  confirmButtonText: {
    fontSize: 16,
    color: '#0066CC',
    fontWeight: '600',
    textAlign: 'right',
  },
  datePickerContainer: {
    paddingHorizontal: 50,
    paddingVertical: 20,
  },
});
