import React from "react";
import { View, Text, Image, FlatList, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { BadgeCheck } from "lucide-react-native";
import album from "../../assets/Album.png";

export default function ArtistProfile() {
    const songs = [
        { title: "Main Khiladi", subtitle: "From 'Selfiee'", img: require("../../assets/hindi.png") },
        { title: "Jhoome Jo Pathaan", subtitle: "Male Version", img: require("../../assets/hindi.png") },
        { title: "Tunak Tunak Tun", subtitle: "Classic", img: require("../../assets/hindi.png") },
    ];

    return (

        <ScrollView showsVerticalScrollIndicator={false} className="bg-[#353A40]" contentContainerStyle={{ paddingBottom: 180}}>
            <SafeAreaView className="flex-1 ">
                {/* Header */}
                <View className="flex-row justify-between items-center mt-4 px-4">
                    <Text className="text-white text-[16px] font-USemiBold">Abhijeet</Text>
                    <View className="h-[40px] w-[40px] justify-center items-center bg-[#1C1F22] rounded-full">
                        <Ionicons name="ellipsis-vertical" size={20} color="white" />
                    </View>
                </View>

                {/* Album image and followers */}
                <View className="items-center mt-5 px-4">
                    <Image
                        source={album}
                        className="w-[180px] h-[180px] rounded-xl"
                        resizeMode="conver"
                    />
                    <Text className="text-white font-USemiBold text-[14px] mt-6">7,910,813 </Text>
                    <Text className="text-[#989CA0] font-USemiBold text-[12px]">Monthly Listeners</Text>

                    <View className="flex-row mt-6 justify-between items-center w-full">
                        <TouchableOpacity className="bg-[#1C1F22] w-[109px] h-[38px] justify-center items-center rounded-full">
                            <Text className="text-white font-UMedium text-[16px]">Following</Text>
                        </TouchableOpacity>

                        <View className="flex-row gap-4 ">
                            <TouchableOpacity className="bg-[#1C1F22] w-[40px] h-[40px] justify-center items-center rounded-full">
                                <Ionicons name="ellipsis-vertical" size={20} color="white" />
                            </TouchableOpacity>
                            <TouchableOpacity className="bg-[#1C1F22] w-[40px] h-[40px] justify-center items-center rounded-full">
                                <Ionicons name="shuffle" size={20} color="white" />
                            </TouchableOpacity>
                            <TouchableOpacity className="bg-[#1C1F22] w-[40px] h-[40px] justify-center items-center rounded-full">
                                <Ionicons name="pause-outline" size={20} color="white" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                {/* Popular Songs */}
                <View className="mt-10 bg-[#202326] rounded-xl p-4">
                    <Text className="text-white text-[16px] font-USemiBold mb-5">Popular</Text>
                    {songs.map((item, index) => (
                        <View key={index} className="flex-row justify-between items-center mb-4">
                            <View className="flex-row items-center ">
                                <Image
                                    source={item.img}
                                    className="w-[52px] h-[52px] rounded-2xl mr-3"
                                />
                                <View>
                                    <Text className="text-white font-UMedium text-[14px] mb-1">{item.title}</Text>
                                    <Text className="text-[#7F8489] text-[12px]">{item.subtitle}</Text>
                                </View>
                            </View>
                            <TouchableOpacity>
                                <Ionicons name="ellipsis-vertical" size={18} color="white" />
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>

                {/* Popular Releases */}
                <View className="mt-10 bg-[#202326] rounded-xl p-4 ">
                    <Text className="text-white text-[16px] font-USemiBold mb-5">Popular Releases</Text>
                    {songs.map((item, index) => (
                        <View key={index} className="flex-row justify-between items-center mb-4">
                            <View className="flex-row items-center ">
                                <Image
                                    source={item.img}
                                    className="w-[52px] h-[52px] rounded-2xl mr-3"
                                />
                                <View>
                                    <Text className="text-white font-UMedium text-[14px] mb-1">{item.title}</Text>
                                    <Text className="text-[#7F8489] text-[12px]">{item.subtitle}</Text>
                                </View>
                            </View>
                            <TouchableOpacity>
                                <Ionicons name="ellipsis-vertical" size={18} color="white" />
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>

                {/* Featuring */}
                <View className="mt-8 pl-4">
                    <Text className="text-white text-[16px] font-USemiBold mb-6">Featuring abhijeet</Text>
                    <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={songs}
                        keyExtractor={(item, i) => i.toString()}
                        contentContainerStyle={{ paddingRight: 20 }}
                        ItemSeparatorComponent={() => <View className="w-4" />}
                        renderItem={({ item }) => (
                            <View className="bg-[#202326] p-3 rounded-3xl w-[110px] h-[130px] items-center justify-center ">
                                <Image
                                    source={item.img}
                                    className="w-[76px] h-[76px] rounded-3xl"
                                />
                                <Text className="text-[#989CA0] mt-2 text-[11px] font-UMedium text-center">{item.title}</Text>
                            </View>
                        )}
                    />
                </View>

                {/* About */}
                <View className="mt-6 ">
                    <Text className="text-white font-USemiBold text-[16px] mb-5 px-4">About</Text>
                    <View className="flex-row bg-[#202326] p-4 rounded-3xl gap-4">
                        <Image
                            source={album}
                            className="w-[140px] h-[140px] rounded-3xl"
                        />
                        <View className="justify-center">
                            <BadgeCheck size={24} color="white" />
                            <Text className="text-white text-[14px] font-UMedium mt-2 mb-6">Verified Artist</Text>
                            <View className="flex-row items-center gap-8 mt-1">
                                <View>
                                    <Text className="text-white text-[18px] font-USemiBold">7,910,813 </Text>
                                    <Text className="text-gray-400 text-[14px] font-URegular">Monthly listeners</Text>
                                </View>
                                <MaterialIcons name="navigate-next" size={22} color="white" className="border border-white rounded-full"/>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Fans also like */}
                <View className="mt-8 pl-4">
                    <Text className="text-white text-[16px] font-USemiBold mb-6">Featuring abhijeet</Text>
                    <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={songs}
                        keyExtractor={(item, i) => i.toString()}
                        contentContainerStyle={{ paddingRight: 20 }}
                        ItemSeparatorComponent={() => <View className="w-4" />}
                        renderItem={({ item }) => (
                            <View className="bg-[#202326] p-3 rounded-3xl w-[110px] h-[130px] items-center justify-center ">
                                <Image
                                    source={item.img}
                                    className="w-[76px] h-[76px] rounded-3xl"
                                />
                                <Text className="text-[#989CA0] mt-2 text-[11px] font-UMedium text-center">{item.title}</Text>
                            </View>
                        )}
                    />
                </View>
            </SafeAreaView>
        </ScrollView>
    );
}
