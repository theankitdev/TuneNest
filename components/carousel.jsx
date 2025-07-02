// SongCarousel.js
import React, { useEffect, useRef } from 'react';
import { View, Text, Dimensions, Image, TouchableOpacity } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { useSharedValue } from 'react-native-reanimated';
import { useAudioPlayer } from '../context/AudioPlayerContext';

const SongCarousel = ({ playlist, currentIndex, playAtIndex }) => {
  const width = Dimensions.get('window').width;
  const ref = useRef(null);
  const progress = useSharedValue(0);

  const { currentTrack } = useAudioPlayer();

  useEffect(() => {
    if (ref.current && currentIndex != null) {
      ref.current.scrollTo({ index: currentIndex, animated: true });
    }
  }, [currentIndex]);

  const handleSnapToItem = (index) => {
    if (index !== currentIndex) {
      playAtIndex(index);
    }
  };

  return (
    <View>
      <Carousel
        mode='parallax'
        modeConfig={{
          parallaxScrollingOffset: 80,
          parallaxAdjacentItemScale: 0.72,
        }}
        ref={ref}
        width={width}
        height={350}
        data={playlist}
        onSnapToItem={handleSnapToItem}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              paddingTop: 20,
            }}
            activeOpacity={0.8}
          >
            <Image
              source={item.image}
              style={{ width: 330, height: 330, borderRadius: 20 }}
              resizeMode="cover"
            />
            <Text className="font-LRegular text-center pt-4 text-white text-[16px]">
              {item.title}
            </Text>
            <Text className="font-LRegular text-center pt-1 text-[#D5D5D5] text-[14px]">
              {item.subtitle}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default SongCarousel;
