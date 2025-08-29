import {Tabs} from 'expo-router'
import {Ionicons} from '@expo/vector-icons'
import colours from '../../constants/colors'
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#007AFF',
        headerTitleStyle : {
            color: colours.textPrimary,
            fontWeight: "600"
        },
        headerShadowVisible: false,

        tabBarStyle: {
            backgroundColor: colours.background,
            borderTopColor: colours.border,
            borderTopWidth: 1,
            paddingTop: 5,
            paddingBottom: insets.bottom,
            height: 60 + insets.bottom
        }
      }}
    >
      <Tabs.Screen name="Home" 
        options={{
          tabBarLabel: "Home",
          tabBarIcon: (color, size) => (<Ionicons name="home" size={size} color={color}/>)
        }}
      />
      <Tabs.Screen name="Create" 
        options={{
          tabBarLabel: "Create",
          tabBarIcon: ({ color, size }) => (<Ionicons name="add" size={size} color={color}/>)
        }}
      />
      <Tabs.Screen name="Profile" 
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (<Ionicons name="person" size={size} color={color}/>)
        }}
      />
    </Tabs>
  )
}