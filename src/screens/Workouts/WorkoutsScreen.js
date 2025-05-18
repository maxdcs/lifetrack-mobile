import React from "react"
import { View, StyleSheet, SafeAreaView, ImageBackground, Text, ActivityIndicator, Pressable, Image } from "react-native"
import { useGetUserWorkoutsQuery } from "../../features/workoutsApi"
import WorkoutCarousel from "./WorkoutCarousel"
import { useSelector } from "react-redux"
import { useFocusEffect } from "@react-navigation/native"
import { useCallback } from "react"
import CreateWorkoutButton from "./CreateWorkoutButton"

const WorkoutsScreen = () => {
  const {
    data: workouts,
    isLoading,
    isError,
    refetch: refetchUserWorkouts,
  } = useGetUserWorkoutsQuery(undefined, {
    refetchOnFocus: true,
  })
  const user = useSelector((state) => state.auth)

  console.log(user.token)

  useFocusEffect(
    useCallback(() => {
      refetchUserWorkouts()
    }, [])
  )

  const handleCreateWorkoutPress = () => {
    console.log(`Pressing create`)
  }

  return (
    <ImageBackground
      source={require("../../../assets/images/workout-screen-backdrop1.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.wrapper}>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#09EDFF" />
            <Text style={styles.loadingText}>Loading your workouts...</Text>
          </View>
        ) : isError ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>There was an error loading your workouts.</Text>
          </View>
        ) : workouts && workouts.length > 0 ? (
          <View style={styles.carouselContainer}>
            <CreateWorkoutButton onPress={handleCreateWorkoutPress}/>
            <WorkoutCarousel workouts={workouts} />
          </View>
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>You don't have any workouts yet.</Text>
            <Text style={styles.emptySubText}>Create a new workout to get started!</Text>
          </View>
        )}
      </SafeAreaView>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    color: "black",
  },
  wrapper: {
    flex: 1,
    backgroundColor: "transparent",
    position: "relative"
  },
  createWorkoutButton: {
    top: 20,
    right: -130,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: -4, // shift shadow to the left
      height: 4,  // and downward
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  createWorkoutButtonImage: {
    width: 50,
    height: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: -4, // shift shadow to the left
      height: 4,  // and downward
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
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
    marginTop: -60,
    padding: 50,
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
})

export default WorkoutsScreen
