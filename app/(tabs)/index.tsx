import React from "react";
import { Text, TouchableOpacity, StyleSheet, Image, ScrollView } from "react-native";
import { useRouter } from "expo-router";

const Home = () => {
  const router = useRouter();

  const navigateTo = (route: string) => {
    router.push(route); // Navigate to the route
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
         <TouchableOpacity onPress={() => router.push('/client/binarysignal')} style={styles.linkButton}>
        <Image source={require("../../assets/images/bin.png")} style={{
    width: 60,
    height: 100,
    marginRight: 15, // Space between icon and text
  }} />
        <Text style={styles.link}>Binary Signals</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/client/binarycourse')} style={styles.linkButton}>
        <Image source={require("../../assets/images/course.png")} style={styles.icon} />
        <Text style={styles.link}>Binary Courses</Text>
      </TouchableOpacity>
   
      <TouchableOpacity onPress={() => router.push('/client/fxsignal')} style={styles.linkButton}>
        <Image source={require("../../assets/images/fx.png")} style={styles.icon} />
        <Text style={styles.link}>Go to FX Signals</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/client/fxcourse')} style={styles.linkButton}>
        <Image source={require("../../assets/images/course.png")} style={styles.icon} />
        <Text style={styles.link}>Go to FX Courses</Text>
      </TouchableOpacity>
     
   
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
    flexGrow: 1, // Ensure scroll content expands to fill available space
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold', // Bold header text
    color: "#333", // Header color
  },
  linkButton: {
    marginTop: 20,  // Increased margin for spacing
    paddingVertical: 18,  // Increased padding for height
    paddingHorizontal: 30,  // Increased padding for width
    borderRadius: 12,  // Slightly larger border radius
    backgroundColor: "#f2f2f2",  // Light gray background color
    width: '100%',
    height: 150,
    flexDirection: "row",  // Align logo and text horizontally
    alignItems: "center",
    paddingLeft: 20,
  },
  
  icon: {
    width: 80,
    height: 80,
    marginRight: 15, // Space between icon and text
  },
  link: {
    fontSize: 18,
    color: "#333", // Dark text color for better visibility
    fontWeight: 'bold', // Bold text for better readability
  },
});

export default Home;
