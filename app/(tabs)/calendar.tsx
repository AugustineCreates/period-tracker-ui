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

  const renderDay = (day: number) => {
    const period = isPeriodDay(day, cMonth, cYear, lastPeriod, cycleLen);
    const fertile = isFertileDay(day, cMonth, cYear, lastPeriod, cycleLen);
    const ovul = isOvulationDay(day, cMonth, cYear, lastPeriod, cycleLen);
    const predicted = isPredictedPeriod(day, cMonth, cYear, lastPeriod, cycleLen);
    const td = isTd(day);

    if (period) return (
      <TouchableOpacity key={day} className="items-center justify-center bg-[#fce7f3]" style={{ width: "14.28%", height: 48 } as any} onPress={() => setSelDay(day)}>
        <View className="w-9 h-9 rounded-full bg-[#ee2b8c] items-center justify-center">
          <Text className="text-sm font-bold text-white">{day}</Text>
        </View>
      </TouchableOpacity>
    );
    if (predicted) return (
      <TouchableOpacity key={day} className="items-center justify-center" style={{ width: "14.28%", height: 48 } as any} onPress={() => setSelDay(day)}>
        <View className="w-8 h-8 rounded-full border-2 border-dashed border-[rgba(140,95,117,0.4)] items-center justify-center">
          <Text className="text-sm font-semibold text-[#8c5f75]">{day}</Text>
        </View>
      </TouchableOpacity>
    );
    if (fertile) return (
      <TouchableOpacity key={day} className="items-center justify-center bg-[#e8f5e9]" style={{ width: "14.28%", height: 48 } as any} onPress={() => setSelDay(day)}>
        <Text className="text-sm font-semibold text-[#ee2b8c]">{day}</Text>
        {ovul && <MaterialIcons name="favorite" size={8} color="#ee2b8c" style={{ position: "absolute", bottom: 4 }} />}
      </TouchableOpacity>
    );
    if (td) return (
      <TouchableOpacity key={day} className="items-center justify-center border-2 border-[#ee2b8c] rounded-xl" style={{ width: "14.28%", height: 48 } as any} onPress={() => setSelDay(day)}>
        <View className="w-9 h-9 rounded-full bg-black items-center justify-center">
          <Text className="text-sm font-bold text-white">{day}</Text>
        </View>
      </TouchableOpacity>
    );
    return (
      <TouchableOpacity key={day} className="items-center justify-center" style={{ width: "14.28%", height: 48 } as any} onPress={() => setSelDay(day)}>
        <Text className={`text-sm font-semibold ${selDay === day ? "text-[#ee2b8c]" : "text-[#181114]"}`}>{day}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View className="flex-1 bg-[#fdf8fa]">
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 pt-14 pb-4 bg-[rgba(255,255,255,0.8)]">
        <TouchableOpacity className="w-10 h-10 rounded-full items-center justify-center" onPress={prev}>
          <MaterialIcons name="chevron-left" size={24} color="#181114" />
        </TouchableOpacity>
        <View className="items-center">
          <Text className="text-lg font-extrabold text-[#181114] tracking-tight">{MONTHS[cMonth]} {cYear}</Text>
          <Text className="text-[10px] font-bold text-[#ee2b8c] tracking-widest">{getPhaseLabel(phase).toUpperCase()}</Text>
        </View>
        <TouchableOpacity
          className="w-10 h-10 rounded-full bg-[#ee2b8c] items-center justify-center"
          style={{ shadowColor: "#ee2b8c", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 6 }}
          onPress={next}
        >
          <MaterialIcons name="add" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView className="px-4" contentContainerStyle={{ paddingBottom: 128 }} showsVerticalScrollIndicator={false}>
        {/* Calendar */}
        <View className="bg-white rounded-3xl p-4 shadow-sm border border-[#e6dbe0]">
          <View className="flex-row mb-2">
            {DAYS.map((d, i) => (
              <Text key={i} className="flex-1 text-center text-[11px] font-bold text-[rgba(0,0,0,0.3)] uppercase">{d}</Text>
            ))}
          </View>
          <View className="flex-row flex-wrap">
            {Array.from({ length: firstDay }).map((_, i) => <View key={`e-${i}`} style={{ width: "14.28%", height: 48 } as any} />)}
            {Array.from({ length: daysInMonth }).map((_, i) => renderDay(i + 1))}
          </View>
          {/* Legend */}
          <View className="flex-row gap-4 pt-4 mt-4 border-t border-[rgba(0,0,0,0.05)]">
            <View className="flex-row items-center gap-1.5">
              <View className="w-2.5 h-2.5 rounded-full bg-[#ee2b8c]" />
              <Text className="text-[10px] font-medium text-[rgba(0,0,0,0.4)] tracking-widest">PERIOD</Text>
            </View>
            <View className="flex-row items-center gap-1.5">
              <View className="w-2.5 h-2.5 rounded-full bg-[#e8f5e9]" />
              <Text className="text-[10px] font-medium text-[rgba(0,0,0,0.4)] tracking-widest">FERTILE</Text>
            </View>
            <View className="flex-row items-center gap-1.5">
              <View className="w-2.5 h-2.5 rounded-full border-[1.5px] border-dashed border-[rgba(140,95,117,0.4)]" />
              <Text className="text-[10px] font-medium text-[rgba(0,0,0,0.4)] tracking-widest">PREDICTED</Text>
            </View>
          </View>
        </View>

        {/* Detail */}
        <View className="mt-4 gap-4">
          <View className="flex-row justify-between items-center">
            <Text className="text-lg font-extrabold text-[#181114] tracking-tight">
              Today, {MONTHS[cMonth].slice(0, 3)} {selDay}
            </Text>
            <TouchableOpacity className="bg-[#fce7f3] px-3 py-1.5 rounded-full">
              <Text className="text-[10px] font-bold text-[#ee2b8c]">Edit Log</Text>
            </TouchableOpacity>
          </View>

          <View className="bg-[#f5f0f2] rounded-3xl p-5 border border-[#f0e8ec]">
            <View className="flex-row gap-4 items-start">
              <View className="w-11 h-11 rounded-xl bg-white items-center justify-center shadow-sm">
                <MaterialIcons name="lightbulb" size={22} color="#ee2b8c" />
              </View>
              <View className="flex-1">
                <Text className="text-sm font-bold text-[#181114] mb-1">{getPhaseLabel(phase)}</Text>
                <Text className="text-xs text-[rgba(0,0,0,0.5)] leading-5">{getPhaseInsight(phase)}</Text>
              </View>
            </View>
          </View>

          {/* Chips */}
          <Text className="text-[11px] font-bold text-[rgba(0,0,0,0.3)] tracking-widest">LOGGED SYMPTOMS</Text>
          <View className="flex-row flex-wrap gap-2">
            {["Headache", "Cramps", "Fatigue"].map((s) => (
              <View key={s} className="flex-row items-center gap-1.5 bg-white rounded-full px-3.5 py-2 border border-[#e6dbe0]">
                <View className="w-2 h-2 rounded-full bg-[#ee2b8c]" />
                <Text className="text-xs font-semibold text-[#181114]">{s}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
