import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, TextInput, Alert } from "react-native";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { useApp } from "@/context/AppContext";
import type { MoodType, SymptomType, FlowIntensity, MoodOption, SymptomOption } from "@/types/interfaces";

const PINK = "#ee2b8c";
const BG = "#fdf8fa";
const TEXT = "#181114";
const LINE = "#e6dbe0";
const BRAND_LIGHT = "#fce7f3";

const moods: MoodOption[] = [
  { id: "happy", label: "Happy", icon: "sentiment-very-satisfied" },
  { id: "sensitive", label: "Sensitive", icon: "auto-awesome" },
  { id: "tired", label: "Tired", icon: "bedtime" },
  { id: "anxious", label: "Anxious", icon: "cloud" },
  { id: "calm", label: "Calm", icon: "eco" },
  { id: "other", label: "Other", icon: "add" },
];

const symptoms: SymptomOption[] = [
  { id: "bloating", label: "Bloating", icon: "air" },
  { id: "headache", label: "Headache", icon: "psychology" },
  { id: "acne", label: "Acne", icon: "flare" },
  { id: "cramps", label: "Cramps", icon: "waves" },
  { id: "backache", label: "Backache", icon: "accessibility-new" },
  { id: "spotting", label: "Spotting", icon: "water-drop" },
];

