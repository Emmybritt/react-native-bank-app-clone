import {
  View,
  Text,
  Image,
  useWindowDimensions,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { COLORS } from "../../../helpers/theme/constantstyles";
import { Ionicons } from "@expo/vector-icons";
import CustomButton from "../../../common/button/Index";
import slides from "../../../common/slides";
import { useNavigation } from "@react-navigation/native";

const Footer = () => {
  return <View></View>;
};

const OnBoardingItem = ({ item, index, currentSlideIndex, goNextSlide }) => {
  const { width } = useWindowDimensions();

  const getSlideBackgroundColor = () => {
    if (currentSlideIndex <= 2) {
      return COLORS.white;
    }else{
      return "#0B535B"
    }
  };

  const getSlideColor = () => {
    if (currentSlideIndex <= 2) {
      return "#5A586F";
    } else {
      return "#F5F5F5";
    }
  };

  const getButtonColor = () => {
    if (currentSlideIndex <=2) {
      return "#0B535B"
    }else{
      return COLORS.inputGreen
    }
  }

  const navigation = useNavigation();

  return (
    <View style={styles.main}>
      <View style={[styles.container, { width }]}>
        <View>
          <Image
            source={item.image}
            style={[styles.image, { width, resizeMode: "contain" }]}
          />
        </View>
        <View
          style={[styles.other, { backgroundColor: getSlideBackgroundColor() }]}
        >
          <View style={styles.dotContainer}>
            {currentSlideIndex <= 2 &&
              slides.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.dot,
                    currentSlideIndex == index && {
                      backgroundColor: "#0B535B",
                    },
                  ]}
                />
              ))}

            {/* <View style={[styles.dot, {backgroundColor: "#0B535B"}]} />
          <View style={styles.dot} />
          <View style={styles.dot} /> */}
          </View>
          <Text style={[styles.text, { color: getSlideColor() }]}>
            {item.text}
          </Text>
          {currentSlideIndex <= 2 ? (
            <TouchableOpacity onPress={goNextSlide} style={styles.slideBtn}>
              <Text style={styles.next}>Next</Text>
              <Ionicons name="arrow-forward" color={COLORS.white} size={23} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => {
              navigation.navigate("TestForm")
            }} style={[styles.slideBtn, {backgroundColor: getButtonColor()}]}>
              <Text style={styles.next}>Get started</Text>
              {currentSlideIndex <= 2 && (
                <Ionicons name="arrow-forward" color={COLORS.white} size={23} />
              )}
            </TouchableOpacity>
          )}
          {currentSlideIndex <= 2 && (
            <TouchableOpacity onPress={() => {
              navigation.navigate("TestForm")
            }}>
              <Text style={styles.skip}>Skip</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  dotContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  main: {
    backgroundColor: "#0B535B",
  },
  text: {
    fontSize: 30,
    fontWeight: "500",
    color: "#5A586F",
    marginTop: 20,
  },
  dot: {
    height: 9,
    width: 9,
    borderRadius: 100,
    backgroundColor: "#C4C4C4",
    marginHorizontal: 4,
  },
  other: {
    backgroundColor: COLORS.white,
    height: 500,
    borderTopEndRadius: 60,
    borderTopStartRadius: 50,
    paddingVertical: 50,
    paddingHorizontal: 50,
  },
  container: {
    height: 100,
  },
  image: {
    height: 400,
  },
  skip: {
    marginVertical: 20,
    textAlign: "center",
    fontSize: 20,
    color: "#314D50",
    fontWeight: "600",
  },
  slideBtn: {
    backgroundColor: "#0B535B",
    paddingVertical: 14,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginTop: 40,
  },
  next: {
    color: COLORS.white,
    fontSize: 25,
    fontWeight: "500",
    paddingHorizontal: 9,
  },
});

export default OnBoardingItem;
