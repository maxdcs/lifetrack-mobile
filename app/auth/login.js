import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'expo-router';
import LoginScreen from '../../src/screens/LoginScreen';

export default function Login() {
  const { token } = useSelector((state) => state.auth);
  
  if (token) {
    return <Redirect href="/" />;
  }
  
  return <LoginScreen />;
}