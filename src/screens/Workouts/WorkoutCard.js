import React from "react";
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { router } from "expo-router";

const WorkoutCard = ({ workout, index }) => {
  const handleCardPress = () => {
    // Navigate to workout details page if you have one
    if (workout && workout.id) {
      router.push(`/workouts/${workout.id}/customize`);
    }
  };

  return (
    <TouchableOpacity 
      activeScale={0.7}
      activeOpacity={1}
      onPress={handleCardPress}
      style={styles.container}
    >
      <ImageBackground
        source={require("../../../assets/images/workout-card-backdrop1.png")}
        style={styles.card}
        resizeMode="cover"
        imageStyle={styles.backgroundImage}
      >
        <View style={styles.overlay} />
        <View style={styles.content}>
          <Text style={styles.name}>{workout?.name || "My Workout"}</Text>
          
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 2,
    borderRadius: 16,
    overflow: "hidden",
  },
  card: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
    borderRadius: 16,
    overflow: "hidden",
  },
  backgroundImage: {
    borderRadius: 16,
  },
  content: {
    width: "100%",
    padding: 20,
    paddingBottom: 30,
    alignItems: "center",
  },
  name: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
    fontFamily: "Exo2",

  },
  exerciseCount: {
    color: "#09EDFF",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    fontFamily: "SpaceGrotesk",

  },
});

export default WorkoutCard;