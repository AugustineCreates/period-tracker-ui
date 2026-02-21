import React, { useState, useEffect, useRef } from "react";
import { View, Text, ScrollView, TouchableOpacity, Animated } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Header } from "@/components/ui/Header";
import { useApp } from "@/context/AppContext";

const PINK = "#ee2b8c";
const TEXT = "#181114";
const TEXT2 = "#8c5f75";
const LINE = "#e6dbe0";
const BRAND_LIGHT = "#fce7f3";

interface ActiveCraving {
  id: string;
  category: string;
  name: string;
  quote: string;
  icon: string;
  color: string;
}

const urgentCraving = {
  name: "Dark Chocolate Sea Salt",
  sensitivity: "Peak Craving in...",
};

const activeCravings: ActiveCraving[] = [
  { id: "1", category: "SALTY & SAVORY", name: "Extra Crispy Fries", quote: '"I literally just want something crunchy and covered in salt."', icon: "lunch-dining", color: "#fbbf24" },
  { id: "2", category: "SWEET RELIEF", name: "Mint Choc Chip", quote: '"Feeling a bit overheated, need something cold and sweet."', icon: "icecream", color: "#f9a8d4" },
  { id: "3", category: "SOUR & TANGY", name: "Giant Dill Pickles", quote: '"The vinegar-er the better! Help a girl out?"', icon: "restaurant", color: "#86efac" },
];

