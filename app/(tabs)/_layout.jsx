import { View, Text, } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MiniPlayer from '../../components/minPlayer'

const _layout = () => {
  return (
    <>
    <Tabs
      screenOptions={{
        animation: 'none',
        gestureEnabled: false,
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          height: 75,
          position: 'absolute',
          alignItems: "flex-start",
          paddingLeft: 10,
          paddingTop: 1,
          backgroundColor: '#303033',
          borderRadius: 8,
          borderTopWidth: 0,
        },
        tabBarLabelStyle: {
          fontSize: 14,
          color: '#FFFFFF',
          fontFamily: 'Lato-Regular',
          focusedColor: '#2DCEEF',
        }
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarLabel: ({ focused }) => (
            <Text style={{ color: focused ? '#2DCEEF' : '#99999F', fontSize: 14, fontFamily: 'Lato-Regular' }}>
              Home
            </Text>
          ),
          tabBarIcon: ({ focused }) => (
            <Ionicons name="home-outline" size={24} color={focused ? '#2DCEEF' : '#99999F'}/>
          ),
          tabBarItemStyle: {
            alignItems: 'flex-start',
            justifyContent: 'center',
            paddingLeft: 20
          }
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          tabBarLabel: ({ focused }) => (
            <Text style={{ color: focused ? '#2DCEEF' : '#99999F', fontSize: 14, fontFamily: 'Lato-Regular' }}>
              Search
            </Text>
          ),
          tabBarIcon: ({ focused }) => (
            <Ionicons name="search-outline" size={24} color={focused ? '#2DCEEF' : "#99999F"} />
          ),
          tabBarItemStyle: {
            alignItems: 'flex-start',
            justifyContent: 'center',
            paddingLeft: 20
          }
        }}
      />
      <Tabs.Screen
        name="flow"
        options={{
          tabBarLabel: ({ focused }) => (
            <Text style={{ color: focused ? '#2DCEEF' : '#99999F', fontSize: 14, fontFamily: 'Lato-Regular' }}>
              Flow
            </Text>
          ),
          tabBarIcon: ({ focused }) => (
            <MaterialIcons name="podcasts" size={26} color={focused ? '#2DCEEF' : '#99999F'} />
          ),
          tabBarItemStyle: {
            alignItems: 'flex-start',
            justifyContent: 'center',
            paddingLeft: 20
          }
        }}
      />
      <Tabs.Screen
        name="library"
        options={{
          headerShown:true,
        headerTitle:"Library",
        headerTitleStyle:{ color: '#FFFFFF', fontFamily: 'Lato-Regular', fontSize: 20 },
        headerTitleAlign:"center",
        headerStyle: {
          backgroundColor: '#161A1A',
          borderBottomWidth: 1,
          borderBottomColor: 'black',
        },
         tabBarLabel: ({ focused }) => (
            <Text style={{ color: focused ? '#2DCEEF' : '#99999F', fontSize: 14, fontFamily: 'Lato-Regular' }} >
              Library
            </Text>
         ),
          tabBarIcon: ({ focused }) => (
            <Ionicons name="library-outline" size={24} color={focused ? '#2DCEEF' : '#99999F'} />
          ),
          tabBarItemStyle: {
            alignItems: 'flex-start',
            justifyContent: 'center',
            paddingLeft: 20
          }
        }}
      />
    </Tabs>
    <MiniPlayer />
    </>
  )
}

export default _layout