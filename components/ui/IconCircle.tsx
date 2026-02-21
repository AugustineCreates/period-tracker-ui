import React from "react";
import { View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

interface IconCircleProps {
  name: keyof typeof MaterialIcons.glyphMap;
  size?: number;
  color?: string;
  bgColor?: string;
}

export function IconCircle({
  name,
  size = 28,
  color = "#ee2b8c",
  bgColor = "#fce7f3",
}: IconCircleProps) {
  return (
    <View
      className="w-14 h-14 rounded-full items-center justify-center"
      style={{ backgroundColor: bgColor }}
    >
      <MaterialIcons name={name} size={size} color={color} />
    </View>
  );
}
