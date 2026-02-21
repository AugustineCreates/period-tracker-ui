import { useEffect } from "react";
import { useRouter } from "expo-router";
import { View, ActivityIndicator } from "react-native";
import { useApp } from "@/context/AppContext";

export default function Index() {
  const router = useRouter();
  const { onboardingComplete } = useApp();

  useEffect(() => {
    const t = setTimeout(() => {
      router.replace(onboardingComplete ? "/(tabs)" : "/onboarding/welcome");
    }, 400);
    return () => clearTimeout(t);
  }, [onboardingComplete]);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#fdf8fa" }}>
      <ActivityIndicator size="large" color="#ee2b8c" />
    </View>
  );
}
