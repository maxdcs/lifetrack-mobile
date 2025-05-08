import React from "react"
import { StyleSheet, Text, View, Dimensions, TouchableWithoutFeedback } from "react-native"
import Animated, { useAnimatedStyle, interpolate } from "react-native-reanimated"
import { useNavigation } from "expo-router"

const { width: SCREEN_WIDTH } = Dimensions.get("window")
const CARD_WIDTH = SCREEN_WIDTH * 0.8
const CARD_HEIGHT = CARD_WIDTH * 1.5
const SPACING = SCREEN_WIDTH * 0.1

const WorkoutCard = ({ workout, index, scrollX }) => {
  const navigation = useNavigation()

  // Calculate input range for animations
  const inputRange = [(index - 1) * (CARD_WIDTH + SPACING), index * (CARD_WIDTH + SPACING), (index + 1) * (CARD_WIDTH + SPACING)]

  // 3D transform animations
  const cardStyle = useAnimatedStyle(() => {
    

    // Y-axis rotation (3D effect)
    const rotateY = interpolate(
      scrollX.value,
      inputRange,
      [45, 0, -45], // Degrees of rotation
      "clamp"
    )

    const translateY = interpolate(
      scrollX.value,
      inputRange,
      [20, 0, 20], 
      "clamp"
    )

    return {
      transform: [
        { perspective: 800 },
        { rotateY: `${rotateY}deg` },
        { translateY }, 
      ]
    }
  })

  const handlePress = () => {
    navigation.navigate(`/workouts/${workout.id}/customize`)
  }

  return (
    <View style={styles.cardContainer}>
      <TouchableWithoutFeedback onPress={handlePress}>
        <Animated.View style={[styles.card, cardStyle]}>
          <Text style={styles.cardText}>{workout.name}</Text>
        </Animated.View>
      </TouchableWithoutFeedback>
    </View>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    marginHorizontal: SPACING / 2,
    backfaceVisibility: "hidden",
  },
  card: {
    flex: 1,
    backgroundColor: "#333",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    elevation: 16,
    backfaceVisibility: "hidden",
  },
  cardText: {
    fontFamily: "SpaceGrotesk",
    fontSize: 30,
    color: "white",
    textAlign: "center",
  },
})

export default WorkoutCard