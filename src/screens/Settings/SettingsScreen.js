import React from "react"
import { View, Text, StyleSheet, Pressable } from "react-native"
import { useDispatch } from "react-redux"
import { removeAuthToken, logout } from "../../features/authSlice"
import { workoutsApi } from "../../features/workoutsApi"
import { router } from "expo-router"

export default function SettingsScreen() {
  const dispatch = useDispatch()

  const handleLogout = async () => {
    dispatch(logout())
    await removeAuthToken()
    dispatch(workoutsApi.util.resetApiState())
    router.replace("/(auth)")
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Settings</Text>

      <Pressable onPress={handleLogout}>
        <View style={styles.btnLogout}>
          <Text style={styles.btnLogoutText}>Log Out</Text>
        </View>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  text: {
    color: "white",
    fontSize: 24,
  },
  btnLogout: {
    width: 100,
    height: 50,
    backgroundColor: "#222",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  btnLogoutText: {
    color: "white",
  },
})