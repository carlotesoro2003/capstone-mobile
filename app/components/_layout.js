import { StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Stack, Tabs } from 'expo-router';
import { useSession, useUser } from "@supabase/auth-helpers-react";
import { supabase } from '../../supabaseClient';

const _layout = () => {
  const session = useSession();
  const user = useUser();
  const [role, setRole] = useState(null);

  useEffect(() => {
    if (user) {
      fetchUserRole();
    }
  }, [user]);

  async function fetchUserRole() {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      if (data) {
        setRole(data.role);
      }
    } catch (error) {
      console.error("Error fetching user role:", error);
    }
  }

  return (
    <Stack>
      {/* Login screen as the initial screen */}
      <Stack.Screen
        name="index"
        options={{ title: 'Login' }}
      />

      {/* Tabs for Dashboard based on role */}
      <Stack.Screen
        name="main"
        options={{ headerShown: false }} // Hide header for tabs
      >
        {() => (
          <Tabs>
            {/* Conditionally render Admin tabs */}
            {role === "admin" ? (
              <>
                {/* Admin Dashboard Tab */}
                <Tabs.Screen
                  name="AdminDashboard"
                  options={{ title: 'Admin Dashboard' }}
                />
                {/* Admin Profile Tab */}
                <Tabs.Screen
                  name="AdminProfile"
                  options={{ title: 'Admin Profile' }}
                />
              </>
            ) : (
              <>
                {/* Department Dashboard Tab */}
                <Tabs.Screen
                  name="DepartmentDashboard"
                  options={{ title: 'Department Dashboard' }}
                />
              </>
            )}
          </Tabs>
        )}
      </Stack.Screen>
    </Stack>
  );
};

export default _layout;

const styles = StyleSheet.create({});
