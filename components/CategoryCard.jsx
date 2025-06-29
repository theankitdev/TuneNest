import React from 'react';
import { View, Text, ImageBackground, FlatList, Pressable,Image } from 'react-native';
import { router } from 'expo-router';

const CategoryCard = ({ item, onPress }) => {
    return (
        <FlatList
            data={item}
            keyExtractor={(_, index) => index.toString()}
            scrollEnabled={false}
            columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 15, paddingHorizontal: 15, gap: 15 }}
            showsVerticalScrollIndicator={false}
            numColumns={2}
            renderItem={({ item }) => (
                <Pressable style={{ width: '48%' }} onPress={()=> onPress(item)}>
                    <Image
                        source={item.image}
                        className="w-[full] h-[90px] rounded-lg overflow-hidden"
                        resizeMode="cover"
                    />
                </Pressable>
            )}
        />
    );
};

export default CategoryCard;
