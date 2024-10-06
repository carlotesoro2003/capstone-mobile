import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { useUser } from '@supabase/auth-helpers-react';
import { supabase } from '../../../supabaseClient';

const AdminProfile = () => {
  // State for profile fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [profileExists, setProfileExists] = useState(false); // State to check if profile exists
  const [loading, setLoading] = useState(false); // State for loading indicator

  const user = useUser();

  // Load the user profile data if it exists
  useEffect(() => {
    const loadProfile = async () => {
      if (user) {
        setEmail(user.email);

        // Check if the profile already exists
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single(); // Fetch a single record

        if (error) {
          console.error('Error fetching profile:', error.message);
          return;
        }

        // If profile exists, populate the fields
        if (data) {
          setFirstName(data.first_name || '');
          setLastName(data.last_name || '');
          setProfileExists(true); // Set profileExists to true if a record is found
        }
      }
    };

    loadProfile();
  }, [user]);

  // Insert function to add a new profile
  const handleInsert = async () => {
    const { error } = await supabase
      .from('profiles')
      .insert({
        id: user.id, // Use the user's id as a unique identifier
        first_name: firstName,
        last_name: lastName,
        email: email,
      });

    if (error) {
      console.error('Error inserting profile:', error.message);
      Alert.alert('Error', 'Error adding profile. Please try again.');
      return;
    }

    Alert.alert('Success', 'Profile added successfully!');
  };

  // Update function to update the existing profile
  const handleUpdate = async () => {
    const { error } = await supabase
      .from('profiles')
      .update({
        first_name: firstName,
        last_name: lastName,
      })
      .eq('id', user.id);

    if (error) {
      console.error('Error updating profile:', error.message);
      Alert.alert('Error', 'Error updating profile. Please try again.');
      return;
    }

    Alert.alert('Success', 'Profile updated successfully!');
  };

  const handleSave = async () => {
    setLoading(true); // Show loading indicator
    if (profileExists) {
      await handleUpdate(); // If profile exists, update it
    } else {
      await handleInsert(); // If profile doesn't exist, insert it
    }
    setLoading(false); // Hide loading indicator
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>My Profile</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>First name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your first name"
          value={firstName}
          onChangeText={setFirstName}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Last name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your last name"
          value={lastName}
          onChangeText={setLastName}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          editable={false} // Disable editing for email
        />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#007bff" /> // Show spinner if loading
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Save Changes</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

export default AdminProfile;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#555',
  },
  input: {
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#007bff',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
