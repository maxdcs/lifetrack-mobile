import React from "react";
import { Dimensions, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import WorkoutCard from "./WorkoutCard";

const { width: screenWidth } = Dimensions.get("window");

const WorkoutCarousel = ({ workouts = [] }) => {
  // Set up base configurations with proper scaling
  const scale = 1.2;
  const PAGE_WIDTH = screenWidth * scale;
  const PAGE_HEIGHT = PAGE_WIDTH * 1.33; // Maintain a good aspect ratio
  
  return (
    <View style={{ 
      width: screenWidth, 
      height: PAGE_HEIGHT,
      justifyContent: "center",
      alignItems: "center"
    }}>
      <Carousel
        loop
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 160,
        }}
        width={PAGE_WIDTH}
        height={PAGE_HEIGHT}
        data={workouts || []}
        renderItem={({ item, index }) => <WorkoutCard workout={item} index={index} />}
      />
    </View>
  );
};

export default WorkoutCarousel;