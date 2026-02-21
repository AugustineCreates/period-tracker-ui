import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { useApp } from "@/context/AppContext";
import {
  getCycleDay, getCyclePhase, getPhaseLabel, getDaysUntilPeriod,
  getCycleProgress, getPhaseInsight,
} from "@/utils/cycle";

export default function HomeScreen() {
  const router = useRouter();
  const { userName, onboardingData } = useApp();
  const lastPeriod = onboardingData.lastPeriodDate || new Date().toISOString().split("T")[0];
  const cycleLength = onboardingData.cycleLength || 28;
  const cycleDay = getCycleDay(lastPeriod, cycleLength);
  const phase = getCyclePhase(cycleDay, cycleLength);
  const daysUntil = getDaysUntilPeriod(cycleDay, cycleLength);
  const progress = getCycleProgress(cycleDay, cycleLength);

  return (
    <View className="flex-1 bg-[#fcf8fa]">
      {/* Top App Bar */}
      <View className="flex-row items-center justify-between px-4 pt-14 pb-2 bg-[rgba(255,255,255,0.8)]">
        <TouchableOpacity className="w-12 h-12 items-center justify-center">
          <MaterialIcons name="menu" size={24} color="#181114" />
        </TouchableOpacity>
        <Text className="flex-1 text-center text-lg font-bold text-[#181114] tracking-tight">
          Good morning, {userName}
        </Text>
        <TouchableOpacity className="w-12 h-12 items-center justify-center">
          <MaterialIcons name="notifications-none" size={24} color="#181114" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        {/* Central Cycle Indicator */}
        <View className="items-center justify-center py-8 px-4">
          <View className="w-72 h-72 items-center justify-center">
            <View
              className="absolute inset-0 rounded-full border-[14px] border-[rgba(238,43,140,0.2)]"
            />
            <View
              className="w-[260px] h-[260px] rounded-full bg-white items-center justify-center border-4 border-white"
              style={{ shadowColor: "#ee2b8c", shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.1, shadowRadius: 25, elevation: 8 }}
            >
              <Text className="text-xs font-bold text-[#ee2b8c] tracking-widest uppercase mb-1">
                {getPhaseLabel(phase)}
              </Text>
              <Text className="text-[56px] font-extrabold text-[#181114] leading-[62px]">
                Day {cycleDay}
              </Text>
              <Text className="text-sm font-medium text-[#8c5f75] mt-2">
                Period in {daysUntil} days
              </Text>
            </View>
          </View>
        </View>

        {/* Progress Bar Card */}
        <View
          className="bg-white rounded-2xl p-4 mx-4 mb-6"
          style={{ shadowColor: "#ee2b8c", shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.1, shadowRadius: 25, elevation: 4 }}
        >
          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-[#181114] text-base font-medium">Cycle Progress</Text>
            <Text className="text-[#ee2b8c] text-sm font-bold uppercase">{progress}%</Text>
          </View>
          <View className="h-3 rounded-full bg-[#e6dbe0] overflow-hidden">
            <View
              className="h-full rounded-full bg-[#ee2b8c]"
              style={{ width: `${progress}%` as any }}
            />
          </View>
        </View>

        {/* Headline */}
        <Text className="text-[#181114] text-2xl font-bold text-center px-4 mb-2 tracking-tight">
          How are you feeling today?
        </Text>

        {/* Quick Action Buttons */}
        <View className="flex-row gap-4 px-4 py-3 mb-6">
          <TouchableOpacity
            onPress={() => router.push("/(tabs)/log")}
            className="flex-1 flex-row items-center justify-center gap-2 h-14 rounded-full bg-[#ee2b8c]"
            activeOpacity={0.85}
          >
            <MaterialIcons name="edit-note" size={22} color="#fff" />
            <Text className="text-white text-base font-bold">Log symptoms</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-1 flex-row items-center justify-center gap-2 h-14 rounded-full bg-[rgba(238,43,140,0.1)]"
            activeOpacity={0.85}
          >
            <MaterialIcons name="mood" size={22} color="#ee2b8c" />
            <Text className="text-[#ee2b8c] text-base font-bold">Daily mood</Text>
          </TouchableOpacity>
        </View>

        {/* Insights Section */}
        <View className="px-4 pb-4">
          <Text className="text-[#181114] text-lg font-bold mb-3 px-1">Insights for you</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 16, paddingBottom: 16 }}
          >
            {/* Health Insight Card */}
            <View className="w-[180px] bg-[#f5f0f2] rounded-2xl p-5 gap-2 border border-[#fce7f3]">
              <View className="flex-row items-center gap-2">
                <MaterialIcons name="favorite" size={20} color="#ee2b8c" />
                <Text className="text-[#ee2b8c] text-[10px] font-bold uppercase tracking-wider">Health</Text>
              </View>
              <Text className="text-[#181114] text-lg font-bold leading-[22px]">High Energy</Text>
              <Text className="text-[#8c5f75] text-xs leading-4">
                Great day for a workout or starting new projects!
              </Text>
            </View>

            {/* Fertility Insight Card */}
            <View className="w-[180px] bg-[#f5f0f2] rounded-2xl p-5 gap-2 border border-[#fce7f3]">
              <View className="flex-row items-center gap-2">
                <MaterialIcons name="child-care" size={20} color="#ee2b8c" />
                <Text className="text-[#ee2b8c] text-[10px] font-bold uppercase tracking-wider">Fertility</Text>
              </View>
              <Text className="text-[#181114] text-lg font-bold leading-[22px]">
                {phase === "ovulation" ? "Peak" : phase === "follicular" ? "High Chance" : "Low"}
              </Text>
              <Text className="text-[#8c5f75] text-xs leading-4">
                {getPhaseInsight(phase)}
              </Text>
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
}
