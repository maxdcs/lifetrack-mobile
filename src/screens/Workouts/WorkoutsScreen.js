import React from "react";
import { View, StyleSheet, SafeAreaView, ImageBackground, Text, ActivityIndicator } from "react-native";
import { useGetUserWorkoutsQuery } from "../../features/workoutsApi";
import WorkoutCarousel from "./WorkoutCarousel";

const WorkoutsScreen = () => {
  const { data: workouts, isLoading, isError } = useGetUserWorkoutsQuery();

  return (
    <ImageBackground
      source={require("../../../assets/images/workout-screen-backdrop1.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>My Workouts</Text>
        </View>
        
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#09EDFF" />
            <Text style={styles.loadingText}>Loading your workouts...</Text>
          </View>
        ) : isError ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>
              There was an error loading your workouts.
            </Text>
          </View>
        ) : workouts && workouts.length > 0 ? (
          <View style={styles.carouselContainer}>
            <WorkoutCarousel workouts={workouts} />
          </View>
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              You don't have any workouts yet.
            </Text>
            <Text style={styles.emptySubText}>
              Create a new workout to get started!
            </Text>
          </View>
        )}
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
  header: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    fontFamily: "Exo2",
  },
  carouselContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    color: "#fff",
    marginTop: 12,
    fontSize: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    color: "#ff4d4f",
    fontSize: 16,
    textAlign: "center",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },
  emptySubText: {
    color: "#09EDFF",
    fontSize: 16,
    textAlign: "center",
  },
});

export default WorkoutsScreen;