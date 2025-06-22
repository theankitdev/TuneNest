import React, { useRef } from 'react';
import {
    Animated,
    View,
    Text,
    ScrollView,
    Pressable,
    StatusBar as RNStatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Options from '../../../components/options';
import SectionList from '../../../components/sectionList';
import { sections } from '../../../components/Data';
import Genre from './genre';

const GenreSelected = () => {
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
        { label: 'PLAYLISTS', path: '/genre' },
        { label: 'NEW RELEASES', path: '/podcasts' },
        { label: 'ARTISTS', path: '/recommendation' },
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
                                Rock
                            </Animated.Text>
                        </View>

                        <Options options={tabOptions}/>
                    </SafeAreaView>
                </LinearGradient>
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

export default GenreSelected;
