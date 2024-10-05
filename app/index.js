import { StyleSheet, View, Text } from "react-native"; // Added Text for loading feedback
import { SessionContextProvider, useSession, useUser } from "@supabase/auth-helpers-react";
import AdminDashboard from "./components/Admin/AdminDashboard";
import DepartmentDashboard from "./components/DepartmentHead/DepartmentDashboard";
import Login from "./components/Login";
import { supabase } from "../supabaseClient";
import { useEffect, useState } from "react";

const Main = () => {
  const session = useSession();
  const user = useUser();

  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      checkAndInsertUser();
    }
  }, [user]);

  async function checkAndInsertUser() {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (!data) {
        const { error: insertError } = await supabase
          .from("profiles")
          .insert([{ id: user.id, email: user.email, role: "user" }]);

        if (insertError) {
          alert("Error adding to profiles table: " + insertError.message);
        } else {
          alert("User added to profiles table");
          setRole("user");
        }
      } else {
        setRole(data.role);
      }
    } catch (error) {
      console.error("Error fetching user role:", error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text> {/* Loading message */}
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
