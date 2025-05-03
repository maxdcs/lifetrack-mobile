import React from "react"
import { View, Text, StyleSheet } from "react-native"
import WorkoutListItem from "./WorkoutListItem"
import { useGetUserWorkoutsQuery } from "../../features/workoutsApi"
import { useSelector } from "react-redux"

const WorkoutList = () => {

  
  
  const { data: workouts, isLoading } = useGetUserWorkoutsQuery()

  return isLoading ? (
    <Text style={styles.loadingText}>Loading workouts...</Text>
  ) : (
    <View style={styles.container}>
      {workouts.map((workout) => (
        <WorkoutListItem key={workout.id} workout={workout} />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  loadingText: {
    color: "#888",
    fontSize: 16,
    textAlign: "center",
    marginTop: 40,
  },
})

export default WorkoutList
