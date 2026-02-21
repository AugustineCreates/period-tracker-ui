import React from "react";
import { TouchableOpacity, View } from "react-native";
import type { ToggleSwitchProps } from "@/types/interfaces";

export function ToggleSwitch({ value, onToggle }: ToggleSwitchProps) {
  return (
    <TouchableOpacity
      style={{
        width: 51,
        height: 31,
        borderRadius: 16,
        padding: 2,
        justifyContent: "center",
        backgroundColor: value ? "#ee2b8c" : "#e2d5da",
      }}
      onPress={() => onToggle(!value)}
      activeOpacity={0.8}
    >
      <View
        style={{
          width: 27,
          height: 27,
          borderRadius: 14,
          backgroundColor: "#fff",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.15,
          shadowRadius: 2,
          elevation: 2,
          transform: [{ translateX: value ? 20 : 0 }],
        }}
      />
    </TouchableOpacity>
  );
}
