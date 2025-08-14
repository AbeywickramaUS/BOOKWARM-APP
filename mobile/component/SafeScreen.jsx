import { View, Text } from 'react-native'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import COLORS from '../constants/Colors'

export default function SafeScreen({children}) {
  const insets = useSafeAreaInsets()
  return (
    <View style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
})
