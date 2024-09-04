import React, { useEffect, useRef, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  View,
  Linking,
} from "react-native";

import { Feather } from "@expo/vector-icons";
import { Video, ResizeMode, Audio } from "expo-av";
import axios from "axios";
import { Entypo } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";
import { Link } from "expo-router";

const KisaSohbetPage = () => {
  const videoRef = useRef();
  const [videodata, setVideoData] = useState([]);

  const [play, setPlay] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef(null);

  useEffect(() => {
    const getVideos = async () => {
      await axios
        .get("https://ender.aydtanitim.com/api/video")
        .then((response) => {
          const data = response.data.filter((item) => item.short === true);
          const shuffledData = [...data].reverse();
          setVideoData(shuffledData);
        })
        .catch((err) => console.log("Hata " + err));
    };
    getVideos();
  }, []);

  const handleScroll = (event) => {
    const contentOffsetY = event.nativeEvent.contentOffset.y;
    const height = Dimensions.get("window").height * 1.1;
    const index = Math.round(contentOffsetY / height);
    setCurrentIndex(index);
  };

  const handleScrollEnd = () => {
    const newIndex = currentIndex;
    if (newIndex < videodata.length) {
      scrollViewRef.current.scrollTo({
        y: newIndex * (Dimensions.get("window").height * 1.1),
      });
    }
  };

  const playVideo = () => {
    if (play) {
      setPlay(false);
    } else {
      setPlay(true);
    }
  };

  const downloadvideo = async () => {
    const video = videodata[currentIndex].videourl;

    const downloadResumable = FileSystem.createDownloadResumable(
      video,
      FileSystem.documentDirectory + "video.mp4"
    );
    await downloadResumable.downloadAsync();
    const { uri } = await downloadResumable.downloadAsync();

    alert("Video indirildi : " + uri);
  };
  const shareinst = () => {
    Linking.canOpenURL("instagram://app")
      .then((supported) => {
        if (supported) {
          // Instagram uygulamasını açma
          Linking.openURL(`instagram://library`);
        } else {
          // Instagram uygulaması yoksa, Instagram'un web sitesini açma
          Linking.openURL(`https://www.instagram.com/`);
        }
      })
      .catch((err) => console.error("Instagram açma hatası: ", err));
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Link href={"/home"} asChild>
          <TouchableOpacity style={styles.menubox}>
            <Feather name="menu" size={50} color="white" />
          </TouchableOpacity>
        </Link>
        <ScrollView
          ref={scrollViewRef}
          vertical
          pagingEnabled
          showsVerticalScrollIndicator={false}
          onScroll={handleScroll}
          onMomentumScrollEnd={handleScrollEnd}
        >
          {videodata?.map((mapvideo, index) => (
            <View key={mapvideo.id} style={styles.videoContainer}>
              <TouchableOpacity
                activeOpacity={1}
                onPress={playVideo}
                style={{ flex: 1 }}
              >
                <Video
                  ref={(ref) => {
                    videoRef[index] == ref;
                  }}
                  style={styles.video}
                  source={{
                    uri: mapvideo.videourl,
                  }}
                  volume={1.0}
                  resizeMode={ResizeMode.COVER}
                  isLooping={true}
                  onLoadStart={() => setPlay(true)}
                  shouldPlay={index === currentIndex && play}
                />
                <View style={styles.absoluteView}>
                  <TouchableOpacity
                    style={styles.viewbox}
                    onPress={downloadvideo}
                  >
                    <Feather name="download" size={32} color="white" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.viewbox} onPress={shareinst}>
                    <Entypo name="instagram" size={32} color="white" />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default KisaSohbetPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  videoContainer: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height * 1.1,
  },
  video: {
    flex: 1,
    /* alignSelf: "center",
    flexGrow: 1,
    maxHeight: Dimensions.get("window").height,
    width: Dimensions.get("window").width, */
  },
  menubox: {
    position: "absolute",
    zIndex: 5,
    top: Dimensions.get("window").height * 0.06,
    left: Dimensions.get("window").width * 0.81,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  absoluteView: {
    position: "absolute",
    zIndex: 5,
    top: Dimensions.get("window").height * 0.6,
    left: Dimensions.get("window").width * 0.87,
    justifyContent: "center",
    alignItems: "center",
  },
  viewbox: {
    backgroundColor: "dodgerblue",
    borderRadius: 8,
    padding: 4,
    marginBottom: 12,
  },
});
