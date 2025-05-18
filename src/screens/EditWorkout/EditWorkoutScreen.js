import { View, Text, ImageBackground, StyleSheet, TextInput } from "react-native"
import React, { useEffect, useState } from "react"
import { useLocalSearchParams } from "expo-router"
import { useGetWorkoutByIdQuery } from "../../features/workoutsApi"
import { useDebounce } from "../../../hooks/useDebounce"
import { useDispatch, useSelector } from "react-redux"
import { initializeWorkoutFormName } from "../../features/editWorkoutFormSlice"

export default function EditWorkoutScreen() {
  const editWorkoutForm = useSelector((state) => state.editWorkoutForm)
  const dispatch = useDispatch()
  const params = useLocalSearchParams()
  const workoutId = params.id
  const {
    data: fetchedWorkout,
    isLoading: workoutFetchingIsLoading,
    isSuccess: workoutFetchingIsSuccess,
  } = useGetWorkoutByIdQuery(workoutId)

  useEffect(() => {
    if (workoutFetchingIsSuccess && !editWorkoutForm.isDirty) {
      dispatch(initializeWorkoutFormName(fetchedWorkout.name))
    }
  }, [dispatch, editWorkoutForm.isDirty, fetchedWorkout.name, workoutFetchingIsSuccess])

  return workoutFetchingIsLoading ? (
    <Text>Loading...</Text>
  ) : (
    <ImageBackground
      source={require("../../../assets/images/EditWorkoutScreenBackground1.png")}
      style={styles.imageBackground}
      resizeMode="cover"
    >
      <View>
        <TextInput />
      </View>
      <View>
        <Text></Text>
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  imageBackground: {
    width: "100%",
    height: "100%",
  },
})
