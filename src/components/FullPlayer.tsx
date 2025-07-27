// import React, { useEffect } from 'react';
// import { View, Text, Image, TouchableOpacity, Slider } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';
// import { useAudio } from '../context/AudioPlayerContext';
// import TrackPlayer from 'react-native-track-player';

// export default function FullPlayer({ route }) {
//   const { track, playPlaylist, togglePlayback, playbackState, progress } = useAudio();
//   const { playlist, title } = route.params;

//   useEffect(() => {
//     if (playlist && playlist.length) {
//       playPlaylist(playlist, 0);
//     }
//   }, [playlist]);

//   if (!track) return null;

//   return (
//     <View className="flex-1 bg-[#181A1D] p-6">
//       <Text className="text-white text-xs mb-2">Playing From Playlist</Text>
//       <Text className="text-white text-md font-USemiBold">{title}</Text>

//       <Image source={{ uri: track.image }} className="w-full h-72 rounded-2xl my-6" />

//       <View className="flex-row justify-between items-center mb-2">
//         <View>
//           <Text className="text-white font-USemiBold">{track.title}</Text>
//           <Text className="text-gray-400 text-xs">{track.artist}</Text>
//         </View>
//         <TouchableOpacity>
//           <Icon name="heart-outline" color="#fff" size={20} />
//         </TouchableOpacity>
//       </View>

//       <Slider
//         minimumValue={0}
//         maximumValue={progress.duration}
//         value={progress.position}
//         onSlidingComplete={(val) => TrackPlayer.seekTo(val)}
//         minimumTrackTintColor="#1DB954"
//         maximumTrackTintColor="#fff"
//       />

//       <View className="flex-row justify-between mt-2">
//         <Text className="text-white text-xs">{Math.floor(progress.position)}s</Text>
//         <Text className="text-white text-xs">{Math.floor(progress.duration)}s</Text>
//       </View>

//       <View className="flex-row justify-around items-center mt-6">
//         <TouchableOpacity onPress={() => TrackPlayer.skipToPrevious()}>
//           <Icon name="play-skip-back-outline" size={30} color="#fff" />
//         </TouchableOpacity>
//         <TouchableOpacity onPress={togglePlayback}>
//           <Icon name={playbackState === 'playing' ? 'pause-circle' : 'play-circle'} size={64} color="#fff" />
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => TrackPlayer.skipToNext()}>
//           <Icon name="play-skip-forward-outline" size={30} color="#fff" />
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }
