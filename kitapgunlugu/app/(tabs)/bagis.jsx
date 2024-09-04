import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import * as Clipboard from "expo-clipboard";
import { Feather } from "@expo/vector-icons";

const BagisPage = () => {
  const copyToClipboard = async () => {
    await Clipboard.setStringAsync("TR123123123123123123");
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
                BAĞIŞ YAP
              </Text>
            </View>
            <Link href={"/home"} asChild>
              <TouchableOpacity style={styles.menubox}>
                <Feather name="menu" size={50} color="white" />
              </TouchableOpacity>
            </Link>
          </View>
          <View className="flex-1 items-center mx-8">
            <Text className="text-white text-3xl font-gmedium mb-6 text-center">
              Aşşağıdaki ibanlardan bize destek olabilirsiniz
            </Text>
            <View className="space-y-2 mb-4">
              <Text className="text-3xl text-white font-gregular">
                Hasan Basri AYDIN
              </Text>

              <View className="flex flex-row items-center space-x-4 w-full h-14 px-4 bg-black-100 rounded-2xl border-2 border-black-200">
                <TextInput
                  className="text-base mt-0.5 text-white flex-1 font-pregular"
                  value={"TR123123123123123123"}
                  editable={false}
                  selectTextOnFocus={false}
                />

                <TouchableOpacity onPress={() => copyToClipboard()}>
                  <Feather name="copy" size={24} color="white" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </View>
  );
};

export default BagisPage;

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
