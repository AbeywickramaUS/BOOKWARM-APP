import {Tabs} from 'expo-router'

export default function TabLayout() {
  return (
    <Tabs>
        <Tabs.Screen name="Home" />
        <Tabs.Screen name="Create" />
        <Tabs.Screen name="Profile" />
    </Tabs>
  )
}