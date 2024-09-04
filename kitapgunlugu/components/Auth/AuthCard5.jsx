import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";

const AuthCard5 = ({ id, page, date, setDate, setPage }) => {
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
  return (
    <View className="w-screen flex justify-center items-center">
      <View className="bg-[#F7F7F7] rounded-3xl w-72 h-72 items-center justify-center">
        <View className="bg-white w-64 h-64 rounded-3xl shadow-xl shadow-black relative">
          <View className="flex-1 justify-center items-center flex-col space-y-8">
            <View className="w-full h-48 justify-center items-center space-y-3">
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

export default AuthCard5;
