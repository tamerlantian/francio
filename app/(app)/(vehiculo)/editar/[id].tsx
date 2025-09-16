import { useLocalSearchParams } from 'expo-router';
import VehiculoEditScreen from '@/src/modules/vehiculo/views/vehiculo-edit.screen';

export default function EditarVehiculo() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <VehiculoEditScreen vehiculoId={id} />;
}
