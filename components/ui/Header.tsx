import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import type { HeaderProps } from "@/types/interfaces";

export function Header({
  title,
  subtitle,
  showBack = false,
  rightAction,
  stepText,
}: HeaderProps) {
  const router = useRouter();

  return (
    <View style={{ paddingHorizontal: 16, paddingVertical: 8 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {showBack ? (
          <TouchableOpacity
            style={{
              width: 44,
              height: 44,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => router.back()}
          >
            <MaterialIcons name="arrow-back-ios" size={22} color="#181114" />
          </TouchableOpacity>
        ) : (
          <View style={{ width: 44 }} />
        )}

        <View style={{ flex: 1, alignItems: "center" }}>
          {stepText ? (
            <Text
              style={{
                fontSize: 14,
                fontWeight: "600",
                color: "#181114",
                textTransform: "uppercase",
                letterSpacing: 2,
              }}
            >
              {stepText}
            </Text>
          ) : title ? (
            <Text
              style={{
                fontSize: 18,
                fontWeight: "700",
                color: "#181114",
                textAlign: "center",
              }}
            >
              {title}
            </Text>
          ) : null}
          {subtitle && (
            <Text
              style={{
                fontSize: 12,
                fontWeight: "700",
                color: "#ee2b8c",
                textTransform: "uppercase",
                letterSpacing: 2,
                marginTop: 2,
              }}
            >
              {subtitle}
            </Text>
          )}
        </View>

        {rightAction || <View style={{ width: 44 }} />}
      </View>
    </View>
  );
}
