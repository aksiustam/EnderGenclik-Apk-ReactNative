import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useRef, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import AuthCard1 from "../../components/Auth/AuthCard1";
import AuthCard2 from "../../components/Auth/AuthCard2";
import AuthCard3 from "../../components/Auth/AuthCard3";
import AuthCard4 from "../../components/Auth/AuthCard4";
import AuthCard5 from "../../components/Auth/AuthCard5";
import * as Device from "expo-device";
import { useGlobalContext } from "../../context/GlobalProvider";
const AuthPage = () => {
  const flatListRef = useRef(null);

  const scrollToEnd = () => {
    flatListRef.current.scrollToEnd({ animated: true });
  };
  const [check, setCheck] = useState(false);
  const array = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];

  const [page, setPage] = useState(2);
  const [date, setDate] = useState(new Date());

  const renderCard = (id) => {
    switch (id) {
      case 1:
        return <AuthCard1 id={id} />;

      case 2:
        return <AuthCard2 id={id} />;

      case 3:
        return <AuthCard3 id={id} />;

      case 4:
        return <AuthCard4 id={id} />;

      case 5:
        return (
          <AuthCard5
            id={id}
            page={page}
            setPage={setPage}
            date={date}
            setDate={setDate}
          />
        );

      default:
        break;
    }
  };

  const onViewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      const currentId = viewableItems[0].item.id;
      setCheck(currentId === array.length);
    }
  };

  const { signIn } = useGlobalContext();
  const setAuth = async () => {
    const deviceID =
      Device.osInternalBuildId || Device.osBuildId || `unique-id-${Date.now()}`;

    await signIn(date, page, deviceID);
  };

  return (
    <>
      <LinearGradient
        colors={["#0B4455", "#086D65"]}
        start={{ x: 0.1, y: 0.1 }}
        end={{ x: 0.9, y: 0.9 }}
        locations={[0.1, 0.7]}
        className="flex-1"
      >
        <View className="w-full h-full items-center  relative">
          <View style={styles.fixcontainer} className="pt-8 justify-start">
            <Text numberOfLines={1} adjustsFontSizeToFit style={styles.textbig}>
              Kolay Okuma
            </Text>

            <Text
              numberOfLines={1}
              adjustsFontSizeToFit
              style={styles.textsmall}
            >
              UYGULAMASI
            </Text>
          </View>
          <View className="w-full h-[82vh] items-center justify-center">
            <View className="w-full h-[38vh]">
              <FlatList
                ref={flatListRef}
                data={array}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => renderCard(item.id)}
                horizontal
                snapToInterval={Dimensions.get("window").width}
                snapToAlignment="center"
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onViewableItemsChanged={onViewableItemsChanged}
                viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
                decelerationRate={0.2}
                scrollEventThrottle={32}
              />
            </View>
            <View>
              {check ? (
                <TouchableOpacity onPress={() => setAuth()}>
                  <Text className="text-5xl font-gbold text-white underline">
                    DEVAM
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={() => scrollToEnd()}>
                  <Text className="text-5xl font-gbold text-white underline">
                    ATLA
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </LinearGradient>
    </>
  );
};

const styles = StyleSheet.create({
  fixcontainer: {
    width: Dimensions.get("window").width / 1.4,
    height: Dimensions.get("window").height / 8,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderBottomStartRadius: 50,
    borderBottomEndRadius: 50,
  },
  textbig: { fontSize: 36, color: "black", fontWeight: "bold" },
  textsmall: {
    position: "relative",
    transform: [{ translateX: 50 }, { translateY: -10 }],
    letterSpacing: 3,
    fontSize: 13,
    color: "#086D65",
    fontWeight: "bold",
  },
});
export default AuthPage;
