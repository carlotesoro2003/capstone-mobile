import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Platform,
  StatusBar,
} from "react-native";
import { PieChart } from "react-native-gifted-charts";
import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Link } from "expo-router";

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

const risksPieData = [
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

const plansPieData = [
  { value: 70, color: "green" },
  { value: 30, color: "lightgray" },
];

const DepartmentDashboard = () => {
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

  const handlePieSectionPress = (section) => {
    console.log(`${section.label} section clicked`);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" hidden={false}></StatusBar>

      <ScrollView style={{ flex: 1 }}>
        <View style={styles.cardContainer}>
          <View style={styles.risksCard}>
            <Text style={styles.risksTitle}>Risks</Text>
            <View style={styles.arrowContainer}>
              <Link href="DepartmentRisks">
                <MaterialIcons
                  name="arrow-forward-ios"
                  size={24}
                  color="black"
                />
              </Link>
            </View>
            <View style={styles.pieChartContainer}>
              <PieChart
                donut
                data={risksPieData.map((section) => ({
                  ...section,
                  onPress: () => handlePieSectionPress(section),
                }))}
                sectionAutoFocus
                radius={120}
                focusOnPress
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

          <View style={styles.cardContainer}>
            <View style={styles.risksCard}>
              <Text style={styles.risksTitle}>Plans</Text>
              <View style={styles.arrowContainer}>
                <Link href="DepartmentPlans">
                  <MaterialIcons
                    name="arrow-forward-ios"
                    size={24}
                    color="black"
                  />
                </Link>
              </View>
              <View style={styles.pieChartContainer}>
                <PieChart
                  data={plansPieData}
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
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 8 : 0,
  },
  cardContainer: {
    position: "relative",
  },
  risksCard: {
    margin: 20,
    padding: 20,
    borderRadius: 14,
    backgroundColor: "white",
    position: "relative",
  },
  risksTitle: {
    color: "black",
    fontSize: 24,
    fontWeight: "bold",
  },
  pieChartContainer: {
    alignItems: "center",
    padding: 20,
  },
  arrowContainer: {
    position: "absolute",
    top: 10,
    right: 10,
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
  centerLabel: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#007bff",
  },
  centerSubtitle: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
});

export default DepartmentDashboard;
