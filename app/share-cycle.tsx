import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Header } from "@/components/ui/Header";
import { ToggleSwitch } from "@/components/ui/ToggleSwitch";
import { Button } from "@/components/ui/Button";
import { useApp } from "@/context/AppContext";

const PINK = "#ee2b8c";
const TEXT = "#181114";
const TEXT2 = "#8c5f75";
const LINE = "#e6dbe0";
const SOFT = "#f5f0f2";
const BRAND_LIGHT = "#fce7f3";

export default function ShareCycleScreen() {
  const { partners, updatePartner } = useApp();

  return (
    <View style={{ flex: 1, backgroundColor: "#fdf8fa", paddingTop: 48 }}>
      <Header title="Share My Cycle" showBack />

      <ScrollView style={{ paddingHorizontal: 16 }} showsVerticalScrollIndicator={false}>
        <Text style={{ fontSize: 24, fontWeight: "800", color: TEXT, marginTop: 24, letterSpacing: -0.5 }}>Shared Partners</Text>
        <Text style={{ fontSize: 14, color: TEXT2, marginTop: 8, marginBottom: 24, lineHeight: 20 }}>
          Keep your loved ones in the loop with your cycle updates.
        </Text>

        {partners.map((p) => (
          <View key={p.id} style={{ backgroundColor: "#fff", borderRadius: 24, padding: 20, borderWidth: 1, borderColor: LINE, marginBottom: 16, gap: 16 }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
              <View style={{ width: 56, height: 56, borderRadius: 28, backgroundColor: SOFT, alignItems: "center", justifyContent: "center" }}>
                <Text style={{ fontSize: 24, fontWeight: "700", color: PINK }}>{p.name.charAt(0)}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 18, fontWeight: "700", color: TEXT }}>{p.name}</Text>
                <Text style={{ fontSize: 12, fontWeight: "700", color: PINK, letterSpacing: 2 }}>{p.role.toUpperCase()}</Text>
              </View>
              <TouchableOpacity>
                <MaterialIcons name="settings" size={22} color="rgba(0,0,0,0.3)" />
              </TouchableOpacity>
            </View>

            {[
              { key: "moodSharing" as const, icon: "favorite", label: "Mood Sharing" },
              { key: "periodAlerts" as const, icon: "notifications", label: "Period Alerts" },
            ].map((t) => (
              <View key={t.key} style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", backgroundColor: "rgba(0,0,0,0.02)", borderRadius: 12, paddingHorizontal: 16, paddingVertical: 12 }}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
                  <View style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: BRAND_LIGHT, alignItems: "center", justifyContent: "center" }}>
                    <MaterialIcons name={t.icon as any} size={18} color={PINK} />
                  </View>
                  <Text style={{ fontSize: 14, fontWeight: "600", color: TEXT }}>{t.label}</Text>
                </View>
                <ToggleSwitch value={p[t.key]} onToggle={(v) => updatePartner(p.id, { [t.key]: v })} />
              </View>
            ))}
          </View>
        ))}

        {[0, 1].map((i) => (
          <TouchableOpacity key={i} style={{ alignItems: "center", justifyContent: "center", paddingVertical: 32, borderWidth: 2, borderStyle: "dashed", borderColor: LINE, borderRadius: 24, marginBottom: 16, gap: 8 }}>
            <MaterialIcons name="person-add" size={36} color="rgba(238,43,140,0.6)" />
            <Text style={{ fontSize: 16, fontWeight: "700", color: TEXT }}>Empty Slot</Text>
            <Text style={{ fontSize: 12, color: TEXT2, textAlign: "center", paddingHorizontal: 24 }}>
              {i === 0 ? "Invite another close friend or family member" : "Invite another person"}
            </Text>
          </TouchableOpacity>
        ))}

        <View style={{ marginTop: 24 }}>
          <Button
            title="Invite New Person"
            onPress={() => {}}
            icon={<MaterialIcons name="add-circle" size={22} color="#fff" />}
          />
        </View>

        <Text style={{ fontSize: 12, color: "rgba(24,17,20,0.4)", textAlign: "center", marginTop: 24, lineHeight: 20, paddingHorizontal: 20, marginBottom: 40 }}>
          Your health data is private. Partners can only see what you choose to share and you can revoke access at any time.
        </Text>
      </ScrollView>
    </View>
  );
}
