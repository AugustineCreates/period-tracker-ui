import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { Header } from "@/components/ui/Header";
import type { GiftCategory } from "@/types/interfaces";

const PINK = "#ee2b8c";
const TEXT = "#181114";
const TEXT2 = "#8c5f75";
const LINE = "#e6dbe0";
const SOFT = "#f5f0f2";
const BRAND_LIGHT = "#fce7f3";

const tabs: { id: GiftCategory; label: string }[] = [
  { id: "flowers", label: "Floral Arrangements" },
  { id: "chocolates", label: "Artisan Chocolates" },
  { id: "wellness", label: "Wellness" },
];

const gifts = [
  { id: "1", name: "Blushing Peonies", desc: "Premium Stem Collection", price: 45, category: "flowers" as GiftCategory, icon: "local-florist" },
  { id: "2", name: "Classic Red Roses", desc: "Dozen Long Stemmed", price: 60, category: "flowers" as GiftCategory, icon: "filter-vintage" },
  { id: "3", name: "Dark Truffle Box", desc: "12pc Handcrafted Selection", price: 38, category: "chocolates" as GiftCategory, icon: "cookie" },
  { id: "4", name: "Pastel Garden Mix", desc: "Seasonal Wildflowers", price: 52, category: "flowers" as GiftCategory, icon: "yard" },
  { id: "5", name: "Truffle Assortment", desc: "Premium Belgian Chocolates", price: 42, category: "chocolates" as GiftCategory, icon: "cake" },
  { id: "6", name: "Spa Gift Set", desc: "Relax & Unwind Bundle", price: 55, category: "wellness" as GiftCategory, icon: "spa" },
];

export default function GiftSelectionScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<GiftCategory>("flowers");
  const filtered = gifts.filter((g) => g.category === activeTab);

  return (
    <View style={{ flex: 1, backgroundColor: "#fdf8fa", paddingTop: 48 }}>
      <Header
        title="Gift Selection"
        showBack
        rightAction={
          <TouchableOpacity style={{ width: 44, height: 44, alignItems: "center", justifyContent: "center" }}>
            <MaterialIcons name="shopping-bag" size={24} color={TEXT} />
          </TouchableOpacity>
        }
      />

      <ScrollView style={{ paddingHorizontal: 16 }} showsVerticalScrollIndicator={false}>
        <Text style={{ fontSize: 28, fontWeight: "800", color: TEXT, marginTop: 16, letterSpacing: -0.5, lineHeight: 36 }}>
          Thoughtful gestures for her
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8, marginTop: 8, marginBottom: 24 }}>
          <MaterialIcons name="event" size={18} color={TEXT2} />
          <Text style={{ fontSize: 14, color: TEXT2 }}>Day 26: A little something to brighten her day</Text>
        </View>

        {/* Tabs */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {tabs.map((t) => {
            const active = activeTab === t.id;
            return (
              <TouchableOpacity
                key={t.id}
                style={{ paddingHorizontal: 4, paddingBottom: 12, marginRight: 24, borderBottomWidth: active ? 2 : 0, borderBottomColor: PINK }}
                onPress={() => setActiveTab(t.id)}
              >
                <Text style={{ fontSize: 16, fontWeight: "700", color: active ? TEXT : TEXT2 }}>{t.label}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Grid */}
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 16, marginTop: 24 }}>
          {filtered.map((g) => (
            <View key={g.id} style={{ backgroundColor: "#fff", borderRadius: 16, overflow: "hidden", borderWidth: 1, borderColor: LINE, width: "47%" } as any}>
              <View style={{ width: "100%", height: 160, backgroundColor: SOFT, alignItems: "center", justifyContent: "center" }}>
                <MaterialIcons name={g.icon as any} size={52} color={PINK} />
              </View>
              <View style={{ padding: 12 }}>
                <Text style={{ fontSize: 16, fontWeight: "700", color: TEXT }}>{g.name}</Text>
                <Text style={{ fontSize: 12, color: TEXT2, marginTop: 2 }}>{g.desc}</Text>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 12 }}>
                  <Text style={{ fontSize: 18, fontWeight: "800", color: PINK }}>${g.price.toFixed(2)}</Text>
                  <TouchableOpacity
                    style={{ backgroundColor: PINK, borderRadius: 999, paddingHorizontal: 16, paddingVertical: 8 }}
                    onPress={() => router.push("/partner/gift-reveal")}
                  >
                    <Text style={{ fontSize: 12, fontWeight: "700", color: "#fff" }}>Order Now</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Personalized Suggestion */}
        <TouchableOpacity style={{ backgroundColor: "#fff", borderRadius: 16, flexDirection: "row", alignItems: "center", padding: 16, marginTop: 24, marginBottom: 40, borderWidth: 1, borderColor: LINE }}>
          <View style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: BRAND_LIGHT, alignItems: "center", justifyContent: "center", marginRight: 12 }}>
            <MaterialIcons name="auto-awesome" size={22} color={PINK} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 12, color: TEXT2 }}>Personalized Suggestion</Text>
            <Text style={{ fontSize: 16, fontWeight: "700", color: TEXT }}>The "Comfort" Bundle</Text>
          </View>
          <MaterialIcons name="chevron-right" size={24} color={TEXT2} />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
