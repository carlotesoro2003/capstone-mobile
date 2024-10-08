import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { PieChart } from "react-native-gifted-charts";

const DepartmentPlans = () => {
  const pieData = [
    { value: 70, color: "green" },
    { value: 30, color: "lightgray" },
  ];

  const plansData = [
    { id: "1", message: "Strat Obj 1", status: "achieved" },
    { id: "2", message: "Strat Obj 2", status: "achieved" },
    { id: "3", message: "Strat Obj 3", status: "achieved" },
    { id: "4", message: "Strat Obj 4", status: "not achieved" },
    { id: "5", message: "Strat Obj 5", status: "not achieved" },
    { id: "6", message: "Strat Obj 6", status: "not achieved" },
  ];

  const [filter, setFilter] = useState("all");

  const filteredPlans = plansData.filter((plan) => {
    if (filter === "achieved") {
      return plan.status === "achieved";
    } else if (filter === "not achieved") {
      return plan.status === "not achieved";
    }
    return true;
  });

  const PlansItem = ({ message, status }) => (
    <TouchableOpacity style={styles.notificationItem}>
      <View style={styles.messageContainer}>
        <Text style={styles.notificationMessage}>{message}</Text>
        <Text style={styles.notificationStatus}>{status}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.mainContainer}>
      <View style={styles.pieChartContainer}>
        <Text style={styles.title}>Plans Overview for CCMS</Text>
        <PieChart
          data={pieData}
          donut
          innerRadius={80}
          centerLabelComponent={() => (
            <>
              <Text style={styles.centerLabel}>70%</Text>
              <Text style={styles.centerSubtitle}>Completed Plans</Text>
            </>
          )}
        />
      </View>

      <View style={styles.filterContainer}>
        <TouchableOpacity
          onPress={() => setFilter("all")}
          style={[styles.filterButton, filter === "all" && styles.activeFilter]}
        >
          <Text style={styles.filterText}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setFilter("achieved")}
          style={[
            styles.filterButton,
            filter === "achieved" && styles.activeFilter,
          ]}
        >
          <Text style={styles.filterText}>Achieved</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setFilter("not achieved")}
          style={[
            styles.filterButton,
            filter === "not achieved" && styles.activeFilter,
          ]}
        >
          <Text style={styles.filterText}>Not Achieved</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <Text style={styles.title}>All Plans</Text>
        <FlatList
          data={filteredPlans}
          renderItem={({ item }) => (
            <PlansItem message={item.message} status={item.status} />
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
};

export default DepartmentPlans;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  pieChartContainer: {
    alignItems: "center", // Center horizontally
    marginBottom: 20,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  centerLabel: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#007bff", // Highlighted color for visibility
  },
  centerSubtitle: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  filterButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#007bff",
    borderRadius: 20,
  },
  activeFilter: {
    backgroundColor: "#0056b3", // Darker blue for active filter
  },
  filterText: {
    color: "#fff",
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    marginBottom: 20,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
  },
  notificationItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  messageContainer: {
    flex: 1,
  },
  notificationMessage: {
    fontSize: 16,
    color: "#333",
  },
  notificationStatus: {
    fontSize: 12,
    color: "#007bff", // You can change this color based on your design
  },
});