export default function DailyLogScreen() {
  const router = useRouter();
  const { saveDailyLog } = useApp();
  const [selectedMood, setSelectedMood] = useState<MoodType | null>("happy");
  const [selectedSymptoms, setSelectedSymptoms] = useState<SymptomType[]>(["headache", "cramps"]);
  const [flowLevel] = useState(50);
  const [notes, setNotes] = useState("");

  const toggleSymptom = (id: SymptomType) =>
    setSelectedSymptoms((p) => p.includes(id) ? p.filter((s) => s !== id) : [...p, id]);

  const getFlowLabel = (): FlowIntensity => {
    if (flowLevel <= 15) return "none";
    if (flowLevel <= 45) return "light";
    if (flowLevel <= 75) return "medium";
    return "heavy";
  };

  const handleSave = () => {
    saveDailyLog({
      date: new Date().toISOString().split("T")[0],
      mood: selectedMood,
      flow: getFlowLabel(),
      symptoms: selectedSymptoms,
      notes,
      waterIntake: 8,
      sleepHours: 7.5,
    });
    Alert.alert("Saved!", "Your daily entry has been saved.");
  };

  return (
    <View style={{ flex: 1, backgroundColor: BG }}>
      {/* Header */}
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 16, paddingTop: 56, paddingBottom: 16, backgroundColor: "rgba(253,248,250,0.8)" }}>
        <TouchableOpacity style={{ width: 40, height: 40, borderRadius: 20, alignItems: "center", justifyContent: "center" }} onPress={() => router.back()}>
          <MaterialIcons name="arrow-back-ios-new" size={20} color={TEXT} />
        </TouchableOpacity>
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize: 18, fontWeight: "700", color: TEXT, letterSpacing: -0.5 }}>Daily Logger</Text>
          <Text style={{ fontSize: 12, fontWeight: "600", color: PINK }}>
            Today, {new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" })}
          </Text>
        </View>
        <TouchableOpacity style={{ width: 40, height: 40, borderRadius: 20, alignItems: "center", justifyContent: "center" }}>
          <MaterialIcons name="calendar-today" size={20} color={TEXT} />
        </TouchableOpacity>
      </View>

      <ScrollView style={{ paddingHorizontal: 16 }} contentContainerStyle={{ paddingBottom: 128 }} showsVerticalScrollIndicator={false}>
        {/* Mood */}
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingTop: 24, paddingBottom: 8 }}>
          <Text style={{ fontSize: 20, fontWeight: "800", color: TEXT, letterSpacing: -0.5 }}>{"How's your mood?"}</Text>
          <Text style={{ fontSize: 12, fontWeight: "500", color: PINK }}>Select one</Text>
        </View>
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 12, paddingVertical: 16 }}>
          {moods.map((m) => {
            const sel = selectedMood === m.id;
            return (
              <TouchableOpacity
                key={m.id}
                style={{
                  width: "30%",
                  alignItems: "center",
                  gap: 8,
                  borderRadius: 16,
                  borderWidth: sel ? 2 : 1,
                  borderColor: sel ? PINK : LINE,
                  backgroundColor: sel ? "rgba(252,231,243,0.5)" : "#fff",
                  paddingVertical: 16,
                } as any}
                onPress={() => setSelectedMood(m.id)}
              >
                <MaterialIcons name={m.icon as any} size={28} color={sel ? PINK : "rgba(238,43,140,0.6)"} />
                <Text style={{ fontSize: 12, fontWeight: "700", color: TEXT }}>{m.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Flow Intensity */}
        <Text style={{ fontSize: 20, fontWeight: "800", color: TEXT, letterSpacing: -0.5, paddingTop: 24, paddingBottom: 8 }}>Flow Intensity</Text>
        <View style={{ backgroundColor: "#fff", borderRadius: 16, borderWidth: 1, borderColor: LINE, padding: 24, marginVertical: 16 }}>
          <View style={{ height: 8, backgroundColor: BRAND_LIGHT, borderRadius: 999, position: "relative", marginBottom: 32 }}>
            <View style={{ position: "absolute", left: 0, top: 0, height: 8, backgroundColor: PINK, borderRadius: 999, width: `${flowLevel}%` as any }} />
            <View style={{ position: "absolute", top: -9, width: 26, height: 26, borderRadius: 13, backgroundColor: "#fff", borderWidth: 4, borderColor: PINK, shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.15, shadowRadius: 2, elevation: 2, left: `${flowLevel}%` as any, marginLeft: -13 }} />
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            {["NONE", "MEDIUM", "HEAVY"].map((l, i) => (
              <Text key={l} style={{
                fontSize: 12,
                fontWeight: "700",
                letterSpacing: 2,
                color: (i === 0 && flowLevel <= 15) || (i === 1 && flowLevel > 35 && flowLevel <= 65) || (i === 2 && flowLevel > 75) ? PINK : "rgba(0,0,0,0.3)",
              }}>{l}</Text>
            ))}
          </View>
        </View>

        {/* Symptoms */}
        <Text style={{ fontSize: 20, fontWeight: "800", color: TEXT, letterSpacing: -0.5, paddingTop: 24, paddingBottom: 8 }}>Symptoms</Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 12, paddingVertical: 16 }}>
          {symptoms.map((s) => {
            const sel = selectedSymptoms.includes(s.id);
            return (
              <TouchableOpacity
                key={s.id}
                style={{
                  width: "47%",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 12,
                  borderRadius: 16,
                  borderWidth: 1,
                  borderColor: sel ? PINK : LINE,
                  backgroundColor: sel ? "rgba(252,231,243,0.5)" : "#fff",
                  padding: 16,
                } as any}
                onPress={() => toggleSymptom(s.id)}
              >
                <MaterialIcons name={s.icon as any} size={22} color={PINK} />
                <Text style={{ fontSize: 16, fontWeight: "700", color: TEXT }}>{s.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Notes */}
        <Text style={{ fontSize: 20, fontWeight: "800", color: TEXT, letterSpacing: -0.5, paddingTop: 24, paddingBottom: 8 }}>Personal Notes</Text>
        <TextInput
          style={{ backgroundColor: "#fff", borderRadius: 16, borderWidth: 1, borderColor: LINE, padding: 16, height: 128, fontSize: 14, color: TEXT, marginTop: 16, textAlignVertical: "top" }}
          placeholder="How was your day? Write down any thoughts..."
          placeholderTextColor="rgba(24,17,20,0.3)"
          value={notes}
          onChangeText={setNotes}
          multiline
        />
      </ScrollView>

      {/* Save */}
      <View style={{ position: "absolute", bottom: 0, left: 0, right: 0, paddingHorizontal: 24, paddingBottom: 40, backgroundColor: BG }}>
        <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, backgroundColor: PINK, height: 56, borderRadius: 9999, shadowColor: PINK, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 6 }}
          onPress={handleSave}
        >
          <Text style={{ color: "#fff", fontSize: 16, fontWeight: "800" }}>Save Daily Entry</Text>
          <MaterialIcons name="check-circle" size={22} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
