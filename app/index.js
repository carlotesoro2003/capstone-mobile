import { StyleSheet, View, Text, Linking } from "react-native";
import { SessionContextProvider, useSession, useUser } from "@supabase/auth-helpers-react";
import AdminDashboard from "./components/Admin/AdminDashboard";
import DepartmentDashboard from "./components/DepartmentHead/DepartmentDashboard";
import Login from "./components/Login";
import { supabase } from "../supabaseClient";
import { useEffect, useState } from "react";
import { useRouter } from 'expo-router'; // Import useRouter

const Main = () => {
  const session = useSession();
  const user = useUser();
  const router = useRouter(); // Use router from expo-router
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(false); // Set loading to true initially

  useEffect(() => {
    const checkInitialURL = async () => {
      const initialURL = await Linking.getInitialURL();
      if (initialURL) {
        handleDeepLink(initialURL); // Handle the initial URL if it exists
      }
    };

    if (user) {
      checkAndInsertUser();
    }

    const handleDeepLink = (url) => {
      const route = url.replace(/.*?:\/\//g, ""); // Extract the path from the URL
      console.log("Deep link route:", route); // Log the route for debugging

      // Handle different routes based on the path
      switch (route) {
        case "capstone.route/dashboard":
          router.push('/main/DepartmentDashboard'); // Navigate to Department Dashboard
          break;
        case "capstone.route/admin":
          router.push('/main/AdminDashboard'); // Navigate to Admin Dashboard
          break;
        case "capstone.route/profile":
          router.push('/main/AdminProfile'); // Navigate to Admin Profile
          break;
        default:
          console.log("No matching route found."); // Handle unknown routes
          break;
      }
    };

    // Check for deep links on app launch
    checkInitialURL();

    // Add event listener for deep links when the app is open
    const linkingListener = Linking.addEventListener("url", ({ url }) => handleDeepLink(url));

    // Clean up the listener on unmount
    return () => {
      linkingListener.remove(); // Correct way to unsubscribe
    };
  }, [user]);

  async function checkAndInsertUser() {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error && error.code === 'PGRST116') {
        const { error: insertError } = await supabase
          .from("profiles")
          .insert([{ id: user.id, email: user.email, role: "user" }]);

        if (insertError) {
          alert("Error adding to profiles table: " + insertError.message);
        } else {
          alert("User added to profiles table");
          setRole("user");
        }
      } else if (data) {
        setRole(data.role);
      }
    } catch (error) {
      console.error("Error fetching user role:", error);
    } finally {
      setLoading(false); // End loading state
    }
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text> 
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {session ? (
        role === "admin" ? <AdminDashboard /> : <DepartmentDashboard />
      ) : (
        <Login />
      )}
    </View>
  );
};

export default function Page() {
  return (
    <SessionContextProvider supabaseClient={supabase}>
      <Main />
    </SessionContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
});
