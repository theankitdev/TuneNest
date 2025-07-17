import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import playlist from '../../../assets/images/playlist.png';
import albumIcon from '../../../assets/images/albumIcon.png';
import SongList from '../../../components/songList.jsx'; 
import {songs} from '../../../components/Data.js'; // Assuming you have a song image

const Library = () => {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-[#161A1A]">
      <StatusBar style="light" />

      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 80 }}>
        <TouchableOpacity
          className="flex-row items-center space-x-3 mb-6"
          onPress={() => router.push('/myPlaylist/myCreatedPlaylist')}
        >
          <Image source={playlist} style={{ width: 20, height: 20, marginRight:12}} />
          <Text className="text-white text-[18px] font-LRegular">Playlists</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-row items-center space-x-3 mb-6"
          onPress={() => router.push('/favouriteSongs')}
        >
          <Ionicons name="heart-outline" size={24} color="#2DCEEF" style={{marginRight:9}}/>
          <Text className="text-white text-[18px] font-LRegular">Favorite Songs</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-row items-center space-x-3 mb-6"
          onPress={() => router.push('/myAlbum/myCreatedAlbums')}
        >
          <Image source={albumIcon} style={{ width: 22, height: 22, marginRight:11 }} />
          <Text className="text-white text-[18px] font-LRegular">Albums</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-row items-center space-x-3 mb-6"
          onPress={() => router.push('/myArtist/myCreatedArtists')}
        >
          <Ionicons name="star-outline" size={24} color="#2DCEEF" style={{marginRight:11}} />
          <Text className="text-white text-[18px] font-LRegular">Artists</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity
          className="flex-row items-center space-x-3 mb-6"
          onPress={() => router.push('/myPodcasts')}
        >
          <Ionicons name="radio-outline" size={18} color="#2DCEEF" className="border border-[#2DCEEF] mr-3"/>
          <Text className="text-white text-[18px] font-LRegular">{' '}
            Podcasts <Text className="text-[#2DCEEF] font-LRegular">+1</Text>
          </Text>
        </TouchableOpacity> */}

        <TouchableOpacity
          className="flex-row items-center space-x-3 mb-6"
          onPress={() => router.push('/listeningHistory')}
        >
          <Text className="text-[#2DCEEF] text-[18px] font-LBold border border-[#2DCEEF] rounded-full px-1 mr-3">H</Text>
          <Text className="text-white text-[18px] font-LRegular"> Listening History</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-row items-center space-x-3 mb-6"
          onPress={() => router.push('/downloads')}
        >
          <Ionicons name="arrow-down-outline" size={20} color="#2DCEEF" style={{marginRight:14}} className="border border-[#2DCEEF] rounded-full"/>
          <Text className="text-white text-[18px] font-LRegular">Downloaded</Text>
        </TouchableOpacity>

          <View className="mt-8">
            <Text className="text-[20px] text-white font-LRegular mb-8">Recently Play</Text>
          <SongList songs={songs}/>
          </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Library;
