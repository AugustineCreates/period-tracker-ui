import React from "react";
import { View, Text, ScrollView } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useApp } from "@/context/AppContext";
import { getCycleDay, getCyclePhase, getPhaseLabel, getPhaseInsight, getCycleProgress } from "@/utils/cycle";

const PINK = "#ee2b8c";
const TEXT = "#181114";
const TEXT2 = "#8c5f75";
const LINE = "#e6dbe0";
const SOFT = "#f5f0f2";

export default function InsightsScreen() {
  const { onboardingData, dailyLogs } = useApp();
  const lastPeriod = onboardingData.lastPeriodDate || new Date().toISOString().split("T")[0];
  const cycleLen = onboardingData.cycleLength || 28;
  const cycleDay = getCycleDay(lastPeriod, cycleLen);
  const phase = getCyclePhase(cycleDay, cycleLen);
  const progress = getCycleProgress(cycleDay, cycleLen);

  const insights = [
    { icon: "favorite" as const, label: "CYCLE HEALTH", title: getPhaseLabel(phase), body: getPhaseInsight(phase), color: PINK },
    { icon: "water-drop" as const, label: "HYDRATION", title: "Stay Hydrated", body: "Aim for 8-10 glasses of water today. Proper hydration helps reduce bloating and headaches.", color: "#3b82f6" },
    { icon: "bedtime" as const, label: "SLEEP", title: "Rest Well", body: "During this phase, you may need 7-9 hours of quality sleep. Try winding down an hour before bed.", color: "#6366f1" },
    { icon: "fitness-center" as const, label: "EXERCISE", title: phase === "menstrual" ? "Gentle Movement" : "Active Day", body: phase === "menstrual" ? "Light yoga or walking is ideal during your period." : "Your energy levels support moderate to high intensity workouts!", color: "#22c55e" },
    { icon: "restaurant" as const, label: "NUTRITION", title: "Fuel Your Body", body: "Focus on iron-rich foods and leafy greens. Magnesium-rich snacks like dark chocolate can help.", color: "#fbbf24" },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: "#fdf8fa" }}>
      <View style={{ paddingHorizontal: 16, paddingTop: 56, paddingBottom: 16 }}>
        <Text style={{ fontSize: 28, fontWeight: "800", color: TEXT, letterSpacing: -0.5 }}>Insights</Text>
        <Text style={{ fontSize: 14, color: TEXT2, marginTop: 4 }}>Personalized tips for Day {cycleDay}</Text>
      </View>

      <ScrollView style={{ paddingHorizontal: 16 }} contentContainerStyle={{ gap: 16, paddingBottom: 128 }} showsVerticalScrollIndicator={false}>
        {/* Summary */}
        <View style={{ backgroundColor: PINK, borderRadius: 24, padding: 20, shadowColor: PINK, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.3, shadowRadius: 16, elevation: 8 }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <View>
              <Text style={{ fontSize: 18, fontWeight: "700", color: "#fff" }}>{getPhaseLabel(phase)}</Text>
              <Text style={{ fontSize: 12, color: "rgba(255,255,255,0.7)", marginTop: 2 }}>Day {cycleDay} of {cycleLen}</Text>
            </View>
            <View style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: "rgba(255,255,255,0.2)", alignItems: "center", justifyContent: "center" }}>
              <Text style={{ fontSize: 14, fontWeight: "700", color: "#fff" }}>{progress}%</Text>
            </View>
          </View>
          <View style={{ height: 8, borderRadius: 4, backgroundColor: "rgba(255,255,255,0.2)", overflow: "hidden" }}>
            <View style={{ height: "100%", borderRadius: 4, backgroundColor: "#fff", width: `${progress}%` as any }} />
          </View>
        </View>

        {/* Cards */}
        {insights.map((ins, i) => (
          <View key={i} style={{ backgroundColor: "#fff", borderRadius: 24, padding: 20, borderWidth: 1, borderColor: LINE, gap: 8 }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 4 }}>
              <View style={{ width: 36, height: 36, borderRadius: 12, alignItems: "center", justifyContent: "center", backgroundColor: `${ins.color}15` }}>
                <MaterialIcons name={ins.icon} size={22} color={ins.color} />
              </View>
              <Text style={{ fontSize: 10, fontWeight: "700", letterSpacing: 2, color: ins.color }}>{ins.label}</Text>
            </View>
            <Text style={{ fontSize: 18, fontWeight: "700", color: TEXT }}>{ins.title}</Text>
            <Text style={{ fontSize: 14, color: TEXT2, lineHeight: 20 }}>{ins.body}</Text>
          </View>
        ))}

        {/* Log Summary */}
        <View style={{ backgroundColor: SOFT, borderRadius: 24, padding: 20, borderWidth: 1, borderColor: "#f0e8ec" }}>
          <Text style={{ fontSize: 16, fontWeight: "700", color: TEXT, textAlign: "center", marginBottom: 16 }}>Your Logging Streak</Text>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-around" }}>
            {[{ n: dailyLogs.length, l: "Days Logged" }, { n: cycleLen, l: "Cycle Length" }, { n: 5, l: "Period Days" }].map((s, i) => (
              <React.Fragment key={s.l}>
                {i > 0 && <View style={{ width: 1, height: 40, backgroundColor: "#f0e8ec" }} />}
                <View style={{ alignItems: "center", gap: 4 }}>
                  <Text style={{ fontSize: 24, fontWeight: "800", color: PINK }}>{s.n}</Text>
                  <Text style={{ fontSize: 12, color: TEXT2, fontWeight: "500" }}>{s.l}</Text>
                </View>
              </React.Fragment>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
