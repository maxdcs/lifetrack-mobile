import React, { useState, useEffect } from "react"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native"
import { useRouter } from "expo-router"
import { useCreateNewUserMutation } from "../../features/usersApi"

const RegisterScreen = () => {
  const [registerFormData, setRegisterFormData] = useState({
    name: "",
    email: "",
    password: "",
    repeatPassword: "",
  })

  const router = useRouter()
  const [createNewUser, { isLoading, isSuccess, isError, error }] =
    useCreateNewUserMutation()

  const handleFormChange = (name, value) => {
    setRegisterFormData({
      ...registerFormData,
      [name]: value,
    })
  }

  const handleRegisterClick = () => {
    if (registerFormData.password !== registerFormData.repeatPassword) {
      Alert.alert("Error", "Passwords don't match!")
      return
    }

    createNewUser(registerFormData)
  }

  useEffect(() => {
    if (isSuccess) {
      setRegisterFormData({
        name: "",
        email: "",
        password: "",
        repeatPassword: "",
      })
      router.replace("/(auth)")
    }

    if (isError) {
      console.error("Registration error:", error)
      Alert.alert("Error", "Registration failed. Please try again.")
    }
  }, [isSuccess, isError, router, error])

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={styles.registerForm}>
          <Text style={styles.title}>Create your account</Text>

          <TextInput
            style={styles.input}
            placeholder="Name"
            placeholderTextColor="#6b6b6b"
            value={registerFormData.name}
            onChangeText={(text) => handleFormChange("name", text)}
            editable={!isLoading}
          />

          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#6b6b6b"
            value={registerFormData.email}
            onChangeText={(text) => handleFormChange("email", text)}
            autoCapitalize="none"
            keyboardType="email-address"
            editable={!isLoading}
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#6b6b6b"
            value={registerFormData.password}
            onChangeText={(text) => handleFormChange("password", text)}
            secureTextEntry
            editable={!isLoading}
          />

          <TextInput
            style={styles.input}
            placeholder="Repeat password"
            placeholderTextColor="#6b6b6b"
            value={registerFormData.repeatPassword}
            onChangeText={(text) => handleFormChange("repeatPassword", text)}
            secureTextEntry
            editable={!isLoading}
          />

          <TouchableOpacity
            style={styles.registerButton}
            onPress={handleRegisterClick}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#000" />
            ) : (
              <Text style={styles.buttonText}>Create Account</Text>
            )}
          </TouchableOpacity>

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account?</Text>
            <TouchableOpacity onPress={() => router.push("/(auth)")}>
              <Text style={styles.loginLink}>Log in</Text>
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
  registerForm: {
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
  registerButton: {
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
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  loginText: {
    color: "#fff",
    marginRight: 5,
  },
  loginLink: {
    color: "#09EDFF",
    fontWeight: "bold",
  },
})

export default RegisterScreen
