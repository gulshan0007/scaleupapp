import React, {useEffect, useRef} from 'react';
import {View, StyleSheet, Animated, Image} from 'react-native';
import {COLORS} from '../../helper/colors';
import {images} from '../../assets/images';
import {DEVICE_WIDTH, nh, nw} from '../../helper/scal.utils';

const SplashScreen = ({navigation}) => {
  const scaleAnim = useRef(new Animated.Value(0)).current; // Circle scaling animation
  const fadeAnim = useRef(new Animated.Value(0)).current; // Text fading animation

  useEffect(() => {
    // Animate the circle to scale up
    Animated.timing(scaleAnim, {
      toValue: 6, // Scale to cover the screen
      duration: 1200, // Duration of animation (1.r2 seconds)
      useNativeDriver: true,
    }).start(() => {
      // After scaling, fade in the text
      Animated.timing(fadeAnim, {
        toValue: 1, // Fully visible
        duration: 1000, // Fade-in duration (1 second)
        useNativeDriver: true,
      }).start();
    });
  }, [scaleAnim, fadeAnim]);

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('OnboardingScreen');
    }, 3000);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.circle,
          {
            transform: [{scale: scaleAnim}],
          },
        ]}
      />
      <Animated.View style={{opacity: fadeAnim}}>
        <Image
          source={images.logo}
          style={{
            height: nh(375),
            width: nw(375),
          }}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.whiteFFFFFF,
  },
  circle: {
    width: DEVICE_WIDTH * 0.5, // Initial size of the circle
    height: DEVICE_WIDTH * 0.5,
    borderRadius: DEVICE_WIDTH * 0.25, // Make it circular
    backgroundColor: COLORS.blue043142,
    position: 'absolute',
  },
  text: {
    fontSize: 40, // Font size for the text
    fontWeight: 'bold',
    color: '#ffffff', // White color for better contrast
    position: 'absolute', // Centered text
    textAlign: 'center',
  },
});

export default SplashScreen;
