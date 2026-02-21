import React, { useState } from "react";
import { View, Text, Platform } from "react-native";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { Header } from "@/components/ui/Header";
import { ProgressDots } from "@/components/ui/ProgressDots";
import { Button } from "@/components/ui/Button";
import { useApp } from "@/context/AppContext";

export default function CycleLengthScreen() {
  const router = useRouter();
  const { setOnboardingData, onboardingData } = useApp();
  const [cycleLength, setCycleLength] = useState(onboardingData.cycleLength || 28);

  const pct = ((cycleLength - 21) / (45 - 21)) * 100;

  const handleContinue = () => {
    setOnboardingData({ cycleLength });
    router.push("/onboarding/notifications");
  };

  return (
    <View className="flex-1 bg-[#fdf8fa] pt-12">
      <Header showBack />
      <View className="items-center -mt-10 mb-2">
        <Text className="text-[10px] font-semibold text-[#8c5f75] uppercase tracking-widest">
          Personalization
        </Text>
      </View>
      <ProgressDots total={5} current={3} />

      <View className="flex-1 px-6">
        <Text className="text-[28px] font-bold text-[#181114] text-center pt-6 tracking-tight">
          How long is your cycle usually?
        </Text>
        <Text className="text-base text-[rgba(24,17,20,0.7)] text-center mt-2 leading-6 px-4">
          Knowing your cycle length helps us predict your fertile window and next period accurately.
        </Text>

        {/* Value Display */}
        <View className="items-center justify-center py-12">
          <View
            className="bg-white rounded-2xl px-10 py-6 items-center border border-[#f0e8ec]"
            style={{ shadowColor: "#ee2b8c", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 4 }}
          >
            <Text className="text-5xl font-bold text-[#ee2b8c] tracking-tight">{cycleLength}</Text>
            <Text className="text-lg font-semibold text-[#8c5f75] uppercase tracking-widest">Days</Text>
          </View>
        </View>

        {/* Custom Slider */}
        <View className="px-4 relative">
          <View className="h-2 bg-[#e6dbe0] rounded-full relative">
            <View
              className="absolute left-0 top-0 h-2 bg-[#ee2b8c] rounded-full"
              style={{ width: `${pct}%` as any }}
            />
            <View
              className="absolute -top-3 w-8 h-8 rounded-full bg-[#ee2b8c]"
              style={{ left: `${pct}%` as any, marginLeft: -16 }}
            />
          </View>
          <View className="flex-row justify-between mt-4">
            <Text className="text-[10px] text-[rgba(24,17,20,0.4)] font-medium">21 Days</Text>
            <Text className="text-[10px] text-[rgba(24,17,20,0.4)] font-medium">30 Days</Text>
            <Text className="text-[10px] text-[rgba(24,17,20,0.4)] font-medium">45 Days</Text>
          </View>
          {Platform.OS === "web" && (
            <input
              type="range"
              min={21}
              max={45}
              value={cycleLength}
              onChange={(e: any) => setCycleLength(Number(e.target.value))}
              style={{ position: "absolute", top: 0, left: 0, right: 0, height: 40, opacity: 0, cursor: "pointer" }}
            />
          )}
        </View>

        <Text className="text-xs text-[rgba(24,17,20,0.5)] italic text-center mt-8">
          {"Don't worry, you can always change this later in settings."}
        </Text>
      </View>

      <View className="px-6 pb-10">
        <Button
          title="Continue"
          onPress={handleContinue}
          icon={<MaterialIcons name="arrow-forward" size={20} color="#fff" />}
        />
      </View>
    </View>
  );
}
