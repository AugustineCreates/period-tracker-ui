import React from "react";
import { View } from "react-native";
import type { ProgressDotsProps } from "@/types/interfaces";

export function ProgressDots({ total, current }: ProgressDotsProps) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        paddingVertical: 8,
      }}
    >
      {Array.from({ length: total }).map((_, i) => (
        <View
          key={i}
          style={{
            height: 6,
            borderRadius: 999,
            width: i === current ? 32 : 6,
            backgroundColor: i === current ? "#ee2b8c" : "#fce7f3",
          }}
        />
      ))}
    </View>
  );
}
