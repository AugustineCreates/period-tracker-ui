import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { Header } from "@/components/ui/Header";
import { ToggleSwitch } from "@/components/ui/ToggleSwitch";
import type { CravingCategory } from "@/types/interfaces";

const PINK = "#ee2b8c";
const TEXT = "#181114";
const TEXT2 = "#8c5f75";
const LINE = "#e6dbe0";
const SOFT = "#f5f0f2";
const GREEN = "#22c55e";

const categories: { id: CravingCategory; label: string; icon: string }[] = [
  { id: "sweet", label: "Sweet", icon: "cake" },
  { id: "salty", label: "Salty", icon: "bakery-dining" },
  { id: "cool", label: "Cool", icon: "local-cafe" },
  { id: "savory", label: "Savory", icon: "local-pizza" },
];

const cravingsData = [
  { id: "1", name: "Double Burger", desc: "Juicy & Cheesy", icon: "lunch-dining" },
  { id: "2", name: "Dark Chocolate", desc: "Rich & Velvety", icon: "cookie" },
  { id: "3", name: "Boba Tea", desc: "Extra Pearls", icon: "local-cafe" },
  { id: "4", name: "Soft Blanket", desc: "Warm & Cozy", icon: "nights-stay" },
];

export default function CravingsScreen() {
  const router = useRouter();
  const [notifyPartners, setNotifyPartners] = useState(true);
  const [selectedCat, setSelectedCat] = useState<CravingCategory>("sweet");
  const [addedItems, setAddedItems] = useState<string[]>([]);
  const [toast, setToast] = useState(false);

  const toggle = (id: string) => {
    setAddedItems((p) => p.includes(id) ? p.filter((i) => i !== id) : [...p, id]);
    if (notifyPartners) { setToast(true); setTimeout(() => setToast(false), 3000); }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fdf8fa", paddingTop: 48 }}>
      <Header title="My Cravings" showBack rightAction={
        <TouchableOpacity><MaterialIcons name="favorite" size={24} color={PINK} /></TouchableOpacity>
      } />

      <ScrollView style={{ paddingHorizontal: 16 }} showsVerticalScrollIndicator={false}>
        {/* Notify */}
        <View style={{ backgroundColor: "#fff", borderRadius: 24, padding: 20, flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 16, borderWidth: 1, borderColor: LINE, shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 1 }}>
          <View>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
              <Text style={{ fontSize: 16, fontWeight: "700", color: TEXT }}>Notify Partners</Text>
              <MaterialIcons name="auto-awesome" size={18} color={PINK} />
            </View>
            <Text style={{ fontSize: 12, color: TEXT2, marginTop: 2 }}>Instantly share your desires with loved ones</Text>
          </View>
          <ToggleSwitch value={notifyPartners} onToggle={setNotifyPartners} />
        </View>

        {/* Categories */}
        <Text style={{ fontSize: 20, fontWeight: "800", color: TEXT, letterSpacing: -0.5, marginTop: 24, marginBottom: 12 }}>{"Feeling..."}</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 16, paddingVertical: 4 }}>
          {categories.map((c) => {
            const sel = selectedCat === c.id;
            return (
              <TouchableOpacity key={c.id} style={{ alignItems: "center", gap: 8 }} onPress={() => setSelectedCat(c.id)}>
                <View style={{ width: 64, height: 64, borderRadius: 32, alignItems: "center", justifyContent: "center", borderWidth: 2, borderColor: sel ? PINK : LINE, backgroundColor: sel ? "#fce7f3" : "#fff" }}>
                  <MaterialIcons name={c.icon as any} size={28} color={sel ? PINK : TEXT2} />
                </View>
                <Text style={{ fontSize: 12, fontWeight: sel ? "700" : "600", color: sel ? PINK : TEXT2 }}>{c.label}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Grid */}
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 16 }}>
          <Text style={{ fontSize: 20, fontWeight: "800", color: TEXT, letterSpacing: -0.5 }}>{"Today's Desires"}</Text>
          <TouchableOpacity onPress={() => setAddedItems([])}><Text style={{ fontSize: 14, fontWeight: "700", color: PINK }}>Clear all</Text></TouchableOpacity>
        </View>

        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 16, marginTop: 12 }}>
          {cravingsData.map((item) => {
            const added = addedItems.includes(item.id);
            return (
              <View key={item.id} style={{ backgroundColor: "#fff", borderRadius: 16, overflow: "hidden", borderWidth: 1, borderColor: LINE, width: "47%" } as any}>
                <View style={{ width: "100%", height: 144, backgroundColor: SOFT, alignItems: "center", justifyContent: "center", position: "relative" }}>
                  <MaterialIcons name={item.icon as any} size={48} color={PINK} />
                  <View style={{ position: "absolute", top: 8, right: 8, width: 28, height: 28, borderRadius: 14, backgroundColor: "#fff", alignItems: "center", justifyContent: "center", shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 1 }}>
                    <MaterialIcons name={item.icon as any} size={14} color={PINK} />
                  </View>
                </View>
                <Text style={{ fontSize: 16, fontWeight: "700", color: TEXT, paddingHorizontal: 12, paddingTop: 12 }}>{item.name}</Text>
                <Text style={{ fontSize: 12, color: TEXT2, paddingHorizontal: 12, paddingTop: 2 }}>{item.desc}</Text>
                <TouchableOpacity
                  style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 4, marginHorizontal: 12, marginVertical: 12, borderRadius: 999, paddingVertical: 8, backgroundColor: added ? GREEN : PINK }}
                  onPress={() => toggle(item.id)}
                >
                  <MaterialIcons name={added ? "check" : "add"} size={16} color="#fff" />
                  <Text style={{ color: "#fff", fontSize: 12, fontWeight: "700" }}>{added ? "Added" : "Add to List"}</Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>

        {/* Custom */}
        <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, backgroundColor: "#fce7f3", borderRadius: 999, paddingVertical: 16, marginTop: 24, borderWidth: 2, borderStyle: "dashed", borderColor: PINK }}
          onPress={() => router.push("/add-craving")}
        >
          <MaterialIcons name="add-circle-outline" size={22} color={PINK} />
          <Text style={{ fontSize: 16, fontWeight: "700", color: PINK }}>Add Custom Craving</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>

      {toast && (
        <View style={{ position: "absolute", bottom: 32, left: 16, right: 16, flexDirection: "row", alignItems: "center", gap: 8, backgroundColor: "rgba(24,17,20,0.9)", borderRadius: 999, paddingHorizontal: 20, paddingVertical: 12 }}>
          <MaterialIcons name="check-circle" size={20} color={GREEN} />
          <Text style={{ flex: 1, color: "#fff", fontSize: 14, fontWeight: "600" }}>Partner notified!</Text>
          <TouchableOpacity onPress={() => setToast(false)}>
            <MaterialIcons name="close" size={18} color="rgba(255,255,255,0.6)" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
