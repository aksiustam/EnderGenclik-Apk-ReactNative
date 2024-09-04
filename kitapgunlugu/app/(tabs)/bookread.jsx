import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Reader, ReaderProvider, useReader } from "@epubjs-react-native/core";
import { useFileSystem } from "@epubjs-react-native/expo-file-system";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Feather } from "@expo/vector-icons";
import Loader from "../../components/Books/Loader";
import Rendered from "../../components/Books/Rendered";
import { Link, useLocalSearchParams, useNavigation } from "expo-router";
import axios from "axios";
import { useGlobalContext } from "../../context/GlobalProvider";
import AntDesign from "@expo/vector-icons/AntDesign";

function Inner(props) {
  const book = props.book;
  const { user, setUser } = useGlobalContext();

  const bookURL = book.epuburl;
  const [page, setPage] = useState(0);
  const [pagecfi, setPageCfi] = useState();
  const navigation = useNavigation();

  const [font, setFont] = useState("16px");
  const { changeFontSize, getCurrentLocation } = useReader();

  const BookFinish = async () => {
    let bucket = user;

    bucket.kitap += 1;

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
  };

  const Pageupcount = async () => {
    const cfi = getCurrentLocation();
    setPage((prev) => prev + 1);
    await AsyncStorage.setItem(
      `@BookData&${book.id}`,
      JSON.stringify(cfi.start.cfi)
    );
  };

  const Pagedowncount = async () => {
    const cfi = getCurrentLocation();
    setPage((prev) => (prev !== 0 ? prev - 1 : prev));
    await AsyncStorage.setItem(
      `@BookData&${book.id}`,
      JSON.stringify(cfi.start.cfi)
    );
  };

  const changePage = async (mypage) => {
    if (mypage !== 0) {
      let bucket = user;

      bucket.sayfa += mypage;

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
    }
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener("beforeRemove", () => {
      changePage(page);
    });

    return unsubscribe;
  }, [page, navigation]);

  useEffect(() => {
    const loadPage = async () => {
      try {
        const loadcfi = await AsyncStorage.getItem(`@BookData&${book.id}`);
        const loadfont = await AsyncStorage.getItem(`@FontSize`);

        setFont(loadfont);
        setPageCfi(JSON.parse(loadcfi));
      } catch (error) {
        console.error("Error loading counter from AsyncStorage:", error);
      }
    };

    const checkIfOpenedToday = async () => {
      const now = new Date();
      const today = now.toISOString().split("T")[0];

      try {
        const lastOpenedDate = await AsyncStorage.getItem("lastOpenedDate");
        if (lastOpenedDate !== today) {
          await AsyncStorage.setItem("lastOpenedDate", today);

          addActivity();
        }
      } catch (error) {
        console.error("AsyncStorage error: ", error);
      }
    };
    checkIfOpenedToday();
    loadPage();
  }, []);

  const addActivity = async () => {
    let bucket = user;

    bucket.activity += 1;

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
  };

  const addFavori = async () => {
    const formData = {
      bookid: book.id,
    };
    await axios
      .post(`https://ender.aydtanitim.com/api/user/${user?.id}`, formData)
      .then((res) => {
        if (res.data) Alert.alert("Başarılı", "Başarıyla Favorilere eklendi");
      })
      .catch((error) => {
        Alert.alert(
          "İnternet veya Server Hatası",
          "Lütfen internet bağlantınızı kontrol edin." + error,
          [{ text: "Tamam" }]
        );
      });
  };
  return (
    <>
      <View className="flex-1 bg-white">
        <View style={styles.header}>
          <View style={styles.topbar}>
            <Text
              numberOfLines={1}
              adjustsFontSizeToFit
              style={styles.topbartext}
            >
              {book.name}
            </Text>
          </View>
          <Link href={"/home"} asChild>
            <TouchableOpacity style={styles.menubox}>
              <Feather name="menu" size={50} color="#0B4455" />
            </TouchableOpacity>
          </Link>
        </View>
        <SafeAreaView className="flex-1 -z-10">
          <View className="w-full h-full mt-5 ">
            <View className="absolute z-20 top-6 right-2">
              <TouchableOpacity
                className="flex-1 border-[0.5px] border-black rounded-full p-1 opacity-60"
                onPress={() => addFavori()}
              >
                <AntDesign name="star" size={40} color="black" />
              </TouchableOpacity>
            </View>
            <Reader
              src={bookURL}
              width={"100%"}
              height={"100%"}
              fileSystem={useFileSystem}
              onReady={() => changeFontSize(font)}
              onSwipeLeft={Pageupcount}
              onSwipeRight={Pagedowncount}
              onFinish={BookFinish}
              initialLocation={pagecfi}
              renderLoadingFileComponent={Loader}
              renderOpeningBookComponent={Rendered}
            />
          </View>
        </SafeAreaView>
      </View>
    </>
  );
}

const BookReadPage = () => {
  const { data } = useLocalSearchParams();
  const book = JSON.parse(data);

  return (
    <ReaderProvider>
      <Inner book={book} />
    </ReaderProvider>
  );
};

export default BookReadPage;
const styles = StyleSheet.create({
  header: {
    paddingTop: Dimensions.get("window").height * 0.08,
  },
  topbar: {
    position: "absolute",
    backgroundColor: "#0B4455",
    marginTop: 44,
    width: Dimensions.get("window").width * 0.76,
    height: Dimensions.get("window").height * 0.066,
    paddingLeft: 10,
    justifyContent: "center",
  },
  topbartext: { fontSize: 24, color: "yellow", fontWeight: "600" },
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
