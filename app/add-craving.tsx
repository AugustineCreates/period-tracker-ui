import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, TextInput } from "react-native";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { Button } from "@/components/ui/Button";

const categories = ["Food", "Comfort", "Activity"];
const quick = ["Ice Cream", "Hugs", "Movie Night", "Chocolate"];

export default function AddCravingScreen() {
  const router = useRouter();
  const [text, setText] = useState("");
  const [cat, setCat] = useState("Food");

  return (
    <View className="flex-1 bg-[#fdf8fa] pt-12">
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-3">
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialIcons name="close" size={24} color="#181114" />
        </TouchableOpacity>
        <Text className="text-base font-bold text-[#181114]">Add Custom Craving</Text>
        <TouchableOpacity>
          <MaterialIcons name="check" size={24} color="#ee2b8c" />
        </TouchableOpacity>
      </View>

      <ScrollView className="px-4" showsVerticalScrollIndicator={false}>
        <Text className="text-2xl font-extrabold text-[#181114] mt-6 tracking-tight">{"What's on your mind?"}</Text>
        <Text className="text-sm text-[#8c5f75] mt-2 leading-5">
          Let us know what would make you feel better today.
        </Text>

        <Text className="text-sm font-bold text-[#181114] mt-6 mb-2">{"I'm really craving..."}</Text>
        <TextInput
          className="bg-[#f5f0f2] rounded-2xl border border-[#e6dbe0] p-4 h-28 text-base text-[#181114]"
          style={{ textAlignVertical: "top" }}
          placeholder="Double fudge brownies, a weighted blanket, or maybe just a nap..."
          placeholderTextColor="rgba(238,43,140,0.4)"
          value={text}
          onChangeText={setText}
          multiline
        />

        <Text className="text-base font-bold text-[#181114] mt-6 mb-3">Category</Text>
        <View className="flex-row bg-white rounded-full border border-[#e6dbe0] overflow-hidden">
          {categories.map((c) => (
            <TouchableOpacity
              key={c}
              className={`flex-1 items-center py-3 ${cat === c ? "bg-[#fce7f3] rounded-full" : ""}`}
              onPress={() => setCat(c)}
            >
              <Text className={`text-sm ${cat === c ? "font-bold text-[#ee2b8c]" : "font-semibold text-[#8c5f75]"}`}>{c}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text className="text-base font-bold text-[#181114] mt-6 mb-3">{"Show us what you're dreaming of"}</Text>
        <TouchableOpacity className="border-2 border-dashed border-[#ee2b8c] rounded-2xl py-10 items-center justify-center gap-2 bg-[#f5f0f2]">
          <MaterialIcons name="add-a-photo" size={36} color="#ee2b8c" />
          <Text className="text-base font-bold text-[#ee2b8c]">Snap a pic or upload</Text>
          <Text className="text-xs text-[#8c5f75]">Help your partner get it right!</Text>
        </TouchableOpacity>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8, paddingVertical: 20 }}>
          {quick.map((q) => (
            <TouchableOpacity key={q} className="bg-white rounded-full px-4 py-2 border border-[#e6dbe0]" onPress={() => setText(q)}>
              <Text className="text-xs font-medium text-[#181114]">{q}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View className="h-10" />
      </ScrollView>

      <View className="px-6 pb-10">
        <Button
          title="Share with Partners"
          onPress={() => router.back()}
          icon={<MaterialIcons name="favorite" size={20} color="#fff" />}
        />
      </View>
    </View>
  );
}
