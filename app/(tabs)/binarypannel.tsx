import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert, FlatList } from 'react-native';
import { database } from '../../firebaseConfig';
import { ref, push } from 'firebase/database';

const binarypannel = () => {
  const [signal, setSignal] = useState('');
  const [description, setDescription] = useState('');
  const [imageLink, setImageLink] = useState('');
  const [type, setType] = useState('binary');
  const [showPicker, setShowPicker] = useState(false); // State to toggle the custom picker visibility
  const [pickerOptions] = useState([
    { label: 'Binary', value: 'binary' },
    { label: 'FX', value: 'fx' },
  ]);

  const handleCreateSignal = () => {
    if (!signal || !description || !type) {
      Alert.alert('Error', 'Please fill in all required fields.');
      return;
    }

    const signalsRef = ref(database, 'signals/');
    push(signalsRef, {
      signal,
      description,
      imageLink,
      type,
      createdAt: Date.now(),
    })
      .then(() => {
        Alert.alert('Success', 'Signal created successfully!');
        setSignal('');
        setDescription('');
        setImageLink('');
        setType('binary');
      })
      .catch((error) => {
        console.error(error);
        Alert.alert('Error', 'Could not create the signal.');
      });
  };

  // Function to toggle the picker visibility
  const togglePicker = () => {
    setShowPicker((prevState) => !prevState);
  };

  // Function to handle selecting an item from the picker
  const handleSelectType = (value:any) => {
    setType(value);
    setShowPicker(false); // Hide the picker once an option is selected
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Signal</Text>
      <TextInput
        style={styles.input}
        placeholder="Signal Title"
        value={signal}
        onChangeText={setSignal}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <TextInput
        style={styles.input}
        placeholder="Image Link (optional)"
        value={imageLink}
        onChangeText={setImageLink}
      />

      {/* Custom Picker (Dropdown) */}
      <TouchableOpacity style={styles.dropdown} onPress={togglePicker}>
        <Text style={styles.dropdownText}>{type === 'binary' ? 'Binary' : 'FX'}</Text>
      </TouchableOpacity>

      {/* Display options when the picker is open */}
      {showPicker && (
        <FlatList
          data={pickerOptions}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.option}
              onPress={() => handleSelectType(item.value)}
            >
              <Text style={styles.optionText}>{item.label}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.value}
          style={styles.optionsContainer}
        />
      )}

      <TouchableOpacity style={styles.button} onPress={handleCreateSignal}>
        <Text style={styles.buttonText}>Create Signal</Text>
      </TouchableOpacity>
    </View>
  );
};

export default binarypannel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 16,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 12,
    marginBottom: 16,
    justifyContent: 'center',
  },
  dropdownText: {
    fontSize: 16,
    color: '#333',
  },
  optionsContainer: {
    position: 'absolute',
    top: 160, // Adjust according to your layout
    left: 16,
    right: 16,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    zIndex: 10,
    maxHeight: 200,
    padding: 10,
  },
  option: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
