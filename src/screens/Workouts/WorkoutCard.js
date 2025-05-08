import { StyleSheet, Text } from "react-native"
import Animated from "react-native-reanimated"

const WorkoutCard = ({ workout, isActive }) => {
  return (
    <Animated.View
      style={[
        styles.card,
        {
          opacity: isActive ? 1 : 0.7,
          // We'll add 3D transforms here later
        },
      ]}
    >
      <Text style={styles.cardText}>{workout.name}</Text>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  cardText: { fontFamily: "Exo2" },
})
