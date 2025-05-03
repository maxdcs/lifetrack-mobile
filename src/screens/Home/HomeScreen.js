import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

const HomeScreen = () => {
  const { name } = useSelector((state) => state.auth);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.welcomeText}>
          Welcome to LifeTrack, {name || "User"}
        </Text>
        <Text style={styles.subtitleText}>
          Track your workouts and progress
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 20,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  welcomeText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },
  subtitleText: {
    color: "#09EDFF",
    fontSize: 16,
    textAlign: "center",
  },
});

export default HomeScreen;