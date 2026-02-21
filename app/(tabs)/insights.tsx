import React from "react";
import { View, Text, ScrollView } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useApp } from "@/context/AppContext";
import { getCycleDay, getCyclePhase, getPhaseLabel, getPhaseInsight, getCycleProgress } from "@/utils/cycle";

export default function InsightsScreen() {
  const { onboardingData, dailyLogs } = useApp();
  const lastPeriod = onboardingData.lastPeriodDate || new Date().toISOString().split("T")[0];
  const cycleLen = onboardingData.cycleLength || 28;
  const cycleDay = getCycleDay(lastPeriod, cycleLen);
  const phase = getCyclePhase(cycleDay, cycleLen);
  const progress = getCycleProgress(cycleDay, cycleLen);

  const insights = [
    { icon: "favorite" as const, label: "CYCLE HEALTH", title: getPhaseLabel(phase), body: getPhaseInsight(phase), color: "#ee2b8c" },
    { icon: "water-drop" as const, label: "HYDRATION", title: "Stay Hydrated", body: "Aim for 8-10 glasses of water today. Proper hydration helps reduce bloating and headaches.", color: "#3b82f6" },
    { icon: "bedtime" as const, label: "SLEEP", title: "Rest Well", body: "During this phase, you may need 7-9 hours of quality sleep. Try winding down an hour before bed.", color: "#6366f1" },
    { icon: "fitness-center" as const, label: "EXERCISE", title: phase === "menstrual" ? "Gentle Movement" : "Active Day", body: phase === "menstrual" ? "Light yoga or walking is ideal during your period." : "Your energy levels support moderate to high intensity workouts!", color: "#22c55e" },
    { icon: "restaurant" as const, label: "NUTRITION", title: "Fuel Your Body", body: "Focus on iron-rich foods and leafy greens. Magnesium-rich snacks like dark chocolate can help.", color: "#fbbf24" },
  ];

  return (
    <View className="flex-1 bg-[#fdf8fa]">
      <View className="px-4 pt-14 pb-4">
        <Text className="text-[28px] font-extrabold text-[#181114] tracking-tight">Insights</Text>
        <Text className="text-sm text-[#8c5f75] mt-1">Personalized tips for Day {cycleDay}</Text>
      </View>

      <ScrollView className="px-4" contentContainerStyle={{ gap: 16, paddingBottom: 128 }} showsVerticalScrollIndicator={false}>
        {/* Summary */}
        <View
          className="bg-[#ee2b8c] rounded-3xl p-5"
          style={{ shadowColor: "#ee2b8c", shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.3, shadowRadius: 16, elevation: 8 }}
        >
          <View className="flex-row justify-between items-center mb-4">
            <View>
              <Text className="text-lg font-bold text-white">{getPhaseLabel(phase)}</Text>
              <Text className="text-xs text-[rgba(255,255,255,0.7)] mt-0.5">Day {cycleDay} of {cycleLen}</Text>
            </View>
            <View className="w-12 h-12 rounded-full bg-[rgba(255,255,255,0.2)] items-center justify-center">
              <Text className="text-sm font-bold text-white">{progress}%</Text>
            </View>
          </View>
          <View className="h-2 rounded bg-[rgba(255,255,255,0.2)] overflow-hidden">
            <View className="h-full rounded bg-white" style={{ width: `${progress}%` as any }} />
          </View>
        </View>

        {/* Cards */}
        {insights.map((ins, i) => (
          <View key={i} className="bg-white rounded-3xl p-5 border border-[#e6dbe0] gap-2">
            <View className="flex-row items-center gap-2 mb-1">
              <View
                className="w-9 h-9 rounded-xl items-center justify-center"
                style={{ backgroundColor: `${ins.color}15` }}
              >
                <MaterialIcons name={ins.icon} size={22} color={ins.color} />
              </View>
              <Text className="text-[10px] font-bold tracking-widest" style={{ color: ins.color }}>{ins.label}</Text>
            </View>
            <Text className="text-lg font-bold text-[#181114]">{ins.title}</Text>
            <Text className="text-sm text-[#8c5f75] leading-5">{ins.body}</Text>
          </View>
        ))}

        {/* Log Summary */}
        <View className="bg-[#f5f0f2] rounded-3xl p-5 border border-[#f0e8ec]">
          <Text className="text-base font-bold text-[#181114] text-center mb-4">Your Logging Streak</Text>
          <View className="flex-row items-center justify-around">
            {[{ n: dailyLogs.length, l: "Days Logged" }, { n: cycleLen, l: "Cycle Length" }, { n: 5, l: "Period Days" }].map((s, i) => (
              <React.Fragment key={s.l}>
                {i > 0 && <View className="w-px h-10 bg-[#f0e8ec]" />}
                <View className="items-center gap-1">
                  <Text className="text-2xl font-extrabold text-[#ee2b8c]">{s.n}</Text>
                  <Text className="text-xs text-[#8c5f75] font-medium">{s.l}</Text>
                </View>
              </React.Fragment>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
