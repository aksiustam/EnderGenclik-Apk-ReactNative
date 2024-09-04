import { useFonts } from "expo-font";
import React, { useEffect } from "react";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import GlobalProvider from "../context/GlobalProvider";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [fontsLoaded, error] = useFonts({
    "Giorgio-Bold": require("../assets/fonts/Giorgio-Sans-Bold.otf"),
    "Giorgio-Bold-Italic": require("../assets/fonts/Giorgio-Sans-Bold-Italic.otf"),
    "Giorgio-ExtraLight": require("../assets/fonts/Giorgio-Sans-Extra-Light.otf"),
    "Giorgio-ExtraLight-Italic": require("../assets/fonts/Giorgio-Sans-Extra-Light-Italic.otf"),
    "Giorgio-Light": require("../assets/fonts/Giorgio-Sans-Light.otf"),
    "Giorgio-Light-Italic": require("../assets/fonts/Giorgio-Sans-Light-Italic.otf"),
    "Giorgio-Medium": require("../assets/fonts/Giorgio-Sans-Medium.otf"),
    "Giorgio-Medium-Italic": require("../assets/fonts/Giorgio-Sans-Medium-Italic.otf"),
    "Giorgio-Regular": require("../assets/fonts/Giorgio-Sans-Regular.otf"),
    "Giorgio-Regular-Italic": require("../assets/fonts/Giorgio-Sans-Regular-Italic.otf"),
    "Giorgio-Thin": require("../assets/fonts/Giorgio-Sans-Thin.otf"),
    "Giorgio-Thin-Italic": require("../assets/fonts/Giorgio-Sans-Thin-Italic.otf"),
  });

  useEffect(() => {
    if (error) throw error;

    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded) {
    return null;
  }

  if (!fontsLoaded && !error) {
    return null;
  }
  return (
    <>
      <GlobalProvider>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen
            name="(auth)"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="(tabs)"
            options={{
              headerShown: false,
            }}
          />
        </Stack>
        <StatusBar style="dark" />
      </GlobalProvider>
    </>
  );
};

export default RootLayout;
