import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import googleIcon from "../../assets/images/google-logo.png";
import facebookIcon from "../../assets/images/facebook-logo.png";
import { FIREBASE_AUTH } from "../../FirebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useGoogleAuth } from "../../context/googleContext";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;
  const { promptAsync } = useGoogleAuth();

  const handleLogin = async () => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Navigate to home screen or other screen after successful login
      navigation.navigate("Home");
    } catch (error) {
      Alert.alert("Login Failed", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await promptAsync();
    } catch (error) {
      Alert.alert("Google Sign-In Failed", error.message);
    }
  };

  return (
    <LinearGradient
      colors={["#FF0000", "#000000"]}
      style={{ flex: 1, padding: 8 }}
      locations={[0, 0.75]}
    >
      <SafeAreaView style={{ flex: 1, backgroundColor: "transparent" }}>
        <StatusBar style="light" />

        <ScrollView
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View className="flex-1 justify-center items-center">
            <Text
              className="text-white font-LBold text-center"
              style={{ fontSize: 26 }}
            >
              Log In
            </Text>
          </View>

          {/* Email Input */}
          <View className="flex-1 space-x-4 px-4">
            <View className="mb-4 justify-center">
              <Text className="text-white text-[16px] font-LRegular mb-2">
                Email
              </Text>
              <TextInput
                className={`w-full h-[46px] rounded-lg px-4 py-2 font-LRegular text-[14px] bg-[#ffffff] ${emailFocused ? "opacity-[0.7]" : "opacity-[0.4]"}`}
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email"
                placeholderTextColor="#666"
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <Ionicons
                name="checkmark"
                size={24}
                color={emailFocused ? "#000" : "transparent"}
                style={{ position: "absolute", right: 10, top: 35 }}
              />
            </View>

            {/* Password Input */}
            <View className="mb-4 justify-center">
              <Text className="text-white text-[16px] font-LRegular mb-2">
                Password
              </Text>
              <TextInput
                className={`w-full h-[46px] rounded-lg px-4 py-2 font-LRegular text-[14px] bg-[#ffffff] ${passwordFocused ? "opacity-[0.7]" : "opacity-[0.4]"}`}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
                value={password}
                onChangeText={setPassword}
                placeholder="Enter your password"
                placeholderTextColor="#666"
                secureTextEntry
              />
              <Ionicons
                name="checkmark"
                size={24}
                color={passwordFocused ? "#000" : "transparent"}
                style={{ position: "absolute", right: 10, top: 35 }}
              />
            </View>

            {/* Login Button */}
            <View className="flex-1 items-center mt-10">
              <TouchableOpacity
                className={`w-[171px] h-[46px] border border-white rounded-full justify-center items-center mt-4 ${loading ? "opacity-40" : "opacity-100"}`}
                onPress={handleLogin}
                disabled={loading}
              >
                <Text className="text-white font-LBold text-[18px]">
                  LOG IN
                </Text>
              </TouchableOpacity>
            </View>

            {/* Or divider */}
            <View className="flex-row items-center justify-center my-4">
              <View className="flex-1 h-px bg-gray-400" />
              <Text className="px-4 text-white font-LRegular">OR</Text>
              <View className="flex-1 h-px bg-gray-400" />
            </View>

            {/* Social Login Buttons */}
            <View className="justify-center items-center h-[200px]">
              <TouchableOpacity
                className="flex-row w-[320px] h-[46px] bg-[#4267B2] rounded-full justify-center items-center px-[20px] m-2"
                onPress={() => console.log("Facebook login pressed")}
              >
                <Image
                  source={facebookIcon}
                  className="w-[24px] h-[24px]"
                  resizeMode="contain"
                />
                <Text className="text-[#FFFFFF] text-[18px] text-center font-LRegular flex-1">
                  Log in with Facebook
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="flex-row w-[320px] h-[46px] bg-white rounded-full justify-center items-center px-[20px] m-2"
                onPress={handleGoogleSignIn}
                disabled={loading}
              >
                <Image
                  source={googleIcon}
                  className="w-[24px] h-[24px]"
                  resizeMode="contain"
                />
                <Text className="text-[#303033] text-[18px] text-center font-LRegular flex-1">
                  Log in with Google
                </Text>
              </TouchableOpacity>
            </View>

            {/* Sign up link */}
            <View className="flex-row justify-center mt-4">
              <Text className="text-white font-LRegular">
                Don't have an account?{" "}
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                <Text className="text-white font-LBold underline">Sign up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Login;
