import { View, Text } from "react-native";

const TextCard = ({ data }) => {
  return (
    <View className="flex flex-col items-center px-4 mb-14">
      <View className="flex flex-row items-start bg-[#0d9f6a] rounded-3xl py-1">
        <View className="flex justify-center flex-1 ml-3">
          <Text className="font-gregular text-2xl text-white" numberOfLines={1}>
            {data.name}
          </Text>
          <Text
            className="text-xl text-gray-50 font-gregular"
            numberOfLines={1}
          >
            {data.tarih}
          </Text>
        </View>
      </View>

      <View className="w-full h-72 rounded-xl mt-3 relative">
        <Text className="text-white font-gregular text-xl mb-2">
          {data.text}
        </Text>
        <Text className="text-white font-gregular text-xl mb-2">
          {data.text1}
        </Text>
      </View>
    </View>
  );
};

export default TextCard;
