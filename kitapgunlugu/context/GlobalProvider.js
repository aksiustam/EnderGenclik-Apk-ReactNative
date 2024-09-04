import { createContext, useContext, useState, useEffect } from "react";
import { Alert, Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import axios from "axios";

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const [logged, setLogged] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const useUser = async () => {
    try {
      setLoading(true);
      const authDataSerialized = await AsyncStorage.getItem("@AuthData");

      if (authDataSerialized !== null) {
        const _authData = JSON.parse(authDataSerialized);

        setUser(_authData);
        setLogged(true);
      } else {
        setLogged(false);
        setUser(null);
      }
    } catch (error) {
      Alert.alert("Error", error);
    } finally {
      //loading finished
      setLoading(false);
    }
  };
  useEffect(() => {
    useUser();
  }, []);

  const signIn = async (date, page, deviceID) => {
    const mydate = new Date(date);
    const hours = mydate.getHours();
    const minutes = mydate.getMinutes();

    let token = null;
    token = await registerForPushNotificationsAsync();
    if (token === null) {
      await Alert.alert(
        "Bildirim Hatası",
        "Bildirimleri onaylamadınız. Lütfen Ayarlardan Bildirimi açın veya Uygulamayı yeniden yükleyin...",
        [{ text: "Tamam" }]
      );
      return;
    }
    const bildirim = {
      hours: hours,
      minutes: minutes,
      page: page,
    };
    const formData = {
      deviceID: deviceID,
      expoToken: token || null,
      bildirim: bildirim,
    };

    try {
      const response = await axios.post(
        "https://ender.aydtanitim.com/api/user",
        formData
      );

      if (response.data) {
        const userdata = response.data;
        await AsyncStorage.setItem("@AuthData", JSON.stringify(userdata));
        setUser(userdata);
        setLogged(true);
      }
    } catch (error) {
      if (error.response && error.response.status === 500) {
        Alert.alert(
          "İnternet Bağlantısı Hatası",
          "Lütfen internet bağlantınızı kontrol edin.",
          [{ text: "Tamam" }]
        );
      }
    }
  };
  return (
    <GlobalContext.Provider
      value={{ logged, setLogged, user, setUser, loading, signIn }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();

      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      token = null;
      return token;
    }

    token = await Notifications.getDevicePushTokenAsync();
    token = token.data;
  } else {
    token = null;
    return token;
  }

  return token;
}
