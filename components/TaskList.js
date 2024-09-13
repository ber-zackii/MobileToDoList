import React, { useContext } from 'react';
import { FlatList, StyleSheet, View, Text } from 'react-native';
import TaskItem from './TaskItem';
import { TaskContext } from '../contexts/TaskContext';

const TaskList = () => {
  const { tasks } = useContext(TaskContext);

  if (tasks.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>لا توجد مهام حالياً</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={tasks}
      renderItem={({ item }) => <TaskItem task={item} />}
      keyExtractor={item => item.id}
    />
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#333',
  },
});

export default TaskList;
