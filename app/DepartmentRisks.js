import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
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

// Sample risk statements
const riskStatements = [
  "College of Computing and Multimedia Studies uploaded: Risk Statement 1, RRN-CCMS-01",
  "College of Computing and Multimedia Studies uploaded: Risk Statement 1, RRN-CCMS-02",
  "College of Computing and Multimedia Studies uploaded: Risk Statement 1, RRN-CCMS-03",
  "College of Computing and Multimedia Studies uploaded: Risk Statement 1, RRN-CCMS-04",
  "College of Computing and Multimedia Studies uploaded: Risk Statement 1, RRN-CCMS-05",
  "College of Computing and Multimedia Studies uploaded: Risk Statement 1, RRN-CCMS-01",
  "College of Computing and Multimedia Studies uploaded: Risk Statement 1, RRN-CCMS-02",
  "College of Computing and Multimedia Studies uploaded: Risk Statement 1, RRN-CCMS-03",
  "College of Computing and Multimedia Studies uploaded: Risk Statement 1, RRN-CCMS-04",
  "College of Computing and Multimedia Studies uploaded: Risk Statement 1, RRN-CCMS-05",
];

const Risks = () => {
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
        <Text style={styles.riskText}>{item}</Text>
        <View style={styles.separator} />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" hidden={false}></StatusBar>
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

        {/* Card for the risk statements */}
        <View style={styles.listCard}>
          <FlatList
            data={riskStatements}
            renderItem={renderRiskStatement}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }} // Add padding to the bottom of the FlatList
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
  riskText: {
    color: "black",
    paddingVertical: 10,
  },
  separator: {
    height: 1,
    backgroundColor: "#e0e0e0",
    marginVertical: 5,
  },
});

export default Risks;