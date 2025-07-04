import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, DrawerActions, useRoute } from '@react-navigation/native';
import { useAuth } from '../../../context/authContext'; 

const CustomHeaderLeft = () => {
  const navigation = useNavigation();
  const route = useRoute();

  if (route.name === 'index') {
    return (
      <TouchableOpacity
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        style={{ marginLeft: 15 }}
      >
        <Ionicons name="person-circle-outline" size={35} color="white" />
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('index')}
      style={{ marginLeft: 15 }}
    >
      <Ionicons name="arrow-back" size={26} color="white" />
    </TouchableOpacity>
  );
};

// 🔧 Custom Drawer Content
const CustomDrawerContent = (props) => {
  const { user } = useAuth();

  return (
    <View style={{ flex: 1, backgroundColor: '#161A1A', paddingTop: 40 }}>
      {/* 👤 Avatar + Name */}
      <TouchableOpacity
        onPress={() => props.navigation.navigate('account')}
        style={styles.profileContainer}
      >
        <Image
          source={{
            uri: 'https://i.pravatar.cc/100', // you can replace with real user.avatar
          }}
          style={styles.avatar}
        />
        <View style={{ marginLeft: 10 }}>
          <Text style={styles.name}>{user?.email || 'Your Name'}</Text>
          <Text style={styles.viewProfile}>View Profile</Text>
        </View>
      </TouchableOpacity>

      {/* 🔧 Setting Option */}
      <TouchableOpacity
        onPress={() => props.navigation.navigate('setting & privacy')}
        style={styles.drawerItem}
      >
        <Ionicons name="settings-outline" size={22} color="#fff" style={{ marginRight: 10 }} />
        <Text style={styles.drawerLabel}>Settings and privacy</Text>
      </TouchableOpacity>
    </View>
  );
};

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerShown: true,
          headerTitleAlign: 'center',
          headerTitleStyle: {
            color: '#FFFFFF',
            fontFamily: 'Lato-Regular',
            fontSize: 20,
          },
          headerStyle: {
            backgroundColor: '#161A1A',
            borderBottomWidth: 1,
            borderBottomColor: 'black',
          },
          headerLeft: () => <CustomHeaderLeft />,
        }}
      >
        <Drawer.Screen
          name="index"
          options={{
            title: 'Library',
            drawerItemStyle: { display: 'none' },
          }}
        />
        <Drawer.Screen
          name="account"
          options={{
            title: 'Account',
          }}
        />
        <Drawer.Screen
          name="setting"
          options={{
            title: 'Setting',
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginBottom: 20,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#333',
  },
  name: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Lato-Bold',
  },
  viewProfile: {
    color: '#aaa',
    fontSize: 13,
    fontFamily: 'Lato-Regular',
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  drawerLabel: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Lato-Regular',
  },
});
