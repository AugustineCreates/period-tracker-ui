import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { useApp } from "@/context/AppContext";

const PINK = "#ee2b8c";
const TEXT = "#181114";
const TEXT2 = "#8c5f75";
const LINE = "#e6dbe0";
const BRAND_LIGHT = "#fce7f3";

const menuItems = [
  { icon: "person-outline", label: "Edit Profile" },
  { icon: "share", label: "Share My Cycle", route: "/share-cycle" },
  { icon: "restaurant", label: "My Cravings", route: "/cravings" },
  { icon: "people-outline", label: "Partner Dashboard", route: "/partner/dashboard" },
  { icon: "card-giftcard", label: "Gift Selection", route: "/partner/gift-selection" },
  { icon: "notifications-none", label: "Notification Settings" },
  { icon: "lock-outline", label: "Privacy & Security" },
  { icon: "help-outline", label: "Help & Support" },
] as const;

export default function ProfileScreen() {
  const router = useRouter();
  const { userName, onboardingData, dailyLogs } = useApp();

  return (
    <View style={{ flex: 1, backgroundColor: "#fdf8fa" }}>
      <ScrollView contentContainerStyle={{ paddingTop: 80, paddingBottom: 128 }} showsVerticalScrollIndicator={false}>
        {/* Avatar */}
        <View style={{ alignItems: "center", paddingVertical: 24 }}>
          <View style={{
            width: 80,
            height: 80,
            borderRadius: 40,
            backgroundColor: PINK,
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 16,
            shadowColor: PINK,
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.3,
            shadowRadius: 16,
            elevation: 8,
          }}>
            <Text style={{ fontSize: 28, fontWeight: "700", color: "#fff" }}>{userName.charAt(0).toUpperCase()}</Text>
          </View>
          <Text style={{ fontSize: 24, fontWeight: "800", color: TEXT }}>{userName}</Text>
          <Text style={{ fontSize: 14, color: TEXT2, marginTop: 4, textTransform: "capitalize" }}>
            Goal: {onboardingData.goal?.replace("_", " ") || "Track Cycle"}
          </Text>
        </View>

        {/* Stats */}
        <View style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
          backgroundColor: "#fff",
          marginHorizontal: 16,
          borderRadius: 24,
          padding: 20,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.05,
          shadowRadius: 2,
          elevation: 1,
          borderWidth: 1,
          borderColor: LINE,
        }}>
          {[{ n: onboardingData.cycleLength, l: "Cycle" }, { n: dailyLogs.length, l: "Logged" }, { n: 5, l: "Period" }].map((s, i) => (
            <React.Fragment key={s.l}>
              {i > 0 && <View style={{ width: 1, height: 36, backgroundColor: LINE }} />}
              <View style={{ alignItems: "center", gap: 4 }}>
                <Text style={{ fontSize: 24, fontWeight: "800", color: PINK }}>{s.n}</Text>
                <Text style={{ fontSize: 12, color: TEXT2, fontWeight: "500" }}>{s.l}</Text>
              </View>
            </React.Fragment>
          ))}
        </View>

        {/* Menu */}
        <View style={{ marginTop: 24, paddingHorizontal: 16, gap: 4 }}>
          {menuItems.map((item, i) => (
            <TouchableOpacity
              key={i}
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: "#fff",
                borderRadius: 16,
                padding: 16,
                borderWidth: 1,
                borderColor: LINE,
              }}
              onPress={() => (item as any).route && router.push((item as any).route)}
            >
              <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
                <View style={{ width: 40, height: 40, borderRadius: 12, backgroundColor: BRAND_LIGHT, alignItems: "center", justifyContent: "center" }}>
                  <MaterialIcons name={item.icon as any} size={22} color={PINK} />
                </View>
                <Text style={{ fontSize: 16, fontWeight: "600", color: TEXT }}>{item.label}</Text>
              </View>
              <MaterialIcons name="chevron-right" size={22} color="rgba(0,0,0,0.2)" />
            </TouchableOpacity>
          ))}
        </View>

        <Text style={{ textAlign: "center", fontSize: 12, color: "rgba(0,0,0,0.2)", marginTop: 32 }}>Her Circle v1.0.0</Text>
      </ScrollView>
    </View>
  );
}
