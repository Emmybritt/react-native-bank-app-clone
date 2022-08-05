import { View, Text, FlatList, Animated, useWindowDimensions } from "react-native";
import React, { useRef, useState } from "react";
import styles from "./styles";
import slides from "../../../common/slides";
import OnBoardingItem from "../OnBoardingItem/Index";

const Onboard = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);
  const {width} = useWindowDimensions();

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)

  const viewableItemChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const ref = useRef(null);

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const updateCurrentSlideIndex = (e) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex)

  }

  const goToNextSlide = () => {
    // console.log('Next onboarding now working');
    const nextSlideIndex = currentSlideIndex + 1;
    const offset = nextSlideIndex * width; 
    ref?.current.scrollToOffset({offset});
    setCurrentSlideIndex(nextSlideIndex);
  }

  return (
    <View style={styles.container}>
      <View style={{flex:3}}>
        <FlatList
        onMomentumScrollBegin={updateCurrentSlideIndex}
          horizontal
          bounces={false}
          pagingEnabled
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            {
              useNativeDriver: false,
            }
          )}
          showsHorizontalScrollIndicator={false}
          data={slides}
          renderItem={({ item, i }) => <OnBoardingItem goNextSlide={goToNextSlide} currentSlideIndex={currentSlideIndex} key={i} index={i} item={item} />}
          onViewableItemsChanged={viewableItemChanged}
          viewabilityConfig={viewConfig}
          ref={ref}
        />
      </View>
    </View>
  );
};

export default Onboard;
