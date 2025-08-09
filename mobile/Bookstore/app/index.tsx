import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function Index() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: isDark ? '#0f0f0f' : '#ffffff',
    },
    header: {
      paddingTop: 60,
      paddingHorizontal: 20,
      paddingBottom: 30,
      backgroundColor: isDark ? '#1a1a1a' : '#f8f9fa',
    },
    headerTitle: {
      fontSize: 32,
      fontWeight: 'bold',
      color: isDark ? '#ffffff' : '#1a1a1a',
      textAlign: 'center',
      marginBottom: 8,
    },
    headerSubtitle: {
      fontSize: 16,
      color: isDark ? '#a0a0a0' : '#666666',
      textAlign: 'center',
    },
    content: {
      flex: 1,
      paddingHorizontal: 20,
    },
    welcomeCard: {
      backgroundColor: isDark ? '#1e1e1e' : '#ffffff',
      borderRadius: 16,
      padding: 24,
      marginBottom: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 3,
    },
    cardTitle: {
      fontSize: 24,
      fontWeight: '600',
      color: isDark ? '#ffffff' : '#1a1a1a',
      marginBottom: 12,
    },
    cardDescription: {
      fontSize: 16,
      lineHeight: 24,
      color: isDark ? '#cccccc' : '#555555',
    },
    featuresCard: {
      backgroundColor: isDark ? '#1e1e1e' : '#ffffff',
      borderRadius: 16,
      padding: 24,
      marginBottom: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 3,
    },
    featureItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
    },
    featureEmoji: {
      fontSize: 20,
      marginRight: 12,
    },
    featureText: {
      fontSize: 16,
      color: isDark ? '#cccccc' : '#555555',
      flex: 1,
    },
    buttonContainer: {
      flexDirection: 'row',
      gap: 12,
      marginBottom: 20,
    },
    primaryButton: {
      flex: 1,
      backgroundColor: '#007AFF',
      paddingVertical: 16,
      borderRadius: 12,
      alignItems: 'center',
    },
    secondaryButton: {
      flex: 1,
      backgroundColor: 'transparent',
      borderWidth: 2,
      borderColor: '#007AFF',
      paddingVertical: 14,
      borderRadius: 12,
      alignItems: 'center',
    },
    primaryButtonText: {
      color: '#ffffff',
      fontSize: 16,
      fontWeight: '600',
    },
    secondaryButtonText: {
      color: '#007AFF',
      fontSize: 16,
      fontWeight: '600',
    },
    statsContainer: {
      flexDirection: 'row',
      backgroundColor: isDark ? '#1e1e1e' : '#ffffff',
      borderRadius: 16,
      padding: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 3,
    },
    statItem: {
      flex: 1,
      alignItems: 'center',
    },
    statNumber: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#007AFF',
      marginBottom: 4,
    },
    statLabel: {
      fontSize: 14,
      color: isDark ? '#a0a0a0' : '#666666',
      textAlign: 'center',
    },
  });

  return (
    <View style={styles.container}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>📚 BookWarm</Text>
        <Text style={styles.headerSubtitle}>
          Discover, Share & Connect Through Books
        </Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.welcomeCard}>
          <Text style={styles.cardTitle}>Welcome to BookWarm!</Text>
          <Text style={styles.cardDescription}>
            Your personal book companion for discovering amazing reads, 
            sharing reviews, and connecting with fellow book lovers. 
            Start your reading journey today!
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Explore Books</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>My Library</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.featuresCard}>
          <Text style={styles.cardTitle}>What You Can Do</Text>
          
          <View style={styles.featureItem}>
            <Text style={styles.featureEmoji}>🔍</Text>
            <Text style={styles.featureText}>Browse thousands of books across all genres</Text>
          </View>
          
          <View style={styles.featureItem}>
            <Text style={styles.featureEmoji}>📖</Text>
            <Text style={styles.featureText}>Track your reading progress and goals</Text>
          </View>
          
          <View style={styles.featureItem}>
            <Text style={styles.featureEmoji}>⭐</Text>
            <Text style={styles.featureText}>Rate and review books you&apos;ve read</Text>
          </View>
          
          <View style={styles.featureItem}>
            <Text style={styles.featureEmoji}>👥</Text>
            <Text style={styles.featureText}>Connect with friends and book clubs</Text>
          </View>
          
          <View style={styles.featureItem}>
            <Text style={styles.featureEmoji}>💬</Text>
            <Text style={styles.featureText}>Join discussions about your favorite books</Text>
          </View>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>10K+</Text>
            <Text style={styles.statLabel}>Books Available</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>5K+</Text>
            <Text style={styles.statLabel}>Active Readers</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>50K+</Text>
            <Text style={styles.statLabel}>Reviews</Text>
          </View>
        </View>
        
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}


