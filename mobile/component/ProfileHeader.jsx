import { View, Text } from 'react-native'
import React from 'react'
import useAuthStore from '../store/authStore';
import styles from '../Bookstore/assets/styles/profile.styles';
import { Image } from "expo-image";
import { formatMemberSince } from '../lib/utils/';

export default function ProfileHeader() {
    const {user} = useAuthStore();

    if (!user) {
      return null;
    }

  return (
    <View style={styles.profileHeader}>
      <Image source={{ uri: user.profilePicture }} style={styles.profileImage} />

      <View style={styles.profileInfo}>
        <Text style={styles.profileName}>{user.name}</Text>
        <Text style={styles.profileEmail}>{user.email}</Text>
        <Text style = {styles.memberSince}> Join {formatMemberSince(user.createdAt)}</Text>
      </View>
    </View>
  );
}