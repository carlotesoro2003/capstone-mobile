import { StyleSheet, View, Text } from "react-native";
import { SessionContextProvider, useSession, useUser } from "@supabase/auth-helpers-react";
import { supabase } from "../supabaseClient";
import { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { createDrawerNavigator } from '@react-navigation/drawer';

import AdminDashboard from "./components/Admin/AdminDashboard";
import AdminProfile from "./components/Admin/AdminProfile";

import DepartmentDashboard from "./components/DepartmentHead/DepartmentDashboard";
import DepartmentProfile from "./components/DepartmentHead/DepartmentProfile";

import Login from "./components/Login";
import Logout from "./components/Logout";

import CustomDrawerContent from "./components/CustomDrawer";
import CustomHeader from './components/CustomHeader'; 

const Drawer = createDrawerNavigator();

const Main = () => {
  const session = useSession();
  const user = useUser();
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAndInsertUser = async () => {
      if (user) {
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
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    checkAndInsertUser();
  }, [user]);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!session) {
    return <Login />;
  }

  return role ? (
    <Drawer.Navigator
      initialRouteName={role === "admin" ? "AdminDashboard" : "DepartmentDashboard"}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: true,
        header: (props) => <CustomHeader {...props} />, 
      }}
    >
      {role === "admin" ? (
        <>
          <Drawer.Screen
            name="AdminDashboard"
            component={AdminDashboard}
            options={{ title: 'Dashboard' }}
          />
          <Drawer.Screen
            name="AdminProfile"
            component={AdminProfile}
            options={{ title: 'My Profile' }}
          />
          <Drawer.Screen
            name="Logout"
            component={Logout}
            options={{ title: 'Log Out' }}
          />
        </>
      ) : (
        <>
          <Drawer.Screen
            name="DepartmentDashboard"
            component={DepartmentDashboard}
            options={{ title: 'Dashboard' }}
          />
          <Drawer.Screen
            name="DepartmentProfile"
            component={DepartmentProfile}
            options={{ title: 'Profile' }}
          />
          <Drawer.Screen
            name="Logout"
            component={Logout}
            options={{ title: 'Log Out' }}
          />
        </>
      )}
    </Drawer.Navigator>
  ) : null;
};

export default function Page() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SessionContextProvider supabaseClient={supabase}>
        <Main />
      </SessionContextProvider>
    </GestureHandlerRootView>
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
