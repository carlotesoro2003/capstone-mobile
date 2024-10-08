import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const notificationsData = [
  { id: '1', message: 'A new strategic Goal has been added to your workplace', time: '2 minutes ago' },
  { id: '2', message: 'A new strategic Goal has been added to your workplace', time: '5 minutes ago' },
  { id: '3', message: 'A new strategic Goal has been added to your workplace', time: '10 minutes ago' },
  { id: '4', message: 'A new strategic Goal has been added to your workplace', time: '2 minutes ago' },
  { id: '5', message: 'A new strategic Goal has been added to your workplace', time: '5 minutes ago' },
  { id: '6', message: 'A new strategic Goal has been added to your workplace', time: '10 minutes ago' },
];

const NotificationItem = ({ message, time }) => (
  <TouchableOpacity style={styles.notificationItem}>
    <View style={styles.iconContainer}>
      <Icon name="notifications-outline" size={24} color="#4CAF50" />
    </View>
    <View style={styles.messageContainer}>
      <Text style={styles.notificationMessage}>{message}</Text>
      <Text style={styles.notificationTime}>{time}</Text>
    </View>
  </TouchableOpacity>
);

const Notifications = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notifications</Text>
      <FlatList
        data={notificationsData}
        renderItem={({ item }) => (
          <NotificationItem message={item.message} time={item.time} />
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5', // Light background for better contrast
  },
  title: {
    fontSize: 28, // Increased font size
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333', // Darker title color
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: '#fff', // White background for notification cards
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 1, // For Android shadow
  },
  iconContainer: {
    marginRight: 10, // Spacing between icon and text
  },
  messageContainer: {
    flex: 1, // Allow message container to grow
  },
  notificationMessage: {
    fontSize: 16,
    fontWeight: '500', // Medium weight for better readability
    color: '#444', // Darker text color
  },
  notificationTime: {
    fontSize: 12,
    color: '#999',
    marginTop: 4, // Add spacing above time text
  },
});

export default Notifications;
