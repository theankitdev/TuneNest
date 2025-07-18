import React, { useRef } from 'react';
import {
    Animated,
    View,
    Text,
    StatusBar as RNStatusBar,
    Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Options from '../../../components/options';
import CategoryCard from '../../../components/CategoryCard';
import { genre } from '../../../assets/images/genres/genre';
import { router } from 'expo-router';
import { useGenre } from '../../../context/GenreContext'; // ✅ Import context

const { width } = Dimensions.get('window');

const Genre = () => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const { setSelectedGenre } = useGenre(); // ✅ use context

  const headerHeight = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [187, 150],
    extrapolate: 'clamp',
  });

  const titleFontSize = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [40, 18],
    extrapolate: 'clamp',
  });

  const tabOptions = [
    { label: 'OVERVIEW', path: '/home' },
    { label: 'GENRE & MOODS', path: '/genre' },
    { label: 'PODCASTS', path: '/mainPodcasts' },
    { label: 'RECOMMENDATION', path: '/recommendation' },
  ];

  const handleCardPress = (genre) => {
    setSelectedGenre(genre); // ✅ save globally
    router.push('/genreSelected');
  };

  return (
    <>
      <RNStatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      {/* Collapsible Header */}
      <Animated.View style={{ height: headerHeight, overflow: 'hidden' }}>
        <LinearGradient colors={['#4169E1', '#1B1A1C']} style={{ flex: 1 }}>
          <SafeAreaView className="flex-1 justify-between">
            <View className="items-center pt-5">
              <Animated.Text
                style={{
                  fontSize: titleFontSize,
                  color: 'white',
                  fontFamily: 'Lato-Bold',
                }}
              >
                Genres & Moods
              </Animated.Text>
            </View>
            <Options options={tabOptions} />
          </SafeAreaView>
        </LinearGradient>
      </Animated.View>

      {/* Scrollable Grid Section */}
      <Animated.ScrollView
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingBottom: 100 }}
        className="bg-[#1B1A1C]"
      >
        {/* Genres Section */}
        <Text className="text-white font-LBold text-[20px] text-center px-4  pb-8">Genres</Text>
        <CategoryCard item={genre} onPress={handleCardPress} />

        {/* Moods Section */}
        <Text className="text-white font-LBold text-[20px] text-center px-4 pt-6 pb-8">Moods</Text>
        <CategoryCard item={genre} />
      </Animated.ScrollView>
    </>
  );
};

export default Genre;
