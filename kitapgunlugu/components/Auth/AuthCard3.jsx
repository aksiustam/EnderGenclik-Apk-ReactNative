import { View, Text } from "react-native";
import React from "react";

const AuthCard3 = ({ id }) => {
  return (
    <View className="w-screen flex justify-center items-center">
      <View className="bg-[#F7F7F7] rounded-3xl w-72 h-72 items-center justify-center">
        <View className="bg-white w-64 h-64 rounded-3xl shadow-xl shadow-black relative">
          <View className="flex-1 justify-center items-center flex-col space-y-8">
            <View className="w-full h-48 justify-center items-center">
              <Text className="text-black font-gmedium text-[32px] text-center px-3">
                Kolay Okuma Uygulamasında Günlük Belirlediğiniz Kitap Üzerinden
                En az 2 Sayfa ile Sizlerle Yılda 730 Sayfa Okuyabiliriz.
              </Text>
            </View>

            <View className="flex-row gap-1">
              <View
                className={`w-2 h-2 rounded-full ${
                  id === 1 ? "bg-black" : "bg-[#989899]"
                }`}
              ></View>
              <View
                className={`w-2 h-2 rounded-full ${
                  id === 2 ? "bg-black" : "bg-[#989899]"
                }`}
              ></View>
              <View
                className={`w-2 h-2 rounded-full ${
                  id === 3 ? "bg-black" : "bg-[#989899]"
                }`}
              ></View>
              <View
                className={`w-2 h-2 rounded-full ${
                  id === 4 ? "bg-black" : "bg-[#989899]"
                }`}
              ></View>
              <View
                className={`w-2 h-2 rounded-full ${
                  id === 5 ? "bg-black" : "bg-[#989899]"
                }`}
              ></View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default AuthCard3;
