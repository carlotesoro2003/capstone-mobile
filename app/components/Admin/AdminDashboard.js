import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  StatusBar,
} from "react-native";
import { PieChart } from "react-native-gifted-charts";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Link } from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";

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

const departmentsData = [
  { name: "CCMS", plans: 36 },
  { name: "CENG", plans: 25 },
  { name: "CAFA", plans: 24 },
  { name: "CBA", plans: 22 },
  { name: "CNAHS", plans: 18 },
];

const AdminDashboard = () => {
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

  const handleDepartmentPress = (departmentName) => {
    console.log(`Department ${departmentName} clicked`);
  };

  const handlePieSectionPress = (section) => {
    console.log(`${section.label} section clicked`);
  };

  const renderDepartmentPlans = () => {
    return departmentsData.map((department) => (
      <TouchableOpacity
        key={department.name}
        onPress={() => handleDepartmentPress(department.name)}
      >
        <View style={styles.departmentRow}>
          <Text style={styles.departmentName}>{department.name}</Text>
          <View style={styles.plansContainer}>
            <Text style={styles.departmentPlans}>{department.plans}</Text>
            <MaterialIcons name="arrow-right" size={28} color="black" />
          </View>
        </View>
      </TouchableOpacity>
    ));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" hidden={false}></StatusBar>


      <ScrollView style={{ flex: 1 }}>
        <View style={styles.cardContainer}>
          <View style={styles.risksCard}>
            <Text style={styles.risksTitle}>Risks</Text>
            <View style={styles.pieChartContainer}>
              <PieChart
                donut
                data={pieData.map((section) => ({
                  ...section,
                  onPress: () => handlePieSectionPress(section),
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
            <Link href="/index" style={styles.arrowContainer}>
              <MaterialIcons name="arrow-forward" size={24} color="black" />
            </Link>
          </View>
        </View>

        <View style={styles.cardContainer}>
          <View style={styles.risksCard}>
            <Text style={styles.risksTitle}>Plans</Text>
            <Link href="/departments" style={styles.arrowContainer}>
              <MaterialIcons name="arrow-forward" size={24} color="black" />
            </Link>
            {renderDepartmentPlans()}
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
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  appName: {
    fontSize: 30,
    fontWeight: "bold",
    color: "black",
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
  departmentRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 14,
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  plansContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  departmentName: {
    color: "black",
    fontSize: 16,
  },
  departmentPlans: {
    color: "black",
    fontWeight: "bold",
    fontSize: 26,
    marginRight: 5,
  },
  arrowContainer: {
    position: "absolute",
    top: 10,
    right: 10,
  },
});

export default AdminDashboard;