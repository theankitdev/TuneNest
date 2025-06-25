import React, { useRef } from 'react';
import {
  Animated,
  View,
  Text,
  ScrollView,
  Pressable,
  StatusBar as RNStatusBar,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Options from '../../components/options';
import SectionList from '../../components/sectionList';
import { router } from 'expo-router';
import { sections, songs } from '../../components/Data';
import { genre } from '../../assets/images/genres/genre';
import CategoryCard from '../../components/CategoryCard';
import SongList from '../../components/songList';

const MainPodcasts = () => {
  const scrollY = useRef(new Animated.Value(0)).current;

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
    { label: 'PODCASTS'},
    { label: 'RECOMMENDATION', path: '/recommendation' },
  ];

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
                 Podcasts
              </Animated.Text>
            </View>

            <Options options={tabOptions} />
          </SafeAreaView>
        </LinearGradient>
      </Animated.View>

      {/* Main Content */}
      <Animated.ScrollView
        contentContainerStyle={{ paddingBottom: 100 }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        className="bg-[#1B1A1C]"
      >
        <View className="px-4">
        {sections.map((section, index) => (
          <SectionList
            key={index}
            title={section.title}
            item={section.items}
            path='/player'
          />
        ))}
        </View>

        <View className="px-4 mt-6">
          <Text className=" text-[14px] font-LBold text-white mb-6 pb-1">Featured episodes</Text>
          <SongList songs={songs}/>
        </View>
        <View className="mt-8 ">
        <Text className="text-white text-center font-LBold text-[14px] mb-6">Categories</Text>
        <CategoryCard item={genre}/>
        </View>

      </Animated.ScrollView>

    </>
  );
};

export default MainPodcasts;
