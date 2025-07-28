// // MiniPlayer.js
// import React from 'react';
// import { View, Text, TouchableOpacity } from 'react-native';
// import { useAudio } from '../context/AudioPlayerContext';
// import Icon from 'react-native-vector-icons/Ionicons';

// export default function MiniPlayer({ navigation }) {
//   const { track, playbackState, togglePlayback, progress } = useAudio();

//   if (!track) return null;

//   return (
//     <TouchableOpacity
//       className="absolute bottom-0 left-0 right-0 bg-[#1c1c1e] px-4 py-2 flex-row items-center justify-between"
//       onPress={() => navigation.navigate('FullPlayer')}
//     >
//       <View className="flex-1">
//         <Text className="text-white font-semibold">{track.title}</Text>
//         <Text className="text-gray-400">{track.artist}</Text>
//       </View>
//       <TouchableOpacity onPress={togglePlayback}>
//         <Icon name={playbackState === 'playing' ? 'pause' : 'play'} size={24} color="#fff" />
//       </TouchableOpacity>
//     </TouchableOpacity>
//   );
// }
// // 