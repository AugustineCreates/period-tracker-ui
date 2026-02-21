import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { useApp } from "@/context/AppContext";
import { Button } from "@/components/ui/Button";
import {
  getCycleDay, getCyclePhase, getPhaseLabel, getDaysUntilPeriod,
} from "@/utils/cycle";

const PINK = "#ee2b8c";
const TEXT = "#181114";
const TEXT2 = "#8c5f75";
const LINE = "#e6dbe0";
const SOFT = "#f5f0f2";
const BRAND_LIGHT = "#fce7f3";

const symptoms = [
  { label: "Low Energy", icon: "battery-2-bar" },
  { label: "Cramps", icon: "healing" },
  { label: "Irritable", icon: "sentiment-dissatisfied" },
];

export default function PartnerDashboardScreen() {
  const router = useRouter();
  const { userName, onboardingData } = useApp();
  const lastPeriod = onboardingData.lastPeriodDate || new Date().toISOString().split("T")[0];
  const cycleLength = onboardingData.cycleLength || 28;
  const cycleDay = getCycleDay(lastPeriod, cycleLength);
  const phase = getCyclePhase(cycleDay, cycleLength);
  const daysUntil = getDaysUntilPeriod(cycleDay, cycleLength);

  return (
    <View style={{ flex: 1, backgroundColor: "#fdf8fa", paddingTop: 48 }}>
      {/* Top Bar */}
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 16, paddingBottom: 8 }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
          <View style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: BRAND_LIGHT, alignItems: "center", justifyContent: "center" }}>
            <Text style={{ fontSize: 18, fontWeight: "700", color: PINK }}>{userName.charAt(0)}</Text>
          </View>
          <Text style={{ fontSize: 18, fontWeight: "700", color: TEXT }}>{userName}{"'"}s Cycle</Text>
        </View>
        <TouchableOpacity style={{ width: 44, height: 44, alignItems: "center", justifyContent: "center" }}>
          <MaterialIcons name="notifications-none" size={24} color={TEXT} />
        </TouchableOpacity>
      </View>

      <ScrollView style={{ paddingHorizontal: 16 }} showsVerticalScrollIndicator={false}>
        {/* Countdown Card */}
        <View style={{ backgroundColor: PINK, borderRadius: 24, marginTop: 16, overflow: "hidden" }}>
          <View style={{ alignItems: "center", paddingTop: 40, paddingBottom: 24 }}>
            <Text style={{ fontSize: 72, fontWeight: "800", color: "#fff" }}>{daysUntil}</Text>
            <Text style={{ fontSize: 14, fontWeight: "700", color: "rgba(255,255,255,0.8)", letterSpacing: 3, marginTop: 4 }}>DAYS TO GO</Text>
          </View>
          <View style={{ backgroundColor: "#fff", borderTopLeftRadius: 24, borderTopRightRadius: 24, paddingHorizontal: 20, paddingTop: 20, paddingBottom: 24 }}>
            <Text style={{ fontSize: 20, fontWeight: "700", color: TEXT }}>Period starts in {daysUntil} days</Text>
            <Text style={{ fontSize: 14, fontWeight: "700", color: PINK, marginTop: 4, letterSpacing: 2 }}>PHASE: {getPhaseLabel(phase).toUpperCase()}</Text>
            <Text style={{ fontSize: 14, color: TEXT2, marginTop: 8, lineHeight: 20 }}>
              The cycle is currently on day {cycleDay}. {userName} might be feeling a bit more tired or sensitive than usual.
            </Text>
          </View>
        </View>

        {/* Current Mood */}
        <Text style={{ fontSize: 20, fontWeight: "700", color: TEXT, marginTop: 32, marginBottom: 12 }}>Current Mood</Text>
        <View style={{ backgroundColor: SOFT, borderRadius: 24, padding: 20, flexDirection: "row", alignItems: "center" }}>
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 4 }}>
              <MaterialIcons name="sentiment-dissatisfied" size={20} color={TEXT2} />
              <Text style={{ fontSize: 16, fontWeight: "700", color: TEXT }}>Feeling Sensitive</Text>
            </View>
            <Text style={{ fontSize: 14, color: TEXT2, lineHeight: 20, marginTop: 4 }}>
              <Text style={{ fontWeight: "700", color: PINK }}>Pro-tip:</Text> She might need some extra chocolate, a warm hug, or a movie night in!
            </Text>
          </View>
          <View style={{ width: 80, height: 80, borderRadius: 40, backgroundColor: "#fdf8fa", alignItems: "center", justifyContent: "center", marginLeft: 12 }}>
            <MaterialIcons name="cookie" size={36} color="#d4a574" />
          </View>
        </View>

        {/* Send a Gift */}
        <Text style={{ fontSize: 20, fontWeight: "700", color: TEXT, marginTop: 32, marginBottom: 4 }}>Send a Gift</Text>
        <Text style={{ fontSize: 14, color: TEXT2, marginBottom: 16 }}>Brighten her day</Text>
        <View style={{ flexDirection: "row", gap: 16 }}>
          <TouchableOpacity
            style={{ flex: 1, backgroundColor: "#fff", borderRadius: 16, paddingVertical: 24, alignItems: "center", borderWidth: 1, borderColor: LINE }}
            onPress={() => router.push("/partner/gift-selection")}
          >
            <MaterialIcons name="local-florist" size={32} color={PINK} />
            <Text style={{ fontSize: 14, fontWeight: "700", color: TEXT, marginTop: 12 }}>Send Flowers</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ flex: 1, backgroundColor: "#fff", borderRadius: 16, paddingVertical: 24, alignItems: "center", borderWidth: 1, borderColor: LINE }}
            onPress={() => router.push("/partner/gift-selection")}
          >
            <MaterialIcons name="cookie" size={32} color={PINK} />
            <Text style={{ fontSize: 14, fontWeight: "700", color: TEXT, marginTop: 12 }}>Send Chocolate</Text>
          </TouchableOpacity>
        </View>

        {/* Send Support */}
        <Text style={{ fontSize: 20, fontWeight: "700", color: TEXT, marginTop: 32, marginBottom: 12 }}>Send Support</Text>
        <Button title="Send Love" onPress={() => {}} icon={<MaterialIcons name="favorite" size={22} color="#fff" />} />

        {/* Logged Symptoms */}
        <Text style={{ fontSize: 12, fontWeight: "700", color: TEXT2, letterSpacing: 3, marginTop: 32, marginBottom: 12 }}>LOGGED SYMPTOMS</Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 12, marginBottom: 40 }}>
          {symptoms.map((s) => (
            <View key={s.label} style={{ flexDirection: "row", alignItems: "center", gap: 8, backgroundColor: SOFT, borderRadius: 999, paddingHorizontal: 16, paddingVertical: 8 }}>
              <MaterialIcons name={s.icon as any} size={16} color={TEXT2} />
              <Text style={{ fontSize: 14, color: TEXT2, fontWeight: "500" }}>{s.label}</Text>
            </View>
          ))}
        </View>

        <View style={{ height: 24 }} />
      </ScrollView>
    </View>
  );
}
