import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Button } from "@/components/ui/Button";
import { ProgressDots } from "@/components/ui/ProgressDots";

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <LinearGradient colors={["#fff5f8", "#ffe4f0"]} style={{ flex: 1 }}>
      {/* Skip */}
      <View style={{ flexDirection: "row", justifyContent: "flex-end", paddingHorizontal: 16, paddingTop: 56 }}>
        <TouchableOpacity
          onPress={() => router.push("/onboarding/last-period")}
          style={{ paddingHorizontal: 16, paddingVertical: 8 }}
        >
          <Text style={{ color: "#ee2b8c", fontWeight: "600", fontSize: 14 }}>Skip</Text>
        </TouchableOpacity>
      </View>

      {/* Illustration */}
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 24 }}>
        <LinearGradient
          colors={["#fce4ec", "#f8bbd0", "#f48fb1"]}
          style={{
            width: "100%",
            aspectRatio: 1,
            borderRadius: 16,
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          <View style={{ width: 192, height: 192, position: "relative" }}>
            <View style={{ width: 64, height: 64, borderRadius: 32, backgroundColor: "#d4a574", position: "absolute", top: 20, left: 28, borderWidth: 3, borderColor: "#fff" }} />
            <View style={{ width: 64, height: 64, borderRadius: 32, backgroundColor: "#8d5524", position: "absolute", top: 10, left: 80, borderWidth: 3, borderColor: "#fff" }} />
            <View style={{ width: 64, height: 64, borderRadius: 32, backgroundColor: "#f5cba7", position: "absolute", top: 40, left: 56, borderWidth: 3, borderColor: "#fff" }} />
            <View style={{ width: 64, height: 64, borderRadius: 32, backgroundColor: "#6b3a2a", position: "absolute", top: 24, left: 112, borderWidth: 3, borderColor: "#fff" }} />
          </View>
        </LinearGradient>
      </View>

      {/* Text */}
      <View style={{ alignItems: "center", paddingHorizontal: 32, paddingTop: 32, paddingBottom: 16 }}>
        <Text style={{ fontSize: 34, fontWeight: "800", color: "#181114", textAlign: "center", letterSpacing: -0.5 }}>
          Welcome to Her Circle
        </Text>
        <Text style={{ fontSize: 18, fontWeight: "500", color: "rgba(24,17,20,0.7)", textAlign: "center", marginTop: 16, lineHeight: 28, maxWidth: 300 }}>
          Your personal guide to understanding your body and cycle with love.
        </Text>
      </View>

      <ProgressDots total={3} current={0} />

      {/* Actions */}
      <View style={{ paddingHorizontal: 24, paddingBottom: 48, gap: 16 }}>
        <Button
          title="Get Started"
          onPress={() => router.push("/onboarding/last-period")}
        />
        <TouchableOpacity style={{ alignItems: "center", paddingVertical: 8 }} onPress={() => router.push("/auth/login")}>
          <Text style={{ color: "rgba(24,17,20,0.6)", fontWeight: "600", fontSize: 12 }}>
            {"Already have an account? "}
            <Text style={{ color: "#ee2b8c" }}>Log In</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}
