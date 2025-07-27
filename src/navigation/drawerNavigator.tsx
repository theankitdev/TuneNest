import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import BottomTabNavigator from './bottomTab'; // <-- your main tabs
import CustomDrawerContent from '../components/CustomDrawerContent';
import SettingsScreen from '../screens/Home/settings'; 
import RecetlyPlayed from '../screens/Home/recentlyPlayed'; 

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: '#3B4047', 
          width: 295,
          borderTopRightRadius: 25,
          borderBottomRightRadius: 25,
          shadowColor: 'black',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.5,
          elevation: 15,
        },
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="App" component={BottomTabNavigator} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
      <Drawer.Screen name="RecentlyPlayed" component={RecetlyPlayed} />
    </Drawer.Navigator>
  );
}
