import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, TextInput, Alert } from "react-native";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { useApp } from "@/context/AppContext";
import type { MoodType, SymptomType, FlowIntensity, MoodOption, SymptomOption } from "@/types/interfaces";

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
    <View className="flex-1 bg-[#fdf8fa]">
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 pt-14 pb-4 bg-[rgba(253,248,250,0.8)]">
        <TouchableOpacity className="w-10 h-10 rounded-full items-center justify-center" onPress={() => router.back()}>
          <MaterialIcons name="arrow-back-ios-new" size={20} color="#181114" />
        </TouchableOpacity>
        <View className="items-center">
          <Text className="text-lg font-bold text-[#181114] tracking-tight">Daily Logger</Text>
          <Text className="text-xs font-semibold text-[#ee2b8c]">
            Today, {new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" })}
          </Text>
        </View>
        <TouchableOpacity className="w-10 h-10 rounded-full items-center justify-center">
          <MaterialIcons name="calendar-today" size={20} color="#181114" />
        </TouchableOpacity>
      </View>

      <ScrollView className="px-4" contentContainerStyle={{ paddingBottom: 128 }} showsVerticalScrollIndicator={false}>
        {/* Mood */}
        <View className="flex-row justify-between items-center pt-6 pb-2">
          <Text className="text-xl font-extrabold text-[#181114] tracking-tight">{"How's your mood?"}</Text>
          <Text className="text-xs font-medium text-[#ee2b8c]">Select one</Text>
        </View>
        <View className="flex-row flex-wrap gap-3 py-4">
          {moods.map((m) => {
            const sel = selectedMood === m.id;
            return (
              <TouchableOpacity
                key={m.id}
                className={`items-center gap-2 rounded-2xl py-4 ${
                  sel ? "border-2 border-[#ee2b8c] bg-[rgba(252,231,243,0.5)]" : "border border-[#e6dbe0] bg-white"
                }`}
                style={{ width: "30%" } as any}
                onPress={() => setSelectedMood(m.id)}
              >
                <MaterialIcons name={m.icon as any} size={28} color={sel ? "#ee2b8c" : "rgba(238,43,140,0.6)"} />
                <Text className="text-xs font-bold text-[#181114]">{m.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Flow Intensity */}
        <Text className="text-xl font-extrabold text-[#181114] tracking-tight pt-6 pb-2">Flow Intensity</Text>
        <View className="bg-white rounded-2xl border border-[#e6dbe0] p-6 my-4">
          <View className="h-2 bg-[#fce7f3] rounded-full relative mb-8">
            <View
              className="absolute left-0 top-0 h-2 bg-[#ee2b8c] rounded-full"
              style={{ width: `${flowLevel}%` as any }}
            />
            <View
              className="absolute -top-[9px] w-[26px] h-[26px] rounded-full bg-white border-4 border-[#ee2b8c] shadow-sm"
              style={{ left: `${flowLevel}%` as any, marginLeft: -13 }}
            />
          </View>
          <View className="flex-row justify-between">
            {["NONE", "MEDIUM", "HEAVY"].map((l, i) => (
              <Text key={l} className={`text-xs font-bold tracking-widest ${
                (i === 0 && flowLevel <= 15) || (i === 1 && flowLevel > 35 && flowLevel <= 65) || (i === 2 && flowLevel > 75)
                  ? "text-[#ee2b8c]" : "text-[rgba(0,0,0,0.3)]"
              }`}>{l}</Text>
            ))}
          </View>
        </View>

        {/* Symptoms */}
        <Text className="text-xl font-extrabold text-[#181114] tracking-tight pt-6 pb-2">Symptoms</Text>
        <View className="flex-row flex-wrap gap-3 py-4">
          {symptoms.map((s) => {
            const sel = selectedSymptoms.includes(s.id);
            return (
              <TouchableOpacity
                key={s.id}
                className={`flex-row items-center gap-3 rounded-2xl p-4 ${
                  sel ? "border border-[#ee2b8c] bg-[rgba(252,231,243,0.5)]" : "border border-[#e6dbe0] bg-white"
                }`}
                style={{ width: "47%" } as any}
                onPress={() => toggleSymptom(s.id)}
              >
                <MaterialIcons name={s.icon as any} size={22} color="#ee2b8c" />
                <Text className="text-base font-bold text-[#181114]">{s.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Notes */}
        <Text className="text-xl font-extrabold text-[#181114] tracking-tight pt-6 pb-2">Personal Notes</Text>
        <TextInput
          className="bg-white rounded-2xl border border-[#e6dbe0] p-4 h-32 text-sm text-[#181114] mt-4"
          style={{ textAlignVertical: "top" }}
          placeholder="How was your day? Write down any thoughts..."
          placeholderTextColor="rgba(24,17,20,0.3)"
          value={notes}
          onChangeText={setNotes}
          multiline
        />
      </ScrollView>

      {/* Save */}
      <View className="absolute bottom-0 left-0 right-0 px-6 pb-10 bg-[#fdf8fa]">
        <TouchableOpacity
          className="flex-row items-center justify-center gap-2 bg-[#ee2b8c] h-14 rounded-full"
          style={{ shadowColor: "#ee2b8c", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 6 }}
          onPress={handleSave}
        >
          <Text className="text-white text-base font-extrabold">Save Daily Entry</Text>
          <MaterialIcons name="check-circle" size={22} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
