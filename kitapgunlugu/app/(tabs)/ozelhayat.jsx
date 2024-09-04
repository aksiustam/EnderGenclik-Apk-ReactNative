import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Alert,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { Feather } from "@expo/vector-icons";
import TextCard from "../../components/Card/TextCard";
import axios from "axios";

const OzelHayatPage = () => {
  const [yazar, setYazar] = useState([]);
  useEffect(() => {
    const getYazarlar = async () => {
      await axios
        .get(`https://ender.aydtanitim.com/api/yazarlar`)
        .then((response) => {
          const data = response.data;
          setYazar(data);
        })
        .catch((error) => {
          Alert.alert(
            "İnternet veya Server Hatası",
            "Lütfen internet bağlantınızı kontrol edin." + error,
            [{ text: "Tamam" }]
          );
        });
    };
    getYazarlar();
  }, []);

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
                ÖZEL HAYATLAR
              </Text>
            </View>
            <Link href={"/home"} asChild>
              <TouchableOpacity style={styles.menubox}>
                <Feather name="menu" size={50} color="white" />
              </TouchableOpacity>
            </Link>
          </View>
          <View className="flex-1 items-center">
            <FlatList
              data={yazar}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <TextCard data={item} />}
              ListHeaderComponent={() => (
                <View className="flex my-3 px-4 space-y-2">
                  <View className="flex items-start flex-row mb-1">
                    <Text className="font-gmedium text-2xl text-white">
                      Dönemin Seçkin ve Özel Müslümanları
                    </Text>
                  </View>
                </View>
              )}
            />
          </View>
        </ScrollView>
      </LinearGradient>
    </View>
  );
};

export default OzelHayatPage;

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
