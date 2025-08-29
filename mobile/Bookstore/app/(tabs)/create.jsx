import { View, Text, TextInput, KeyboardAvoidingView, Platform, ScrollView, Button, Image } from 'react-native'
import { useState } from 'react';
import {useRouter} from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import styles from '../../assets/styles/create.styles.js';
import { useAuthStore } from '../../../store/authStore';
import { API_URL } from '../../constants/api';

export default function Create() {
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [rating, setRating] = useState(3);
  const [loading, setLoading] = useState(false);
  const [imageBase64, setImageBase64] = useState(null);

  const router = useRouter();
  const token = useAuthStore((state) => state.token);
  
  console.log(token);

  const pickImage = async () => {
    // Logic to pick an image from the device
  try {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
        return;
      }
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setImageBase64(result.assets[0].base64);
    } 
  } catch (error) {
    console.error("Error picking image:", error);
  }
  };

  const handleSubmit = async () => {
    // Logic to handle form submission
    if (!title || !caption || !imageBase64 || !rating) {
      alert("Please fill all fields and select an image.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/books`, {
        method: 'POST',
        headers: {
          authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          caption,
          image: imageBase64,
          rating,
        }),
      });

      if (response.ok) {
        alert("Book added successfully!");
        router.push('/'); // Navigate back to the main screen or book list
        setTitle("");
        setCaption("");
        setImage(null);
        setImageBase64(null);
        setRating(3);
      }

      setLoading(false);
    } catch (error) {
      console.error("Error adding book:", error);
      alert("Failed to add book. Please try again.");
      setLoading(false);
    }
  };

  const renderRatingPicker = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Text
          key={i}
          style={{
            fontSize: 24,
            color: i <= rating ? 'gold' : 'gray',
          }}
          onPress={() => setRating(i)}
        >
          ★
        </Text>
      );
    }
    return <View style={styles.ratingContainer}>{stars}</View>;
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.container} style={styles.scrollViewStyle}>
        <Text style={styles.header}>Add a New Book</Text>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder="Enter book title"
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Rating</Text>
          {renderRatingPicker()}
          <Text>Rating: {rating}</Text>
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Caption</Text>
          <TextInput
            style={[styles.input, { height: 100 }]}
            value={caption}
            onChangeText={setCaption}
            placeholder="Enter book caption"
            multiline
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Image</Text>
          <Button title="Pick an image" onPress={pickImage} />
          {image && <Image source={{ uri: image }} style={styles.imagePreview} />}
        </View>
        
        <Button title={loading ? "Submitting..." : "Submit"} onPress={handleSubmit} disabled={loading} />
      </ScrollView>
    </KeyboardAvoidingView>
  )
}