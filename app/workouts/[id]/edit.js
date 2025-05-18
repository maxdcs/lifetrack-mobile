import { View, Text } from "react-native"
import React from "react"
import { useSelector } from "react-redux"
import { Redirect } from "expo-router"
import EditWorkoutScreen from "../../../src/screens/EditWorkout/EditWorkoutScreen"

export default function Edit() {
  const { token } = useSelector((state) => state.auth)
  if (!token) {
    return <Redirect href="/auth/login" />
  }
  return <EditWorkoutScreen />
}
