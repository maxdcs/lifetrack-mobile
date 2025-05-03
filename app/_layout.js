import React, { useEffect } from "react"
import { Tabs } from "expo-router"
import { Text, View, ActivityIndicator } from "react-native"
import { Provider, useSelector, useDispatch } from "react-redux"
import { StatusBar } from "expo-status-bar"
import { store } from "../src/store"
import {
  loadAuthToken,
  setCredentials,
  finishLoading,
} from "../src/features/authSlice"

const screenOptions = {
  headerShown: false,
  tabBarStyle: {
    backgroundColor: "#222",
    borderTopColor: "#333",
    height: 70,
    paddingBottom: 10,
    paddingTop: 10,
  },
  tabBarActiveTintColor: "#09EDFF",
  tabBarInactiveTintColor: "white",
  tabBarLabelStyle: {
    fontSize: 12,
  },
}

// Layout component with authentication
function RootLayoutNav() {
  const { token, loading } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  // Load token from secure store into redux store
  useEffect(() => {
    const loadTokenFromStorage = async () => {
      try {
        const storedToken = await loadAuthToken()
        if (storedToken) {
          dispatch(setCredentials(storedToken))
        } else {
          dispatch(finishLoading())
        }
      } catch (error) {
        console.log("Failed to load auth token:", error)
        dispatch(finishLoading())
      }
    }

    loadTokenFromStorage()
  }, [dispatch])

  return loading ? (
    <View>
      <StatusBar style="light" />
      <ActivityIndicator size="large" color="#09EDFF" />
      <Text style={{ color: "white", marginTop: 10 }}>Loading...</Text>
    </View>
  ) : (
    <>
      <StatusBar style="light" />
      <Tabs screenOptions={screenOptions}>
        <Tabs.Screen name="index" />
        <Tabs.Screen name="workouts" />
        <Tabs.Screen name="statistics" />
        <Tabs.Screen
          name="auth/login"
          options={{
            tabBarButton: () => null,
            tabBarStyle: { display: "none" },
          }}
        />
        <Tabs.Screen
          name="auth/register"
          options={{
            tabBarButton: () => null,
            tabBarStyle: { display: "none" },
          }}
        />
      </Tabs>
    </>
  )
}

// Root layout with Redux Provider
export default function RootLayout() {
  return (
    <Provider store={store}>
      <RootLayoutNav />
    </Provider>
  )
}
