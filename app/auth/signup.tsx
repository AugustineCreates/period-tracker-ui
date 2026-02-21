import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { Button } from "@/components/ui/Button";

const PINK = "#ee2b8c";
const TEXT = "#181114";
const TEXT2 = "#8c5f75";
const LINE = "#e6dbe0";

export default function SignUpScreen() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = () => {
    router.replace("/onboarding/welcome");
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#fdf8fa" }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 24 }}
        keyboardShouldPersistTaps="handled"
      >
        <TouchableOpacity
          style={{ marginTop: 56, width: 44, height: 44, alignItems: "center", justifyContent: "center" }}
          onPress={() => router.back()}
        >
          <MaterialIcons name="arrow-back-ios" size={22} color={TEXT} />
        </TouchableOpacity>

        <View style={{ marginTop: 32 }}>
          <Text style={{ fontSize: 28, fontWeight: "800", color: TEXT, letterSpacing: -0.5 }}>Create account</Text>
          <Text style={{ fontSize: 16, color: TEXT2, marginTop: 8 }}>
            Join Her Circle and start understanding your body.
          </Text>
        </View>

        <View style={{ marginTop: 40, gap: 16 }}>
          <View>
            <Text style={{ fontSize: 14, fontWeight: "700", color: TEXT, marginBottom: 8 }}>Full Name</Text>
            <TextInput
              style={{
                backgroundColor: "#fff",
                borderRadius: 16,
                borderWidth: 1,
                borderColor: LINE,
                paddingHorizontal: 16,
                height: 56,
                fontSize: 16,
                color: TEXT,
              }}
              placeholder="Your name"
              placeholderTextColor="rgba(24,17,20,0.3)"
              value={name}
              onChangeText={setName}
            />
          </View>

          <View>
            <Text style={{ fontSize: 14, fontWeight: "700", color: TEXT, marginBottom: 8 }}>Email</Text>
            <TextInput
              style={{
                backgroundColor: "#fff",
                borderRadius: 16,
                borderWidth: 1,
                borderColor: LINE,
                paddingHorizontal: 16,
                height: 56,
                fontSize: 16,
                color: TEXT,
              }}
              placeholder="your@email.com"
              placeholderTextColor="rgba(24,17,20,0.3)"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View>
            <Text style={{ fontSize: 14, fontWeight: "700", color: TEXT, marginBottom: 8 }}>Password</Text>
            <TextInput
              style={{
                backgroundColor: "#fff",
                borderRadius: 16,
                borderWidth: 1,
                borderColor: LINE,
                paddingHorizontal: 16,
                height: 56,
                fontSize: 16,
                color: TEXT,
              }}
              placeholder="Create a strong password"
              placeholderTextColor="rgba(24,17,20,0.3)"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>
        </View>

        <View style={{ marginTop: 32 }}>
          <Button title="Create Account" onPress={handleSignUp} />
        </View>

        <Text style={{ fontSize: 12, color: "rgba(24,17,20,0.4)", textAlign: "center", marginTop: 16, lineHeight: 20, paddingHorizontal: 16 }}>
          By signing up, you agree to our Terms of Service and Privacy Policy
        </Text>

        <View style={{ flex: 1 }} />
        <TouchableOpacity
          style={{ alignItems: "center", paddingBottom: 40 }}
          onPress={() => router.push("/auth/login")}
        >
          <Text style={{ fontSize: 14, color: "rgba(24,17,20,0.6)", fontWeight: "600" }}>
            {"Already have an account? "}
            <Text style={{ color: PINK }}>Log In</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
