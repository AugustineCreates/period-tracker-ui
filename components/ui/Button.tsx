import React from "react";
import { TouchableOpacity, Text, ActivityIndicator, View } from "react-native";
import type { ButtonProps } from "@/types/interfaces";

export function Button({
  title,
  onPress,
  variant = "primary",
  size = "lg",
  disabled = false,
  loading = false,
  icon,
}: ButtonProps) {
  const bgClass =
    variant === "primary"
      ? "bg-[#ee2b8c]"
      : variant === "secondary"
      ? "bg-[rgba(238,43,140,0.1)]"
      : "bg-transparent";

  const textColorClass =
    variant === "primary"
      ? "text-white"
      : variant === "secondary" || variant === "outline"
      ? "text-[#ee2b8c]"
      : "text-[#8c5f75]";

  const heightClass =
    size === "lg" ? "h-14" : size === "md" ? "h-12" : "h-10";

  const textSizeClass =
    size === "lg" ? "text-lg" : size === "md" ? "text-base" : "text-sm";

  const borderClass =
    variant === "outline" ? "border-2 border-[#ee2b8c]" : "";

  return (
    <TouchableOpacity
      className={`flex-row items-center justify-center gap-2 rounded-full w-full ${bgClass} ${heightClass} ${borderClass} ${
        disabled ? "opacity-50" : ""
      }`}
      style={
        variant === "primary"
          ? {
              shadowColor: "#ee2b8c",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 10,
              elevation: 6,
            }
          : undefined
      }
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.85}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === "primary" ? "#fff" : "#ee2b8c"}
        />
      ) : (
        <>
          {icon}
          <Text className={`font-bold ${textColorClass} ${textSizeClass}`}>
            {title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
}
