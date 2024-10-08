import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Link } from 'expo-router'; 
import Icon from 'react-native-vector-icons/Ionicons';

const CustomHeader = ({ navigation }) => {
  return (
    <View style={styles.headerContainer}>
      {/* Menu Icon to open the drawer */}
      <Icon 
        name="menu" 
        size={24} 
        color="#000" 
        onPress={() => navigation.toggleDrawer()} 
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
    elevation: 2, 
  },
  menuIcon: {
    padding: 8,
  },
  notificationContainer: {
    padding: 8,
  },
});

export default CustomHeader;
