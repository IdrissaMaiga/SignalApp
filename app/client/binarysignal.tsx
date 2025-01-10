import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from 'react-native';
import { database } from '../../firebaseConfig';
import { ref, onValue } from 'firebase/database';
import { Linking } from 'react-native';
import { IconSymbol } from '@/components/ui/IconSymbol';

const renderDescription = (description) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g; // Regex to detect URLs
  const parts = description.split(urlRegex);

  return parts.map((part, index) => {
    if (urlRegex.test(part)) {
      // If the part is a URL, make it clickable
      return (
        <Text
          key={index}
          style={styles.link}
          onPress={() => Linking.openURL(part)}
        >
          {part}
        </Text>
      );
    }
    // Otherwise, render as plain text
    return <Text key={index}>{part}</Text>;
  });
};

const binarysignal = () => {
  const [signals, setSignals] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSignals = () => {
    setLoading(true);
    const signalsRef = ref(database, 'signals/');
    onValue(signalsRef, (snapshot) => {
      const data = snapshot.val();
      const signalsArray = data
        ? Object.entries(data)
            .map(([key, value]) => ({
              id: key,
              ...value,
            }))
            .filter((signal) => signal.type === 'binary') // Filter binary signals
            .sort((a, b) => b.createdAt - a.createdAt) // Sort by latest createdAt
            .slice(0, 20) // Limit to the last 20 signals
        : [];
      setSignals(signalsArray);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchSignals();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.refreshButton} onPress={fetchSignals}>
      <IconSymbol size={20} name="refresh" color={"white"} />
      </TouchableOpacity>
      <FlatList
        data={signals}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.signalContainer}>
            <Text style={styles.signalTitle}>{item.signal}</Text>
            <Text style={styles.signalDescription}>
              {renderDescription(item.description)}
            </Text>
            {item.imageLink ? (
              <Image
                source={{ uri: item.imageLink }}
                style={styles.signalImage}
                resizeMode="contain"
              />
            ) : null}
            <Text style={styles.signalDate}>
              {new Date(item.createdAt).toLocaleString()}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default binarysignal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  refreshButton: {
    backgroundColor: '#007BFF',
    padding: 8,  // Smaller padding
    borderRadius: 50,  // Rounded shape
    alignItems: 'center',
    marginBottom: 16,
    width: 40,  // Set a smaller width for the button
    height: 40, // Set a smaller height for the button
    justifyContent: 'center',
  },
  refreshButtonText: {
    color: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signalContainer: {
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 16,
  },
  signalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  signalDescription: {
    fontSize: 14,
    marginVertical: 5,
  },
  signalImage: {
    width: '100%',
    height: 150,
    marginVertical: 10,
  },
  signalDate: {
    fontSize: 12,
    color: '#777',
  },
  link: {
    color: '#1E90FF', // Bluish color
    textDecorationLine: 'underline',
  },
});
