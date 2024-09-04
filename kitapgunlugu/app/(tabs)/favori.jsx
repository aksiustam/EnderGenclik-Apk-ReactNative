import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";
import axios from "axios";
import MarqueeText from "react-native-marquee";
import { Link, router } from "expo-router";
import { useGlobalContext } from "../../context/GlobalProvider";

const FavoriPage = () => {
  const { user } = useGlobalContext();
  const [userbook, setUserBook] = useState([]);

  useEffect(() => {
    const getUserBooks = async () => {
      await axios
        .get(`https://ender.aydtanitim.com/api/user/${user.id}`)
        .then((response) => {
          const data = response.data;
          setUserBook(data?.Book);
        })
        .catch((error) => {
          Alert.alert(
            "İnternet veya Server Hatası",
            "Lütfen internet bağlantınızı kontrol edin." + error,
            [{ text: "Tamam" }]
          );
        });
    };
    getUserBooks();
  }, []);

  const gotoRead = async (data) => {
    router.navigate({
      pathname: "/bookread",
      params: {
        data: JSON.stringify(data),
      },
    });
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient
        colors={["#0B4455", "#086D65"]}
        style={{ flex: 1 }}
        start={{ x: 0.1, y: 0.1 }}
        end={{ x: 0.9, y: 0.9 }}
        locations={[0.1, 0.7]}
      >
        <View style={styles.topbar}>
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit
            style={styles.topbartext}
          >
            FAVORİLERİM
          </Text>
        </View>
        <Link href={"/home"} asChild>
          <TouchableOpacity style={styles.menubox}>
            <Feather name="menu" size={50} color="white" />
          </TouchableOpacity>
        </Link>
        <View style={styles.container}>
          <ScrollView
            style={{ flex: 1 }}
            horizontal={true}
            nestedScrollEnabled={true}
            contentContainerStyle={{
              flexGrow: 1,
              flexWrap: "wrap",
              width: "100%",
              marginTop: 130,
              marginLeft: 20,
            }}
          >
            {userbook?.map((item) => {
              return (
                <View key={item.id} style={styles.view}>
                  <TouchableOpacity onPress={() => gotoRead(item)}>
                    <View
                      style={{
                        width: 104,
                        height: "60%",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "stretch",
                      }}
                    >
                      <Image
                        source={{
                          uri: item.imageurl,
                        }}
                        style={{
                          flex: 1,
                          flexGrow: 1,
                          resizeMode: "center",
                        }}
                      />
                      <View
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <MarqueeText
                          style={{
                            color: "white",
                            fontSize: 14,
                          }}
                          speed={0.1}
                          marqueeOnStart={true}
                          loop={true}
                          delay={1000}
                        >
                          {item.name}
                        </MarqueeText>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            })}
          </ScrollView>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default FavoriPage;

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
