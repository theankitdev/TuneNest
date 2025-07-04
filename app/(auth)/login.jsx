import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useAuth } from "../../context/authContext";
import googleIcon from "../../assets/images/google-logo.png";
import facebookIcon from "../../assets/images/facebook-logo.png";
import { useGoogleAuth } from "../../context/googleContext";
import { FacebookLogin } from "../../context/facebookContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const { promptAsync } = useGoogleAuth();
  const { facebookpromptAsync } = FacebookLogin();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Validation", "Please fill all the fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      await login(email, password);
      Alert.alert("Success", "Login Successful!");
      router.replace("/home");
    } catch (error) {
      console.error("Login Failed:", error.response?.data || error.message);
      Alert.alert("Login Failed", "Invalid credentials or server error.");
    } finally {
      setLoading(false);
    }
  };

  const handlefacebookSignIn = async () => {
    try {
      await facebookpromptAsync();
    } catch (error) {
      Alert.alert("Facebook Sign-In Failed", error.message);
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
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar style="light" />

        {loading && (
          <View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 999,
              backgroundColor: "#000000AA",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ActivityIndicator size="large" color="#fff" />
            <Text className="text-white mt-4 font-LRegular">Logging in...</Text>
          </View>
        )}

        <ScrollView
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View className="flex-1 justify-center items-center">
            <Text className="text-white font-LBold text-center text-2xl">
              Log In
            </Text>
          </View>

          <View className="flex-1 px-4">
            {/* Email */}
            <View className="mb-4 justify-center">
              <Text className="text-white text-[16px] font-LRegular mb-2">Email</Text>
              <TextInput
                className={`w-full h-[46px] rounded-lg px-4 py-2 font-LRegular text-[14px] bg-white ${
                  emailFocused ? "opacity-[0.7]" : "opacity-[0.4]"
                }`}
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email"
                placeholderTextColor="#666"
                keyboardType="email-address"
                autoCapitalize="none"
              />
              {email.length > 0 && (
                <Ionicons
                  name="checkmark"
                  size={24}
                  color="#000"
                  style={{ position: "absolute", right: 10, top: 35 }}
                />
              )}
            </View>

            {/* Password */}
            <View className="mb-4 justify-center">
              <Text className="text-white text-[16px] font-LRegular mb-2">Password</Text>
              <TextInput
                className={`w-full h-[46px] rounded-lg px-4 py-2 font-LRegular text-[14px] bg-white ${
                  passwordFocused ? "opacity-[0.7]" : "opacity-[0.4]"
                }`}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
                value={password}
                onChangeText={setPassword}
                placeholder="Enter your password"
                placeholderTextColor="#666"
                secureTextEntry
              />
              {password.length > 0 && (
                <Ionicons
                  name="checkmark"
                  size={24}
                  color="#000"
                  style={{ position: "absolute", right: 10, top: 35 }}
                />
              )}
            </View>

            {/* Login Button */}
            <View className="flex-1 items-center mt-10">
              <TouchableOpacity
                className="w-[171px] h-[46px] border border-white rounded-full justify-center items-center mt-4"
                onPress={handleLogin}
                disabled={loading}
              >
                <Text className="text-white font-LBold text-[18px]">LOG IN</Text>
              </TouchableOpacity>
            </View>

            {/* Divider */}
            <View className="flex-row items-center justify-center my-6">
              <View className="flex-1 h-px bg-gray-400" />
              <Text className="px-4 text-white font-LRegular">OR</Text>
              <View className="flex-1 h-px bg-gray-400" />
            </View>

            {/* Social Login */}
            <View className="items-center mb-6">
              {/* Facebook */}
              <TouchableOpacity
                className="flex-row w-[320px] h-[46px] bg-[#4267B2] rounded-full justify-center items-center px-[20px] m-2"
                onPress={handlefacebookSignIn}
              >
                <Image source={facebookIcon} className="w-[24px] h-[24px]" resizeMode="contain" />
                <Text className="text-[#FFFFFF] text-[18px] text-center font-LRegular flex-1">
                  Log in with Facebook
                </Text>
              </TouchableOpacity>

              {/* Google */}
              <TouchableOpacity
                className="flex-row w-[320px] h-[46px] bg-white rounded-full justify-center items-center px-[20px] m-2"
                onPress={handleGoogleSignIn}
                disabled={loading}
              >
                <Image source={googleIcon} className="w-[24px] h-[24px]" resizeMode="contain" />
                <Text className="text-[#303033] text-[18px] text-center font-LRegular flex-1">
                  Log in with Google
                </Text>
              </TouchableOpacity>
            </View>

            {/* Sign Up */}
            <View className="flex-row justify-center mt-4">
              <Text className="text-white font-LRegular">Don't have an account? </Text>
              <TouchableOpacity onPress={() => router.replace("/signup")}>
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
