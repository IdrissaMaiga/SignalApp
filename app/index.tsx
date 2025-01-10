
 
  import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from "react-native";
import { GoogleSignin} from "@react-native-google-signin/google-signin";

import auth from "@react-native-firebase/auth";
import { useRouter } from "expo-router";

GoogleSignin.configure({
  webClientId: "81643989887-d1plo5qlf7hktv1kcpfu7hii29h83kcc.apps.googleusercontent.com",
  offlineAccess: true,
  scopes: ["profile", "email"],
});

export default function Index() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((user) => {
      if (user) {
        router.push("/(tabs)"); // Redirect authenticated users to the main screen
      }
    });

    return () => unsubscribe(); // Cleanup the listener on unmount
  }, []);


  const handleFormSubmit = async () => {
    setErrorMessage(null);
    setLoading(true);
    try {
      if (isSignUp) {
        await auth().createUserWithEmailAndPassword(email, password);
      } else {
        await auth().signInWithEmailAndPassword(email, password);
      }
      router.push("/(tabs)");
    } catch (err) {
      //console.error("Error in handleFormSubmit:", err);
     // setErrorMessage(err?.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setErrorMessage(null);
    setLoading(true);
    try {
      const result = await GoogleSignin.signIn();
     // console.log("Google Sign-In result:", result);

      const idToken = result?.data?.idToken;
      if (!idToken) {
        throw new Error("No ID token found. Please ensure the configuration is correct.");
      }

      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential);
      router.push("/(tabs)");
    } catch (err) {
      //console.error("Error in handleGoogleSignIn:", err);
     // setErrorMessage(err?.message || "Google Sign-In failed.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/logofxb.png")} // Replace with your logo path
        style={styles.logo}
      />
      <Text style={styles.header}>Binary and Forex Signals</Text>

      
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
      />
      <TouchableOpacity style={styles.button} onPress={handleFormSubmit}>
      <Text style={styles.buttonText}>{isSignUp ? "Sign Up" : "Sign In"}</Text>

      </TouchableOpacity>
      <TouchableOpacity
        style={styles.linkButton}
        onPress={() => setIsSignUp(!isSignUp)}
      >
        <Text style={styles.linkText}>
          {isSignUp
            ? "Already have an account? Sign In"
            : "Don't have an account? Sign Up"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.googleButton} onPress={handleGoogleSignIn}>
  <Image
    source={require("../assets/images/google.png")}
    style={styles.googleLogo}
  />
  <Text style={styles.googleButtonText}>Sign in</Text>
</TouchableOpacity>


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#000000", // Black background
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 30,
    resizeMode: "contain", // Ensures logo scales well
  },
  header: {
    fontSize: 26,  // Larger size for more impact
    fontWeight: "700",  // Slightly heavier weight for more emphasis
    color: "white",  // Bright orange-red color (matches the image you provided)
    marginBottom: 20,  // Slightly more space below
    textAlign: "center",
    textTransform: "uppercase",  // Uppercase for a more modern look
    letterSpacing: 2,  // Adds some space between letters for better readability
    paddingVertical: 8,  // Vertical padding reduced for a smaller background
    paddingHorizontal: 15,  // Horizontal padding for balanced width
    borderRadius: 5,  // Rounded corners for a softer look
    shadowColor: "#000",  // Adds shadow for depth
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,  // For Android devices to enable shadow
  },
  
  
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#444", // Dark border to blend with the theme
    padding: 12,
    marginBottom: 15,
    borderRadius: 5,
    backgroundColor: "#1C1C1C", // Slightly lighter than black for input fields
    color: "#FFFFFF", // White text for better contrast
  },
  button: {
    width: "100%",
    backgroundColor: "#FFA500", // Gold for emphasis
    padding: 15,
    borderRadius: 25, // Enhanced border radius for rounded corners
    alignItems: "center",
    marginBottom: 15,
  },
  buttonText: {
    color: "#000000", // Black text to contrast gold button
    fontSize: 16,
    fontWeight: "600",
  },
  linkButton: {
    marginTop: 10,
  },
  linkText: {
    color: "#ADD8E6", // Light blue color for the link
    textAlign: "center",
  },
  
  googleButton: {
    flexDirection: "row", // Align the image and text side by side
    marginTop: 20,
    width: "30%",
    padding: 7,
    borderRadius: 25, // Matches other buttons for consistency
    backgroundColor: "green", // Google red theme
    alignItems: "center",
    justifyContent: "center",
  },
  googleLogo: {
    width: 24, // Size of the logo
    height: 24,
    marginRight: 10, // Spacing between logo and text
  },
  googleButtonText: {
    color: "#FFFFFF", // White text for better readability
    fontSize: 16,
    fontWeight: "600",
  },
  errorText: {
    color: "#FF4C4C", // Red for errors
    marginBottom: 10,
    textAlign: "center",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});