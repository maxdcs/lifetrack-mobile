import React, { useState, useEffect } from "react"
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Dimensions, Image, Pressable, Touchable } from "react-native"
import { router } from "expo-router"

const { width: screenWidth } = Dimensions.get("window")

const WorkoutCard = ({ workout, index }) => {
  const [aspectRatio, setAspectRatio] = useState(1.5) // Default aspect ratio
  const [isButtonPressed, setIsButtonPressed] = useState(false)

  // Get image dimensions on component mount
  useEffect(() => {
    Image.getSize(
      Image.resolveAssetSource(require("../../../assets/images/workout-card-backdrop2_resized.png")).uri,
      (width, height) => {
        setAspectRatio(width / height)
      },
      (error) => console.error("Error getting image size:", error)
    )
  }, [])

  const handleStartButtonPress = () => {
    console.log(`pressed start`)

  }

  const handleEditButtonPress = () => {
    router.push(`/workouts/${workout.id}/edit`)
  }

  return (
    <TouchableOpacity activeOpacity={1} style={styles.wrapper}>
      <ImageBackground
        source={require("../../../assets/images/workout-card-backdrop2_resized.png")}
        style={[styles.imageBackground, { aspectRatio: aspectRatio }]}
        resizeMode="cover"
      >
        <View style={styles.contentContainer}>

          {/* Workout Name Start */}
          <View style={styles.workoutNameContainer}>
            <Text style={styles.workoutNameText}>{workout?.name}</Text>
          </View>
          {/* Workout Name End */}

          {/* Edit Button Start */}
          <TouchableOpacity onPress={handleEditButtonPress} style={styles.editButtonContainer}>
            <Image source={require("../../../assets/images/wrench-icon1.png")} style={styles.editButtonIcon}/>
          </TouchableOpacity>
          {/* Edit Button End */}

          {/* Start Workout Button Start */}
          <Pressable
            onPressIn={() => setIsButtonPressed(true)}
            onPressOut={() => setIsButtonPressed(false)}
            onPress={handleStartButtonPress}
            style={({pressed}) => [
              styles.startButtonContainer,
              isButtonPressed && styles.startButtonPressed
            ]}
          >
            <Text style={styles.startButtonText}>Execute</Text>
          </Pressable>
          {/* Start Workout Button End */}
        </View>
      </ImageBackground>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: 65,
    justifyContent: "center",
    alignItems: "center",
  },
  imageBackground: {
    width: "100%",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
  // workout.name start
  workoutNameContainer: {
    width: "100%",
    marginTop: 20,
  },
  workoutNameText: {
    fontFamily: "SpaceGrotesk",
    fontSize: 48,
    letterSpacing: 4,
    textAlign: "center",
    color: "#rgb(255, 255, 255)",
    textShadowColor: "#rgb(255, 236, 198)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  // workout.name end
  // startButton start
  startButtonContainer: {
    marginTop: "auto",
    marginBottom: 20,
    width: 200,
    height: 70,
    backgroundColor: "#rgb(76, 76, 76)",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 8, // for Android
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.25)", // brighter outline
    transform: [{ scale: 1.0 }],
    overflow: "visible",
  },
  startButtonPressed: {
    backgroundColor: "#rgb(45, 45, 45)", // darker when pressed
    transform: [{ scale: 0.97 }], // slightly smaller when pressed
    shadowOffset: { width: 0, height: 5 }, // reduced shadow
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 4,
  },
  startButtonText: {
    fontFamily: "SpaceGrotesk",
    fontSize: 30,
    letterSpacing: 2,
    color: "#rgb(255, 236, 189)",
    textShadowColor: "rgba(255, 236, 189, 0.7)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10, // text glow effect

  },
  // startWorkoutButton end
  // #region edit workout icon
  editButtonContainer: {
    marginTop: "auto",
    marginLeft: 220,
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.25)", // brighter outline
    borderRadius: 12
  },
  editButtonIcon: {
    width: 50,
    height: 50
  }


  // #endregion edit workout icon
})

export default WorkoutCard
