import React from "react"
import { Text, StyleSheet } from "react-native"

const EmptyState = () => {
  return (
    <Text style={styles.emptyText}>
      No workouts found. Create your first workout!
    </Text>
  )
}

const styles = StyleSheet.create({
  emptyText: {
    color: "#888",
    fontSize: 16,
    textAlign: "center",
    marginTop: 40,
  },
})

export default EmptyState
