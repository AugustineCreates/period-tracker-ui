import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { Header } from "@/components/ui/Header";
import type { GiftCategory } from "@/types/interfaces";

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
    <View className="flex-1 bg-[#fdf8fa] pt-12">
      <Header
        title="Gift Selection"
        showBack
        rightAction={
          <TouchableOpacity className="w-11 h-11 items-center justify-center">
            <MaterialIcons name="shopping-bag" size={24} color="#181114" />
          </TouchableOpacity>
        }
      />

      <ScrollView className="px-4" showsVerticalScrollIndicator={false}>
        <Text className="text-[28px] font-extrabold text-[#181114] mt-4 tracking-tight leading-9">
          Thoughtful gestures for her
        </Text>
        <View className="flex-row items-center gap-2 mt-2 mb-6">
          <MaterialIcons name="event" size={18} color="#8c5f75" />
          <Text className="text-sm text-[#8c5f75]">Day 26: A little something to brighten her day</Text>
        </View>

        {/* Tabs */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {tabs.map((t) => {
            const active = activeTab === t.id;
            return (
              <TouchableOpacity
                key={t.id}
                className={`pb-3 mr-6 ${active ? "border-b-2 border-[#ee2b8c]" : ""}`}
                onPress={() => setActiveTab(t.id)}
              >
                <Text className={`text-base font-bold ${active ? "text-[#181114]" : "text-[#8c5f75]"}`}>{t.label}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Grid */}
        <View className="flex-row flex-wrap gap-4 mt-6">
          {filtered.map((g) => (
            <View key={g.id} className="bg-white rounded-2xl overflow-hidden border border-[#e6dbe0]" style={{ width: "47%" } as any}>
              <View className="w-full h-40 bg-[#f5f0f2] items-center justify-center">
                <MaterialIcons name={g.icon as any} size={52} color="#ee2b8c" />
              </View>
              <View className="p-3">
                <Text className="text-base font-bold text-[#181114]">{g.name}</Text>
                <Text className="text-xs text-[#8c5f75] mt-0.5">{g.desc}</Text>
                <View className="flex-row items-center justify-between mt-3">
                  <Text className="text-lg font-extrabold text-[#ee2b8c]">${g.price.toFixed(2)}</Text>
                  <TouchableOpacity
                    className="bg-[#ee2b8c] rounded-full px-4 py-2"
                    onPress={() => router.push("/partner/gift-reveal")}
                  >
                    <Text className="text-xs font-bold text-white">Order Now</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Personalized Suggestion */}
        <TouchableOpacity className="bg-white rounded-2xl flex-row items-center p-4 mt-6 mb-10 border border-[#e6dbe0]">
          <View className="w-12 h-12 rounded-full bg-[#fce7f3] items-center justify-center mr-3">
            <MaterialIcons name="auto-awesome" size={22} color="#ee2b8c" />
          </View>
          <View className="flex-1">
            <Text className="text-xs text-[#8c5f75]">Personalized Suggestion</Text>
            <Text className="text-base font-bold text-[#181114]">The "Comfort" Bundle</Text>
          </View>
          <MaterialIcons name="chevron-right" size={24} color="#8c5f75" />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
