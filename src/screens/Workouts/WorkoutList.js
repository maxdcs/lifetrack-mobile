import React from "react"
import { View, Text, StyleSheet } from "react-native"
import WorkoutListItem from "./WorkoutListItem"
import EmptyState from "./EmptyState"
import { useGetUserWorkoutsQuery } from "../../features/workoutsApi"

const WorkoutList = () => {
  const { data: workouts, isLoading } = useGetUserWorkoutsQuery()

  if (isLoading) {
    return <Text style={styles.loadingText}>Loading workouts...</Text>
  }

  if (!workouts || workouts.length === 0) {
    return <EmptyState />
  }

  return (
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
