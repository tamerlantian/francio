import { useLocalSearchParams } from 'expo-router';
import ConductorEditScreen from '@/src/modules/conductor/views/conductor-edit.screen';

export default function EditarConductor() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <ConductorEditScreen conductorId={id} />;
}
