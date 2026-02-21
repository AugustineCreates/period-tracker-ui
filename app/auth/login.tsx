import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { Button } from "@/components/ui/Button";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    router.replace("/(tabs)");
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-[#fdf8fa]"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 24 }}
        keyboardShouldPersistTaps="handled"
      >
        {/* Back */}
        <TouchableOpacity
          className="mt-14 w-11 h-11 items-center justify-center"
          onPress={() => router.back()}
        >
          <MaterialIcons name="arrow-back-ios" size={22} color="#181114" />
        </TouchableOpacity>

        <View className="mt-8">
          <Text className="text-[28px] font-extrabold text-[#181114] tracking-tight">Welcome back</Text>
          <Text className="text-base text-[#8c5f75] mt-2">
            Log in to continue tracking your cycle.
          </Text>
        </View>

        {/* Form */}
        <View className="mt-10 gap-4">
          <View>
            <Text className="text-sm font-bold text-[#181114] mb-2">Email</Text>
            <TextInput
              className="bg-white rounded-2xl border border-[#e6dbe0] px-4 h-14 text-base text-[#181114]"
              placeholder="your@email.com"
              placeholderTextColor="rgba(24,17,20,0.3)"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View>
            <Text className="text-sm font-bold text-[#181114] mb-2">Password</Text>
            <View className="flex-row items-center bg-white rounded-2xl border border-[#e6dbe0] px-4 h-14">
              <TextInput
                className="flex-1 text-base text-[#181114]"
                placeholder="Enter your password"
                placeholderTextColor="rgba(24,17,20,0.3)"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <MaterialIcons name={showPassword ? "visibility" : "visibility-off"} size={22} color="#8c5f75" />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity className="self-end">
            <Text className="text-sm font-semibold text-[#ee2b8c]">Forgot password?</Text>
          </TouchableOpacity>
        </View>

        <View className="mt-8">
          <Button title="Log In" onPress={handleLogin} />
        </View>

        {/* Divider */}
        <View className="flex-row items-center my-8">
          <View className="flex-1 h-px bg-[#e6dbe0]" />
          <Text className="px-4 text-xs text-[rgba(24,17,20,0.4)] font-medium">OR</Text>
          <View className="flex-1 h-px bg-[#e6dbe0]" />
        </View>

        {/* Social */}
        <TouchableOpacity className="flex-row items-center justify-center h-14 rounded-full border-2 border-[#e6dbe0] gap-3">
          <MaterialIcons name="g-mobiledata" size={24} color="#181114" />
          <Text className="font-bold text-[#181114] text-base">Continue with Google</Text>
        </TouchableOpacity>

        {/* Sign up link */}
        <View className="flex-1" />
        <TouchableOpacity
          className="items-center pb-10"
          onPress={() => router.push("/auth/signup")}
        >
          <Text className="text-sm text-[rgba(24,17,20,0.6)] font-semibold">
            {"Don't have an account? "}
            <Text className="text-[#ee2b8c]">Sign Up</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
