// import React, { createContext, useState, useContext, useEffect } from 'react';
// import TrackPlayer, {
//   State,
//   usePlaybackState,
//   useProgress,
//   Capability,
//   Event,
//   useTrackPlayerEvents
// } from 'react-native-track-player';

// const AudioPlayerContext = createContext();

// export const AudioPlayerProvider = ({ children }) => {
//   const [track, setTrack] = useState(null);
//   const [playlist, setPlaylist] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const playbackState = usePlaybackState();
//   const progress = useProgress();

//   useEffect(() => {
//     setup();
//   }, []);

//   const setup = async () => {
//     await TrackPlayer.setupPlayer();
//     await TrackPlayer.updateOptions({
//       capabilities: [
//         Capability.Play,
//         Capability.Pause,
//         Capability.SkipToNext,
//         Capability.SkipToPrevious,
//         Capability.SeekTo
//       ],

//       compactCapabilities: [Capability.Play, Capability.Pause],
//     });
//   };

//   const playPlaylist = async (tracks, index = 0) => {
//     setPlaylist(tracks);
//     setCurrentIndex(index);
//     const selected = tracks[index];

//     await TrackPlayer.reset();
//     await TrackPlayer.add(tracks);
//     await TrackPlayer.skip(index);
//     await TrackPlayer.play();
//     setTrack(selected);
//   };

//   const togglePlayback = async () => {
//     const current = await TrackPlayer.getState();
//     if (current === State.Playing) await TrackPlayer.pause();
//     else await TrackPlayer.play();
//   };

//   useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
//     const index = await TrackPlayer.getCurrentTrack();
//     const nextTrack = playlist[index];
//     setTrack(nextTrack);
//     setCurrentIndex(index);
//   });

//   return (
//     <AudioPlayerContext.Provider value={{ track, playPlaylist, togglePlayback, playbackState, progress }}>
//       {children}
//     </AudioPlayerContext.Provider>
//   );
// };

// export const useAudio = () => useContext(AudioPlayerContext);
