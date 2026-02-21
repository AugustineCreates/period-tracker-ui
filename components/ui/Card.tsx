import React from "react";
import { View, type ViewStyle } from "react-native";
import type { CardProps } from "@/types/interfaces";

export function Card({
  children,
  selected = false,
  style,
}: CardProps & { style?: ViewStyle }) {
  return (
    <View
      style={{
        backgroundColor: selected ? "rgba(238,43,140,0.08)" : "#ffffff",
        borderRadius: 16,
        padding: 20,
        borderWidth: 2,
        borderColor: selected ? "#ee2b8c" : "#e6dbe0",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
        ...style,
      }}
    >
      {children}
    </View>
  );
}
