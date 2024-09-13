import React, { useState, useContext } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal'; // Import react-native-modal
import { TaskContext } from '../contexts/TaskContext';

const TaskItem = ({ task }) => {
  const { deleteTask } = useContext(TaskContext);
  const [isModalVisible, setIsModalVisible] = useState(false); // Manage modal visibility

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleDelete = () => {
    deleteTask(task.id);
  };

  return (
    <View style={styles.taskItem}>
      <Text style={styles.taskTitle}>{task.title}</Text>
      <View style={styles.buttons}>
        <TouchableOpacity onPress={handleDelete} style={[styles.button, styles.deleteButton]}>
          <Text style={styles.buttonText}>حذف</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginBottom: 10,
  },
  taskTitle: {
    fontSize: 18,
    color: '#333',
    fontFamily: 'arabic-font',
  },
  buttons: {
    flexDirection: 'row',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginLeft: 5,
  },
  deleteButton: {
    backgroundColor: '#dc3545',
  },
  buttonText: {
    fontFamily: 'arabic-font',
    color: '#fff',
    fontSize: 16,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#007bff',
  },
  detailContainer: {
    marginBottom: 15,
    width: '100%',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  value: {
    fontSize: 16,
    color: '#555',
  },
  closeButton: {
    marginTop: 10,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
    backgroundColor: '#007bff',
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default TaskItem;
