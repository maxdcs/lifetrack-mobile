import React, { useRef, useState, useEffect } from "react"
import { View, Dimensions, StyleSheet, TouchableOpacity, Text } from "react-native"
import Animated, { 
  useSharedValue, 
  useAnimatedScrollHandler, 
  useAnimatedStyle,
  interpolate,
  withTiming
} from "react-native-reanimated"
import { useNavigation } from "expo-router"

const { width: SCREEN_WIDTH } = Dimensions.get("window")
const CARD_WIDTH = SCREEN_WIDTH * 0.8
const CARD_HEIGHT = CARD_WIDTH * 1.5
const SPACING = SCREEN_WIDTH * 0.1
const SIDE_CARD_VISIBLE = SCREEN_WIDTH * 0.15

const WorkoutCard = ({ workout, index, scrollX, activeIndex }) => {
  const navigation = useNavigation()
  
  // Calculate input range for animations
  const inputRange = [
    (index - 1) * (CARD_WIDTH + SPACING),
    index * (CARD_WIDTH + SPACING),
    (index + 1) * (CARD_WIDTH + SPACING),
  ]
  
  // Animation for each card
  const cardStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      scrollX.value,
      inputRange,
      [0.9, 1, 0.9],
      'clamp'
    )
    
    const opacity = interpolate(
      scrollX.value,
      inputRange,
      [0.6, 1, 0.6],
      'clamp'
    )
    
    return {
      transform: [{ scale }],
      opacity,
    }
  })
  
  // Handle card press
  const handlePress = () => {
    navigation.navigate(`/workouts/${workout.id}/customize`)
  }
  
  return (
    <TouchableOpacity 
      activeOpacity={0.9} 
      onPress={handlePress}
      style={styles.cardContainer}
    >
      <Animated.View style={[styles.card, cardStyle]}>
        <Text style={styles.cardText}>{workout.name}</Text>
      </Animated.View>
    </TouchableOpacity>
  )
}

const WorkoutCarousel = ({ workouts = [] }) => {
  const scrollX = useSharedValue(0)
  const flatListRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  
  // Handle scroll events
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x
    },
  })
  
  // Update active index when scrolling stops
  const handleMomentumScrollEnd = (event) => {
    const newIndex = Math.round(
      event.nativeEvent.contentOffset.x / (CARD_WIDTH + SPACING)
    )
    setActiveIndex(newIndex)
  }
  
  // Empty state when no workouts
  if (workouts.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No workouts yet. Create one!</Text>
      </View>
    )
  }
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>MY WORKOUTS</Text>
      
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
          <Text style={styles.startButtonText}>START WORKOUT</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

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
  },
  flatListContent: {
    paddingHorizontal: (SCREEN_WIDTH - CARD_WIDTH - SIDE_CARD_VISIBLE) / 2,
  },
  cardContainer: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    marginHorizontal: SPACING / 2,
  },
  card: {
    flex: 1,
    backgroundColor: '#333',
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
  },
  cardText: {
    fontFamily: "Exo2",
    fontSize: 30,
    color: "white",
    textAlign: "center",
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
    fontWeight: "bold",
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
})

export default WorkoutCarousel