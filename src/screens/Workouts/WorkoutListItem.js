import React from "react"
import { View, Text, StyleSheet } from "react-native"

const WorkoutListItem = ({ workout }) => {
  return (
    <View style={styles.workoutItem}>
      <Text style={styles.workoutName}>{workout.name}</Text>
      <Text style={styles.exerciseCount}>
        {workout.exercises?.length || 0} exercises
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  workoutItem: {
    backgroundColor: "#222",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  workoutName: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  exerciseCount: {
    color: "#888",
    marginTop: 4,
  },
})

export default WorkoutListItem
