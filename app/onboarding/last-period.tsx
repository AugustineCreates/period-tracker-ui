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
    <View style={{ flex: 1, backgroundColor: "#fdf8fa", paddingTop: 48 }}>
      <Header showBack stepText="Step 2 of 5" />
      <ProgressDots total={5} current={1} />

      <ScrollView style={{ flex: 1, paddingHorizontal: 24 }} showsVerticalScrollIndicator={false}>
        <Text style={{ fontSize: 28, fontWeight: "700", color: "#181114", textAlign: "center", paddingTop: 32, letterSpacing: -0.5 }}>
          When did your last period start?
        </Text>
        <Text style={{ fontSize: 16, color: "rgba(24,17,20,0.6)", textAlign: "center", marginTop: 12, lineHeight: 24 }}>
          Select the first day of your most recent cycle to help us track your health.
        </Text>

        {/* Calendar */}
        <View style={{ backgroundColor: "rgba(252,231,243,0.5)", borderRadius: 16, padding: 16, marginTop: 24, borderWidth: 1, borderColor: "#f0e8ec" }}>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
            <TouchableOpacity onPress={prevMonth} style={{ padding: 8 }}>
              <MaterialIcons name="chevron-left" size={28} color="#ee2b8c" />
            </TouchableOpacity>
            <Text style={{ fontSize: 18, fontWeight: "700", color: "#181114" }}>
              {monthNames[currentMonth]} {currentYear}
            </Text>
            <TouchableOpacity onPress={nextMonth} style={{ padding: 8 }}>
              <MaterialIcons name="chevron-right" size={28} color="#ee2b8c" />
            </TouchableOpacity>
          </View>

          <View style={{ flexDirection: "row", marginBottom: 8 }}>
            {DAYS.map((d, i) => (
              <Text key={i} style={{ flex: 1, textAlign: "center", fontSize: 12, fontWeight: "700", color: "rgba(24,17,20,0.4)", letterSpacing: 2 }}>
                {d}
              </Text>
            ))}
          </View>

          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {Array.from({ length: firstDay }).map((_, i) => (
              <View key={`e-${i}`} style={{ width: "14.28%", height: 48, alignItems: "center", justifyContent: "center" } as any} />
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const isSelected = selectedDay === day && !dontRemember;
              return (
                <TouchableOpacity
                  key={day}
                  style={{ width: "14.28%", height: 48, alignItems: "center", justifyContent: "center" } as any}
                  onPress={() => { setSelectedDay(day); setDontRemember(false); }}
                >
                  <View style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: isSelected ? "#ee2b8c" : "transparent",
                    ...(isSelected ? { shadowColor: "#ee2b8c", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.4, shadowRadius: 8, elevation: 6 } : {}),
                  }}>
                    <Text style={{ fontSize: 14, fontWeight: "500", color: isSelected ? "#fff" : "#181114" }}>
                      {day}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Don't remember */}
        <View style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "rgba(252,231,243,0.5)",
          borderRadius: 16,
          paddingHorizontal: 24,
          paddingVertical: 16,
          marginTop: 32,
          borderWidth: 1,
          borderColor: "rgba(252,231,243,0.5)",
        }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
            <MaterialIcons name="help-outline" size={22} color="rgba(238,43,140,0.6)" />
            <Text style={{ fontSize: 16, fontWeight: "500", color: "#181114" }}>{"I don't remember"}</Text>
          </View>
          <ToggleSwitch value={dontRemember} onToggle={setDontRemember} />
        </View>
      </ScrollView>

      <View style={{ paddingHorizontal: 24, paddingBottom: 40 }}>
        <Button
          title="Next"
          onPress={handleNext}
          icon={<MaterialIcons name="arrow-forward" size={20} color="#fff" />}
        />
      </View>
    </View>
  );
}
