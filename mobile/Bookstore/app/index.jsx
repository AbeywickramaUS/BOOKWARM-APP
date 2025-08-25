import { Link } from "expo-router";
import React, { useEffect } from "react";
import{ View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useAuthStore } from "../../store/authStore";

export default function Index() {
    const { user, token, checkAuth, logout } = useAuthStore();

    console.log(user, token);

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to the Bookstore{user ? `, ${user.name}` : ''}</Text>
            <Text style={styles.title}>Token: {token}</Text>
            <Text style={styles.subtitle}>Find your next great read</Text>

            <TouchableOpacity onPress={logout}>
                <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>

            <Link href="(auth)/login" >
                Login
            </Link>
            <Link href="(auth)/signup">
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
