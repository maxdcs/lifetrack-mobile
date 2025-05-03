import React, { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { useGetUserWorkoutsQuery } from "../../features/workoutsApi"
import * as SecureStore from "expo-secure-store"

const WorkoutsScreen = () => {
  const {
    data: fetchedWorkouts,
    isLoading: fetchingWorkoutsIsLoading,
    isSuccess: fetchingWorkoutsIsSuccess,
    isError: fetchingWorkoutsIsError,
    error: fetchingWorkoutsError,
  } = useGetUserWorkoutsQuery()

  // For debugging -------------------
  if (fetchingWorkoutsIsSuccess) {
    console.log(fetchedWorkouts)
  }
  // For debugging -------------------

  const [isModalShowing, setIsModalShowing] = useState(false)

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Workouts</Text>
      <View>
        {fetchingWorkoutsIsLoading ? (
          <Text style={{ color: "white" }}>Loading workouts...</Text>
        ) : fetchingWorkoutsIsError ? (
          <Text style={{ color: "red" }}>
            Error: {fetchingWorkoutsError?.message || "Failed to load workouts"}
          </Text>
        ) : fetchedWorkouts?.length ? (
          fetchedWorkouts.map((w) => (
            <Text style={{ color: "white" }} key={w.id}>
              {w.id}
            </Text>
          ))
        ) : (
          <View>
            <Text style={{ color: "white" }}>
              No workouts present, create one
            </Text>
          </View>
        )}
      </View>

      <View style={styles.plusContainer}>
        <TouchableOpacity
          onPress={() => setIsModalShowing(true)}
          style={styles.plusButton}
        >
          <Text style={styles.plusText}>＋</Text>
        </TouchableOpacity>
      </View>

      {isModalShowing && (
        <View style={styles.modalBackdrop}>
          <View style={styles.createWorkoutModalContainer}>
            <Text style={styles.modalTitle}>Create New Workout</Text>
            {/* Add input and buttons as needed */}
          </View>
        </View>
      )}
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
  btnCreate: {
    marginTop: "auto",
  },
  plusContainer: {
    marginTop: "auto",
    alignItems: "center",
    justifyContent: "center",
  },
  plusButton: {
    backgroundColor: "#00BFFF",
    borderRadius: 12,
    width: 64,
    height: 64,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#00BFFF",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  plusText: {
    fontSize: 36,
    color: "#fff",
    fontWeight: "bold",
  },
  modalBackdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  createWorkoutModalContainer: {
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    minHeight: 200,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
})

export default WorkoutsScreen
