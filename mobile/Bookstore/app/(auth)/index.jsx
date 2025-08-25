import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { useState } from 'react';
// Update the path below to the actual location of useAuthStore, for example:
import useAuthStore from '../../stores/useAuthStore';

export default function Index() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const {isLoading, login} = useAuthStore();

  const handleLogin = async () => {
    const result = await login({ email, password });
    if (result.success) {
      // Handle successful login (e.g., navigate to the main app)
    } else {
      // Handle login error (e.g., show error message)
    }
  };

  return (
    <KeyboardAvoidingView 
    style={{ flex: 1 }} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.container}>
        {/* Illustration */}
        <View style={styles.topIllustration}>
          <Image
            source={require('D:\practice project\BOOKWARM-APP\mobile\Bookstore\assets\images\Dictionary-bro.png')}
          style={styles.illustrationImage}
          resizeMode='contain'
        />
      </View>
      <View style={styles.card}>
        <View style={styles.formContainer}>
        <Text>Login Screen</Text>
        <Text>Email: {email}</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          keyboardType='email-address'
          autoCapitalize='none'
          placeholder="Enter your email"
          style={{ borderWidth: 1, padding: 8, marginTop: 10 }}
        />
        <Text>Password:</Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Enter your password"
          secureTextEntry={!showPassword}
          style={{ borderWidth: 1, padding: 8, marginTop: 10 }}
        />
        <TouchableOpacity onPress={() => setShowPassword(prev => !prev)}>
          <Text style={{ color: 'blue', marginTop: 5 }}>
            {showPassword ? 'Hide Password' : 'Show Password'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ backgroundColor: 'blue', padding: 10, marginTop: 15, borderRadius: 5 }} onPress={handleLogin}>
          <Text style={{ color: 'white', textAlign: 'center' }}>
            Login
          </Text>
        </TouchableOpacity>
        <View style={styles.footer}>
          <Text>Don&#39;t have an account?</Text>
          <TouchableOpacity onPress={() => {/* TODO: Navigate to signup screen */}}>
            <Text style={{ color: 'blue' }}>Sign Up</Text>
          </TouchableOpacity>
        </View>
        </View>
      </View>
    </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  topIllustration: {
    alignItems: 'center',
  },
});