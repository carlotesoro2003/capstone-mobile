import { Drawer } from 'expo-router';
import { useSession, useUser } from "@supabase/auth-helpers-react";
import { supabase } from '../../supabaseClient';
import AdminDashboard from './Admin/AdminDashboard';
import DepartmentDashboard from './DepartmentHead/DepartmentDashboard';
import AdminProfile from './Admin/AdminProfile';
import Login from './Login';
import React, { useEffect, useState } from 'react';

const _layout = () => {
  const session = useSession();
  const user = useUser();
  const [role, setRole] = useState(null);

  useEffect(() => {
    async function fetchUserRole() {
      if (user) {
        try {
          const { data, error } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', user.id)
            .single();

          if (error) throw error;
          if (data) setRole(data.role);
        } catch (error) {
          console.error("Error fetching user role:", error);
        }
      }
    }

    fetchUserRole();
  }, [user]);

  return (
    <Drawer>
      {session ? (
        role === "admin" ? (
          <>
            <Drawer.Screen
              name="AdminDashboard"
              options={{ title: 'Dashboard' }}
              component={AdminDashboard}
            />
            <Drawer.Screen
              name="AdminProfile"
              op    tions={{ title: 'Profile' }}
              component={AdminProfile}
            />
          </>
        ) : (
          <Drawer.Screen
            name="DepartmentDashboard"
            options={{ title: 'Department Dashboard' }}
            component={DepartmentDashboard}
          />
        )
      ) : (
        <Drawer.Screen
          name="Login"
          options={{ title: 'Login' }}
          component={Login}
        />
      )}
    </Drawer>
  );
};

export default _layout;
