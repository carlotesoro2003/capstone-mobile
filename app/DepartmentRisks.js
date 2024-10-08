import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { PieChart } from "react-native-gifted-charts";
import Feather from "@expo/vector-icons/Feather";

const COLORS = {
  MANPOWER: "#999999",
  FINANCIAL: "#777777",
  ENVIRONMENTAL: "#555555",
  SAFETY: "#111111",
};

const VALUES = {
  MANPOWER: 53,
  FINANCIAL: 21,
  ENVIRONMENTAL: 13,
  SAFETY: 10,
};

const pieData = [
  {
    value: VALUES.MANPOWER,
    color: COLORS.MANPOWER,
    label: "Manpower",
  },
  {
    value: VALUES.FINANCIAL,
    color: COLORS.FINANCIAL,
    label: "Financial",
  },
  {
    value: VALUES.ENVIRONMENTAL,
    color: COLORS.ENVIRONMENTAL,
    label: "Environmental",
  },
  {
    value: VALUES.SAFETY,
    color: COLORS.SAFETY,
    label: "Safety",
  },
];

// Sample risk statements with categories
const riskStatements = [
  {
    id: "1",
    statement: "RRN-CCMS-01",
    category: "Manpower",
  },
  {
    id: "2",
    statement: "RRN-CCMS-02",
    category: "Financial",
  },
  {
    id: "3",
    statement: "RRN-CCMS-03",
    category: "Environmental",
  },
  {
    id: "4",
    statement: "RRN-CCMS-04",
    category: "Safety",
  },
  {
    id: "5",
    statement: "RRN-CCMS-05",
    category: "Manpower",
  },
];

const Risks = () => {
  const [filter, setFilter] = useState("All"); // Create a state for the selected filter

  // Function to filter risk statements based on selected filter
  const filteredRiskStatements = riskStatements.filter((item) => {
    if (filter === "All") {
      return true;
    }
    return item.category === filter;
  });

  const renderDot = (color) => {
    return (
      <View
        style={{
          height: 10,
          width: 10,
          borderRadius: 5,
          backgroundColor: color,
          marginRight: 10,
        }}
      />
    );
  };

  const renderLegendComponent = () => {
    return (
      <>
        <View style={styles.legendContainer}>
          <View style={styles.legendRow}>
            {renderDot(COLORS.MANPOWER)}
            <Text style={styles.legendText}>Manpower: {VALUES.MANPOWER}%</Text>
          </View>
          <View style={styles.legendRow}>
            {renderDot(COLORS.ENVIRONMENTAL)}
            <Text style={styles.legendText}>
              Environmental: {VALUES.ENVIRONMENTAL}%
            </Text>
          </View>
        </View>
        <View style={styles.legendContainer}>
          <View style={styles.legendRow}>
            {renderDot(COLORS.FINANCIAL)}
            <Text style={styles.legendText}>
              Financial: {VALUES.FINANCIAL}%
            </Text>
          </View>
          <View style={styles.legendRow}>
            {renderDot(COLORS.SAFETY)}
            <Text style={styles.legendText}>Safety: {VALUES.SAFETY}%</Text>
          </View>
        </View>
      </>
    );
  };

  const renderRiskStatement = ({ item }) => {
    return (
      <View>
        <Text style={styles.uploadedText}>
          College of Computing and Multimedia Studies uploaded:
        </Text>
        <Text style={styles.riskStatementText}>{item.statement}</Text>
        <View style={styles.separator} />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" hidden={false} />
      <View style={styles.cardContainer}>
        <View style={styles.risksCard}>
          <Text style={styles.risksTitle}>Risks</Text>
          <View style={styles.pieChartContainer}>
            <PieChart
              donut
              data={pieData.map((section) => ({
                ...section,
              }))}
              sectionAutoFocus
              radius={120}
              innerRadius={60}
              innerCircleColor={"white"}
              centerLabelComponent={() => {
                return (
                  <View>
                    <Feather
                      name="alert-triangle"
                      size={50}
                      color={"#F35454"}
                    />
                  </View>
                );
              }}
            />
          </View>
          {renderLegendComponent()}
        </View>

        {/* Scrollable Filter buttons */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterContainer}
        >
          {["All", "Manpower", "Financial", "Environmental", "Safety"].map(
            (category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.filterButton,
                  filter === category && styles.activeFilterButton,
                ]}
                onPress={() => setFilter(category)}
              >
                <Text style={styles.filterButtonText}>{category}</Text>
              </TouchableOpacity>
            )
          )}
        </ScrollView>

        <View style={styles.listCard}>
          <Text style={styles.risksTitle}>Risk Report</Text>
          <FlatList
            data={filteredRiskStatements}
            renderItem={renderRiskStatement}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f2f3f4",
  },
  cardContainer: {
    position: "relative",
  },
  risksCard: {
    margin: 20,
    padding: 20,
    borderRadius: 14,
    backgroundColor: "white",
  },
  risksTitle: {
    color: "black",
    fontSize: 24,
    fontWeight: "bold",
  },
  pieChartContainer: {
    padding: 20,
    alignItems: "center",
  },
  legendContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
  },
  legendRow: {
    flexDirection: "row",
    alignItems: "center",
    width: 120,
    marginRight: 20,
  },
  legendText: {
    color: "black",
    fontSize: 11,
  },
  listCard: {
    margin: 20,
    padding: 20,
    borderRadius: 14,
    backgroundColor: "white",
    height: 330,
  },
  uploadedText: {
    color: "black",
    paddingVertical: 10,
  },
  riskStatementText: {
    color: "blue", // Highlighted in blue
    fontWeight: "bold", // Bold text
    paddingVertical: 5,
  },
  separator: {
    height: 1,
    backgroundColor: "#e0e0e0",
    marginVertical: 5,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  filterButton: {
    marginHorizontal: 5,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#007bff",
    borderRadius: 8,
  },
  activeFilterButton: {
    backgroundColor: "#0056b3", // Active button color
  },
  filterButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default Risks;
