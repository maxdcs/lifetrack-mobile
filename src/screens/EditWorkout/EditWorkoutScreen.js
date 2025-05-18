import { View, Text, ImageBackground, StyleSheet, TextInput } from "react-native"
import React, { useEffect, useState } from "react"
import { useLocalSearchParams } from "expo-router"
import { useGetWorkoutByIdQuery } from "../../features/workoutsApi"

export default function EditWorkoutScreen() {
  const params = useLocalSearchParams()

  console.log(`Got params: ${params}`)

  const workoutId = params.id

  console.log(`workoutId: ${workoutId}`)
  const {
    data: workout,
    isLoading: workoutFetchingIsLoading,
    isSuccess: workoutFetchingIsSuccess,
  } = useGetWorkoutByIdQuery(workoutId)

  const [workoutFormData, setWorkoutFormData] = useState({
    name: "",
    exercises: [],
  })

  useEffect(() => {
    if (workoutFetchingIsSuccess) {
      setWorkoutFormData({
        name: workout.name,
        exercises: workout.exercises || [],
      })
    }
  }, [workoutFetchingIsSuccess])

  const handleChangeWorkoutFormData = (e) => {}

  return workoutFetchingIsLoading ? (
    <Text>Loading...</Text>
  ) : (
    <ImageBackground
      source={require("../../../assets/images/EditWorkoutScreenBackground1.png")}
      style={styles.imageBackground}
      resizeMode="cover"
    >
      <View>
        <TextInput value={workoutFormData.name} onChange={handleChangeWorkoutFormData} />
      </View>
      <View>
        <Text>{workout.exercises.length}</Text>
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
