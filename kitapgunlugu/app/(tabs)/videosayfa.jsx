import React, { useCallback, useRef } from "react";
import * as ScreenOrientation from "expo-screen-orientation";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import { View } from "react-native";
import { VideoView, useVideoPlayer } from "expo-video";

const VideoPages = () => {
  const { data } = useLocalSearchParams();
  const videourl = JSON.parse(data);

  const ref = useRef(null);
  const player = useVideoPlayer(videourl.videourl, (player) => {
    player.loop = false;
    player.play();
  });

  useFocusEffect(
    useCallback(() => {
      const handleFocus = async () => {
        await ScreenOrientation.lockAsync(
          ScreenOrientation.OrientationLock.LANDSCAPE
        );
      };

      const handleBlur = async () => {
        await ScreenOrientation.lockAsync(
          ScreenOrientation.OrientationLock.PORTRAIT
        );
      };

      handleFocus();

      return () => handleBlur();
    }, [])
  );

  return (
    <View className="w-full h-full">
      <VideoView
        ref={ref}
        style={{ flex: 1 }}
        player={player}
        nativeControls
        contentFit="cover"
        allowsFullscreen={true}
      />
    </View>
  );
};

export default VideoPages;
