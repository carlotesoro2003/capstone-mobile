import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Link } from 'expo-router'; // Ensure this is the correct import based on your project
import Icon from 'react-native-vector-icons/Ionicons';

const CustomHeader = ({ navigation }) => {
  return (
    <View style={styles.headerContainer}>
      {/* Menu Icon to open the drawer */}
      <Icon 
        name="menu" 
        size={24} 
        color="#000" 
        onPress={() => navigation.toggleDrawer()} // Toggle drawer on press
        style={styles.menuIcon} 
      />
      
      {/* Notification Icon */}
      <Link href="Notifications" style={styles.notificationContainer}>
        <Icon name="notifications-outline" size={24} color="#000" />
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    elevation: 2, // Add some elevation for Android shadow
  },
  menuIcon: {
    padding: 8,
  },
  notificationContainer: {
    padding: 8,
  },
});

export default CustomHeader;
