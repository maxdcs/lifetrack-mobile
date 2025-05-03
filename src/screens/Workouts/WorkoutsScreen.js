import React from "react"
import { View, Text, StyleSheet } from "react-native"
import WorkoutList from "./WorkoutList"

const WorkoutsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Workouts</Text>
      <WorkoutList />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 20,
  },
  title: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 40,
  },
})

export default WorkoutsScreen
