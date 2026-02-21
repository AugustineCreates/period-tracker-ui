import React from "react";
import { TouchableOpacity, Text, ActivityIndicator } from "react-native";
import type { ButtonProps } from "@/types/interfaces";

const variantBg: Record<string, string> = {
  primary: "#ee2b8c",
  secondary: "rgba(238,43,140,0.1)",
  ghost: "transparent",
  outline: "transparent",
};

const variantTextColor: Record<string, string> = {
  primary: "#ffffff",
  secondary: "#ee2b8c",
  ghost: "#8c5f75",
  outline: "#ee2b8c",
};

const sizeHeight: Record<string, number> = {
  sm: 40,
  md: 48,
  lg: 56,
};

export function Button({
  title,
  onPress,
  variant = "primary",
  size = "lg",
  disabled = false,
  loading = false,
  icon,
}: ButtonProps) {
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        borderRadius: 9999,
        width: "100%",
        height: sizeHeight[size],
        backgroundColor: variantBg[variant],
        opacity: disabled ? 0.5 : 1,
        ...(variant === "primary"
          ? {
              shadowColor: "#ee2b8c",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 10,
              elevation: 6,
            }
          : {}),
        ...(variant === "outline"
          ? { borderWidth: 2, borderColor: "#ee2b8c" }
          : {}),
      }}
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
          <Text
            style={{
              fontWeight: "700",
              color: variantTextColor[variant],
              fontSize: size === "lg" ? 18 : size === "md" ? 16 : 14,
            }}
          >
            {title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
}
