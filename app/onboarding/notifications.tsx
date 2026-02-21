import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { ProgressDots } from "@/components/ui/ProgressDots";
import { Button } from "@/components/ui/Button";
import { useApp } from "@/context/AppContext";

export default function NotificationsScreen() {
  const router = useRouter();
  const { setOnboardingData, completeOnboarding } = useApp();

  const handleEnable = () => {
    setOnboardingData({ notificationsEnabled: true });
    completeOnboarding();
    router.replace("/(tabs)");
  };

  const handleSkip = () => {
    setOnboardingData({ notificationsEnabled: false });
    completeOnboarding();
    router.replace("/(tabs)");
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff", paddingTop: 56 }}>
      <ProgressDots total={5} current={4} />

      {/* Hero */}
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <View style={{ width: 288, height: 288, borderRadius: 144, backgroundColor: "rgba(252,231,243,0.5)", alignItems: "center", justifyContent: "center" }}>
          {/* Dashed ring */}
          <View style={{ position: "absolute", width: 270, height: 270, borderRadius: 135, borderWidth: 2, borderStyle: "dashed", borderColor: "#fce7f3" }} />
          {/* Icon card */}
          <View style={{
            width: 192,
            height: 192,
            borderRadius: 32,
            backgroundColor: "#fff",
            alignItems: "center",
            justifyContent: "center",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 10 },
            shadowOpacity: 0.15,
            shadowRadius: 20,
            elevation: 10,
          }}>
            <MaterialIcons name="notifications-active" size={80} color="#ee2b8c" />
            {/* Badge */}
            <View style={{
              position: "absolute",
              top: -12,
              right: -8,
              width: 48,
              height: 48,
              borderRadius: 24,
              backgroundColor: "#ee2b8c",
              alignItems: "center",
              justifyContent: "center",
              shadowColor: "#ee2b8c",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
              elevation: 6,
              transform: [{ rotate: "12deg" }],
            }}>
              <MaterialIcons name="card-giftcard" size={22} color="#fff" />
            </View>
          </View>
        </View>
      </View>

      {/* Text */}
      <View style={{ paddingHorizontal: 32, paddingBottom: 24 }}>
        <Text style={{ fontSize: 28, fontWeight: "700", color: "#181114", textAlign: "center", letterSpacing: -0.5 }}>
          Never be surprised again.
        </Text>
        <Text style={{ fontSize: 18, color: "rgba(24,17,20,0.6)", textAlign: "center", marginTop: 16, lineHeight: 28 }}>
          Enable notifications for period predictions and health tips tailored for you.
        </Text>
      </View>

      {/* Actions */}
      <View style={{ paddingHorizontal: 32, paddingBottom: 48, gap: 12 }}>
        <Button title="Enable Notifications" onPress={handleEnable} />
        <TouchableOpacity style={{ alignItems: "center", paddingVertical: 12 }} onPress={handleSkip}>
          <Text style={{ fontSize: 16, fontWeight: "500", color: "rgba(24,17,20,0.4)" }}>Maybe Later</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
