import React from "react"
import { View, Text, StyleSheet, Pressable } from "react-native"

const WorkoutListItem = ({ workout, onPress }) => {
  return (
    <Pressable onPress={onPress} style={styles.workoutTile}>
      <Text style={styles.workoutName}>{workout.name}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  workoutTile: {
    backgroundColor: "#222",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    width: "48%",
    height: 140,
  },
  workoutItem: {},
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
