import { useState } from "react";

import * as Animatable from "react-native-animatable";
import {
  Alert,
  FlatList,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { router } from "expo-router";
import axios from "axios";

const zoomIn = {
  0: {
    scale: 0.9,
  },
  1: {
    scale: 1.1,
  },
};

const zoomOut = {
  0: {
    scale: 1.1,
  },
  1: {
    scale: 0.9,
  },
};

const TrendingItem = ({ activeItem, item }) => {
  const gotoRead = async (data) => {
    await axios
      .get(`https://ender.aydtanitim.com/api/book/${data?.id}`)
      .then()
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
    <Animatable.View
      className="mr-5"
      animation={activeItem === item.id ? zoomIn : zoomOut}
      duration={500}
    >
      <TouchableOpacity
        className="relative flex justify-center items-center"
        activeOpacity={0.7}
        onPress={() => gotoRead(item)}
      >
        <ImageBackground
          source={{
            uri: item.imageurl,
          }}
          className="w-40 h-56 rounded-[25px] my-5 overflow-hidden shadow-lg shadow-black/40"
          resizeMode="cover"
        />
      </TouchableOpacity>
    </Animatable.View>
  );
};

const Trending = ({ books }) => {
  const [activeItem, setActiveItem] = useState(books[0]);

  const viewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key);
    }
  };

  return (
    <FlatList
      data={books}
      horizontal
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TrendingItem activeItem={activeItem} item={item} />
      )}
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 70,
      }}
      contentOffset={{ x: 85 }}
      showsHorizontalScrollIndicator={false}
    />
  );
};

export default Trending;