function CountdownTimer() {
  const [secs, setSecs] = useState(1122);
  useEffect(() => {
    const i = setInterval(() => setSecs((p) => (p > 0 ? p - 1 : 0)), 1000);
    return () => clearInterval(i);
  }, []);
  const h = String(Math.floor(secs / 3600)).padStart(2, "0");
  const m = String(Math.floor((secs % 3600) / 60)).padStart(2, "0");
  const s = String(secs % 60).padStart(2, "0");
  return (
    <View style={{ flexDirection: "row", gap: 12, marginTop: 12 }}>
      {[
        { val: h, label: "HRS" },
        { val: m, label: "MINS" },
        { val: s, label: "SECS" },
      ].map((t) => (
        <View key={t.label} style={{ backgroundColor: "rgba(255,255,255,0.2)", borderRadius: 12, paddingHorizontal: 16, paddingVertical: 8, alignItems: "center", minWidth: 60 }}>
          <Text style={{ fontSize: 24, fontWeight: "800", color: "#fff" }}>{t.val}</Text>
          <Text style={{ fontSize: 10, fontWeight: "700", color: "rgba(255,255,255,0.7)" }}>{t.label}</Text>
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
    Animated.timing(progressAnim, {
      toValue: 0.6,
      duration: 1200,
      useNativeDriver: false,
    }).start();
  }, [progressAnim]);

  return (
    <View style={{ flex: 1, backgroundColor: "#fdf8fa", paddingTop: 48 }}>
      {/* Top Bar */}
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 16, paddingBottom: 8 }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
          <View style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: BRAND_LIGHT, alignItems: "center", justifyContent: "center" }}>
            <Text style={{ fontSize: 18, fontWeight: "700", color: PINK }}>{userName.charAt(0)}</Text>
          </View>
          <View>
            <Text style={{ fontSize: 18, fontWeight: "700", color: TEXT }}>{userName}{"'"}s Cravings</Text>
            <Text style={{ fontSize: 12, fontWeight: "700", color: PINK, letterSpacing: 2 }}>PARTNER SUPPORT MODE</Text>
          </View>
        </View>
        <TouchableOpacity>
          <MaterialIcons name="favorite" size={24} color={PINK} />
        </TouchableOpacity>
      </View>

      <ScrollView style={{ paddingHorizontal: 16 }} showsVerticalScrollIndicator={false}>
        {/* Urgent Mission Card */}
        <View style={{ backgroundColor: "#facc15", borderRadius: 24, padding: 20, marginTop: 16, overflow: "hidden" }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <MaterialIcons name="warning" size={18} color={TEXT} />
            <Text style={{ fontSize: 12, fontWeight: "700", color: TEXT, letterSpacing: 3 }}>CRITICAL MISSION #1</Text>
          </View>
          <Text style={{ fontSize: 24, fontWeight: "800", color: TEXT }}>{urgentCraving.name}</Text>
          <Text style={{ fontSize: 14, color: "rgba(24,17,20,0.7)", marginTop: 4 }}>{urgentCraving.sensitivity}</Text>
          <CountdownTimer />
          <TouchableOpacity style={{ backgroundColor: "#fff", borderRadius: 999, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, paddingVertical: 12, marginTop: 16 }}>
            <MaterialIcons name="directions-run" size={20} color={PINK} />
            <Text style={{ fontSize: 16, fontWeight: "700", color: PINK }}>{"I'M ON IT!"}</Text>
          </TouchableOpacity>
        </View>

        {/* Active Cravings */}
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 32, marginBottom: 16 }}>
          <Text style={{ fontSize: 20, fontWeight: "700", color: TEXT }}>Active Cravings</Text>
          <View style={{ flexDirection: "row", gap: 4 }}>
            {[0, 1, 2].map((i) => (
              <View key={i} style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: i === 0 ? PINK : "rgba(238,43,140,0.3)" }} />
            ))}
          </View>
        </View>

        {activeCravings.map((c) => (
          <View key={c.id} style={{ backgroundColor: "#fff", borderRadius: 24, marginBottom: 16, overflow: "hidden", borderWidth: 1, borderColor: LINE }}>
            <View style={{ width: "100%", height: 176, alignItems: "center", justifyContent: "center", backgroundColor: `${c.color}20` }}>
              <MaterialIcons name={c.icon as any} size={56} color={c.color} />
            </View>
            <View style={{ padding: 16 }}>
              <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                <Text style={{ fontSize: 12, fontWeight: "700", color: PINK, letterSpacing: 2 }}>{c.category}</Text>
                <MaterialIcons name={c.icon as any} size={20} color={TEXT2} />
              </View>
              <Text style={{ fontSize: 20, fontWeight: "800", color: TEXT, marginTop: 4 }}>{c.name}</Text>
              <Text style={{ fontSize: 14, color: TEXT2, marginTop: 8, lineHeight: 20, fontStyle: "italic" }}>{c.quote}</Text>
              <TouchableOpacity style={{ backgroundColor: PINK, borderRadius: 999, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, paddingVertical: 12, marginTop: 16 }}>
                <MaterialIcons name="send" size={18} color="#fff" />
                <Text style={{ fontSize: 16, fontWeight: "700", color: "#fff" }}>ON MY WAY!</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        {/* Hero Score */}
        <View style={{ backgroundColor: PINK, borderRadius: 24, padding: 20, marginTop: 16, marginBottom: 40 }}>
          <Text style={{ fontSize: 14, fontWeight: "700", color: "rgba(255,255,255,0.8)", letterSpacing: 3 }}>YOUR HERO SCORE</Text>
          <View style={{ flexDirection: "row", alignItems: "baseline", gap: 4, marginTop: 8 }}>
            <Text style={{ fontSize: 48, fontWeight: "800", color: "#fff" }}>{heroLevel}</Text>
            <Text style={{ fontSize: 18, fontWeight: "600", color: "rgba(255,255,255,0.7)" }}>/20</Text>
          </View>
          <View style={{ height: 8, borderRadius: 4, backgroundColor: "rgba(255,255,255,0.2)", marginTop: 12, overflow: "hidden" }}>
            <Animated.View style={{ height: "100%", borderRadius: 4, backgroundColor: "#fff", width: progressAnim.interpolate({ inputRange: [0, 1], outputRange: ["0%", "100%"] }) }} />
          </View>
          <Text style={{ fontSize: 12, color: "rgba(255,255,255,0.7)", marginTop: 8 }}>Keep fulfilling cravings to level up!</Text>
        </View>
      </ScrollView>
    </View>
  );
}
