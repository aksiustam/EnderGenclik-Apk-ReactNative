import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { Feather } from "@expo/vector-icons";
import axios from "axios";

const KitapIstekPage = () => {
  const [name, setName] = useState("");
  const [kitap, setKitap] = useState("");
  const [yazar, setYazar] = useState("");
  const [yayinevi, setYayinevi] = useState("");
  const [loading, setLoading] = useState(false);
  const sendMail = async () => {
    setLoading(true);
    if (name === "" && kitap === "" && yazar === "" && yayinevi === "") {
      await Alert.alert("Hata", "Lütfen Bilgileri Doldurun", [
        { text: "Tamam" },
      ]);
      setLoading(false);
      return;
    }
    const formData = {
      name: name,
      kitap: kitap,
      yazar: yazar,
      yayinevi: yayinevi,
    };
    await axios
      .post(`https://ender.aydtanitim.com/api/bookoneri`, formData)
      .then((res) => {
        Alert.alert(
          "Başarılı",
          "Kitap talebiniz başarıyla kaydedildi. Kitabın uygunluğu incelendikten sonra yayınevinin onayı ve gereken şartların karşılanması durumunda kütüphanemize eklenmesi mümkün olacaktır.",
          [{ text: "Tamam" }]
        );
      })
      .catch((error) => {
        Alert.alert(
          "İnternet veya Server Hatası",
          "Lütfen internet bağlantınızı kontrol edin." + error,
          [{ text: "Tamam" }]
        );
      })
      .finally(() => setLoading(false));
  };
  return (
    <View className="flex-1">
      <LinearGradient
        colors={["#0B4455", "#086D65"]}
        style={{ flex: 1, zIndex: -5 }}
        start={{ x: 0.1, y: 0.1 }}
        end={{ x: 0.9, y: 0.9 }}
        locations={[0.1, 0.7]}
      >
        <ScrollView className="flex-1 mb-4">
          <View style={{ paddingTop: 140 }}>
            <View style={styles.topbar}>
              <Text
                numberOfLines={1}
                adjustsFontSizeToFit
                style={styles.topbartext}
              >
                KİTAP İSTEK
              </Text>
            </View>
            <Link href={"/home"} asChild>
              <TouchableOpacity style={styles.menubox}>
                <Feather name="menu" size={50} color="white" />
              </TouchableOpacity>
            </Link>
          </View>
          <View className="flex-1 items-center mx-8">
            <View className="space-y-2 mb-4">
              <Text className="text-2xl text-gray-100 font-gregular">
                İsim Soyisim
              </Text>

              <View className="w-full h-14 px-4 bg-black-100 rounded-2xl border-2 border-black-200 focus:border-black flex flex-row items-center">
                <TextInput
                  className="flex-1 text-white font-gmedium text-xl"
                  value={name}
                  placeholder={"İsim Soyisim"}
                  placeholderTextColor="#7B7B8B"
                  onChangeText={(e) => setName(e)}
                />
              </View>
            </View>
            <View className="space-y-2 mb-4">
              <Text className="text-2xl text-gray-100 font-gregular">
                Kitap İsmi
              </Text>

              <View className="w-full h-14 px-4 bg-black-100 rounded-2xl border-2 border-black-200 focus:border-black flex flex-row items-center">
                <TextInput
                  className="flex-1 text-white font-gmedium text-xl"
                  value={kitap}
                  placeholder={"Kitap İsmi"}
                  placeholderTextColor="#7B7B8B"
                  onChangeText={(e) => setKitap(e)}
                />
              </View>
            </View>
            <View className="space-y-2 mb-4">
              <Text className="text-2xl text-gray-100 font-gregular">
                Yazar Adı
              </Text>

              <View className="w-full h-14 px-4 bg-black-100 rounded-2xl border-2 border-black-200 focus:border-black flex flex-row items-center">
                <TextInput
                  className="flex-1 text-white font-gmedium text-xl"
                  value={yazar}
                  placeholder={"Yazar Adı"}
                  placeholderTextColor="#7B7B8B"
                  onChangeText={(e) => setYazar(e)}
                />
              </View>
            </View>
            <View className="space-y-2 mb-8">
              <Text className="text-2xl text-gray-100 font-gregular">
                Yayınevi
              </Text>

              <View className="w-full h-14 px-4 bg-black-100 rounded-2xl border-2 border-black-200 focus:border-black flex flex-row items-center">
                <TextInput
                  className="flex-1 text-white font-gmedium text-xl"
                  value={yayinevi}
                  placeholder={"Yayınevi"}
                  placeholderTextColor="#7B7B8B"
                  onChangeText={(e) => setYayinevi(e)}
                />
              </View>
            </View>
            <View className="w-full">
              <TouchableOpacity
                onPress={sendMail}
                activeOpacity={0.7}
                className={`bg-black-100 rounded-xl min-h-[62px] flex flex-row justify-center items-center  ${
                  loading ? "opacity-50" : ""
                }`}
                disabled={loading}
              >
                <Text className={`text-gray-50 font-gmedium text-3xl `}>
                  Gönder
                </Text>

                {loading && (
                  <ActivityIndicator
                    animating={loading}
                    color="#fff"
                    size="small"
                    className="ml-2"
                  />
                )}
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </View>
  );
};

export default KitapIstekPage;

const styles = StyleSheet.create({
  topbar: {
    position: "absolute",
    backgroundColor: "white",
    width: Dimensions.get("window").width / 1.4,
    paddingTop: 50,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 45,
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
