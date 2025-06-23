import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  Dimensions,
  PanResponder,
  TouchableWithoutFeedback,
  Animated,
} from 'react-native';
import Slider from '@react-native-community/slider';

const MusicSlider = ({ duration = 180, onSeek }) => {
  const screenWidth = Dimensions.get('window').width;
  const sliderWidth = screenWidth - 40;
  const [currentTime, setCurrentTime] = useState(0);
  const isDragging = useRef(false);
  const progress = useRef(new Animated.Value(0)).current;
  const intervalRef = useRef(null);

  useEffect(() => {
    startAutoProgress();
    return () => clearInterval(intervalRef.current);
  }, []);

  const startAutoProgress = () => {
    intervalRef.current = setInterval(() => {
      if (!isDragging.current) {
        setCurrentTime((prev) => {
          const next = prev + 1;
          if (next <= duration) {
            progress.setValue(next / duration);
            return next;
          }
          clearInterval(intervalRef.current);
          return prev;
        });
      }
    }, 1000);
  };

  const handlePress = (evt) => {
    const x = evt.nativeEvent.locationX;
    const ratio = Math.min(Math.max(x / sliderWidth, 0), 1);
    const newTime = Math.floor(duration * ratio);
    progress.setValue(ratio);
    setCurrentTime(newTime);
    if (onSeek) onSeek(newTime);
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        isDragging.current = true;
      },
      onPanResponderMove: (_, gesture) => {
        const newX = Math.min(Math.max(gesture.moveX - 20, 0), sliderWidth);
        const ratio = newX / sliderWidth;
        progress.setValue(ratio);
      },
      onPanResponderRelease: (_, gesture) => {
        isDragging.current = false;
        const newX = Math.min(Math.max(gesture.moveX - 20, 0), sliderWidth);
        const ratio = newX / sliderWidth;
        const newTime = Math.floor(duration * ratio);
        setCurrentTime(newTime);
        progress.setValue(ratio);
        if (onSeek) onSeek(newTime);
      },
    })
  ).current;

  const thumbPosition = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, sliderWidth],
    extrapolate: 'clamp',
  });

  const format = (sec) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s < 10 ? '0' + s : s}`;
  };

  return (
    <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={{ color: 'white', fontSize: 12 }}>{format(currentTime)}</Text>
        <Text style={{ color: 'white', fontSize: 12 }}>{format(duration)}</Text>
      </View>

      <TouchableWithoutFeedback onPress={handlePress}>
        <View
          style={{
            height: 30,
            justifyContent: 'center',
            marginTop: 6,
          }}
        >
          <View
            style={{
              height: 4,
              width: sliderWidth,
              backgroundColor: '#444',
              borderRadius: 4,
            }}
          >
            <Animated.View
              style={{
                position: 'absolute',
                height: 4,
                backgroundColor: '#fff',
                borderRadius: 4,
                width: Animated.multiply(progress, sliderWidth),
              }}
            />
            <Animated.View
              style={{
                position: 'absolute',
                top: -6,
                left: thumbPosition,
                width: 16,
                height: 16,
                borderRadius: 8,
                backgroundColor: '#fff',
              }}
              {...panResponder.panHandlers}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default MusicSlider;
