import React, { useRef } from 'react';
import {
    Animated,
    View,
    Text,
    ScrollView,
    Pressable,
    StatusBar as RNStatusBar,
    ImageBackground,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Options from '../../../components/options';
import SectionList from '../../../components/sectionList';
import { sections } from '../../../components/Data';
import Genre from './genre';
import { useLocalSearchParams } from 'expo-router';

const GenrePlaylists = () => {
    const { title, image } = useLocalSearchParams();
    const scrollY = useRef(new Animated.Value(0)).current;

    const headerHeight = scrollY.interpolate({
        inputRange: [0, 100],
        outputRange: [197, 150],
        extrapolate: 'clamp',
    });

    const titleFontSize = scrollY.interpolate({
        inputRange: [0, 100],
        outputRange: [40, 18],
        extrapolate: 'clamp',
    });

    const tabOptions = [
        { label: 'OVERVIEW', path: '/home' },
        { label: 'PLAYLISTS', path: '/genre'},
        { label: 'NEW RELEASES', path: '/podcasts' },
        { label: 'ARTISTS', path: '/recommendation' },
    ];

    return (
        <>
            <RNStatusBar barStyle="light-content" backgroundColor="transparent" translucent />

            {/* Collapsible Header */}
            <Animated.View style={{ height: headerHeight, overflow: 'hidden' }}>
                <ImageBackground
                    source={image}
                    style={{ flex: 1 }}
                    resizeMode="cover"
                    blurRadius={2}
                >
                    <SafeAreaView className="flex-1 justify-between">
                        <View className="items-center pt-10">
                            <Animated.Text
                                style={{
                                    fontSize: titleFontSize,
                                    color: 'white',
                                    fontFamily: 'Lato-Bold',
                                }}
                            >
                                Playlists
                            </Animated.Text>
                        </View>

                        <Options options={tabOptions}/>
                    </SafeAreaView>
                </ImageBackground>
            </Animated.View>

            {/* Main Content */}
            <Animated.ScrollView
                contentContainerStyle={{ paddingBottom: 100, paddingHorizontal: 15 }}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: false }
                )}
                scrollEventThrottle={16}
                showsVerticalScrollIndicator={false}
                className="bg-[#1B1A1C]"
            >
                {sections.map((section, index) => (
                    <SectionList
                        key={index}
                        title={section.title}
                        item={section.items}
                    />
                ))}
            </Animated.ScrollView>
        </>
    );
};

export default GenrePlaylists;
