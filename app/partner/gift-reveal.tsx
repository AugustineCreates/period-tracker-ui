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

const quickResponses = [
  { label: "Love you!", icon: "favorite" },
  { label: "You're the best!", icon: "emoji-events" },
  { label: "This made my day!", icon: "sentiment-very-satisfied" },
];

export default function GiftRevealScreen() {
  const router = useRouter();
  const [note, setNote] = useState("");
  const [thanksSent, setThanksSent] = useState(false);

  return (
    <View style={{ flex: 1, backgroundColor: "#fdf8fa" }}>
      {/* Close button */}
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 16, paddingTop: 56, paddingBottom: 8 }}>
        <TouchableOpacity style={{ width: 44, height: 44, alignItems: "center", justifyContent: "center" }} onPress={() => router.back()}>
          <MaterialIcons name="close" size={24} color={TEXT} />
        </TouchableOpacity>
        <Text style={{ fontSize: 18, fontWeight: "700", color: TEXT }}>A Surprise for You!</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
        {/* Gift Image Area */}
        <View style={{ alignItems: "center", marginTop: 24 }}>
          <View style={{ width: "100%", height: 288, backgroundColor: SOFT, borderRadius: 24, alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
            <MaterialIcons name="local-florist" size={80} color={PINK} />
          </View>
        </View>

        {/* Gift Info Card */}
        <View style={{ backgroundColor: "#fff", borderRadius: 24, padding: 24, marginTop: 24, borderWidth: 1, borderColor: LINE }}>
          <Text style={{ fontSize: 12, fontWeight: "700", color: PINK, letterSpacing: 3, marginBottom: 8 }}>NEW GIFT RECEIVED</Text>
          <Text style={{ fontSize: 24, fontWeight: "800", color: TEXT, lineHeight: 32 }}>Flowers are coming your way!</Text>

          {/* Quote */}
          <View style={{ backgroundColor: "rgba(252,231,243,0.5)", borderRadius: 16, padding: 20, marginTop: 16, borderLeftWidth: 4, borderLeftColor: PINK }}>
            <Text style={{ fontSize: 16, color: TEXT, fontStyle: "italic", lineHeight: 24 }}>
              "Thought you{"'"}d like these to brighten your day. Love you always!"
            </Text>
          </View>

          {/* From */}
          <View style={{ flexDirection: "row", alignItems: "center", gap: 12, marginTop: 16 }}>
            <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: SOFT, alignItems: "center", justifyContent: "center" }}>
              <MaterialIcons name="person" size={20} color={TEXT2} />
            </View>
            <Text style={{ fontSize: 14, color: TEXT2, fontWeight: "500" }}>From your partner</Text>
          </View>
        </View>

        {/* Delivery Info */}
        <Text style={{ fontSize: 14, color: TEXT2, textAlign: "center", marginTop: 24, lineHeight: 20 }}>
          Your delivery is scheduled for today between{"\n"}2:00 PM and 5:00 PM.
        </Text>

        {/* Thank You Section */}
        {!thanksSent ? (
          <View style={{ marginTop: 32 }}>
            <Button
              title="Say Thank You"
              onPress={() => setThanksSent(true)}
              icon={<MaterialIcons name="chat-bubble" size={22} color="#fff" />}
            />
            <TouchableOpacity style={{ alignItems: "center", marginTop: 16 }}>
              <Text style={{ fontSize: 14, fontWeight: "500", color: PINK }}>Not now, remind me later</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{ backgroundColor: "#fff", borderRadius: 24, padding: 24, marginTop: 32, borderWidth: 1, borderColor: LINE }}>
            <Text style={{ fontSize: 18, fontWeight: "700", color: PINK, textAlign: "center", marginBottom: 16, letterSpacing: 1 }}>SAY THANKS!</Text>

            {/* Quick responses */}
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
              {quickResponses.map((r) => (
                <TouchableOpacity key={r.label} style={{ flexDirection: "row", alignItems: "center", gap: 8, backgroundColor: BRAND_LIGHT, borderRadius: 999, paddingHorizontal: 20, paddingVertical: 12 }}>
                  <MaterialIcons name={r.icon as any} size={18} color={PINK} />
                  <Text style={{ fontSize: 14, fontWeight: "700", color: PINK }}>{r.label}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Custom note */}
            <View style={{ flexDirection: "row", alignItems: "center", gap: 12, marginTop: 20, paddingTop: 20, borderTopWidth: 1, borderTopColor: LINE }}>
              <TextInput
                style={{ flex: 1, backgroundColor: SOFT, borderRadius: 999, paddingHorizontal: 16, paddingVertical: 12, fontSize: 14, color: TEXT }}
                placeholder="Write a sweet note..."
                placeholderTextColor={TEXT2}
                value={note}
                onChangeText={setNote}
              />
              <TouchableOpacity style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: PINK, alignItems: "center", justifyContent: "center" }}>
                <MaterialIcons name="send" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
