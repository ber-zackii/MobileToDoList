import React, { useContext, useState } from 'react';
import { View, TextInput, StyleSheet, FlatList, TouchableOpacity,ActivityIndicator, Text, SafeAreaView } from 'react-native';
import { TaskContext } from '../contexts/TaskContext';
import TaskItem from '../components/TaskItem';
import AddTaskModal from '../components/AddTaskModal'; // Import AddTaskModal
import { MaterialIcons } from '@expo/vector-icons'; // Import icon set
import { useFonts } from 'expo-font';

const HomeScreen = () => {
  const { tasks } = useContext(TaskContext); // Get tasks from context
  const [modalVisible, setModalVisible] = useState(false); // State for modal visibility
  const [searchQuery, setSearchQuery] = useState(''); // State for search query
  const [fontsLoaded] = useFonts({
    'arabic-font': require('../assets/fonts/Cairo.ttf'), // Replace with your font file
  });
  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#0000ff"  />;
  }
  const handleOpenModal = () => {
    setModalVisible(true); // Open modal
  };

  const handleCloseModal = () => {
    setModalVisible(false); // Close modal
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query); 
  };

  const filteredTasks = tasks.filter(task => 
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.tex}>إدارة المهام</Text>
        <View style={styles.searchContainer}>
          <MaterialIcons name="search" size={24} color="gray" style={styles.searchIcon} />
          <TextInput
            placeholder="ابحث عن مهمة..."
            value={searchQuery}
            onChangeText={handleSearchChange}
            style={styles.searchInput}
          />
          <TouchableOpacity onPress={handleOpenModal} style={styles.addButton}>
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={filteredTasks}
          renderItem={({ item }) => <TaskItem task={item} />}
          keyExtractor={(item) => item.id}
        />

        <AddTaskModal visible={modalVisible} onClose={handleCloseModal} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16, // Padding to ensure elements are not hidden behind the status bar or rounded corners
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    fontFamily: 'arabic-font', // Use your custom font family
  },
  tex: {
    fontSize: 26,
    padding: 20,
    fontFamily: 'arabic-font', // Use your custom font family
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    fontFamily: 'arabic-font', // Use your custom font family

    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    fontFamily: 'arabic-font', // Use your custom font family

    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
