import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useApp } from "@/context/AppContext";
import {
  getMonthDays, getCycleDay, getCyclePhase, getPhaseLabel,
  getPhaseInsight, isPeriodDay, isFertileDay, isOvulationDay, isPredictedPeriod,
} from "@/utils/cycle";

const DAYS = ["S", "M", "T", "W", "T", "F", "S"];
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

const PINK = "#ee2b8c";
const BG = "#fdf8fa";
const TEXT = "#181114";
const TEXT2 = "#8c5f75";
const BRAND_LIGHT = "#fce7f3";
const SOFT = "#f5f0f2";
const LINE = "#e6dbe0";
const FERTILE_BG = "#e8f5e9";

export default function CalendarScreen() {
  const { onboardingData } = useApp();
  const lastPeriod = onboardingData.lastPeriodDate || new Date().toISOString().split("T")[0];
  const cycleLen = onboardingData.cycleLength || 28;
  const today = new Date();
  const [cMonth, setCMonth] = useState(today.getMonth());
  const [cYear, setCYear] = useState(today.getFullYear());
  const [selDay, setSelDay] = useState(today.getDate());

  const { firstDay, daysInMonth } = getMonthDays(cYear, cMonth);
  const cycleDay = getCycleDay(lastPeriod, cycleLen);
  const phase = getCyclePhase(cycleDay, cycleLen);

  const prev = () => { if (cMonth === 0) { setCMonth(11); setCYear(cYear - 1); } else setCMonth(cMonth - 1); };
  const next = () => { if (cMonth === 11) { setCMonth(0); setCYear(cYear + 1); } else setCMonth(cMonth + 1); };
  const isTd = (d: number) => d === today.getDate() && cMonth === today.getMonth() && cYear === today.getFullYear();

  const cellBase: any = { width: "14.28%", height: 48, alignItems: "center", justifyContent: "center" };

  const renderDay = (day: number) => {
    const period = isPeriodDay(day, cMonth, cYear, lastPeriod, cycleLen);
    const fertile = isFertileDay(day, cMonth, cYear, lastPeriod, cycleLen);
    const ovul = isOvulationDay(day, cMonth, cYear, lastPeriod, cycleLen);
    const predicted = isPredictedPeriod(day, cMonth, cYear, lastPeriod, cycleLen);
    const td = isTd(day);

    if (period) return (
      <TouchableOpacity key={day} style={{ ...cellBase, backgroundColor: BRAND_LIGHT }} onPress={() => setSelDay(day)}>
        <View style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: PINK, alignItems: "center", justifyContent: "center" }}>
          <Text style={{ fontSize: 14, fontWeight: "700", color: "#fff" }}>{day}</Text>
        </View>
      </TouchableOpacity>
    );
    if (predicted) return (
      <TouchableOpacity key={day} style={cellBase} onPress={() => setSelDay(day)}>
        <View style={{ width: 32, height: 32, borderRadius: 16, borderWidth: 2, borderStyle: "dashed", borderColor: "rgba(140,95,117,0.4)", alignItems: "center", justifyContent: "center" }}>
          <Text style={{ fontSize: 14, fontWeight: "600", color: TEXT2 }}>{day}</Text>
        </View>
      </TouchableOpacity>
    );
    if (fertile) return (
      <TouchableOpacity key={day} style={{ ...cellBase, backgroundColor: FERTILE_BG }} onPress={() => setSelDay(day)}>
        <Text style={{ fontSize: 14, fontWeight: "600", color: PINK }}>{day}</Text>
        {ovul && <MaterialIcons name="favorite" size={8} color={PINK} style={{ position: "absolute", bottom: 4 }} />}
      </TouchableOpacity>
    );
    if (td) return (
      <TouchableOpacity key={day} style={{ ...cellBase, borderWidth: 2, borderColor: PINK, borderRadius: 12 }} onPress={() => setSelDay(day)}>
        <View style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: "#000", alignItems: "center", justifyContent: "center" }}>
          <Text style={{ fontSize: 14, fontWeight: "700", color: "#fff" }}>{day}</Text>
        </View>
      </TouchableOpacity>
    );
    return (
      <TouchableOpacity key={day} style={cellBase} onPress={() => setSelDay(day)}>
        <Text style={{ fontSize: 14, fontWeight: "600", color: selDay === day ? PINK : TEXT }}>{day}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: BG }}>
      {/* Header */}
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 16, paddingTop: 56, paddingBottom: 16, backgroundColor: "rgba(255,255,255,0.8)" }}>
        <TouchableOpacity style={{ width: 40, height: 40, borderRadius: 20, alignItems: "center", justifyContent: "center" }} onPress={prev}>
          <MaterialIcons name="chevron-left" size={24} color={TEXT} />
        </TouchableOpacity>
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize: 18, fontWeight: "800", color: TEXT, letterSpacing: -0.5 }}>{MONTHS[cMonth]} {cYear}</Text>
          <Text style={{ fontSize: 10, fontWeight: "700", color: PINK, letterSpacing: 3 }}>{getPhaseLabel(phase).toUpperCase()}</Text>
        </View>
        <TouchableOpacity style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: PINK, alignItems: "center", justifyContent: "center", shadowColor: PINK, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 6 }} onPress={next}>
          <MaterialIcons name="add" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView style={{ paddingHorizontal: 16 }} contentContainerStyle={{ paddingBottom: 128 }} showsVerticalScrollIndicator={false}>
        {/* Calendar */}
        <View style={{ backgroundColor: "#fff", borderRadius: 24, padding: 16, shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 1, borderWidth: 1, borderColor: LINE }}>
          <View style={{ flexDirection: "row", marginBottom: 8 }}>
            {DAYS.map((d, i) => (
              <Text key={i} style={{ flex: 1, textAlign: "center", fontSize: 11, fontWeight: "700", color: "rgba(0,0,0,0.3)", textTransform: "uppercase" }}>{d}</Text>
            ))}
          </View>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {Array.from({ length: firstDay }).map((_, i) => <View key={`e-${i}`} style={{ width: "14.28%", height: 48 } as any} />)}
            {Array.from({ length: daysInMonth }).map((_, i) => renderDay(i + 1))}
          </View>
          {/* Legend */}
          <View style={{ flexDirection: "row", gap: 16, paddingTop: 16, marginTop: 16, borderTopWidth: 1, borderTopColor: "rgba(0,0,0,0.05)" }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
              <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: PINK }} />
              <Text style={{ fontSize: 10, fontWeight: "500", color: "rgba(0,0,0,0.4)", letterSpacing: 2 }}>PERIOD</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
              <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: FERTILE_BG }} />
              <Text style={{ fontSize: 10, fontWeight: "500", color: "rgba(0,0,0,0.4)", letterSpacing: 2 }}>FERTILE</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
              <View style={{ width: 10, height: 10, borderRadius: 5, borderWidth: 1.5, borderStyle: "dashed", borderColor: "rgba(140,95,117,0.4)" }} />
              <Text style={{ fontSize: 10, fontWeight: "500", color: "rgba(0,0,0,0.4)", letterSpacing: 2 }}>PREDICTED</Text>
            </View>
          </View>
        </View>

        {/* Detail */}
        <View style={{ marginTop: 16, gap: 16 }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <Text style={{ fontSize: 18, fontWeight: "800", color: TEXT, letterSpacing: -0.5 }}>
              Today, {MONTHS[cMonth].slice(0, 3)} {selDay}
            </Text>
            <TouchableOpacity style={{ backgroundColor: BRAND_LIGHT, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 999 }}>
              <Text style={{ fontSize: 10, fontWeight: "700", color: PINK }}>Edit Log</Text>
            </TouchableOpacity>
          </View>

          <View style={{ backgroundColor: SOFT, borderRadius: 24, padding: 20, borderWidth: 1, borderColor: "#f0e8ec" }}>
            <View style={{ flexDirection: "row", gap: 16, alignItems: "flex-start" }}>
              <View style={{ width: 44, height: 44, borderRadius: 12, backgroundColor: "#fff", alignItems: "center", justifyContent: "center", shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 1 }}>
                <MaterialIcons name="lightbulb" size={22} color={PINK} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 14, fontWeight: "700", color: TEXT, marginBottom: 4 }}>{getPhaseLabel(phase)}</Text>
                <Text style={{ fontSize: 12, color: "rgba(0,0,0,0.5)", lineHeight: 20 }}>{getPhaseInsight(phase)}</Text>
              </View>
            </View>
          </View>

          {/* Chips */}
          <Text style={{ fontSize: 11, fontWeight: "700", color: "rgba(0,0,0,0.3)", letterSpacing: 3 }}>LOGGED SYMPTOMS</Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
            {["Headache", "Cramps", "Fatigue"].map((s) => (
              <View key={s} style={{ flexDirection: "row", alignItems: "center", gap: 6, backgroundColor: "#fff", borderRadius: 999, paddingHorizontal: 14, paddingVertical: 8, borderWidth: 1, borderColor: LINE }}>
                <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: PINK }} />
                <Text style={{ fontSize: 12, fontWeight: "600", color: TEXT }}>{s}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
