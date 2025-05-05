import React, { useState } from "react"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native"
import { useRouter } from "expo-router"
import { useLoginMutation } from "../../features/loginApi"
import { useDispatch } from "react-redux"
import { setCredentials, saveAuthToken } from "../../features/authSlice"

const LoginScreen = () => {
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  })

  const [login, { isLoading, error }] = useLoginMutation()
  const dispatch = useDispatch()
  const router = useRouter()

  const handleFormChange = (name, value) => {
    setLoginFormData({
      ...loginFormData,
      [name]: value,
    })
  }

  const handleSubmit = async () => {
    try {
      const userData = await login(loginFormData).unwrap()
      await saveAuthToken(userData.token)
      dispatch(setCredentials(userData.token))
      router.replace("/(tabs)")
    } catch (err) {
      console.error("Failed to log in:", err)
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={styles.loginForm}>
          <Text style={styles.title}>Maximize discipline</Text>

          {error && <Text style={styles.errorText}>Wrong credentials</Text>}

          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#6b6b6b"
            editable={!isLoading}
            value={loginFormData.email}
            onChangeText={(text) => handleFormChange("email", text)}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#6b6b6b"
            editable={!isLoading}
            value={loginFormData.password}
            onChangeText={(text) => handleFormChange("password", text)}
            secureTextEntry
          />

          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#000" />
            ) : (
              <Text style={styles.buttonText}>Log In</Text>
            )}
          </TouchableOpacity>

          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>Don't have an account yet?</Text>
            <TouchableOpacity onPress={() => router.replace("/(auth)/register")}>
              <Text style={styles.registerLink}>Sign up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    padding: 20,
  },
  loginForm: {
    width: "100%",
  },
  title: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#2B2B2B",
    color: "white",
    padding: 15,
    borderRadius: 8,
    marginBottom: 16,
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: "#09EDFF",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 16,
  },
  errorText: {
    color: "#ff4d4f",
    marginBottom: 10,
    textAlign: "center",
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  registerText: {
    color: "#fff",
    marginRight: 5,
  },
  registerLink: {
    color: "#09EDFF",
    fontWeight: "bold",
  },
})

export default LoginScreen
