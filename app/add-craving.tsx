import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, TextInput } from "react-native";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { Button } from "@/components/ui/Button";

const PINK = "#ee2b8c";
const TEXT = "#181114";
const TEXT2 = "#8c5f75";
const LINE = "#e6dbe0";
const SOFT = "#f5f0f2";
const BRAND_LIGHT = "#fce7f3";

const categories = ["Food", "Comfort", "Activity"];
const quick = ["Ice Cream", "Hugs", "Movie Night", "Chocolate"];

export default function AddCravingScreen() {
  const router = useRouter();
  const [text, setText] = useState("");
  const [cat, setCat] = useState("Food");

  return (
    <View style={{ flex: 1, backgroundColor: "#fdf8fa", paddingTop: 48 }}>
      {/* Header */}
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 16, paddingVertical: 12 }}>
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialIcons name="close" size={24} color={TEXT} />
        </TouchableOpacity>
        <Text style={{ fontSize: 16, fontWeight: "700", color: TEXT }}>Add Custom Craving</Text>
        <TouchableOpacity>
          <MaterialIcons name="check" size={24} color={PINK} />
        </TouchableOpacity>
      </View>

      <ScrollView style={{ paddingHorizontal: 16 }} showsVerticalScrollIndicator={false}>
        <Text style={{ fontSize: 24, fontWeight: "800", color: TEXT, marginTop: 24, letterSpacing: -0.5 }}>{"What's on your mind?"}</Text>
        <Text style={{ fontSize: 14, color: TEXT2, marginTop: 8, lineHeight: 20 }}>
          Let us know what would make you feel better today.
        </Text>

        <Text style={{ fontSize: 14, fontWeight: "700", color: TEXT, marginTop: 24, marginBottom: 8 }}>{"I'm really craving..."}</Text>
        <TextInput
          style={{ backgroundColor: SOFT, borderRadius: 16, borderWidth: 1, borderColor: LINE, padding: 16, height: 112, fontSize: 16, color: TEXT, textAlignVertical: "top" }}
          placeholder="Double fudge brownies, a weighted blanket, or maybe just a nap..."
          placeholderTextColor="rgba(238,43,140,0.4)"
          value={text}
          onChangeText={setText}
          multiline
        />

        <Text style={{ fontSize: 16, fontWeight: "700", color: TEXT, marginTop: 24, marginBottom: 12 }}>Category</Text>
        <View style={{ flexDirection: "row", backgroundColor: "#fff", borderRadius: 999, borderWidth: 1, borderColor: LINE, overflow: "hidden" }}>
          {categories.map((c) => (
            <TouchableOpacity
              key={c}
              style={{ flex: 1, alignItems: "center", paddingVertical: 12, backgroundColor: cat === c ? BRAND_LIGHT : "transparent", borderRadius: cat === c ? 999 : 0 }}
              onPress={() => setCat(c)}
            >
              <Text style={{ fontSize: 14, fontWeight: cat === c ? "700" : "600", color: cat === c ? PINK : TEXT2 }}>{c}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={{ fontSize: 16, fontWeight: "700", color: TEXT, marginTop: 24, marginBottom: 12 }}>{"Show us what you're dreaming of"}</Text>
        <TouchableOpacity style={{ borderWidth: 2, borderStyle: "dashed", borderColor: PINK, borderRadius: 16, paddingVertical: 40, alignItems: "center", justifyContent: "center", gap: 8, backgroundColor: SOFT }}>
          <MaterialIcons name="add-a-photo" size={36} color={PINK} />
          <Text style={{ fontSize: 16, fontWeight: "700", color: PINK }}>Snap a pic or upload</Text>
          <Text style={{ fontSize: 12, color: TEXT2 }}>Help your partner get it right!</Text>
        </TouchableOpacity>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8, paddingVertical: 20 }}>
          {quick.map((q) => (
            <TouchableOpacity key={q} style={{ backgroundColor: "#fff", borderRadius: 999, paddingHorizontal: 16, paddingVertical: 8, borderWidth: 1, borderColor: LINE }} onPress={() => setText(q)}>
              <Text style={{ fontSize: 12, fontWeight: "500", color: TEXT }}>{q}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={{ height: 40 }} />
      </ScrollView>

      <View style={{ paddingHorizontal: 24, paddingBottom: 40 }}>
        <Button
          title="Share with Partners"
          onPress={() => router.back()}
          icon={<MaterialIcons name="favorite" size={20} color="#fff" />}
        />
      </View>
    </View>
  );
}
