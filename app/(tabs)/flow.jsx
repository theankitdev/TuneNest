import React from 'react';
import { View, Text, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const FlowCard = ({ onCreateFlowPress }) => {
  return (
    <LinearGradient
      colors={['#9b2ff5', '#3698f1', '#2e4374']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.contentWrapper}>
        {/* Create Flow button (outside card) */}
        <TouchableOpacity style={styles.button} onPress={onCreateFlowPress}>
          <View className='flex-row items-center' >
          <Ionicons name="image-outline" size={20} color="#fff" />
          <Text className='text-white font-LBold text-[16px] pl-2'>Create Flow</Text>
          </View>
        </TouchableOpacity>

        {/* Card */}
        <View style={styles.card}>
          <LinearGradient
            colors={['#1a1a1a', '#000']}
            style={styles.innerCard}
          >
            {/* Diagonal overlay */}
            <View style={styles.diagonal} />

            {/* Center content */}
            <View className="flex-1 items-center justify-center">
              <View style={styles.iconWrapper}>
                <Ionicons name="remove-outline" size={26} color="#aaa" />
              </View>
              <Text className="text-[#fff] font-LBold text-[24px]">FLOW</Text>
              <Text className='text-white text-center font-LRegular text-[14px] mt-4'>
                Create your own concert with your favorite singers
              </Text>
            </View>

            {/* Bottom line text absolutely positioned */}
            <View style={styles.bottomTextContainer}>
              <Text className='text-[#ccc] text-center font-LRegular text-[12px]'>
                Select multiple artists to create the perfect soundtrack
              </Text>
            </View>
          </LinearGradient>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginBottom: 30,
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 20,
  },
  card: {
    width: width * 0.8,
    height: '60%',
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    backgroundColor: 'transparent',
  },
  innerCard: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    position: 'relative',
  },
  diagonal: {
    position: 'absolute',
    top: 0,
    left: 0,
    borderRightWidth: 300,
    borderBottomWidth: 300,
    borderRightColor: 'rgba(255, 255, 255, 0.05)',
    borderBottomColor: 'transparent',
    zIndex: 0,
  },
  iconWrapper: {
    marginBottom: 10,
    zIndex: 1,
  },
  bottomTextContainer: {
    position: 'absolute',
    bottom: 16,
    left: 20,
    right: 20,
  },
});

export default FlowCard;
