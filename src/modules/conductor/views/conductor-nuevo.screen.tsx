import CustomBottomSheet from '@/src/shared/components/bottom-sheet/bottom-sheet';
import { Text, View } from 'react-native';

export default function ConductorNuevoScreen() {
  return (
    <CustomBottomSheet initialSnapPoints={['25%', '50%', '75%']}>
      <View>
        <Text>Conductor Nuevo</Text>
      </View>
    </CustomBottomSheet>
  );
}
