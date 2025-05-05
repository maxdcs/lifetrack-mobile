import React, { useState } from "react"
import { FlatList, Text, StyleSheet, View, Modal } from "react-native"
import WorkoutListItem from "./WorkoutListItem"
import { useGetUserWorkoutsQuery } from "../../features/workoutsApi"
import WorkoutListCardModal from "./WorkoutListCardModal"

export default function WorkoutList() {
  const { data: workouts, isLoading, isError } = useGetUserWorkoutsQuery()
  const [selectedWorkout, setSelectedWorkout] = useState(null)
  const [isWorkoutListCardModalShowing, setIsWorkoutListCardModalShowing] = useState(false)

  //#region Workouts fetch error handling

  if (isLoading) return <Text style={styles.message}>Loading...</Text>
  if (isError) return <Text style={styles.message}>Error loading workouts</Text>
  if (!workouts || workouts.length === 0)
    return <Text style={styles.message}>No workouts found.</Text>
  //#endregion

  const handleSelectWorkoutById = (id) => {
    const theWorkoutToSelect = workouts.find((w) => w.id === id)
    setSelectedWorkout(theWorkoutToSelect)
    setIsWorkoutListCardModalShowing(true)
  }

  const handleCloseWorkoutListCardModal = () => {
    setIsWorkoutListCardModalShowing(false)
  }

  return (
    <View>
      <FlatList
        data={workouts}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item }) => <WorkoutListItem workout={item} onPress={() => handleSelectWorkoutById(item.id)} />}
        columnWrapperStyle={styles.row}
        // I guess we add an onPress here?
        contentContainerStyle={styles.listContainer}
      />
      <Modal
        animationType="fade"
        transparent={true}
        visible={isWorkoutListCardModalShowing}
        onRequestClose={handleCloseWorkoutListCardModal}
        statusBarTranslucent={true}
      >
        <WorkoutListCardModal closeModal={handleCloseWorkoutListCardModal} workout={selectedWorkout}/>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  listContainer: {},
  row: {
    justifyContent: "space-between",
    marginBottom: 2,
  },
  message: {
    color: "#888",
    fontSize: 16,
    textAlign: "center",
    marginTop: 40,
  },
})
