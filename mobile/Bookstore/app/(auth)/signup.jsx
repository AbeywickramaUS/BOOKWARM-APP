import { View, Text, KeyboardAvoidingView, Platform, StyleSheet, TextInput } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function Signup() {
  const [username, setUsername] = useState('');

  return (
    <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.container}>
        <Text>Sign Up Screen</Text>
        <Text> BOOKWARM  </Text>
        <Text>Welcome to the Bookwarm app!</Text>

        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}> UserName</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="person-outline" size={20} color="#666" style={styles.icon} />
              <TextInput
                placeholder="Enter your username"
                placeholderTextColor="#666"
                style={styles.input}
                onChangeText={(text) => setUsername(text)}
                value={username}
                autoCapitalize="none"
              />
            </View>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}