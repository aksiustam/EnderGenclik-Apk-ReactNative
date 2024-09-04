import { View, Text, FlatList } from "react-native";
import React from "react";

const AuthCard4 = ({ id }) => {
  return (
    <View className="w-screen flex justify-center items-center">
      <View className="bg-[#F7F7F7] rounded-3xl w-72 h-72 items-center justify-center">
        <View className="bg-white w-64 h-64 rounded-3xl shadow-xl shadow-black relative">
          <View className="flex-1 justify-center items-center flex-col space-y-2">
            <View className="w-full h-56 justify-center items-center">
              <Text className="text-black font-gbold text-4xl text-center px-6">
                HADİ BAŞLAYALIM
              </Text>
              <FlatList
                data={[
                  { key: "\u2022 Bildirimleri Aç" },
                  { key: "\u2022 Kitap Seç" },
                  { key: "\u2022 Saatini Belirle" },
                  { key: "\u2022 O Saatte Bildirimini Al" },
                  { key: "\u2022 Kitap Okumaya Başla" },
                ]}
                renderItem={({ item }) => (
                  <Text numberOfLines={1} className="text-3xl font-gmedium">
                    {item.key}
                  </Text>
                )}
              />
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

export default AuthCard4;
