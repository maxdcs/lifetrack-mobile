import { View, Text } from "react-native"
import React from "react"
import { useLocalSearchParams } from "expo-router"
import { useGetWorkoutByIdQuery } from "../../features/workoutsApi"

export default function CustomizeWorkoutScreen() {
  const params = useLocalSearchParams()
  const { workoutId } = params
  const {
    data: workout,
    isLoading: workoutIsLoading,
    isSuccess: workoutIsSuccess,
  } = useGetWorkoutByIdQuery()

  return (
    <View>
      <Text>Id of the workout: {workoutId}</Text>
      <Text>workout's name: {workout.name}</Text>
    </View>
  )
}
