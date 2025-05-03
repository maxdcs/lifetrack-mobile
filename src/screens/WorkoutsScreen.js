import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useGetUserWorkoutsQuery } from '../features/workouts/workoutsApi';

const WorkoutsScreen = () => {
  const { data: workouts, isLoading } = useGetUserWorkoutsQuery();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Workouts</Text>
      {isLoading ? (
        <Text style={styles.loadingText}>Loading workouts...</Text>
      ) : workouts && workouts.length > 0 ? (
        <View>
          {workouts.map(workout => (
            <View key={workout.id} style={styles.workoutItem}>
              <Text style={styles.workoutName}>{workout.name}</Text>
              <Text style={styles.exerciseCount}>
                {workout.exercises?.length || 0} exercises
              </Text>
            </View>
          ))}
        </View>
      ) : (
        <Text style={styles.emptyText}>No workouts found. Create your first workout!</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
  },
  title: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 40,
  },
  loadingText: {
    color: '#888',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 40,
  },
  emptyText: {
    color: '#888',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 40,
  },
  workoutItem: {
    backgroundColor: '#222',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  workoutName: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  exerciseCount: {
    color: '#888',
    marginTop: 4,
  }
});

export default WorkoutsScreen;