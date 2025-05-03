import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'expo-router';
import WorkoutsScreen from '../src/screens/WorkoutsScreen';

export default function Workouts() {
  const { token } = useSelector((state) => state.auth);
  
  if (!token) {
    return <Redirect href="/auth/login" />;
  }
  
  return <WorkoutsScreen />;
}