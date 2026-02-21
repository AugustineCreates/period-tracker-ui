import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { Header } from "@/components/ui/Header";
import { ProgressDots } from "@/components/ui/ProgressDots";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { IconCircle } from "@/components/ui/IconCircle";
import { useApp } from "@/context/AppContext";
import type { GoalOption, AppGoal } from "@/types/interfaces";

const goals: GoalOption[] = [
  { id: "track_cycle", title: "Track Cycle", subtitle: "Understand your rhythm", icon: "local-florist" },
  { id: "plan_pregnancy", title: "Plan Pregnancy", subtitle: "Find your fertile window", icon: "child-care" },
  { id: "health_insights", title: "Health Insights", subtitle: "Deep dive into symptoms", icon: "auto-awesome" },
];

export default function SelectGoalScreen() {
  const router = useRouter();
  const { setOnboardingData, onboardingData } = useApp();
  const [selected, setSelected] = useState<AppGoal | null>(onboardingData.goal || "track_cycle");

  const handleContinue = () => {
    setOnboardingData({ goal: selected });
    router.push("/onboarding/cycle-length");
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fdf8fa", paddingTop: 48 }}>
      <Header showBack stepText="Step 3 of 5" />
      <ProgressDots total={5} current={2} />

      <ScrollView style={{ flex: 1, paddingHorizontal: 16 }} showsVerticalScrollIndicator={false}>
        <Text style={{ fontSize: 28, fontWeight: "700", color: "#181114", textAlign: "center", paddingTop: 32, letterSpacing: -0.5 }}>
          {"What's your goal?"}
        </Text>
        <Text style={{ fontSize: 16, color: "#896175", textAlign: "center", marginTop: 8, paddingHorizontal: 32 }}>
          {"We'll customize your experience based on your needs."}
        </Text>

        <View style={{ gap: 16, marginTop: 32 }}>
          {goals.map((goal) => (
            <TouchableOpacity key={goal.id} onPress={() => setSelected(goal.id)} activeOpacity={0.8}>
              <Card selected={selected === goal.id}>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
                  <View style={{ flex: 1, gap: 4 }}>
                    <Text style={{ fontSize: 18, fontWeight: "700", color: "#181114" }}>{goal.title}</Text>
                    <Text style={{ fontSize: 14, color: "#896175" }}>{goal.subtitle}</Text>
                  </View>
                  <IconCircle name={goal.icon as keyof typeof MaterialIcons.glyphMap} />
                </View>
              </Card>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={{ paddingHorizontal: 24, paddingBottom: 40 }}>
        <Button title="Continue" onPress={handleContinue} />
      </View>
    </View>
  );
}
