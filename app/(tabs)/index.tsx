import React from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { useApp } from "@/context/AppContext";
import {
  getCycleDay,
  getCyclePhase,
  getPhaseLabel,
  getDaysUntilPeriod,
  getCycleProgress,
  getPhaseInsight,
} from "@/utils/cycle";

const PINK = "#ee2b8c";
const PINK_10 = "rgba(238, 43, 140, 0.1)";
const PINK_20 = "rgba(238, 43, 140, 0.2)";
const BG = "#fcf8fa";
const TEXT_PRIMARY = "#181114";
const TEXT_SECONDARY = "#8c5f75";
const CARD_BG = "#ffffff";
const INSIGHT_BG = "#f5f0f2";
const PROGRESS_TRACK = "#e6dbe0";
const BORDER_PINK = "#fce7f3";

export default function HomeScreen() {
  const router = useRouter();
  const { userName, onboardingData } = useApp();
  const lastPeriod =
    onboardingData.lastPeriodDate || new Date().toISOString().split("T")[0];
  const cycleLength = onboardingData.cycleLength || 28;
  const cycleDay = getCycleDay(lastPeriod, cycleLength);
  const phase = getCyclePhase(cycleDay, cycleLength);
  const daysUntil = getDaysUntilPeriod(cycleDay, cycleLength);
  const progress = getCycleProgress(cycleDay, cycleLength);

  return (
    <View style={{ flex: 1, backgroundColor: BG }}>
      {/* ── Top App Bar ── */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 16,
          paddingTop: 56,
          paddingBottom: 8,
          backgroundColor: "rgba(255,255,255,0.8)",
        }}
      >
        <TouchableOpacity
          style={{ width: 48, height: 48, alignItems: "center", justifyContent: "center" }}
        >
          <MaterialIcons name="menu" size={24} color={TEXT_PRIMARY} />
        </TouchableOpacity>
        <Text
          style={{
            color: TEXT_PRIMARY,
            fontSize: 18,
            fontWeight: "700",
            letterSpacing: -0.3,
            textAlign: "center",
            flex: 1,
          }}
        >
          Good morning, {userName}
        </Text>
        <TouchableOpacity
          style={{ width: 48, height: 48, alignItems: "center", justifyContent: "center" }}
        >
          <MaterialIcons name="notifications-none" size={24} color={TEXT_PRIMARY} />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {/* ── Central Cycle Indicator ── */}
        <View style={{ alignItems: "center", justifyContent: "center", paddingVertical: 32, paddingHorizontal: 16 }}>
          {/* Large Circular Indicator */}
          <View style={{ width: 288, height: 288, alignItems: "center", justifyContent: "center" }}>
            {/* Outer Ring */}
            <View
              style={{
                ...StyleSheet.absoluteFillObject,
                borderRadius: 144,
                borderWidth: 14,
                borderColor: PINK_20,
              }}
            />
            {/* Inner White Circle */}
            <View
              style={{
                width: 260,
                height: 260,
                borderRadius: 130,
                backgroundColor: CARD_BG,
                alignItems: "center",
                justifyContent: "center",
                borderWidth: 4,
                borderColor: CARD_BG,
                shadowColor: PINK,
                shadowOffset: { width: 0, height: 10 },
                shadowOpacity: 0.1,
                shadowRadius: 25,
                elevation: 8,
              }}
            >
              <Text
                style={{
                  color: PINK,
                  fontSize: 12,
                  fontWeight: "700",
                  letterSpacing: 3,
                  textTransform: "uppercase",
                  marginBottom: 4,
                }}
              >
                {getPhaseLabel(phase)}
              </Text>
              <Text
                style={{
                  fontSize: 56,
                  fontWeight: "800",
                  color: TEXT_PRIMARY,
                  lineHeight: 62,
                }}
              >
                Day {cycleDay}
              </Text>
              <Text
                style={{
                  color: TEXT_SECONDARY,
                  fontSize: 14,
                  fontWeight: "500",
                  marginTop: 8,
                }}
              >
                Period in {daysUntil} days
              </Text>
            </View>
          </View>
        </View>

        {/* ── Progress Bar Card ── */}
        <View
          style={{
            backgroundColor: CARD_BG,
            borderRadius: 16,
            padding: 16,
            marginHorizontal: 16,
            marginBottom: 24,
            shadowColor: PINK,
            shadowOffset: { width: 0, height: 10 },
            shadowOpacity: 0.1,
            shadowRadius: 25,
            elevation: 4,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 12,
            }}
          >
            <Text style={{ color: TEXT_PRIMARY, fontSize: 16, fontWeight: "500" }}>
              Cycle Progress
            </Text>
            <Text
              style={{
                color: PINK,
                fontSize: 14,
                fontWeight: "700",
                textTransform: "uppercase",
              }}
            >
              {progress}%
            </Text>
          </View>
          <View
            style={{
              height: 12,
              borderRadius: 999,
              backgroundColor: PROGRESS_TRACK,
              overflow: "hidden",
            }}
          >
            <View
              style={{
                height: "100%",
                borderRadius: 999,
                backgroundColor: PINK,
                width: `${progress}%`,
              }}
            />
          </View>
        </View>

        {/* ── Headline ── */}
        <Text
          style={{
            color: TEXT_PRIMARY,
            fontSize: 24,
            fontWeight: "700",
            textAlign: "center",
            paddingHorizontal: 16,
            marginBottom: 8,
            letterSpacing: -0.3,
          }}
        >
          How are you feeling today?
        </Text>

        {/* ── Quick Action Buttons ── */}
        <View
          style={{
            flexDirection: "row",
            gap: 16,
            paddingHorizontal: 16,
            paddingVertical: 12,
            marginBottom: 24,
          }}
        >
          <TouchableOpacity
            onPress={() => router.push("/(tabs)/log")}
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              height: 56,
              borderRadius: 999,
              backgroundColor: PINK,
            }}
            activeOpacity={0.85}
          >
            <MaterialIcons name="edit-note" size={22} color="#fff" />
            <Text style={{ color: "#fff", fontSize: 16, fontWeight: "700" }}>
              Log symptoms
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              height: 56,
              borderRadius: 999,
              backgroundColor: PINK_10,
            }}
            activeOpacity={0.85}
          >
            <MaterialIcons name="mood" size={22} color={PINK} />
            <Text style={{ color: PINK, fontSize: 16, fontWeight: "700" }}>
              Daily mood
            </Text>
          </TouchableOpacity>
        </View>

        {/* ── Insights Section ── */}
        <View style={{ paddingHorizontal: 16, paddingBottom: 16 }}>
          <Text
            style={{
              color: TEXT_PRIMARY,
              fontSize: 18,
              fontWeight: "700",
              marginBottom: 12,
              paddingHorizontal: 4,
            }}
          >
            Insights for you
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 16, paddingBottom: 16 }}
          >
            {/* Health Insight Card */}
            <View
              style={{
                width: 180,
                backgroundColor: INSIGHT_BG,
                borderRadius: 16,
                padding: 20,
                gap: 8,
                borderWidth: 1,
                borderColor: BORDER_PINK,
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                <MaterialIcons name="favorite" size={20} color={PINK} />
                <Text
                  style={{
                    color: PINK,
                    fontSize: 10,
                    fontWeight: "700",
                    textTransform: "uppercase",
                    letterSpacing: 1.5,
                  }}
                >
                  Health
                </Text>
              </View>
              <Text style={{ color: TEXT_PRIMARY, fontSize: 18, fontWeight: "700", lineHeight: 22 }}>
                High Energy
              </Text>
              <Text style={{ color: TEXT_SECONDARY, fontSize: 12, lineHeight: 16 }}>
                Great day for a workout or starting new projects!
              </Text>
            </View>

            {/* Fertility Insight Card */}
            <View
              style={{
                width: 180,
                backgroundColor: INSIGHT_BG,
                borderRadius: 16,
                padding: 20,
                gap: 8,
                borderWidth: 1,
                borderColor: BORDER_PINK,
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                <MaterialIcons name="child-care" size={20} color={PINK} />
                <Text
                  style={{
                    color: PINK,
                    fontSize: 10,
                    fontWeight: "700",
                    textTransform: "uppercase",
                    letterSpacing: 1.5,
                  }}
                >
                  Fertility
                </Text>
              </View>
              <Text style={{ color: TEXT_PRIMARY, fontSize: 18, fontWeight: "700", lineHeight: 22 }}>
                {phase === "ovulation"
                  ? "Peak"
                  : phase === "follicular"
                  ? "High Chance"
                  : "Low"}
              </Text>
              <Text style={{ color: TEXT_SECONDARY, fontSize: 12, lineHeight: 16 }}>
                {getPhaseInsight(phase)}
              </Text>
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
}
