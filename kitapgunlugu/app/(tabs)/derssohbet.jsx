import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";
import axios from "axios";
import { Link, router } from "expo-router";

const DersSohbetPage = () => {
  const [videodata, setVideoData] = useState([]);

  useEffect(() => {
    const getVideos = async () => {
      await axios
        .get("https://ender.aydtanitim.com/api/video")
        .then((response) => {
          const data = response.data.filter((item) => item.short === false);
          setVideoData(data);
        })
        .catch((err) => console.log("Hata " + err));
    };

    getVideos();
  }, []);

  const gotoVideo = (item) => {
    router.navigate({
      pathname: "/videosayfa",
      params: {
        data: JSON.stringify(item),
      },
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient
        colors={["#0B4455", "#086D65"]}
        style={{ flex: 1, zIndex: -5 }}
        start={{ x: 0.1, y: 0.1 }}
        end={{ x: 0.9, y: 0.9 }}
        locations={[0.1, 0.7]}
      >
        <ScrollView className="flex-1 mb-4">
          <View style={{ paddingTop: 130 }}>
            <View style={styles.topbar}>
              <Text
                numberOfLines={1}
                adjustsFontSizeToFit
                style={styles.topbartext}
              >
                DERS VİDEOLARI
              </Text>
            </View>
            <Link href={"/home"} asChild>
              <TouchableOpacity style={styles.menubox}>
                <Feather name="menu" size={50} color="white" />
              </TouchableOpacity>
            </Link>
          </View>
          <View className="flex-1 flex flex-row flex-wrap">
            {videodata.map((item) => {
              return (
                <View
                  key={item.id}
                  className="w-[100px] h-[100px] m-2 justify-center items-center bg-[#06383A] rounded-xl"
                >
                  <TouchableOpacity
                    className="flex-1 items-center justify-center"
                    onPress={() => gotoVideo(item)}
                  >
                    <Image
                      source={require("../../assets/icon/video.png")}
                      className="w-12 h-12"
                      resizeMode="contain"
                    />
                    <Text
                      adjustsFontSizeToFit
                      numberOfLines={2}
                      className="text-[#FBE116] font-gregular text-center mt-2 px-4"
                    >
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default DersSohbetPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },

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
  topbartext: { fontSize: 30, color: "#005259", fontWeight: "600" },
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
