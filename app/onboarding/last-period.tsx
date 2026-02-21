import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { Header } from "@/components/ui/Header";
import { ProgressDots } from "@/components/ui/ProgressDots";
import { Button } from "@/components/ui/Button";
import { ToggleSwitch } from "@/components/ui/ToggleSwitch";
import { useApp } from "@/context/AppContext";
import { getMonthDays } from "@/utils/cycle";

const DAYS = ["S", "M", "T", "W", "T", "F", "S"];

export default function LastPeriodScreen() {
  const router = useRouter();
  const { setOnboardingData } = useApp();
  const [selectedDay, setSelectedDay] = useState<number | null>(5);
  const [dontRemember, setDontRemember] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const { firstDay, daysInMonth } = getMonthDays(currentYear, currentMonth);

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  const prevMonth = () => {
    if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(currentYear - 1); }
    else setCurrentMonth(currentMonth - 1);
    setSelectedDay(null);
  };

  const nextMonth = () => {
    if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(currentYear + 1); }
    else setCurrentMonth(currentMonth + 1);
    setSelectedDay(null);
  };

  const handleNext = () => {
    if (selectedDay && !dontRemember) {
      const date = new Date(currentYear, currentMonth, selectedDay);
      setOnboardingData({ lastPeriodDate: date.toISOString().split("T")[0] });
    }
    router.push("/onboarding/select-goal");
  };

  return (
    <View className="flex-1 bg-[#fdf8fa] pt-12">
      <Header showBack stepText="Step 2 of 5" />
      <ProgressDots total={5} current={1} />

      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        <Text className="text-[28px] font-bold text-[#181114] text-center pt-8 tracking-tight">
          When did your last period start?
        </Text>
        <Text className="text-base text-[rgba(24,17,20,0.6)] text-center mt-3 leading-6">
          Select the first day of your most recent cycle to help us track your health.
        </Text>

        {/* Calendar */}
        <View className="bg-[rgba(252,231,243,0.5)] rounded-2xl p-4 mt-6 border border-[#f0e8ec]">
          <View className="flex-row items-center justify-between mb-4">
            <TouchableOpacity onPress={prevMonth} className="p-2">
              <MaterialIcons name="chevron-left" size={28} color="#ee2b8c" />
            </TouchableOpacity>
            <Text className="text-lg font-bold text-[#181114]">
              {monthNames[currentMonth]} {currentYear}
            </Text>
            <TouchableOpacity onPress={nextMonth} className="p-2">
              <MaterialIcons name="chevron-right" size={28} color="#ee2b8c" />
            </TouchableOpacity>
          </View>

          <View className="flex-row mb-2">
            {DAYS.map((d, i) => (
              <Text key={i} className="flex-1 text-center text-xs font-bold text-[rgba(24,17,20,0.4)] tracking-widest">
                {d}
              </Text>
            ))}
          </View>

          <View className="flex-row flex-wrap">
            {Array.from({ length: firstDay }).map((_, i) => (
              <View key={`e-${i}`} style={{ width: "14.28%", height: 48 } as any} className="items-center justify-center" />
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const isSelected = selectedDay === day && !dontRemember;
              return (
                <TouchableOpacity
                  key={day}
                  style={{ width: "14.28%", height: 48 } as any}
                  className="items-center justify-center"
                  onPress={() => { setSelectedDay(day); setDontRemember(false); }}
                >
                  <View
                    className={`w-10 h-10 rounded-full items-center justify-center ${
                      isSelected ? "bg-[#ee2b8c]" : ""
                    }`}
                    style={isSelected ? { shadowColor: "#ee2b8c", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.4, shadowRadius: 8, elevation: 6 } : undefined}
                  >
                    <Text className={`text-sm font-medium ${isSelected ? "text-white" : "text-[#181114]"}`}>
                      {day}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Don't remember */}
        <View className="flex-row items-center justify-between bg-[rgba(252,231,243,0.5)] rounded-2xl px-6 py-4 mt-8 border border-[rgba(252,231,243,0.5)]">
          <View className="flex-row items-center gap-3">
            <MaterialIcons name="help-outline" size={22} color="rgba(238,43,140,0.6)" />
            <Text className="text-base font-medium text-[#181114]">{"I don't remember"}</Text>
          </View>
          <ToggleSwitch value={dontRemember} onToggle={setDontRemember} />
        </View>
      </ScrollView>

      <View className="px-6 pb-10">
        <Button
          title="Next"
          onPress={handleNext}
          icon={<MaterialIcons name="arrow-forward" size={20} color="#fff" />}
        />
      </View>
    </View>
  );
}
