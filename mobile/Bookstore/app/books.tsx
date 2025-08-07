import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  useColorScheme,
  TextInput,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function Books() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const books = [
    {
      id: 1,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      rating: 4.2,
      genre: "Classic Literature",
      description: "A timeless tale of love, wealth, and the American Dream in the Jazz Age."
    },
    {
      id: 2,
      title: "To Kill a Mockingbird", 
      author: "Harper Lee",
      rating: 4.5,
      genre: "Fiction",
      description: "A powerful story of racial injustice and childhood innocence in the American South."
    },
    {
      id: 3,
      title: "1984",
      author: "George Orwell", 
      rating: 4.3,
      genre: "Dystopian Fiction",
      description: "A chilling vision of a totalitarian future where freedom of thought is forbidden."
    },
    {
      id: 4,
      title: "Pride and Prejudice",
      author: "Jane Austen",
      rating: 4.4,
      genre: "Romance",
      description: "A witty and romantic tale of love, class, and social expectations in Regency England."
    }
  ];

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? '#0f0f0f' : '#ffffff',
    },
    header: {
      paddingTop: 60,
      paddingHorizontal: 20,
      paddingBottom: 20,
      backgroundColor: isDark ? '#1a1a1a' : '#f8f9fa',
    },
    headerTitle: {
      fontSize: 28,
      fontWeight: 'bold',
      color: isDark ? '#ffffff' : '#1a1a1a',
      marginBottom: 16,
    },
    searchContainer: {
      backgroundColor: isDark ? '#2a2a2a' : '#ffffff',
      borderRadius: 12,
      paddingHorizontal: 16,
      paddingVertical: 12,
      flexDirection: 'row',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    searchInput: {
      flex: 1,
      fontSize: 16,
      color: isDark ? '#ffffff' : '#1a1a1a',
      marginLeft: 8,
    },
    content: {
      flex: 1,
      paddingHorizontal: 20,
      paddingTop: 20,
    },
    bookCard: {
      backgroundColor: isDark ? '#1e1e1e' : '#ffffff',
      borderRadius: 16,
      padding: 20,
      marginBottom: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 3,
    },
    bookTitle: {
      fontSize: 20,
      fontWeight: '600',
      color: isDark ? '#ffffff' : '#1a1a1a',
      marginBottom: 4,
    },
    bookAuthor: {
      fontSize: 16,
      color: '#007AFF',
      marginBottom: 8,
    },
    bookMeta: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
    },
    bookGenre: {
      fontSize: 14,
      color: isDark ? '#a0a0a0' : '#666666',
      backgroundColor: isDark ? '#2a2a2a' : '#f0f0f0',
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 8,
    },
    rating: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    ratingText: {
      fontSize: 14,
      color: isDark ? '#ffffff' : '#1a1a1a',
      marginLeft: 4,
      fontWeight: '500',
    },
    bookDescription: {
      fontSize: 14,
      lineHeight: 20,
      color: isDark ? '#cccccc' : '#555555',
      marginBottom: 12,
    },
    actionButton: {
      backgroundColor: '#007AFF',
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 8,
      alignSelf: 'flex-start',
    },
    actionButtonText: {
      color: '#ffffff',
      fontSize: 14,
      fontWeight: '500',
    },
  });

  return (
    <View style={styles.container}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>📚 Browse Books</Text>
        <View style={styles.searchContainer}>
          <Text style={{ color: isDark ? '#a0a0a0' : '#666666' }}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search books, authors, genres..."
            placeholderTextColor={isDark ? '#666666' : '#999999'}
          />
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {books.map((book) => (
          <TouchableOpacity key={book.id} style={styles.bookCard}>
            <Text style={styles.bookTitle}>{book.title}</Text>
            <Text style={styles.bookAuthor}>by {book.author}</Text>
            
            <View style={styles.bookMeta}>
              <Text style={styles.bookGenre}>{book.genre}</Text>
              <View style={styles.rating}>
                <Text style={{ color: '#FFD700', fontSize: 16 }}>⭐</Text>
                <Text style={styles.ratingText}>{book.rating}</Text>
              </View>
            </View>
            
            <Text style={styles.bookDescription}>{book.description}</Text>
            
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionButtonText}>Add to Library</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
        
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}
