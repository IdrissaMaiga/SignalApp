import React, { useEffect, useState } from "react";
import { Slot, Tabs, useRouter } from "expo-router";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
  Image,
  Pressable,
  Linking,
} from "react-native";
import auth from "@react-native-firebase/auth";
import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useColorScheme } from "@/hooks/useColorScheme";
import { SafeAreaView } from 'react-native-safe-area-context';

const SCREEN_WIDTH = Dimensions.get("window").width;

export default function TabLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const sliderAnim = useState(new Animated.Value(-SCREEN_WIDTH))[0]; // Menu starts off-screen
  const [user, setUser] = useState(null);
  const router = useRouter();
  
  // Allowed email array
  const allowedEmails = ['maigadrisking@gmail.com', 'Luckyhassanbhutto@gmail.com']; // Replace with your allowed emails

  useEffect(() => {
    const currentUser = auth().currentUser;
    setUser(currentUser);
  }, []);

  const toggleMenu = () => {
    Animated.timing(sliderAnim, {
      toValue: isMenuOpen ? -SCREEN_WIDTH : 0, // Opens or closes the menu
      duration: 300,
      useNativeDriver: true,
    }).start();
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    if (isMenuOpen) {
      Animated.timing(sliderAnim, {
        toValue: -SCREEN_WIDTH, // Closes the menu
        duration: 300,
        useNativeDriver: true,
      }).start();
      setIsMenuOpen(false);
    }
  };

  // Function to handle sign-out
  const handleSignOut = async () => {
    try {
      const currentUser = auth().currentUser;
      if (!currentUser) {
        console.warn("No user currently signed in.");
      } else {
        await auth().signOut();
      }
      router.push("../"); // Navigate back to the login screen
    } catch (error) {
    //  console.error("Error during sign-out:", error);
    }
  };

  // Function to open the Google Play Store link
  const openGooglePlay = () => {
    Linking.openURL('https://play.google.com/store/apps/details?id=com.yourappname');
  };

  // Function to share the app
  const shareApp = () => {
    // Implement share functionality
    Linking.openURL('sms:?body=Check out this awesome app: https://play.google.com/store/apps/details?id=com.yourappname');
  };

  // Check if the user's email is in the allowed emails array
  const isEmailAllowed = allowedEmails.includes(user?.email);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.mainContainer}>
        {/* Overlay */}
        {isMenuOpen && (
          <Pressable style={styles.overlay} onPress={closeMenu} />
        )}

        {/* Sliding Menu */}
        <Animated.View
          style={[styles.slider, { transform: [{ translateX: sliderAnim }] }]} >
          <TouchableOpacity onPress={closeMenu} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
          <View style={styles.sliderContent}>
            {/* Logo Section */}
            <View style={styles.logoContainer}>
              <Image source={require("../../assets/images/logofxb.png")} style={styles.logo} />
              <View style={styles.logoContainer2}>
              <Text style={styles.logoText}>SigPro</Text>
              <Text style={styles.logoText1}>Trade Smarter</Text>
              </View>
            </View>

            {/* Account Info Section */}
            <Text style={styles.sectionTitle}>Account</Text>
            {user?.photoURL && (
              <Image
                source={{ uri: user.photoURL }}
                style={styles.profileImage}
              />
            )}
            {user?.displayName &&<Text style={styles.sliderText}>
              Name: {user?.displayName || "N/A"}
            </Text>}
            <Text style={styles.sliderText}>Email: {user?.email || "N/A"}</Text>
            <Text style={styles.sliderText}>
              Email Verified: {user?.emailVerified ? "Yes" : "No"}
            </Text>
       {/* Sign Out Button */}
       <View style={styles.accountSection}>
              <TouchableOpacity onPress={handleSignOut} style={styles.button}>
                <Text style={styles.buttonText}>Sign Out</Text>
              </TouchableOpacity>
            </View>

     {/* Communication Section */}
