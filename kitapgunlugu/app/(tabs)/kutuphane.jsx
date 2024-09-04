import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";
import axios from "axios";
import { Link } from "expo-router";
import BookCard from "../../components/Card/BookCard";
import Trending from "../../components/Card/Trending";

const KutuphanePage = () => {
  const [books, setBooks] = useState([]);
  const filterBooks = books.sort((a, b) => b.onclick - a.onclick).slice(0, 6);

  useEffect(() => {
    const getBooks = async () => {
      await axios
        .get("https://ender.aydtanitim.com/api/book")
        .then((response) => {
          const data = response.data;
          setBooks(data);
        })
        .catch((err) => console.log("Hata " + err));
    };
    getBooks();
  }, []);

  return (
    <SafeAreaView className="flex-1">
      <LinearGradient
        colors={["#0B4455", "#086D65"]}
        style={{ flex: 1 }}
        start={{ x: 0.1, y: 0.1 }}
        end={{ x: 0.9, y: 0.9 }}
        locations={[0.1, 0.7]}
      >
        <View>
          <View style={styles.topbar}>
            <Text
              numberOfLines={1}
              adjustsFontSizeToFit
              style={styles.topbartext}
            >
              KÜTÜPHANE
            </Text>
          </View>
          <Link href={"/home"} asChild>
            <TouchableOpacity style={styles.menubox}>
              <Feather name="menu" size={50} color="white" />
            </TouchableOpacity>
          </Link>
        </View>
        <View className="flex-1 mt-28">
          <FlatList
            data={books}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <BookCard data={item} />}
            ListHeaderComponent={() => (
              <View className="flex my-2 px-4 space-y-3">
                <View className="flex justify-between items-start flex-row mt-3">
                  <Text className="text-4xl font-gregularitalic text-white">
                    Popüler Kitaplarımız
                  </Text>
                </View>

                <View className="flex-1">
                  <Trending books={filterBooks ?? []} />
                </View>
              </View>
            )}
          />
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default KutuphanePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  view: {
    height: 150,
    width: 100,
    justifyContent: "center",
    marginVertical: 12,
    marginHorizontal: 5,
  },
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
  topbartext: { fontSize: 36, color: "#005259", fontWeight: "700" },
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
