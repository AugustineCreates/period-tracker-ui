import React from "react";
import { View } from "react-native";
import type { ProgressDotsProps } from "@/types/interfaces";

export function ProgressDots({ total, current }: ProgressDotsProps) {
  return (
    <View className="flex-row items-center justify-center gap-2 py-2">
      {Array.from({ length: total }).map((_, i) => (
        <View
          key={i}
          className={`h-1.5 rounded-full ${
            i === current ? "w-8 bg-[#ee2b8c]" : "w-1.5 bg-[#fce7f3]"
          }`}
        />
      ))}
    </View>
  );
}
