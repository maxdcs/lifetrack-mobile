import React from "react"
import { View, StyleSheet, SafeAreaView, ImageBackground, Text } from "react-native"
import CreateWorkoutButton from "./CreateWorkoutButton"
import WorkoutCarousel from "./WorkoutCarousel"
import WorkoutHeader from "./WorkoutHeader"
import { useGetUserWorkoutsQuery } from "../../features/workoutsApi"

const WorkoutsScreen = () => {
  const { data: workouts = [], isLoading } = useGetUserWorkoutsQuery()

  return (
    <ImageBackground
      source={require("../../../assets/images/backdrop1.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.container}>
        
        <View style={styles.carouselContainer}>
          {isLoading ? (
            <Text style={styles.loadingText}>Loading...</Text>
          ) : (
            <WorkoutCarousel workouts={workouts} />
          )}
        </View>
       
      </SafeAreaView>
    </ImageBackground>
  )
}

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
  carouselContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomBar: {
    padding: 20,
    alignItems: "center",
  },
  loadingText: {
    color: "white",
    fontSize: 18,
  },
})

export default WorkoutsScreen