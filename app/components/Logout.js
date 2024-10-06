import React, { useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Alert } from 'react-native';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

const Logout = () => {
  const supabase = useSupabaseClient();
  const [loading, setLoading] = useState(false); // Loading state
  const [loggedOut, setLoggedOut] = useState(false); // State to track if user is logged out

  const showLogoutConfirmation = () => {
    Alert.alert(
      'Confirm Logout',
      'Are you sure you want to log out?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Logout cancelled'), // Log cancellation
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: signOut, // Call signOut function if user confirms
        },
      ],
      { cancelable: false }
    );
  };

  async function signOut() {
    setLoading(true); // Set loading to true
    await supabase.auth.signOut();
    setLoading(false); // Set loading to false after sign out
    setLoggedOut(true); // Update state to indicate user has logged out
  }

  // Call the showLogoutConfirmation function when the component mounts
  React.useEffect(() => {
    showLogoutConfirmation();
  }, []);

  return (
    <View style={styles.loadingContainer}>
      {loading ? (
        <>
          <ActivityIndicator size="large" color="#ff4d4d" />
          <Text style={styles.loadingText}>Logging out...</Text>
        </>
      ) : (
        loggedOut && <Text style={styles.logoutText}>You have been logged out.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // Background color
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'red', // Red text for visibility
  },
  logoutText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'green', // Color for logged out message
  },
});

export default Logout;
