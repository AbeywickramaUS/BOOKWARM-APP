import { Link } from "expo-router";
import{ View, Text, StyleSheet } from "react-native";

export
    default function Index() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to the Bookstore</Text>
            <Text style={styles.subtitle}>Find your next great read</Text>

            <Link href="/login">
                Login
            </Link>
            <Link href="/signup">
                Sign Up
            </Link>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
    },
    subtitle: {
        fontSize: 16,
        color: "#666",
    },
});
