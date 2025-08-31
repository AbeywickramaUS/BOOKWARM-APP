import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import useAuthStore from '../store/authStore';
import styles from '../Bookstore/assets/styles/profile.styles';

export default function logoutButton() {
  const { logout } = useAuthStore();

  const confirmLogout = () => {
    // Show a confirmation dialog
    Alert.alert(
      "Confirm Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "OK", onPress: () => logout(), style: "destructive"  }
      ]
    );
  };

  return (
    <TouchableOpacity style={styles.logoutButton} onPress={confirmLogout}>
      <Ionicons name="log-out-outline" size={24} color="white" />
      <Text style={styles.logoutButtonText}>Logout</Text>
    </TouchableOpacity>
  )
}