<Text style={styles.sectionTitle}>Communication</Text>
<View style={styles.communicationSection}>
<TouchableOpacity onPress={shareApp} style={styles.communicationButton}>
  <IconSymbol size={28} name="share.fill" color="#333" /> 
  <Text style={styles.communicationText}>Share App</Text>
</TouchableOpacity>

  <TouchableOpacity onPress={openGooglePlay} style={styles.communicationButton}>
    <IconSymbol size={28} name="star.fill" color="red" />
    <Text style={styles.communicationText}>Rate & Update</Text>
  </TouchableOpacity>
</View>

          </View>
        </Animated.View>

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={toggleMenu} style={styles.hamburgerButton}>
         <IconSymbol style={styles.hamburgerIcon} size={28} name="menu" color="red" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>SigPro</Text>
        </View>

        {/* Conditionally render Tabs */}
        {isEmailAllowed ? (
        <Tabs
      
        screenOptions={{
          tabBarActiveTintColor: '#fff', // White for active tab
          tabBarInactiveTintColor: '#888', // Light gray for inactive tabs
          tabBarActiveBackgroundColor:"red", // Dark background for the tab bar
          tabBarButton: HapticTab, // Use haptic feedback for the tab buttons
          tabBarStyle: {
            backgroundColor: '#121212', // Matching the dark background for the tab bar
            borderTopWidth: 0, // Remove border for a cleaner look
            marginBottom:20
          },
          tabBarLabelStyle: {
            fontSize: 12, // Adjust font size for tab labels
            fontWeight: 'bold', // Make tab labels bold for readability
          },
          headerShown: false, // Hide the header
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="house.fill" color={color} />
            ),
          }}
        />
      
        <Tabs.Screen
          name="binarypannel"
         
          options={{
            title: "Send Signals",
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="panel.fill" color={color} />
            ),
          }}
        />
      
      </Tabs>
      
        ) : (
          <Slot></Slot>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({ mainContent: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#121212', 
},
mainContentText: {
  fontSize: 20,
  color: '#fff',
  textAlign: 'center',
},
  safeArea: {
    flex: 1,
    backgroundColor: "#121212", // Dark background for the entire screen
  },
  mainContainer: {
    flex: 1,
    backgroundColor: "#121212", // Dark background for main container
  },
  slider: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: SCREEN_WIDTH * 0.8,
    backgroundColor: "#1E1E1E", // Darker background for the menu
    zIndex: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  sliderContent: {
    padding: 20,
    alignItems: "flex-start",
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  logoContainer2: {
    flexDirection: "column",
    alignItems: "center",
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  logoText: {
    fontSize: 18,
    color: "#fff", // White text for contrast
    fontWeight: "bold",
  },
  logoText1: {
    fontSize: 10,
    color: "#fff", // White text for contrast
    fontWeight: "bold",
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginBottom: 20,
  },
  sliderText: {
    fontSize: 16,
    color: "#fff", // White text for profile and info sections
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    color: "#fff", // White section titles
    marginTop: 20,
    marginBottom: 10,
    fontWeight: "bold",
  },
  accountSection: {
    marginTop: 20,
  },
  button: {
    marginTop: 10,
    backgroundColor: "#FF3B30", // Red button color for contrast
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff", // White text on the button
    fontSize: 16,
    textAlign: "center",
  },
  communicationSection: {
    marginTop: 30,
  },
  communicationButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  communicationText: {
    fontSize: 16,
    marginLeft: 10,
    color: "#fff", // White text for communication options
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#333", // Dark background for header
    paddingVertical:10
  },
  hamburgerButton: {
    marginRight: 16,
  },
  hamburgerIcon: {
    fontSize: 24,
    paddingHorizontal:10,
    color: "#fff", // White hamburger icon
  },
  headerTitle: {
    fontSize: 20,
    color: "#fff", // White header text
    fontWeight: "bold",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)", // Dark semi-transparent overlay
    zIndex: 9,
  },
  closeButton: {
    position: "absolute",
    top: 20,
    right: 20,
    backgroundColor: "#333", // Dark background for the close button
    borderRadius: 25,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 11,
  },
  closeButtonText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff", // White close button text
  },
});
