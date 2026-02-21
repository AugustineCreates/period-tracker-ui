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
    <View className="flex-1 bg-white pt-14">
      <ProgressDots total={5} current={4} />

      {/* Hero */}
      <View className="flex-1 items-center justify-center">
        <View className="w-72 h-72 rounded-full bg-[rgba(252,231,243,0.5)] items-center justify-center">
          <View className="absolute w-[270px] h-[270px] rounded-full border-2 border-dashed border-[#fce7f3]" />
          <View
            className="w-48 h-48 rounded-[32px] bg-white items-center justify-center"
            style={{ shadowColor: "#000", shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.15, shadowRadius: 20, elevation: 10 }}
          >
            <MaterialIcons name="notifications-active" size={80} color="#ee2b8c" />
            <View
              className="absolute -top-3 -right-2 w-12 h-12 rounded-full bg-[#ee2b8c] items-center justify-center"
              style={{ shadowColor: "#ee2b8c", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 6, transform: [{ rotate: "12deg" }] }}
            >
              <MaterialIcons name="card-giftcard" size={22} color="#fff" />
            </View>
          </View>
        </View>
      </View>

      {/* Text */}
      <View className="px-8 pb-6">
        <Text className="text-[28px] font-bold text-[#181114] text-center tracking-tight">
          Never be surprised again.
        </Text>
        <Text className="text-lg text-[rgba(24,17,20,0.6)] text-center mt-4 leading-7">
          Enable notifications for period predictions and health tips tailored for you.
        </Text>
      </View>

      {/* Actions */}
      <View className="px-8 pb-12 gap-3">
        <Button title="Enable Notifications" onPress={handleEnable} />
        <TouchableOpacity className="items-center py-3" onPress={handleSkip}>
          <Text className="text-base font-medium text-[rgba(24,17,20,0.4)]">Maybe Later</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
