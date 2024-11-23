import React, {useState} from 'react';
import {StyleSheet, SafeAreaView, StatusBar, View, Image} from 'react-native';
import {COLORS} from '../../helper/colors';
import {nh, nw} from '../../helper/scal.utils';
import Text from '../../components/Text';
import CustomTextInput from '../../components/TextInput';
import Button from '../../components/Button';
import {APP_FONTS} from '../../assets/fonts';
import {images} from '../../assets/images';

const ForgotPassword = ({navigation, route}) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* StatusBar */}
      <StatusBar
        barStyle="dark-content"
        backgroundColor={COLORS.yellowF5BE00}
      />
      <View style={styles.layer1}>
        <View style={styles.layer2}>
          <Image source={images.forgot} style={styles.logo} />
          <Text variant="semibold18" color={COLORS.blue043142}>
            Forgot Password?
          </Text>
          <Text
            variant="medium14"
            color={COLORS.grey999999}
            style={{marginBottom: 30}}>
            Don’t worry! We’ll send you reset instructions
          </Text>

          <CustomTextInput placeholder="Email" errorMessage="" />

          <Button
            text={'Reset password'}
            onPress={() => navigation.navigate('Verification')}
          />

          <View
            style={{
              position: 'absolute',
              bottom: 10, // Distance from the bottom
              left: 0, // Full-width alignment
              right: 0,
              flexDirection: 'row',
              justifyContent: 'center', // Centers content horizontally
              alignItems: 'center', // Aligns items vertically
            }}>
            <Text
              style={{
                color: COLORS.grey999999,
                fontSize: nh(12),
                fontFamily: APP_FONTS.PoppinsMedium,
              }}>
              Back to{' '}
            </Text>
            <Text
              style={{
                color: COLORS.yellowF5BE00,
                fontSize: nh(12),
                fontFamily: APP_FONTS.PoppinsMedium,
              }}>
              Login
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.yellowF5BE00,
  },
  layer1: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginTop: nh(30),
    marginHorizontal: nw(16),
    borderTopLeftRadius: nh(25),
    borderTopRightRadius: nh(25),
  },
  layer2: {
    flex: 1,
    backgroundColor: COLORS.whiteFFFFFF,
    marginTop: nh(15),
    marginHorizontal: nw(-16),
    borderTopLeftRadius: nh(25),
    borderTopRightRadius: nh(25),
    paddingHorizontal: nw(16),
    paddingTop: nh(30),
  },

  logo: {
    height: nh(150),
    width: nh(167),
    alignSelf: 'center',
    marginBottom: nh(30),
  },
});
