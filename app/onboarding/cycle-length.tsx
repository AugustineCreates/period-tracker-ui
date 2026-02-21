import React, { useState } from "react";
import { View, Text, Platform } from "react-native";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { Header } from "@/components/ui/Header";
import { ProgressDots } from "@/components/ui/ProgressDots";
import { Button } from "@/components/ui/Button";
import { useApp } from "@/context/AppContext";

export default function CycleLengthScreen() {
  const router = useRouter();
  const { setOnboardingData, onboardingData } = useApp();
  const [cycleLength, setCycleLength] = useState(onboardingData.cycleLength || 28);

  const pct = ((cycleLength - 21) / (45 - 21)) * 100;

  const handleContinue = () => {
    setOnboardingData({ cycleLength });
    router.push("/onboarding/notifications");
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fdf8fa", paddingTop: 48 }}>
      <Header showBack />
      <View style={{ alignItems: "center", marginTop: -40, marginBottom: 8 }}>
        <Text style={{ fontSize: 10, fontWeight: "600", color: "#8c5f75", textTransform: "uppercase", letterSpacing: 2 }}>
          Personalization
        </Text>
      </View>
      <ProgressDots total={5} current={3} />

      <View style={{ flex: 1, paddingHorizontal: 24 }}>
        <Text style={{ fontSize: 28, fontWeight: "700", color: "#181114", textAlign: "center", paddingTop: 24, letterSpacing: -0.5 }}>
          How long is your cycle usually?
        </Text>
        <Text style={{ fontSize: 16, color: "rgba(24,17,20,0.7)", textAlign: "center", marginTop: 8, lineHeight: 24, paddingHorizontal: 16 }}>
          Knowing your cycle length helps us predict your fertile window and next period accurately.
        </Text>

        {/* Value Display */}
        <View style={{ alignItems: "center", justifyContent: "center", paddingVertical: 48 }}>
          <View style={{
            backgroundColor: "#fff",
            borderRadius: 16,
            paddingHorizontal: 40,
            paddingVertical: 24,
            alignItems: "center",
            borderWidth: 1,
            borderColor: "#f0e8ec",
            shadowColor: "#ee2b8c",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.05,
            shadowRadius: 10,
            elevation: 4,
          }}>
            <Text style={{ fontSize: 48, fontWeight: "700", color: "#ee2b8c", letterSpacing: -1 }}>{cycleLength}</Text>
            <Text style={{ fontSize: 18, fontWeight: "600", color: "#8c5f75", textTransform: "uppercase", letterSpacing: 3 }}>Days</Text>
          </View>
        </View>

        {/* Custom Slider */}
        <View style={{ paddingHorizontal: 16, position: "relative" }}>
          <View style={{ height: 8, backgroundColor: "#e6dbe0", borderRadius: 999, position: "relative" }}>
            <View style={{ position: "absolute", left: 0, top: 0, height: 8, backgroundColor: "#ee2b8c", borderRadius: 999, width: `${pct}%` as any }} />
            <View
              style={{ position: "absolute", top: -12, width: 32, height: 32, borderRadius: 16, backgroundColor: "#ee2b8c", left: `${pct}%` as any, marginLeft: -16 }}
            />
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 16 }}>
            <Text style={{ fontSize: 10, color: "rgba(24,17,20,0.4)", fontWeight: "500" }}>21 Days</Text>
            <Text style={{ fontSize: 10, color: "rgba(24,17,20,0.4)", fontWeight: "500" }}>30 Days</Text>
            <Text style={{ fontSize: 10, color: "rgba(24,17,20,0.4)", fontWeight: "500" }}>45 Days</Text>
          </View>
          {Platform.OS === "web" && (
            <input
              type="range"
              min={21}
              max={45}
              value={cycleLength}
              onChange={(e: any) => setCycleLength(Number(e.target.value))}
              style={{ position: "absolute", top: 0, left: 0, right: 0, height: 40, opacity: 0, cursor: "pointer" }}
            />
          )}
        </View>

        <Text style={{ fontSize: 12, color: "rgba(24,17,20,0.5)", fontStyle: "italic", textAlign: "center", marginTop: 32 }}>
          {"Don't worry, you can always change this later in settings."}
        </Text>
      </View>

      <View style={{ paddingHorizontal: 24, paddingBottom: 40 }}>
        <Button
          title="Continue"
          onPress={handleContinue}
          icon={<MaterialIcons name="arrow-forward" size={20} color="#fff" />}
        />
      </View>
    </View>
  );
}
