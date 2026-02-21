import React, { useState, useEffect, useRef } from "react";
import { View, Text, ScrollView, TouchableOpacity, Animated } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useApp } from "@/context/AppContext";

interface ActiveCraving {
  id: string; category: string; name: string; quote: string; icon: string; color: string;
}

const urgentCraving = { name: "Dark Chocolate Sea Salt", sensitivity: "Peak Craving in..." };

const activeCravings: ActiveCraving[] = [
  { id: "1", category: "SALTY & SAVORY", name: "Extra Crispy Fries", quote: '"I literally just want something crunchy and covered in salt."', icon: "lunch-dining", color: "#fbbf24" },
  { id: "2", category: "SWEET RELIEF", name: "Mint Choc Chip", quote: '"Feeling a bit overheated, need something cold and sweet."', icon: "icecream", color: "#f9a8d4" },
  { id: "3", category: "SOUR & TANGY", name: "Giant Dill Pickles", quote: '"The vinegar-er the better! Help a girl out?"', icon: "restaurant", color: "#86efac" },
];

function CountdownTimer() {
  const [secs, setSecs] = useState(1122);
  useEffect(() => { const i = setInterval(() => setSecs((p) => (p > 0 ? p - 1 : 0)), 1000); return () => clearInterval(i); }, []);
  const h = String(Math.floor(secs / 3600)).padStart(2, "0");
  const m = String(Math.floor((secs % 3600) / 60)).padStart(2, "0");
  const s = String(secs % 60).padStart(2, "0");
  return (
    <View className="flex-row gap-3 mt-3">
      {[{ val: h, label: "HRS" }, { val: m, label: "MINS" }, { val: s, label: "SECS" }].map((t) => (
        <View key={t.label} className="bg-[rgba(255,255,255,0.2)] rounded-xl px-4 py-2 items-center min-w-[60px]">
          <Text className="text-2xl font-extrabold text-white">{t.val}</Text>
          <Text className="text-[10px] font-bold text-[rgba(255,255,255,0.7)]">{t.label}</Text>
        </View>
      ))}
    </View>
  );
}

export default function PartnerCravingsScreen() {
  const { userName } = useApp();
  const [heroLevel] = useState(12);
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progressAnim, { toValue: 0.6, duration: 1200, useNativeDriver: false }).start();
  }, [progressAnim]);

  return (
    <View className="flex-1 bg-[#fdf8fa] pt-12">
      {/* Top Bar */}
      <View className="flex-row items-center justify-between px-4 pb-2">
        <View className="flex-row items-center gap-3">
          <View className="w-11 h-11 rounded-full bg-[#fce7f3] items-center justify-center">
            <Text className="text-lg font-bold text-[#ee2b8c]">{userName.charAt(0)}</Text>
          </View>
          <View>
            <Text className="text-lg font-bold text-[#181114]">{userName}{"'"}s Cravings</Text>
            <Text className="text-xs font-bold text-[#ee2b8c] tracking-widest">PARTNER SUPPORT MODE</Text>
          </View>
        </View>
        <TouchableOpacity><MaterialIcons name="favorite" size={24} color="#ee2b8c" /></TouchableOpacity>
      </View>

      <ScrollView className="px-4" showsVerticalScrollIndicator={false}>
        {/* Urgent Mission Card */}
        <View className="bg-[#facc15] rounded-3xl p-5 mt-4 overflow-hidden">
          <View className="flex-row items-center gap-2 mb-2">
            <MaterialIcons name="warning" size={18} color="#181114" />
            <Text className="text-xs font-bold text-[#181114] tracking-widest">CRITICAL MISSION #1</Text>
          </View>
          <Text className="text-2xl font-extrabold text-[#181114]">{urgentCraving.name}</Text>
          <Text className="text-sm text-[rgba(24,17,20,0.7)] mt-1">{urgentCraving.sensitivity}</Text>
          <CountdownTimer />
          <TouchableOpacity className="bg-white rounded-full flex-row items-center justify-center gap-2 py-3 mt-4">
            <MaterialIcons name="directions-run" size={20} color="#ee2b8c" />
            <Text className="text-base font-bold text-[#ee2b8c]">{"I'M ON IT!"}</Text>
          </TouchableOpacity>
        </View>

        {/* Active Cravings */}
        <View className="flex-row justify-between items-center mt-8 mb-4">
          <Text className="text-xl font-bold text-[#181114]">Active Cravings</Text>
          <View className="flex-row gap-1">
            {[0, 1, 2].map((i) => (
              <View key={i} className={`w-2 h-2 rounded-full ${i === 0 ? "bg-[#ee2b8c]" : "bg-[rgba(238,43,140,0.3)]"}`} />
            ))}
          </View>
        </View>

        {activeCravings.map((c) => (
          <View key={c.id} className="bg-white rounded-3xl mb-4 overflow-hidden border border-[#e6dbe0]">
            <View className="w-full h-44 items-center justify-center" style={{ backgroundColor: `${c.color}20` }}>
              <MaterialIcons name={c.icon as any} size={56} color={c.color} />
            </View>
            <View className="p-4">
              <View className="flex-row items-center justify-between">
                <Text className="text-xs font-bold text-[#ee2b8c] tracking-widest">{c.category}</Text>
                <MaterialIcons name={c.icon as any} size={20} color="#8c5f75" />
              </View>
              <Text className="text-xl font-extrabold text-[#181114] mt-1">{c.name}</Text>
              <Text className="text-sm text-[#8c5f75] mt-2 leading-5 italic">{c.quote}</Text>
              <TouchableOpacity className="bg-[#ee2b8c] rounded-full flex-row items-center justify-center gap-2 py-3 mt-4">
                <MaterialIcons name="send" size={18} color="#fff" />
                <Text className="text-base font-bold text-white">ON MY WAY!</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        {/* Hero Score */}
        <View className="bg-[#ee2b8c] rounded-3xl p-5 mt-4 mb-10">
          <Text className="text-sm font-bold text-[rgba(255,255,255,0.8)] tracking-widest">YOUR HERO SCORE</Text>
          <View className="flex-row items-baseline gap-1 mt-2">
            <Text className="text-5xl font-extrabold text-white">{heroLevel}</Text>
            <Text className="text-lg font-semibold text-[rgba(255,255,255,0.7)]">/20</Text>
          </View>
          <View className="h-2 rounded bg-[rgba(255,255,255,0.2)] mt-3 overflow-hidden">
            <Animated.View
              className="h-full rounded bg-white"
              style={{ width: progressAnim.interpolate({ inputRange: [0, 1], outputRange: ["0%", "100%"] }) }}
            />
          </View>
          <Text className="text-xs text-[rgba(255,255,255,0.7)] mt-2">Keep fulfilling cravings to level up!</Text>
        </View>
      </ScrollView>
    </View>
  );
}
