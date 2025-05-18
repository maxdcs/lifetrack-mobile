import React, { useRef } from "react"
import { Pressable, Animated, Image, StyleSheet } from "react-native"

const CreateWorkoutButton = ({ onPress }) => {
  const scale = useRef(new Animated.Value(1)).current

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.9,
      useNativeDriver: true,
    }).start()
  }

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start()
  }

  return (
    <Pressable onPressIn={handlePressIn} onPressOut={handlePressOut} onPress={onPress}>
      <Animated.View style={[styles.button, { transform: [{ scale }] }]}>
        <Image
          source={require("../../../assets/images/create-workout-button-plus.png")}
          style={styles.image}
          resizeMode="contain"
        />
      </Animated.View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    top: 20,
    right: -130,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: -4,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  image: {
    width: 50,
    height: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: -4,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
})

export default CreateWorkoutButton