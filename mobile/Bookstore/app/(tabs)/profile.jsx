import { View, Text, FlatList, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import React from 'react'
import {useRouter} from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import {API_URL} from '../../constants/api';
import styles from '../../assets/styles/profile.styles';
import ProfileHeader from '../../../component/ProfileHeader'; // Adjust the path if needed

// Define your API_URL here or import it from your config file

export default function Profile() {
    const [books, setBooks] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [refreshing, setRefreshing] = React.useState(false);
    const [deletedBookId, setDeletedBookId] = React.useState(null);

    const router = useRouter();

    const fetchData = async () => {
        try {
            setIsLoading(true);
            // Retrieve token from your authentication logic or storage
            const token = await AsyncStorage.getItem('token'); // Make sure to import AsyncStorage if using this
            const response = await fetch(`${API_URL}/users/me/books`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Failed to fetch books');
            }
            setBooks(data.books);
        } catch (error) {
            console.error('Error fetching books:', error);
        } finally {
            setIsLoading(false);
        }
    };

    React.useEffect(() => {
        fetchData();
    }, []);

    // Utility function to pause execution for a given number of milliseconds
    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    // Function to handle pull-to-refresh
    const handleRefresh = async () => {
        setRefreshing(true);
        await sleep(500);
        await fetchData();
        setRefreshing(false);
    };

if (isLoading && !refreshing) {
    return (
        <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text>Loading...</Text>
        </View>
    );
}


// Function to render each book item
const renderBookItem = ({ item }) => (
  <View style={styles.bookItem}>
    <Image source={{ uri: item.coverImage }} style={styles.bookCover} />
    <View style={styles.bookInfo}>{item.bookInfo}
        <Text style={styles.bookTitle}>{item.title}</Text>
        <Text style={styles.bookAuthor}>{item.author}</Text>
        <View style={styles.ratingContainer}>{renderRatingStars(item.rating)}
          <Text style={styles.ratingText}>Rating: {item.rating}</Text>
        </View>
        <View style={styles.bookDescriptionContainer}>
          <Text style={styles.bookDescription}>{item.description}</Text>
          <Text style={styles.bookDate}>{new Date(item.createdAt).toLocaleDateString()}</Text>
        </View>
    </View>
    <TouchableOpacity style={styles.deleteButton} onPress={() => ConfirmDelete(item.id)}>
        {deletedBookId === item.id ? (
            <ActivityIndicator size="small" />
        ) : (
            <Ionicons name="trash-outline" size={24} color="black" />
        )}
    </TouchableOpacity>
  </View>
);

// Function to handle book deletion
const ConfirmDelete = async (bookId) => {
  // You can add a confirmation dialog here if needed
  try {
    setDeletedBookId(bookId);
    const token = await AsyncStorage.getItem('token');
    const response = await fetch(`${API_URL}/books/${bookId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || 'Failed to delete book');
    }
    // Refresh the book list after deletion
    fetchData();
  } catch (error) {
    console.error('Error deleting book:', error);
  }
    finally {
        setDeletedBookId(null);
    }
};

// Function to render rating stars
const renderRatingStars = (rating) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <Ionicons
        key={i}
        name={i <= rating ? "star" : "star-outline"}
        size={16}
        color="#FFD700"
        style={{ marginRight: 2 }}
      />
    );
  }
  return <View style={{ flexDirection: 'row', alignItems: 'center' }}>{stars}</View>;
};

    return (
    <View style={styles.container}>
      <ProfileHeader />
      <logoutButton/>

    <View style={styles.bookHeader}>
      <Text style={styles.bookHeaderText}>Your Recommendations</Text>
      <Text style={styles.booksCount}>{books.length} books</Text>
    </View>
    <FlatList
      data={books}
      keyExtractor={(item) => item.id?.toString()}
      renderItem={renderBookItem}
      contentContainerStyle={styles.bookListContainer}
      refreshing={refreshing}
      onRefresh={handleRefresh}
      ListEmptyComponent={
        <View style={styles.emptyListContainer}>
          <Ionicons name="book-outline" size={50} color="black" />
          <Text style={styles.emptyListText}>No books found</Text>
          <TouchableOpacity style={styles.addButton} onPress={() => router.push('/add-book')}>
            <Text style={styles.addButtonText}>Add a Book</Text>
          </TouchableOpacity>
        </View>
      }
    />
    </View>
    )
}