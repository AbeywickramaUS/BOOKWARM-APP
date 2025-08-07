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

export default function Library() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const myBooks = [
    {
      id: 1,
      title: "The Midnight Library",
      author: "Matt Haig",
      status: "Reading",
      progress: 65,
      rating: null,
    },
    {
      id: 2,
      title: "Atomic Habits",
      author: "James Clear",
      status: "Completed",
      progress: 100,
      rating: 5,
    },
    {
      id: 3,
      title: "Dune",
      author: "Frank Herbert",
      status: "Want to Read",
      progress: 0,
      rating: null,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Reading': return '#007AFF';
      case 'Completed': return '#34C759';
      case 'Want to Read': return '#FF9500';
      default: return '#666666';
    }
  };

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
      marginBottom: 8,
    },
    headerSubtitle: {
      fontSize: 16,
      color: isDark ? '#a0a0a0' : '#666666',
    },
    content: {
      flex: 1,
      paddingHorizontal: 20,
      paddingTop: 20,
    },
    statsContainer: {
      flexDirection: 'row',
      backgroundColor: isDark ? '#1e1e1e' : '#ffffff',
      borderRadius: 16,
      padding: 20,
      marginBottom: 24,
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
    sectionTitle: {
      fontSize: 20,
      fontWeight: '600',
      color: isDark ? '#ffffff' : '#1a1a1a',
      marginBottom: 16,
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
      fontSize: 18,
      fontWeight: '600',
      color: isDark ? '#ffffff' : '#1a1a1a',
      marginBottom: 4,
    },
    bookAuthor: {
      fontSize: 16,
      color: '#007AFF',
      marginBottom: 12,
    },
    bookMeta: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
    },
    statusBadge: {
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 12,
      alignSelf: 'flex-start',
    },
    statusText: {
      color: '#ffffff',
      fontSize: 12,
      fontWeight: '500',
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
    progressContainer: {
      marginTop: 8,
    },
    progressLabel: {
      fontSize: 14,
      color: isDark ? '#a0a0a0' : '#666666',
      marginBottom: 4,
    },
    progressBar: {
      height: 6,
      backgroundColor: isDark ? '#333333' : '#e0e0e0',
      borderRadius: 3,
      overflow: 'hidden',
    },
    progressFill: {
      height: '100%',
      backgroundColor: '#007AFF',
      borderRadius: 3,
    },
    emptyState: {
      alignItems: 'center',
      paddingVertical: 40,
    },
    emptyStateText: {
      fontSize: 16,
      color: isDark ? '#a0a0a0' : '#666666',
      textAlign: 'center',
      marginTop: 12,
    },
    addButton: {
      backgroundColor: '#007AFF',
      paddingHorizontal: 24,
      paddingVertical: 12,
      borderRadius: 12,
      marginTop: 16,
    },
    addButtonText: {
      color: '#ffffff',
      fontSize: 16,
      fontWeight: '500',
    },
  });

  return (
    <View style={styles.container}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>📖 My Library</Text>
        <Text style={styles.headerSubtitle}>Track your reading journey</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>3</Text>
            <Text style={styles.statLabel}>Total Books</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>1</Text>
            <Text style={styles.statLabel}>Currently Reading</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>1</Text>
            <Text style={styles.statLabel}>Completed</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>My Books</Text>

        {myBooks.length > 0 ? (
          myBooks.map((book) => (
            <TouchableOpacity key={book.id} style={styles.bookCard}>
              <Text style={styles.bookTitle}>{book.title}</Text>
              <Text style={styles.bookAuthor}>by {book.author}</Text>
              
              <View style={styles.bookMeta}>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(book.status) }]}>
                  <Text style={styles.statusText}>{book.status}</Text>
                </View>
                
                {book.rating && (
                  <View style={styles.rating}>
                    <Text style={{ color: '#FFD700', fontSize: 16 }}>⭐</Text>
                    <Text style={styles.ratingText}>{book.rating}/5</Text>
                  </View>
                )}
              </View>
              
              {book.status === 'Reading' && (
                <View style={styles.progressContainer}>
                  <Text style={styles.progressLabel}>{book.progress}% complete</Text>
                  <View style={styles.progressBar}>
                    <View style={[styles.progressFill, { width: `${book.progress}%` }]} />
                  </View>
                </View>
              )}
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.emptyState}>
            <Text style={{ fontSize: 48 }}>📚</Text>
            <Text style={styles.emptyStateText}>
              Your library is empty.{'\n'}Start adding books to track your reading!
            </Text>
            <TouchableOpacity style={styles.addButton}>
              <Text style={styles.addButtonText}>Browse Books</Text>
            </TouchableOpacity>
          </View>
        )}
        
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}
