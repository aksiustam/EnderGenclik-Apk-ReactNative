import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import React, { useEffect } from "react";

import { LinearGradient } from "expo-linear-gradient";
import Logo from "../assets/images/Logo/Logo.png";
import { Redirect, router } from "expo-router";
import { useGlobalContext } from "../context/GlobalProvider";
const HomePage = () => {
  const { loading, logged } = useGlobalContext();

  if (!loading && logged) return <Redirect href="/home" />;

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!loading && !logged) {
        router.replace("/auth");
      }
    }, 1200);

    return () => clearTimeout(timer);
  }, [loading, logged]);
  return (
    <>
      <LinearGradient
        colors={["#0B4455", "#086D65"]}
        start={{ x: 0.1, y: 0.1 }}
        end={{ x: 0.9, y: 0.9 }}
        locations={[0.1, 0.7]}
        className="flex-1"
      >
        <View className="w-full h-full items-center justify-between relative">
          <View style={styles.fixcontainer} className="pt-8">
            <Text numberOfLines={1} adjustsFontSizeToFit style={styles.textbig}>
              Kolay Okuma
            </Text>

            <Text
              numberOfLines={1}
              adjustsFontSizeToFit
              style={styles.textsmall}
            >
              UYGULAMASI
            </Text>
          </View>
          <View className="items-center justify-center">
            <Text
              className="text-white font-gbold text-6xl"
              style={{ letterSpacing: 5 }}
            >
              ...
            </Text>
            <Text className="text-white font-gbold text-7xl ">HOŞGELDİNİZ</Text>
            <Text
              className="text-white font-gbold text-6xl -translate-y-7"
              style={{ letterSpacing: 5 }}
            >
              ...
            </Text>
          </View>
          <Image source={Logo} className="w-52 h-52" resizeMode="contain" />
        </View>
      </LinearGradient>
    </>
  );
};

const styles = StyleSheet.create({
  fixcontainer: {
    width: Dimensions.get("window").width / 1.4,
    height: Dimensions.get("window").height / 8,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderBottomStartRadius: 50,
    borderBottomEndRadius: 50,
  },
  textbig: { fontSize: 36, color: "black", fontWeight: "bold" },
  textsmall: {
    position: "relative",
    transform: [{ translateX: 50 }, { translateY: -10 }],
    letterSpacing: 3,
    fontSize: 13,
    color: "#086D65",
    fontWeight: "bold",
  },
});

export default HomePage;
