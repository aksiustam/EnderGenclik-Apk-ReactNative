import axios from "axios";
import { router } from "expo-router";
import { View, Text, TouchableOpacity, Image, Alert } from "react-native";

const BookCard = ({ data }) => {
  const gotoRead = async (data) => {
    await axios
      .get(`https://ender.aydtanitim.com/api/book/${data?.id}`)
      .catch((error) => {
        Alert.alert(
          "İnternet veya Server Hatası",
          "Lütfen internet bağlantınızı kontrol edin." + error,
          [{ text: "Tamam" }]
        );
      });

    router.navigate({
      pathname: "/bookread",
      params: {
        data: JSON.stringify(data),
      },
    });
  };

  return (
    <View className="flex-1 flex-row items-center px-4 ">
      <TouchableOpacity
        activeOpacity={0.7}
        className="w-36 h-40 rounded-xl my-3 relative flex justify-center items-center"
        onPress={() => gotoRead(data)}
      >
        <Image
          source={{ uri: data.imageurl }}
          className="w-full h-full rounded-xl"
          resizeMode="contain"
        />
      </TouchableOpacity>

      <View className="flex-1 my-3">
        <View className="flex justify-start items-start flex-col p-1 flex-1">
          <Text className="font-gmedium text-2xl text-white" numberOfLines={3}>
            {data?.name}
          </Text>
          <Text
            className="text-xl text-gray-100 font-gregular"
            numberOfLines={1}
          >
            {data?.yazar}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default BookCard;
