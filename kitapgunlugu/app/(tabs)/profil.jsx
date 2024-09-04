import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Alert,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { useGlobalContext } from "../../context/GlobalProvider";
import { Link } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const ProfilPage = () => {
  const { user, setUser } = useGlobalContext();

  const [name, setName] = useState(user?.name);

  const okumaYuzde = () => {
    const lastDate = new Date(user.createdAt);
    const myDate = new Date();
    const dateDifferenceInMs = myDate - lastDate;

    let daysDifference = Math.ceil(dateDifferenceInMs / (1000 * 60 * 60 * 24));
    if (daysDifference === 0) daysDifference = 1;
    const activity = user.activity;
    const yuzde = ((activity / daysDifference) * 100).toFixed(0);
    return yuzde;
  };

  const changeName = async () => {
    let bucket = user;

    bucket.name = name;
    await AsyncStorage.setItem("@AuthData", JSON.stringify(bucket));
    setUser(bucket);

    const formData = {
      name: bucket.name,
      bildirim: bucket.bildirim,
      sayfa: bucket.sayfa,
      kitap: bucket.kitap,
      activity: bucket.activity,
    };
    await axios
      .put(`https://ender.aydtanitim.com/api/user/${user.id}`, formData)
      .then()
      .catch((error) => {
        Alert.alert(
          "İnternet veya Server Hatası",
          "Lütfen internet bağlantınızı kontrol edin." + error,
          [{ text: "Tamam" }]
        );
      });
    Alert.alert("Başarılı", "Bilgileriniz Başarıyla değiştirildi", [
      { text: "Tamam" },
    ]);
  };
  return (
    <SafeAreaView className="flex-1">
      <LinearGradient
        colors={["#0B4455", "#086D65"]}
        style={{ flex: 1 }}
        start={{ x: 0.1, y: 0.1 }}
        end={{ x: 0.9, y: 0.9 }}
        locations={[0.1, 0.7]}
      >
        <ScrollView className="flex-1 mb-4">
          <View style={styles.header}>
            <View style={styles.topbar}>
              <Text
                numberOfLines={1}
                adjustsFontSizeToFit
                style={styles.topbartext}
              >
                PROFİLİM
              </Text>
            </View>
            <Link href={"/home"} asChild>
              <TouchableOpacity style={styles.menubox}>
                <Feather name="menu" size={50} color="white" />
              </TouchableOpacity>
            </Link>
          </View>
          <View className="flex flex-row ml-7">
            <View className="bg-white w-36 h-36 rounded-full border-2 border-black justify-center items-center">
              <MaterialIcons
                name="add-photo-alternate"
                size={50}
                color="black"
              />
            </View>
            <View className="items-center justify-center ml-4">
              <TextInput
                className=" text-white font-gmedium text-4xl"
                value={name}
                onChangeText={(e) => setName(e)}
                onBlur={() => changeName()}
              />
            </View>
          </View>
          <View className="mx-8 mt-8 items-center bg-white rounded-3xl border-4 border-gray-500">
            <Text className="font-gmedium text-5xl mt-2">BİLGİLERİM</Text>
            <View className="flex-row mt-4 space-x-8">
              <View className="items-center">
                <Text className="font-gregular text-3xl underline">
                  Okunan Sayfa
                </Text>
                <Text className="font-gregular text-3xl">{user?.sayfa}</Text>
              </View>
              <View className="items-center">
                <Text className="font-gregular text-3xl underline">
                  Okunan Kitap
                </Text>
                <Text className="font-gregular text-3xl">{user?.kitap}</Text>
              </View>
            </View>
            <View className="flex-row mt-4 space-x-8">
              <View className="items-center">
                <Text className="font-gregular text-3xl underline">
                  Düzenli Okuma
                </Text>
                <Text className="font-gregular text-3xl">{okumaYuzde()}%</Text>
              </View>
            </View>

            <View className="p-3 mt-6 border border-black bg-[#0E756C] rounded-3xl">
              <Text className="font-gregular text-2xl text-white">
                Hata, İstek veya Şikayet İçin;
              </Text>
            </View>
            <View className="p-3 border border-black bg-[#0E756C] rounded-b-3xl mb-4">
              <Text className="font-gregular text-2xl text-white">
                Tıklayınız
              </Text>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default ProfilPage;

const styles = StyleSheet.create({
  header: { paddingTop: 140 },
  topbar: {
    position: "absolute",
    backgroundColor: "white",
    width: Dimensions.get("window").width / 1.4,
    paddingTop: 50,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 25,
    borderBottomEndRadius: 50,
  },
  topbartext: { fontSize: 36, color: "#005259", fontWeight: "600" },
  menubox: {
    position: "absolute",
    zIndex: 5,
    top: Dimensions.get("window").height * 0.06,
    left: Dimensions.get("window").width * 0.81,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});
