import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const notificationsData = [
  { id: '1', message: 'You have 36 operational plans due in a week', time: '2 minutes ago' },
  { id: '2', message: 'You have a new follower', time: '5 minutes ago' },
  { id: '3', message: 'Your profile was viewed', time: '10 minutes ago' },
];

const NotificationItem = ({ message, time }) => (
  <View style={styles.notificationItem}>
    <Text style={styles.notificationMessage}>{message}</Text>
    <Text style={styles.notificationTime}>{time}</Text>
  </View>
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
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  notificationItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  notificationMessage: {
    fontSize: 16,
  },
  notificationTime: {
    fontSize: 12,
    color: '#999',
  },
});

export default Notifications;