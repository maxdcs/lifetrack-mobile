import React, { useRef, useState } from "react";
import { View, Dimensions, StyleSheet, TouchableOpacity, Text } from "react-native";
import Animated, { 
  useSharedValue, 
  useAnimatedScrollHandler
} from "react-native-reanimated";
import WorkoutCard from "./WorkoutCard";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CARD_WIDTH = SCREEN_WIDTH * 0.8;
const CARD_HEIGHT = CARD_WIDTH * 1.5;
const SPACING = SCREEN_WIDTH * 0.1;
const SIDE_CARD_VISIBLE = SCREEN_WIDTH * 0.5;

const WorkoutCarousel = ({ workouts = [] }) => {
  const scrollX = useSharedValue(0);
  const flatListRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Handle scroll events
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
  });
  
  // Update active index when scrolling stops
  const handleMomentumScrollEnd = (event) => {
    const newIndex = Math.round(
      event.nativeEvent.contentOffset.x / (CARD_WIDTH + SPACING)
    );
    setActiveIndex(newIndex);
  };
  
  // Empty state when no workouts
  if (workouts.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No workouts yet. Create one!</Text>
      </View>
    );
  }
  
  return (
    <View style={styles.container}>
      
      <View style={styles.carouselContainer}>
        <Animated.FlatList
          ref={flatListRef}
          data={workouts}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.flatListContent}
          snapToInterval={CARD_WIDTH + SPACING}
          decelerationRate="fast"
          snapToAlignment="center"
          onScroll={scrollHandler}
          onMomentumScrollEnd={handleMomentumScrollEnd}
          scrollEventThrottle={16}
          renderItem={({ item, index }) => (
            <WorkoutCard
              workout={item}
              index={index}
              scrollX={scrollX}
              activeIndex={activeIndex}
            />
          )}
        />
      </View>
      
      <View style={styles.paginationContainer}>
        {workouts.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              activeIndex === index && styles.paginationDotActive,
            ]}
          />
        ))}
      </View>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.startButton}>
          <Text style={styles.startButtonText}>start workout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  title: {
    fontSize: 24,
    fontFamily: "SpaceGrotesk",
    color: "white",
    marginBottom: 30,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  carouselContainer: {
    height: CARD_HEIGHT,
    width: SCREEN_WIDTH,
    perspective: 1000,
  },
  flatListContent: {
    paddingHorizontal: (SCREEN_WIDTH - CARD_WIDTH - SIDE_CARD_VISIBLE) / 2,
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#555",
    marginHorizontal: 4,
  },
  paginationDotActive: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#09EDFF",
  },
  buttonContainer: {
    marginTop: 30,
    width: "80%",
    alignItems: "center",
  },
  startButton: {
    backgroundColor: "rgba(9, 237, 255, 0.1)",
    borderWidth: 1,
    borderColor: "#09EDFF",
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 30,
    width: "100%",
    alignItems: "center",
  },
  startButtonText: {
    color: "#09EDFF",
    fontSize: 18,
    fontFamily: "SpaceGrotesk",
    letterSpacing: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
    fontFamily: "SpaceGrotesk",
  },
});

export default WorkoutCarousel;