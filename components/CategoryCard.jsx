import React from 'react';
import { View, Text, ImageBackground, FlatList, Pressable,Image } from 'react-native';
import { router } from 'expo-router';

const CategoryCard = ({ item }) => {
    return (
        <FlatList
            data={item}
            keyExtractor={(_, index) => index.toString()}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 15, paddingHorizontal: 15, gap: 15 }}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
                <Pressable style={{ width: '48%' }} onPress={()=> router.replace('/genreSelected')}>
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
