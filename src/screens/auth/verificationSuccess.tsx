import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  Animated,
  StatusBar,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import Ionicons from 'react-native-vector-icons/Ionicons';

const VerificationSuccess = ({ navigation }) => {

  useEffect(() => {
  const timer = setTimeout(() => {
    navigation.replace('BottomTabs'); 
  }, 2000);
  return () => clearTimeout(timer);
}, []);

  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.15,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <View className="flex-1 bg-white justify-center items-center px-6">

      {/* Animated 8-corner badge with wider look */}
      <Animated.View
        style={{
          transform: [{ scale: scaleAnim }, { scaleX: 1.15 }],
        }}
        className="w-28 h-28 items-center justify-center"
      >
        <Svg width={176} height={176} viewBox="0 0 512 512">
          <Path
            fill="#7952FC"
            d="M255.9,32c14.2,0,27.3,8.2,33.3,21.1l10.5,22.5c5.6,12,17.7,19.7,30.9,19.7h24c21.8,0,38,20.3,33.1,41.4
              l-5.8,25.3c-2.8,12.1,1.3,24.8,10.5,33.2l18,16.5c16.6,15.2,16.6,41,0,56.2l-18,16.5c-9.2,8.4-13.3,21.1-10.5,33.2l5.8,25.3
              c4.9,21.1-11.3,41.4-33.1,41.4h-24c-13.2,0-25.3,7.7-30.9,19.7l-10.5,22.5c-6,12.9-19.1,21.1-33.3,21.1s-27.3-8.2-33.3-21.1
              l-10.5-22.5c-5.6-12-17.7-19.7-30.9-19.7h-24c-21.8,0-38-20.3-33.1-41.4l5.8-25.3c2.8-12.1-1.3-24.8-10.5-33.2l-18-16.5
              c-16.6-15.2-16.6-41,0-56.2l18-16.5c9.2-8.4,13.3-21.1,10.5-33.2l-5.8-25.3c-4.9-21.1,11.3-41.4,33.1-41.4h24
              c13.2,0,25.3-7.7,30.9-19.7l10.5-22.5C228.6,40.2,241.7,32,255.9,32z"
          />
        </Svg>

        <View className="absolute">
          <Ionicons name="checkmark" size={80} color="white" />
        </View>
      </Animated.View>

      <Text className="mt-16 text-[#18104C] text-[22px] font-UBold">
        Verification Success
      </Text>
    </View>
  );
};

export default VerificationSuccess;
