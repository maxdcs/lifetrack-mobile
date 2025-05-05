import {
  View,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from "react-native"
import React from "react"
import { useRouter } from "expo-router"

export default function WorkoutListCardModal({ closeModal, workout }) {
  
  const router = useRouter()

  return (
    <TouchableWithoutFeedback onPress={closeModal}>
      <View style={styles.overlayBackground}>
        <TouchableWithoutFeedback onPress={() => {}}>
          <View style={styles.workoutCard}>
            <Text style={styles.name}>{workout.name}</Text>
            <Text>Exercises: {workout.exercises.length}</Text>
            
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.btnCustomize} onPress={() => router.replace(`/workouts/${workout.id}/customize`)}>
                <Text style={styles.btnCustomizeText}>Customize</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnStart}>
                <Text style={styles.btnStartText}>Start</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  overlayBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  workoutCard: {
    backgroundColor: "rgb(1, 42, 58)",
    height: "50%",
    width: "76%",
    borderRadius: 12,
    padding: 20,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  name: {
    color: "white",
    fontSize: 24,
    marginBottom: 250,
  },
  buttonContainer: {
    width: "100%",
    borderColor: "white",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 20
  },
  btnStart: {
    height: 60,
    width: 100,
    backgroundColor: "rgb(0, 170, 203)",
    borderRadius: 16,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  btnStartText: {
    fontSize: 30,
    color: "white",
  },
  btnCustomize: {
    height: 40,
    width: 120,
    backgroundColor: "rgb(0, 170, 203)",
    borderRadius: 16,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    
  },
  btnCustomizeText: {
    fontSize:16,
    color: "white",
  },
})
