import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link, useRouter } from "expo-router";
import { useGlobalContext } from "../../context/GlobalProvider";

const HomePage = () => {
  const router = useRouter();
  const { setLogged } = useGlobalContext();

  const clear = () => {
    AsyncStorage.clear();
    setLogged(false);
    router.push("/auth");
  };
  return (
    <>
      <SafeAreaView className="flex-1 justify-center items-center relative">
        <TouchableOpacity
          className="absolute top-12 left-8 w-12 h-12 rounded-full bg-slate-400 justify-center items-center"
          onPress={clear}
        >
          <Text className="text-yellow-400">RESET</Text>
        </TouchableOpacity>
        <View className="flex-row space-x-4 mb-3">
          <Link href={"/favori"} asChild>
            <TouchableOpacity className="w-[100px] h-[100px] bg-[#06383A] rounded-2xl justify-center items-center">
              <Image
                source={require("../../assets/icon/star.png")}
                className="w-12 h-12"
                resizeMode="contain"
              />

              <Text className="text-[#FBE116] mt-1 text-xl font-gregular">
                FAVORİLERİM
              </Text>
            </TouchableOpacity>
          </Link>
          <Link href={"/profil"} asChild>
            <TouchableOpacity className="w-[100px] h-[100px] bg-[#06383A] rounded-2xl justify-center items-center">
              <Image
                source={require("../../assets/icon/profile.png")}
                className="w-12 h-12"
                resizeMode="contain"
              />

              <Text className="text-[#FBE116] mt-1 text-xl font-gregular">
                PROFİLİM
              </Text>
            </TouchableOpacity>
          </Link>
          <Link href={"/kutuphane"} asChild>
            <TouchableOpacity className="w-[100px] h-[100px] bg-[#06383A] rounded-2xl justify-center items-center">
              <Image
                source={require("../../assets/icon/bookshelf.png")}
                className="w-12 h-12"
                resizeMode="contain"
              />

              <Text className="text-[#FBE116] mt-1 text-xl font-gregular">
                KÜTÜPHANE
              </Text>
            </TouchableOpacity>
          </Link>
        </View>
        <View className="flex-row space-x-4 mb-3">
          <Link href={"/kitapistek"} asChild>
            <TouchableOpacity className="w-[100px] h-[100px] bg-[#06383A] rounded-2xl justify-center items-center">
              <Image
                source={require("../../assets/icon/openbook.png")}
                className="w-12 h-12"
                resizeMode="contain"
              />

              <Text className="text-[#FBE116] mt-1 text-xl font-gregular">
                KİTAP İSTEĞİ
              </Text>
            </TouchableOpacity>
          </Link>
          <Link href={"/bagis"} asChild>
            <TouchableOpacity className="w-[100px] h-[100px] bg-[#06383A] rounded-2xl justify-center items-center">
              <Image
                source={require("../../assets/icon/destek.png")}
                className="w-12 h-12"
                resizeMode="contain"
              />

              <Text className="text-[#FBE116] mt-1 text-xl font-gregular">
                BAĞIŞ YAP
              </Text>
            </TouchableOpacity>
          </Link>
          <Link href={"/ozelhayat"} asChild>
            <TouchableOpacity className="w-[100px] h-[100px] bg-[#06383A] rounded-2xl justify-center items-center">
              <Image
                source={require("../../assets/icon/ozel.png")}
                className="w-12 h-12"
                resizeMode="contain"
              />

              <Text className="text-[#FBE116] mt-1 text-xl font-gregular">
                ÖZEL HAYATLAR
              </Text>
            </TouchableOpacity>
          </Link>
        </View>
        <View className="flex-row space-x-4 mb-3">
          <Link href={"/kisasohbet"} asChild>
            <TouchableOpacity className="w-[100px] h-[100px] bg-[#06383A] rounded-2xl justify-center items-center">
              <Image
                source={require("../../assets/icon/video.png")}
                className="w-12 h-12"
                resizeMode="contain"
              />

              <Text className="text-[#FBE116] mt-1 text-xl font-gregular">
                KISA SOHBETLER
              </Text>
            </TouchableOpacity>
          </Link>
          <Link href={"/derssohbet"} asChild>
            <TouchableOpacity className="w-[100px] h-[100px] bg-[#06383A] rounded-2xl justify-center items-center">
              <Image
                source={require("../../assets/icon/ders.png")}
                className="w-12 h-12"
                resizeMode="contain"
              />

              <Text className="text-[#FBE116] mt-1 text-xl font-gregular">
                DERS SOHBETLERİ
              </Text>
            </TouchableOpacity>
          </Link>
          <Link href={"/ayarlar"} asChild>
            <TouchableOpacity className="w-[100px] h-[100px] bg-[#06383A] rounded-2xl justify-center items-center">
              <Image
                source={require("../../assets/icon/settings.png")}
                className="w-12 h-12"
                resizeMode="contain"
              />

              <Text className="text-[#FBE116] mt-1 text-xl font-gregular">
                AYARLAR
              </Text>
            </TouchableOpacity>
          </Link>
        </View>
      </SafeAreaView>
    </>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  text: {
    marginTop: 10,
    color: "#FBE116",
    fontFamily: "sans-serif-condensed",
    fontSize: 12,
  },
  image: {
    width: 55,
    height: 55,
  },
  exitbox: {
    position: "relative",
    zIndex: 5,
    top: Dimensions.get("window").height * 0.06,
    left: Dimensions.get("window").width * 0.81,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    width: 100,
    height: 100,
    margin: 8,
    borderRadius: 15,
    backgroundColor: "#06383A",
    justifyContent: "center",
    alignItems: "center",
  },
});
