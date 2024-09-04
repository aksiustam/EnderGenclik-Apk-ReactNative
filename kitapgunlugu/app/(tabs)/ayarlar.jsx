import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Button,
  TouchableOpacity,
  Dimensions,
  useWindowDimensions,
  Alert,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { Feather } from "@expo/vector-icons";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import Modal from "react-native-modal";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link } from "expo-router";
import { useGlobalContext } from "../../context/GlobalProvider";
import axios from "axios";

const AyarlarPage = () => {
  const { width, height } = useWindowDimensions();
  const [font, setFont] = useState("");
  const [index, setIndex] = useState(1);
  const { user, setUser } = useGlobalContext();

  useEffect(() => {
    const getFont = async () => {
      const getfont = await AsyncStorage.getItem(`@FontSize`);
      if (getfont === "10px") {
        setFont("Küçük");
        setIndex(1);
      } else if (getfont === "16px") {
        setFont("Orta");
        setIndex(2);
      } else if (getfont === "20px") {
        setFont("Büyük");
        setIndex(0);
      } else {
        setFont("Küçük");
        setIndex(1);
      }
    };
    const getUserData = () => {
      setPage(user?.bildirim?.page);
      let date = new Date();
      date.setHours(user?.bildirim?.hours);
      date.setMinutes(user?.bildirim?.minutes);
      setDate(date);
    };
    getFont();
    getUserData();
  }, [user]);
  const FontSize = async () => {
    if (index === 0) {
      setIndex(index + 1);
      await AsyncStorage.setItem(`@FontSize`, "10px");
      setFont("Küçük");
    } else if (index === 1) {
      setIndex(index + 1);
      await AsyncStorage.setItem(`@FontSize`, "16px");
      setFont("Orta");
    } else if (index === 2) {
      setIndex(0);
      await AsyncStorage.setItem(`@FontSize`, "20px");
      setFont("Büyük");
    }
  };
  const [page, setPage] = useState(2);
  const [date, setDate] = useState(new Date());

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  const showTimepicker = () => {
    DateTimePickerAndroid.open({
      value: date,
      datePickerModeAndroid: "default",
      onChange,
      display: "spinner",
      mode: "time",
    });
  };

  const setNotification = async () => {
    let bucket = user;
    const hours = date.getHours();
    const minutes = date.getMinutes();

    const bildirim = {
      hours: hours,
      minutes: minutes,
      page: page,
    };
    bucket.bildirim = bildirim;
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
    setModalVisible(false);
  };
  const [isModalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaView className="flex-1">
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
                AYARLAR
              </Text>
            </View>
            <Link href={"/home"} asChild>
              <TouchableOpacity style={styles.menubox}>
                <Feather name="menu" size={50} color="white" />
              </TouchableOpacity>
            </Link>
          </View>
          <View className="flex-1 items-center">
            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              className="w-[300px] px-2 py-2 mb-3 items-center bg-white rounded-3xl"
            >
              <Text className="font-gbold text-[#005259] text-3xl tracking-widest">
                Bildirimler
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={FontSize}
              className="w-[300px] px-2 py-2 mb-3 items-center bg-white rounded-3xl"
            >
              <Text className="font-gbold text-[#005259] text-3xl tracking-widest">
                Yazı Boyutu = {font}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </LinearGradient>

      <Modal
        isVisible={isModalVisible}
        backdropOpacity={0.35}
        style={{ margin: 0 }}
        statusBarTranslucent
        onBackdropPress={() => {
          setModalVisible(false);
        }}
        onBackButtonPress={() => {
          setModalVisible(false);
        }}
        deviceWidth={width}
        deviceHeight={height * 2}
      >
        <View className="w-68 h-80 bg-white self-center relative px-4 rounded-3xl">
          <View className="flex-1 items-center justify-center space-y-4">
            <Text className="font-gbold text-4xl text-center">SAAT</Text>
            <TouchableOpacity
              className="bg-white px-6 pb-1 shadow-lg shadow-black"
              onPress={showTimepicker}
            >
              <Text className="font-gbold text-4xl text-center">
                {("0" + date.getHours()).slice(-2)}:
                {("0" + date.getMinutes()).slice(-2)}
              </Text>
            </TouchableOpacity>
            <Text className="font-gbold text-4xl text-center">
              SAYFA SAYISI
            </Text>
            <View className="flex-row space-x-3">
              <TouchableOpacity
                className="bg-white px-3 pb-1 shadow-lg shadow-black"
                style={{ backgroundColor: page === 2 ? "#086D65" : "white" }}
                onPress={() => setPage(2)}
              >
                <Text className="font-gbold text-3xl text-center">2</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="bg-white px-3 pb-1 shadow-lg shadow-black"
                style={{ backgroundColor: page === 3 ? "#086D65" : "white" }}
                onPress={() => setPage(3)}
              >
                <Text className="font-gbold text-3xl text-center">3</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="bg-white px-3 pb-1 shadow-lg shadow-black"
                style={{ backgroundColor: page === 4 ? "#086D65" : "white" }}
                onPress={() => setPage(4)}
              >
                <Text className="font-gbold text-3xl text-center">4</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="bg-white px-3 pb-1 shadow-lg shadow-black"
                style={{ backgroundColor: page === 5 ? "#086D65" : "white" }}
                onPress={() => setPage(5)}
              >
                <Text className="font-gbold text-3xl text-center">5</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="bg-white px-3 pb-1 shadow-lg shadow-black"
                style={{ backgroundColor: page === 10 ? "#086D65" : "white" }}
                onPress={() => setPage(10)}
              >
                <Text className="font-gbold text-3xl text-center">10</Text>
              </TouchableOpacity>
            </View>
            <View className="pt-4">
              <Button
                title="Bildirim Oluştur"
                onPress={() => {
                  setModalVisible(false);
                  setNotification();
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default AyarlarPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  modalcontainer: {
    width: 220,
    height: 280,
    backgroundColor: "white",
    position: "relative",
    alignSelf: "center",
    padding: 15,
    justifyContent: "space-between",
    flexDirection: "column",
    borderRadius: 30,
  },
  upcontainer: {
    marginTop: 15,
    alignItems: "center",
    justifyContent: "center",
  },

  box: {
    paddingHorizontal: 12,
    marginHorizontal: 4,
    borderRadius: 10,
    borderWidth: 1,
  },

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
