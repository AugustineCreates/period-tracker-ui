import React from "react";
import { View } from "react-native";
import type { CardProps } from "@/types/interfaces";

export function Card({
  children,
  selected = false,
}: CardProps) {
  return (
    <View
      className={`rounded-2xl p-5 border-2 shadow-sm ${
        selected
          ? "bg-[rgba(238,43,140,0.08)] border-[#ee2b8c]"
          : "bg-white border-[#e6dbe0]"
      }`}
    >
      {children}
    </View>
  );
}
