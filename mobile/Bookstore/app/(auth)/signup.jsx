import { View, Text, KeyboardAvoidingView, Platform, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useAuthStore } from '../path/to/your/authStore'; // Update the path as needed

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function Signup() {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const {user, isLoading, register} = useAuthStore();



  const router = useRouter();

  const handleSignup = () => {};

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
            {/** UserName Input */}
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
          <View style={styles.inputContainer}>
            {/** Email Input */}
            <Text style={styles.label}> Email</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="mail-outline" size={20} color="#666" style={styles.icon} />
              <TextInput
                placeholder="Enter your email"
                placeholderTextColor="#666"
                style={styles.input}
                onChangeText={(text) => setEmail(text)}
                value={email}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>
          <View style={styles.inputContainer}>
            {/** Password Input */}
            <Text style={styles.label}> Password</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="lock-closed-outline" size={20} color="#666" style={styles.icon} />
              <TextInput
                placeholder="Enter your password"
                placeholderTextColor="#666"
                style={styles.input}
                onChangeText={(text) => setPassword(text)}
                value={password}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />
              <Ionicons
                name={showPassword ? "eye-off-outline" : "eye-outline"}
                size={20}
                color="#666"
                style={styles.icon}
                onPress={() => setShowPassword(!showPassword)}
              />
            </View>
          </View>
          {/** Sign Up Button */}
          <TouchableOpacity style={styles.button} onPress={handleSignup} disabled={isLoading}>
            <Text style={styles.buttonText}>
              {isLoading ? 'Signing Up...' : 'Sign Up'}
            </Text>
          </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.footerLink}>Log In</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.footerLink}>Log In</Text>
            </TouchableOpacity>
          </View>
        </View>
    </KeyboardAvoidingView>
  )
}