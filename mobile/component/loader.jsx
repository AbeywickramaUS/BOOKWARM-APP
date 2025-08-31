import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'

export default function loader({size = "large"}) {
  return (
    <View style={
      { flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: '#fff'
      }
    }>
      <ActivityIndicator size={size} color="#0000ff" />
    </View>
  )
}