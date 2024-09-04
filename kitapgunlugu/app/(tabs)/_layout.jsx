import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const TabsLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen name="home" options={{ headerShown: false }} />
        <Stack.Screen name="ayarlar" options={{ headerShown: false }} />
        <Stack.Screen name="bagis" options={{ headerShown: false }} />
        <Stack.Screen name="derssohbet" options={{ headerShown: false }} />
        <Stack.Screen name="favori" options={{ headerShown: false }} />
        <Stack.Screen name="kisasohbet" options={{ headerShown: false }} />
        <Stack.Screen name="kitapistek" options={{ headerShown: false }} />
        <Stack.Screen name="kutuphane" options={{ headerShown: false }} />
        <Stack.Screen name="ozelhayat" options={{ headerShown: false }} />
        <Stack.Screen name="profil" options={{ headerShown: false }} />
        <Stack.Screen name="bookread" options={{ headerShown: false }} />
        <Stack.Screen name="videosayfa" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="dark" />
    </>
  );
};

export default TabsLayout;
