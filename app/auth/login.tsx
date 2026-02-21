import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { Button } from "@/components/ui/Button";

const PINK = "#ee2b8c";
const TEXT = "#181114";
const TEXT2 = "#8c5f75";
const LINE = "#e6dbe0";

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
      style={{ flex: 1, backgroundColor: "#fdf8fa" }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 24 }}
        keyboardShouldPersistTaps="handled"
      >
        {/* Back */}
        <TouchableOpacity
          style={{ marginTop: 56, width: 44, height: 44, alignItems: "center", justifyContent: "center" }}
          onPress={() => router.back()}
        >
          <MaterialIcons name="arrow-back-ios" size={22} color={TEXT} />
        </TouchableOpacity>

        <View style={{ marginTop: 32 }}>
          <Text style={{ fontSize: 28, fontWeight: "800", color: TEXT, letterSpacing: -0.5 }}>Welcome back</Text>
          <Text style={{ fontSize: 16, color: TEXT2, marginTop: 8 }}>
            Log in to continue tracking your cycle.
          </Text>
        </View>

        {/* Form */}
        <View style={{ marginTop: 40, gap: 16 }}>
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
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#fff",
                borderRadius: 16,
                borderWidth: 1,
                borderColor: LINE,
                paddingHorizontal: 16,
                height: 56,
              }}
            >
              <TextInput
                style={{ flex: 1, fontSize: 16, color: TEXT }}
                placeholder="Enter your password"
                placeholderTextColor="rgba(24,17,20,0.3)"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <MaterialIcons name={showPassword ? "visibility" : "visibility-off"} size={22} color={TEXT2} />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={{ alignSelf: "flex-end" }}>
            <Text style={{ fontSize: 14, fontWeight: "600", color: PINK }}>Forgot password?</Text>
          </TouchableOpacity>
        </View>

        <View style={{ marginTop: 32 }}>
          <Button title="Log In" onPress={handleLogin} />
        </View>

        {/* Divider */}
        <View style={{ flexDirection: "row", alignItems: "center", marginVertical: 32 }}>
          <View style={{ flex: 1, height: 1, backgroundColor: LINE }} />
          <Text style={{ paddingHorizontal: 16, fontSize: 12, color: "rgba(24,17,20,0.4)", fontWeight: "500" }}>OR</Text>
          <View style={{ flex: 1, height: 1, backgroundColor: LINE }} />
        </View>

        {/* Social */}
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            height: 56,
            borderRadius: 28,
            borderWidth: 2,
            borderColor: LINE,
            gap: 12,
          }}
        >
          <MaterialIcons name="g-mobiledata" size={24} color={TEXT} />
          <Text style={{ fontWeight: "700", color: TEXT, fontSize: 16 }}>Continue with Google</Text>
        </TouchableOpacity>

        {/* Sign up link */}
        <View style={{ flex: 1 }} />
        <TouchableOpacity
          style={{ alignItems: "center", paddingBottom: 40 }}
          onPress={() => router.push("/auth/signup")}
        >
          <Text style={{ fontSize: 14, color: "rgba(24,17,20,0.6)", fontWeight: "600" }}>
            {"Don't have an account? "}
            <Text style={{ color: PINK }}>Sign Up</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
