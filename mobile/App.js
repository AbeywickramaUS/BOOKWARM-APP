/**
 * BookWarm Mobile App
 * 
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
} from 'react-native';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#1a1a1a' : '#f5f5f5',
  };

  const textColor = {
    color: isDarkMode ? '#ffffff' : '#000000',
  };

  const cardBackgroundColor = {
    backgroundColor: isDarkMode ? '#2a2a2a' : '#ffffff',
  };

  return (
    <SafeAreaView style={[styles.container, backgroundStyle]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.headerTitle, textColor]}>📚 BookWarm</Text>
          <Text style={[styles.headerSubtitle, textColor]}>
            Discover Amazing Books
          </Text>
        </View>

        {/* Welcome Section */}
        <View style={[styles.card, cardBackgroundColor]}>
          <Text style={[styles.cardTitle, textColor]}>
            Welcome to BookWarm Mobile!
          </Text>
          <Text style={[styles.cardDescription, textColor]}>
            Your mobile app for discovering and sharing amazing books. 
            Connect with fellow book lovers and build your reading journey.
          </Text>
        </View>

        {/* Features Section */}
        <View style={[styles.card, cardBackgroundColor]}>
          <Text style={[styles.cardTitle, textColor]}>Features</Text>
          <Text style={[styles.cardDescription, textColor]}>
            • Browse book collections{'\n'}
            • Add books to your reading list{'\n'}
            • Share reviews and ratings{'\n'}
            • Connect with other readers
          </Text>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Browse Books</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.actionButton, styles.secondaryButton]}>
            <Text style={[styles.actionButtonText, styles.secondaryButtonText]}>
              My Library
            </Text>
          </TouchableOpacity>
        </View>

        {/* Getting Started */}
        <View style={[styles.card, cardBackgroundColor]}>
          <Text style={[styles.cardTitle, textColor]}>Getting Started</Text>
          <Text style={[styles.cardDescription, textColor]}>
            To get started with development:{'\n\n'}
            1. Connect to your backend server{'\n'}
            2. Set up user authentication{'\n'}
            3. Implement book browsing features{'\n'}
            4. Add social features
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 24,
    alignItems: 'center',
    marginTop: 20,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    opacity: 0.7,
  },
  card: {
    margin: 16,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
  },
  cardDescription: {
    fontSize: 16,
    lineHeight: 24,
    opacity: 0.8,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
    marginVertical: 8,
  },
  actionButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    flex: 0.45,
    alignItems: 'center',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  actionButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
  },
  secondaryButtonText: {
    color: '#007AFF',
  },
});

export default App;
