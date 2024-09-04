import React from "react";
import { Text, View } from "react-native";

const Loader = () => {
  return (
    <View>
      <Text numberOfLines={1} adjustsFontSizeToFit>
        Yükleniyor...
      </Text>
    </View>
  );
};

export default Loader;
