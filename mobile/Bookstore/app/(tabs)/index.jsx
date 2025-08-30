import { View, Text, FlatList } from 'react-native';
import { useAuthStore } from '../../../store/authStore';
import styles from '../../assets/styles/home.styles.js';
import { useEffect, useState, useCallback } from 'react';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Define your API URL here
const API_URL = 'https://your-api-url.com'; // Replace with your actual API URL

export default function Home() {
  const { token } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [books, setBooks] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const fetchBooks = useCallback(async (pageNum=1, refreshing=false) => {
    setLoading(true);
    try {
      if (refreshing) {
        setRefreshing(true);
      } else if (pageNum === 1) {
        setLoading(true);
      }
      const response = await fetch(`${API_URL}/books?page=${pageNum}&limit=5`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch books');
      }
      //setBooks((prevBooks) => [...prevBooks, ...data.books]);     //to do fix it later
      const uniqueBook = refreshing || pageNum === 1
        ? data.books
        : Array.from(new Set([...books, ...data.books].map(b => b.id)))
            .map(id => [...books, ...data.books].find(b => b.id === id));
      setBooks(uniqueBook);

      setHasMore(pageNum < data.totalPages);
      setPage(pageNum);

    } catch (error) {
      console.error('Error fetching books:', error);

    } finally {
      if (refreshing) setRefreshing(false);
      else setLoading(false);
    }
  }, [token, books]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const handleLoadMore = async () => {
    if (!loading && hasMore && !refreshing) {
      await sleep(1000); // Simulate a delay for loading more
      fetchBooks(page + 1);
    }
  }

  const renderBookItem = ({ item }) => (
    <View style={styles.bookCard}>
      <View style={styles.bookHeader}>
        <Image source={{ uri: item.coverImage }} style={styles.bookCover} />
        <View style={styles.bookInfo}>
          <Text style={styles.bookTitle}>{item.title}</Text>
          <Text style={styles.bookAuthor}>{item.author}</Text>
        </View>
      </View>

      <View style={styles.bookImageContainer}>
        <Image source={{ uri: item.coverImage }} style={styles.bookCover} contentFit="cover"/>
      </View>
      <View style={styles.bookDetails}>
        <Text style={styles.bookDescription}>{item.description}</Text>
        {renderRatingStars(item.rating)}
      </View>
      <Text style={styles.caption}>{item.caption}</Text>
      <Text style={styles.date}>shared on {formatDate(item.releaseDate)}</Text>
    </View>
  );

  const renderRatingStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Ionicons
          key={i}
          name={i <= rating ? 'star' : 'star-outline'}
          size={20}
          color="#FFD700"
          style={{ marginRight: 2 }}
        />
      );
    }
    return <View style={styles.starsContainer}>{stars}</View>;
  };

  // Helper function to format date
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  console.log('Books:', books);


  return (
    <View style={styles.container}>
      <FlatList
        data={books}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        renderItem={renderBookItem}
        keyExtractor={(item) => item.id.toString()}
        refreshing={refreshing}
        onRefresh={() => fetchBooks(1, true)}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}

        //onEndReached={handleLoadMore}
        //onEndReachedThreshold={0.5}

        ListHeaderComponentStyle={
          <View style={styles.listHeader}>
            <Text style={styles.ListHeaderTitle}>BookWarm </Text>
            <Text style={styles.ListHeaderSubtitle}>Your personalized book collection</Text>
          </View>
        }

        ListFooterComponent= { hasMore && books.length > 0 ? (
          <View style={styles.listFooter}>
            <Text style={styles.listFooterText}>Loading more books...</Text>
          </View>
          ) : null
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="book-outline" size={60} color="#ccc" />
            <Text style={styles.emptyMessage}>No books found</Text>
            <Text style={styles.emptyMessage}>Try adding some books to your collection!</Text>
          </View>
        }
      />
    </View>
  );
}