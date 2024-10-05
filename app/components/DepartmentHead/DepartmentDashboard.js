import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Dimensions, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { LineChart, BarChart, PieChart } from 'react-native-chart-kit';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'; // For Supabase client and user state
    
const screenWidth = Dimensions.get('window').width;

const DepartmentDashboard = () => {
  const supabase = useSupabaseClient();
  const user = useUser();
  const [loading, setLoading] = useState(false); // Loading state

  async function signOut() {
    setLoading(true); // Set loading to true
    await supabase.auth.signOut();
    setLoading(false); // Set loading to false after sign out
  }

  const lineData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        data: [50, 80, 40, 90, 70, 100],
        strokeWidth: 2, // optional
      },
    ],
  };

  const barData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    datasets: [
      {
        data: [40, 60, 80, 100, 50],
      },
    ],
  };

  const pieData = [
    { name: 'Marketing', population: 45, color: '#f00', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    { name: 'Sales', population: 25, color: '#0f0', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    { name: 'Development', population: 20, color: '#00f', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    { name: 'Customer Support', population: 10, color: '#ff0', legendFontColor: '#7F7F7F', legendFontSize: 15 },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>DepartmentDashboard</Text>

      {/* Loading Spinner */}
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007bff" />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      )}

      {/* Line Chart */}
      <Text style={styles.chartTitle}>Income Trend</Text>
      <LineChart
        data={lineData}
        width={screenWidth}
        height={220}
        chartConfig={chartConfig}
        bezier
        style={styles.chart}
      />

      {/* Bar Chart */}
      <Text style={styles.chartTitle}>Weekly Sales</Text>
      <BarChart
        data={barData}
        width={screenWidth}
        height={220}
        yAxisLabel="$"
        chartConfig={chartConfig}
        style={styles.chart}
      />

      {/* Pie Chart */}
      <Text style={styles.chartTitle}>Expense Breakdown</Text>
      <PieChart
        data={pieData}
        width={screenWidth}
        height={220}
        chartConfig={chartConfig}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
        style={styles.chart}
      />

      {/* Sign Out Button */}
      <TouchableOpacity style={styles.signOutButton} onPress={signOut} disabled={loading}>
        <Text style={styles.signOutText}>{loading ? 'Signing Out...' : 'Sign Out'}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const chartConfig = {
  backgroundGradientFrom: '#fff',
  backgroundGradientTo: '#fff',
  color: (opacity = 1) => `rgba(0, 123, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f8f9fa',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  signOutButton: {
    marginVertical: 20,
    backgroundColor: '#ff4d4d',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  signOutText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#007bff',
  },
});

export default DepartmentDashboard;
