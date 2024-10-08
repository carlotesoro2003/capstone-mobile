import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { makeRedirectUri } from "expo-auth-session";
import * as QueryParams from "expo-auth-session/build/QueryParams";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";
import { supabase } from "../../supabaseClient";
import { FontAwesome } from "@expo/vector-icons"; // For icons

WebBrowser.maybeCompleteAuthSession(); // Required for web only
const redirectTo = makeRedirectUri(); // Create a redirect URI

const createSessionFromUrl = async (url) => {
  const { params, errorCode } = QueryParams.getQueryParams(url);

  if (errorCode) throw new Error(errorCode);
  const { access_token, refresh_token } = params;

  if (!access_token) return;

  const { data, error } = await supabase.auth.setSession({
    access_token,
    refresh_token,
  });

  if (error) throw error;
  return data.session;
};

const sendMagicLink = async (email) => {
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: redirectTo,
    },
  });

  if (error) throw error; // Handle error if email sending fails
};

export default function Login() {
  const [email, setEmail] = useState(""); // State for email input
  const [loading, setLoading] = useState(false); // State for loading indicator
  const url = Linking.useURL(); // Get URL to handle deep links

  useEffect(() => {
    if (url) {
      createSessionFromUrl(url).catch((error) => console.error("Session Error:", error));
    }
  }, [url]);

  const handleMagicLink = async () => {
    setLoading(true); // Set loading state
    try {
      await sendMagicLink(email); // Send the magic link
      Alert.alert("Check your email", "Magic link sent!"); // Show success alert
      alert("Check your email for the magic link."); // Show success alert
    } catch (error) {
      Alert.alert("Error", error.message); // Show error alert
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <FontAwesome name="user-circle" size={100} color="#333" />
        <Text style={styles.logoText}>Welcome Back!</Text>
      </View>

      <View style={styles.inputContainer}>
        <FontAwesome name="envelope" size={20} color="#333" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="#aaa"
        />
      </View>
      
      <TouchableOpacity
        style={styles.loginButton}
        onPress={handleMagicLink}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#ffffff" />
        ) : (
          <Text style={styles.loginText}>Send Magic Link</Text>
        )}
      </TouchableOpacity>      

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 50,
  },
  logoText: {
    color: "#333",
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 25,
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    height: 40,
    width: 250,
    color: "#333",
    fontSize: 16,
  },
  loginButton: {
    marginTop: 30,
    width: 250,
    height: 50,
    backgroundColor: "#333",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
  },
  loginText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  forgotText: {
    marginTop: 20,
    color: "#333",
    textDecorationLine: "underline",
  },
});
