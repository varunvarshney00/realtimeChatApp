import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
// import Icon from 'react-native-vector-icons/Ionicons';  // You can use any icon library
import { removeTodo } from '../../features/todo/todoSlice';

const Todos = () => {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const renderTodoItem = ({ item }) => (
    <View style={styles.todoItem}>
      <Text style={styles.todoText}>{item.text}</Text>
      <TouchableOpacity onPress={() => dispatch(removeTodo(item.id))} style={styles.removeButton}>
        {/* <Icon name="trash-outline" size={24} color="#fff" /> */}
        <Text>delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todos</Text>
      <FlatList
        data={todos}
        renderItem={renderTodoItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#1a1a1a',
    margin:20
  },
  title: {
    color: '#fff',
    fontSize: 24,
    marginBottom: 16,
  },
  todoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#333',
    padding: 12,
    borderRadius: 5,
    marginVertical: 8,
  },
  todoText: {
    color: '#fff',
    fontSize: 18,
  },
  removeButton: {
    backgroundColor: '#e63946',
    padding: 10,
    borderRadius: 5,
    margin:10
  },
});

export default Todos;
