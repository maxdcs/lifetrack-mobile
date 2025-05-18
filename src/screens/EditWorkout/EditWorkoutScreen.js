// imports

import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native"
import React, { useEffect, useState } from "react"
import { useLocalSearchParams } from "expo-router"
import {
  useGetWorkoutByIdQuery,
  useUpdateWorkoutByIdMutation,
} from "../../features/workoutsApi"
import { useDebounce } from "../../../hooks/useDebounce"
import { useDispatch, useSelector } from "react-redux"
import {
  initializeWorkoutFormName,
  updateWorkoutFormName,
  clearEditWorkoutForm,
  setFormPristine
} from "../../features/editWorkoutFormSlice"

// #endregion imports

export default function EditWorkoutScreen() {
  const dispatch = useDispatch()
  const params = useLocalSearchParams()
  const editWorkoutForm = useSelector((state) => state.editWorkoutForm)
  
  const workoutId = params.id
  
  const [isEditingName, setIsEditingName] = useState(false)

  // #region useGetWorkoutByIdQuery hook
  const {
    data: fetchedWorkout,
    isLoading: workoutFetchingIsLoading,
    isSuccess: workoutFetchingIsSuccess,
    isError: workoutFetchingIsError,
    error: workoutFetchingError
  } = useGetWorkoutByIdQuery(workoutId)
  // #endregion
  // #region useUpdateWorkoutByIdMutation hook
  const [updateWorkoutById, {
    isLoading: updateWorkoutIsLoading,
    isSuccess: updateWorkoutIsSuccess,
    isError: updateWorkoutIsError,
    error: updateWorkoutError
  }] = useUpdateWorkoutByIdMutation()
  // #endregion
  // #region initialization of editWorkoutForm state in RTK
  useEffect(() => {
    if (workoutFetchingIsSuccess && fetchedWorkout && !editWorkoutForm.isDirty) {
      dispatch(initializeWorkoutFormName(fetchedWorkout.name))
    }
  }, [
    dispatch,
    editWorkoutForm.isDirty,
    fetchedWorkout,
    fetchedWorkout.name,
    workoutFetchingIsSuccess,
  ])
  // #endregion
  // #region autosave functionality
  const debouncedWorkoutForm = useDebounce(editWorkoutForm)

  useEffect(() => {
    if (workoutId && debouncedWorkoutForm && debouncedWorkoutForm.isDirty) {
      const payload = {
        name: debouncedWorkoutForm.name,
        exercises: debouncedWorkoutForm.exercises,
      }
      updateWorkoutById({ workoutId, workoutFormData: payload })
        .unwrap()
        .then(() => {
          dispatch(setFormPristine())
        })
        .catch((error) => {
          console.error("Failed to auto-save workout:", error)
        })
    }
  }, [debouncedWorkoutForm, updateWorkoutById, workoutId, dispatch])

  // #endregion
  // #region workoutFormData cleanup on unmount
  useEffect(() => {
    return () => {
      console.log("EditWorkoutScreen unmounting, clearing form state.")
      dispatch(clearEditWorkoutForm())
    }
  }, [dispatch])
  // #endregion

  return workoutFetchingIsLoading ? (
    <Text>Loading...</Text>
  ) : (
    <ImageBackground
      source={require("../../../assets/images/EditWorkoutScreenBackground1.png")}
      style={styles.imageBackground}
      resizeMode="cover"
    >
      <View style={styles.wrapper}>
        <TouchableOpacity onPress={() => setIsEditingName(true)} activeOpacity={0.8}>
          {isEditingName ? (
            <TextInput
              value={editWorkoutForm.name}
              onChangeText={(text) => dispatch(updateWorkoutFormName(text))}
              onBlur={() => setIsEditingName(false)}
              autoFocus
              style={[styles.workoutName, styles.workoutNameEditing]}
              placeholder="Workout name"
              placeholderTextColor="#888"
            />
          ) : (
            <Text style={styles.workoutName}>
              {editWorkoutForm.name || "Untitled Workout"}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  imageBackground: {
    width: "100%",
    height: "100%",
  },
  wrapper: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 64,
  },
  workoutName: {
    fontSize: 36,
    fontFamily: "SpaceGrotesk",
    color: "#fff",
    marginBottom: 24,
  },

  workoutNameEditing: {
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 179, 0, 0.46)",
    paddingBottom: 6,
    shadowColor: "rgb(255, 223, 150)",
    shadowOffset: { width: 3, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
  },
})
