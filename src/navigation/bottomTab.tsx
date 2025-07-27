import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from '../stack/HomeStack';
import SearchStack from '../stack/SearchStack';
import LibraryStack from '../stack/LibraryStack';
import PremiumStack from '../stack/PremiumStack';
import Octicons from 'react-native-vector-icons/Octicons';
import Svg, { Path, Circle } from 'react-native-svg';

const Tab = createBottomTabNavigator();

const PremiumIcon = ({ color, size = 38 }) => (
   <Svg width={size} height={size} viewBox="7.5 4.5 14 13" fill="none">
    {/* Triangle */}
    <Path
      d="M12 4L16 12H8L12 4Z"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Partial Circle (bottom-right arc) */}
    <Path
      d="M16.5 9.5A4 4 0 1 1 12.5 13.5"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#1C1F22',
          borderRadius: 30,
          position: 'absolute',
          bottom: 15,
          height: 54,
          borderWidth: 0,
          borderTopColor: 'black',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.15,
          shadowRadius: 6,
          elevation: 10,
          marginHorizontal: 15,
        },
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === 'Premium') {
            return <PremiumIcon color={color} size={20} />;
          }

          let iconName;

          if (route.name === 'Home') iconName = 'home';
          else if (route.name === 'Search') iconName = 'search';
          else if (route.name === 'Library') iconName = 'stack';

          return <Octicons name={iconName} size={20} color={color} />;
        },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: {
          fontFamily: 'Urbanist-SemiBold',
          fontSize: 10,
        }
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Search" component={SearchStack} />
      <Tab.Screen name="Library" component={LibraryStack} />
      <Tab.Screen name="Premium" component={PremiumStack} />
    </Tab.Navigator>
  );
}
