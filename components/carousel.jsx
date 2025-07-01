import { View, Text, Dimensions, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import Carousel, { ICarouselInstance, Pagination } from 'react-native-reanimated-carousel'
import { useSharedValue } from 'react-native-reanimated';

const SongCarousel = ({ item }) => {
    const width = Dimensions.get('window').width;
    const ref = React.useRef(null);
    const progress = useSharedValue(0);

    return (
        <View>
            <Carousel
                mode='parallax'
                modeConfig={{
                    // parallaxScrollingScale: 0.6,     // How much side items shrink
                    parallaxScrollingOffset: 80,     // Controls side spacing
                    parallaxAdjacentItemScale: 0.72,  // Size of side items
                }}
                ref={ref}
                width={width}
                height='350'
                data={item}
                onProgressChange={progress}
                renderItem={({ item, index }) => (
                    <TouchableOpacity
                        style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingTop: 20
                        }}
                    >
                        <Image
                            source={item.image}
                            style={{ width: 330, height: 330, borderRadius: 20 }}
                            resizeMode="cover"
                        />
                        <Text className="font-LRegular text-center pt-4 text-white text-[16px]">
                            {item.title}
                        </Text>
                        <Text className="font-LRegular text-center pt-4 text-[#D5D5D5] text-[14px]">
                            {item.subtitle}
                        </Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    )
}

export default SongCarousel