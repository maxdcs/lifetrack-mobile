import React, { useState } from "react"
import { View, Text, StyleSheet, Modal, Pressable, TouchableOpacity } from "react-native"
import WorkoutList from "./WorkoutList"
import { logout, removeAuthToken } from "../../features/authSlice"
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from "expo-router"
import { workoutsApi } from "../../features/workoutsApi"
import CreateWorkoutModal from "./CreateWorkoutModal"

const WorkoutsScreen = () => {
  const [createWorkoutModalShowing, setCreateWorkoutModalShowing] = useState(false)

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Workouts</Text>

      <WorkoutList />

      <Modal
        animationType="fade"
        transparent={true}
        visible={createWorkoutModalShowing}
        onRequestClose={() => setCreateWorkoutModalShowing(false)}
        statusBarTranslucent={true}
      >
        <CreateWorkoutModal closeModal={() => setCreateWorkoutModalShowing(false)} />
      </Modal>

      <TouchableOpacity style={styles.btnCreateWorkoutContainer} onPress={() => setCreateWorkoutModalShowing(true)}>
        <Text style={styles.btnCreateWorkoutText}>Create Workout</Text>
      </TouchableOpacity>
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
  btnCreateWorkoutContainer: {
    height: 40,
    width: 200,
    marginTop: "auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  btnCreateWorkoutText: {
    color: "white",
    fontSize: 20,
  }
})

export default WorkoutsScreen
