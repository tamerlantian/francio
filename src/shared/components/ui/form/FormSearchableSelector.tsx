import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Modal,
  Animated,
  Dimensions,
  Easing,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export interface SearchableOption {
  label: string;
  value: string;
  searchableText?: string; // Additional text to search in
}

interface FormSearchableSelectorProps {
  label: string;
  placeholder?: string;
  searchPlaceholder?: string;
  options: SearchableOption[];
  value?: string;
  onValueChange: (_value: string) => void;
  onSearch?: (_searchTerm: string) => void;
  error?: string;
  isLoading?: boolean;
  isSearching?: boolean;
  onRetry?: () => void;
  emptyOptionsMessage?: string;
  noResultsMessage?: string;
  minSearchLength?: number;
  searchDebounceMs?: number;
  restoreInitialOptions?: () => void; // Nueva propiedad para restaurar opciones iniciales
  allowDeselection?: boolean; // Permite deseleccionar la opción actual
  clearSelectionText?: string; // Texto del botón de limpiar selección
}

export const FormSearchableSelector = ({
  label,
  placeholder = 'Seleccionar...',
  searchPlaceholder = 'Buscar...',
  options,
  value,
  onValueChange,
  onSearch,
  error,
  isLoading,
  isSearching,
  onRetry,
  emptyOptionsMessage,
  noResultsMessage = 'No se encontraron resultados',
  minSearchLength = 0,
  searchDebounceMs = 300,
  restoreInitialOptions, // Nueva propiedad para restaurar opciones iniciales
  allowDeselection = false, // Por defecto no permite deselección
  clearSelectionText = 'Limpiar selección', // Texto por defecto
}: FormSearchableSelectorProps) => {
  // Estado para controlar la visibilidad del modal
  const [modalVisible, setModalVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [localSearchTerm, setLocalSearchTerm] = useState('');

  // Referencias para debounce y animaciones
  const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(Dimensions.get('window').height)).current;

  // Find the selected option to display its label
  const selectedOption = options.find(option => option.value === value);

  // Filtrar opciones localmente si no hay función de búsqueda externa
  const filteredOptions = useMemo(() => {
    if (!localSearchTerm || localSearchTerm.length < minSearchLength) {
      return options;
    }

    const searchLower = localSearchTerm.toLowerCase();
    return options.filter(option => {
      const labelMatch = option.label.toLowerCase().includes(searchLower);
      const searchableMatch = option.searchableText?.toLowerCase().includes(searchLower);
      return labelMatch || searchableMatch;
    });
  }, [options, localSearchTerm, minSearchLength]);

  // Debounce para búsqueda externa
  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    if (onSearch && searchTerm.length >= minSearchLength) {
      searchTimeoutRef.current = setTimeout(() => {
        onSearch(searchTerm);
      }, searchDebounceMs);
    }

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchTerm, onSearch, minSearchLength, searchDebounceMs]);

  useEffect(() => {
    if (!modalVisible && searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [modalVisible]);

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

  // Abrir modal y limpiar búsqueda
  const openModal = () => {
    // Clear any pending timeouts
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    setSearchTerm('');
    setLocalSearchTerm('');
    setModalVisible(true);
  };

  // Cerrar modal con animación
  const closeModal = () => {
    // Clear search terms immediately to prevent stuck state
    setSearchTerm('');
    setLocalSearchTerm('');

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
      if (restoreInitialOptions) {
        restoreInitialOptions(); // Restaurar opciones iniciales al cerrar el modal
      }
    });
  };

  // Limpiar selección y cerrar modal
  const clearSelection = () => {
    onValueChange(''); // Limpiar la selección
    setSearchTerm('');
    setLocalSearchTerm('');

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
      // No restauramos opciones iniciales al limpiar selección
    });
  };

  // Manejar cambio en el input de búsqueda
  const handleSearchChange = (text: string) => {
    setSearchTerm(text);
    if (!onSearch) {
      // Si no hay función de búsqueda externa, usar filtrado local
      setLocalSearchTerm(text);
    }
  };

  // Determinar qué opciones mostrar
  const displayOptions = onSearch ? options : filteredOptions;
  const showNoResults =
    !isLoading &&
    !isSearching &&
    displayOptions.length === 0 &&
    (searchTerm.length >= minSearchLength || localSearchTerm.length >= minSearchLength);

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>{label}</Text>

      <TouchableOpacity
        style={[styles.selector, error ? styles.selectorError : null]}
        onPress={openModal}
        activeOpacity={0.7}
      >
        <Text style={[styles.selectorText, !selectedOption && styles.placeholderText]}>
          {selectedOption ? selectedOption.label : placeholder}
        </Text>
        <Ionicons name="chevron-down" size={20} color="#666" />
      </TouchableOpacity>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <Modal
        visible={modalVisible}
        animationType="none"
        transparent={true}
        onRequestClose={closeModal}
      >
        <Animated.View style={[styles.modalContainer, { opacity: fadeAnim }]}>
          <Animated.View style={[styles.modalContent, { transform: [{ translateY: slideAnim }] }]}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{label}</Text>
              <View style={styles.modalHeaderActions}>
                {allowDeselection && selectedOption && (
                  <TouchableOpacity onPress={clearSelection} style={styles.clearSelectionButton}>
                    <Ionicons name="trash-outline" size={20} color="#FF3B30" />
                    <Text style={styles.clearSelectionButtonText}>{clearSelectionText}</Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                  <Ionicons name="close" size={24} color="#333" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Barra de búsqueda */}
            <View style={styles.searchContainer}>
              <View style={styles.searchInputContainer}>
                <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
                <TextInput
                  style={styles.searchInput}
                  placeholder={searchPlaceholder}
                  value={searchTerm}
                  onChangeText={handleSearchChange}
                  autoCapitalize="none"
                  autoCorrect={false}
                  returnKeyType="search"
                />
                {(isSearching || (isLoading && searchTerm.length >= minSearchLength)) && (
                  <ActivityIndicator size="small" color="#0066CC" style={styles.searchLoader} />
                )}
                {searchTerm.length > 0 && (
                  <TouchableOpacity
                    onPress={() => handleSearchChange('')}
                    style={styles.clearButton}
                  >
                    <Ionicons name="close-circle" size={20} color="#666" />
                  </TouchableOpacity>
                )}
              </View>
            </View>

            {/* Estados de carga y error */}
            {isLoading && searchTerm.length === 0 && (
              <View style={styles.loaderContainer}>
                <ActivityIndicator size="small" color="#0066CC" />
                <Text style={styles.loaderText}>Cargando opciones...</Text>
              </View>
            )}

            {error && !isLoading && (
              <View style={styles.errorContainer}>
                <View style={styles.errorContent}>
                  <Ionicons
                    name="warning-outline"
                    size={20}
                    color="#FF3B30"
                    style={styles.errorIcon}
                  />
                  <Text style={styles.errorMessage}>Error al cargar opciones</Text>
                </View>
                {onRetry && (
                  <TouchableOpacity onPress={onRetry} style={styles.retryButton}>
                    <Ionicons
                      name="refresh-outline"
                      size={16}
                      color="#FFFFFF"
                      style={styles.retryIcon}
                    />
                    <Text style={styles.retryButtonText}>Reintentar</Text>
                  </TouchableOpacity>
                )}
              </View>
            )}

            {/* Sin opciones iniciales */}
            {!isLoading && !error && options.length === 0 && searchTerm.length === 0 && (
              <View style={styles.emptyContainer}>
                <Ionicons
                  name="information-circle-outline"
                  size={20}
                  color="#666"
                  style={styles.emptyIcon}
                />
                <Text style={styles.noOptionsText}>
                  {emptyOptionsMessage || 'No hay opciones disponibles'}
                </Text>
              </View>
            )}

            {/* Sin resultados de búsqueda */}
            {showNoResults && (
              <View style={styles.emptyContainer}>
                <Ionicons name="search-outline" size={20} color="#666" style={styles.emptyIcon} />
                <Text style={styles.noOptionsText}>{noResultsMessage}</Text>
              </View>
            )}

            {/* Lista de opciones */}
            <FlatList
              data={displayOptions}
              keyExtractor={item => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[styles.optionItem, item.value === value && styles.selectedOption]}
                  onPress={() => {
                    onValueChange(item.value);
                    // Al seleccionar una opción, cerramos el modal sin restaurar las opciones iniciales
                    setSearchTerm('');
                    setLocalSearchTerm('');

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
                      // No restauramos las opciones iniciales cuando se selecciona una opción
                    });
                  }}
                >
                  <Text
                    style={[styles.optionText, item.value === value && styles.selectedOptionText]}
                  >
                    {item.label}
                  </Text>
                  {item.value === value && <Ionicons name="checkmark" size={20} color="#0066CC" />}
                </TouchableOpacity>
              )}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
              keyboardShouldPersistTaps="handled"
            />
          </Animated.View>
        </Animated.View>
      </Modal>
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
  selectorText: {
    fontSize: 16,
    color: '#333',
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
    maxHeight: '85%',
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
    textAlign: 'center',
    fontWeight: '600',
    color: '#333',
  },
  modalHeaderActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  clearSelectionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    backgroundColor: '#FFF5F5',
    borderWidth: 1,
    borderColor: '#FFE5E5',
  },
  clearSelectionButtonText: {
    fontSize: 12,
    color: '#FF3B30',
    marginLeft: 4,
    fontWeight: '500',
  },
  closeButton: {
    padding: 4,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    paddingVertical: 4,
  },
  searchLoader: {
    marginLeft: 8,
  },
  clearButton: {
    marginLeft: 8,
    padding: 2,
  },
  optionItem: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedOption: {
    backgroundColor: '#f0f8ff',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  selectedOptionText: {
    color: '#0066CC',
    fontWeight: '500',
  },
  separator: {
    height: 1,
    backgroundColor: '#eee',
  },
  loaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  loaderText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: '#FFF5F5',
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FFE5E5',
  },
  errorContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  errorIcon: {
    marginRight: 8,
  },
  errorMessage: {
    fontSize: 14,
    color: '#FF3B30',
    flex: 1,
  },
  retryButton: {
    backgroundColor: '#0066CC',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  retryIcon: {
    marginRight: 4,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  emptyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  emptyIcon: {
    marginRight: 8,
  },
  noOptionsText: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
    textAlign: 'center',
  },
});
