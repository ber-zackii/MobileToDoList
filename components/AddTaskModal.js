import React, { useState, useContext } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity,ActivityIndicator } from 'react-native';
import Modal from 'react-native-modal'; // Import react-native-modal
import { TaskContext } from '../contexts/TaskContext';
import { useFonts } from 'expo-font';

const AddTaskModal = ({ visible, onClose }) => {
  const [title, setTitle] = useState('');
  const { addTask } = useContext(TaskContext);
  const [fontsLoaded] = useFonts({
    'arabic-font': require('../assets/fonts/Cairo.ttf'), // Replace with your font file
  });
  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#0000ff"  />;
  }
  const handleAddTask = () => {
    if (title.trim()) {
      const newTask = { id: Date.now().toString(), title, completed: false };
      addTask(newTask);
      setTitle("");
      onClose(); // Close modal after adding task
    }
  };

  const isButtonDisabled = title.trim() === '';

  return (
    <Modal
      isVisible={visible}
      animationIn="slideInUp"  // Slide-in animation
      animationOut="slideOutDown"  // Slide-out animation
      onBackdropPress={onClose} // Close modal on backdrop press
      backdropOpacity={0.6}  // Backdrop opacity
      useNativeDriver={true}  // Use native driver for animations
    >
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>إضافة مهمة جديدة</Text>
        <TextInput
          placeholder="أدخل عنوان المهمة"
          value={title}
          onChangeText={setTitle}
          style={styles.input}
        />
        <TouchableOpacity 
          onPress={handleAddTask} 
          style={[styles.addButton, isButtonDisabled && styles.disabledButton]} 
          disabled={isButtonDisabled}
        >
          <Text style={styles.addButtonText}>إضافة مهمة</Text>
        </TouchableOpacity>
      
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    fontFamily: 'arabic-font', // Use your custom font family

  },
  modalTitle: {
    fontFamily: 'arabic-font', // Use your custom font family
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#007bff',
    fontFamily: 'arabic-font',
  },
  input: {
    fontFamily: 'arabic-font', // Use your custom font family

    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  addButton: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: '#007bff',
    alignItems: 'center',
    fontFamily: 'arabic-font', // Use your custom font family

  },
  addButtonText: {
    fontFamily: 'arabic-font', // Use your custom font family
    color: '#fff',
    fontWeight: 'bold',
    fontFamily: 'arabic-font',
  },
  disabledButton: {
    backgroundColor: '#d6d6d6',
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

export default AddTaskModal;
