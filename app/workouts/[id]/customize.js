import { View, Text } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from 'expo-router'
import CustomizeWorkoutScreen from '../../../src/screens/CustomizeWorkout/CustomizeWorkoutScreen'

export default function Customize() {
  const { token } = useSelector((state) => state.auth)
  if (!token) {
    return <Redirect href="/auth/login" />
  }
  return <CustomizeWorkoutScreen/>
}