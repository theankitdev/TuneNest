import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import SectionList from '../../components/sectionList'
import { sections, songs } from '../../components/Data'
import SongList from '../../components/songList'

const myPlaylistEdit = () => {
  return (
    <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 80 }} className='bg-[#161A1A]'>
        <View className='mt-8 '>
            {sections.map((section,index) => (
                <SectionList key={index} item={section.items} title='Recently updated'/>
            ))}
        </View>
        <View className='mt-8'>
            <SongList songs={songs}/>
        </View>
    </ScrollView>
  )
}

export default myPlaylistEdit