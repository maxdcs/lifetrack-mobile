import {
  View,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native"
import React, { useState } from "react"
import { useCreateNewWorkoutMutation } from "../../features/workoutsApi"

export default function CreateWorkoutModal({ closeModal }) {
  const [createNewWorkout, { isLoading, isSuccess, isError, error }] =
    useCreateNewWorkoutMutation()

  const [newWorkoutName, setNewWorkoutName] = useState("")

  const handleSubmitNewWorkout = async () => {
    await createNewWorkout(newWorkoutName)
    closeModal()
  }

  return (
    <TouchableWithoutFeedback onPress={closeModal}>
      <View style={styles.overlayBackground}>
        <TouchableWithoutFeedback onPress={() => {}}>
          <View style={styles.modalContainer}>
            <Text style={styles.promptText}>Choose a name</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g Push Day"
              placeholderTextColor="#999"
              value={newWorkoutName}
              onChangeText={(text) => setNewWorkoutName(text)}
              keyboardType="default"
              secureTextEntry={false}
              autoCapitalize="none"
              editable={true}
              multiline={false}
              maxLength={100}
            />
            <TouchableOpacity style={styles.btnCreateContainer} onPress={handleSubmitNewWorkout}>
              <Text style={styles.btnCreate}>Create</Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  overlayBackground: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "rgb(0, 67, 89)",
    width: 300,
    height: 300,
    borderRadius: 16,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  promptText: {
    fontSize: 24,
    color: "white",
    marginBottom: 40
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    width: 220,
    height: 50,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 18,
    color: 'white',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  btnCreateContainer: {
    backgroundColor: "teal",
    width: 100,
    height: 50,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  btnCreate: {
    fontSize: 20,
    color: "white",
    textAlign: "center",
  }

})
