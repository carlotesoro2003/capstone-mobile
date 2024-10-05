import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router"; // For navigation
import { FontAwesome } from "@expo/vector-icons"; // For icons
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react"; // For Supabase client and user state

export default function Login() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const supabase = useSupabaseClient();
  const user = useUser(); // Get the current user

  async function getEmailLink() {
    setLoading(true); // Start loading when login begins
    const { error } = await supabase.auth.signInWithOtp({ email });
    setLoading(false); // Stop loading when login process completes
    if (error) {
      alert(error.message);
    } else {
      alert("Link Successfully Created... Check your email for the link");
    }
  }

  // Listen for user state changes
  useEffect(() => {
    if (user) {
      // Navigate to the dashboard when the user is authenticated
      router.push("/components/Dashboard");
    }
  }, [user, router]);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <FontAwesome name="user-circle" size={100} color="#333" />
        <Text style={styles.logoText}>Welcome Back!</Text>
      </View>

      <View style={styles.inputContainer}>
        <FontAwesome name="envelope" size={24} color="#333" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#666"
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
      </View>

      <TouchableOpacity
        style={styles.loginButton}
        onPress={getEmailLink} 
        disabled={loading} 
      >
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.loginText}>Login</Text>
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
