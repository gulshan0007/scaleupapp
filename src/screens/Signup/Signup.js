import React, {useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  StatusBar,
  View,
  Text as RNText,
} from 'react-native';
import {COLORS} from '../../helper/colors';
import {nh, nw} from '../../helper/scal.utils';
import Text from '../../components/Text';
import CustomTextInput from '../../components/TextInput';
import {icons} from '../../assets/icons';
import {CheckBox} from 'react-native-elements';
import Button from '../../components/Button';
import SocialLogin from '../../components/socialauth';
import {APP_FONTS} from '../../assets/fonts';

const SignUp = ({navigation, route}) => {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <SafeAreaView style={styles.container}>
      {/* StatusBar */}
      <StatusBar
        barStyle="dark-content"
        backgroundColor={COLORS.yellowF5BE00}
      />
      <View style={styles.layer1}>
        <View style={styles.layer2}>
          <Text variant="semibold18" color={COLORS.blue043142}>
            Create Account
          </Text>
          <Text variant="medium14" color={COLORS.grey999999}>
            Take a step towards focused learning..
          </Text>
          <Text
            variant="semibold14"
            color={COLORS.grey999999}
            style={{marginBottom: nh(30)}}>
            Sign-up now
          </Text>
          <CustomTextInput placeholder="Username" errorMessage="" />
          <CustomTextInput placeholder="Email" />
          {/* for slecting country not added dropdown as we dont have idea for how many country app will be */}
          <CustomTextInput dropDown={true} placeholder="Mobile No" />
          <CustomTextInput placeholder="Password" rightIcon={icons.hide} />
          <CustomTextInput
            placeholder="Confirm Password"
            rightIcon={icons.hide}
            marginBottom={10}
          />
          <View style={styles.container1}>
            {/* Checkbox */}
            <CheckBox
              checkedIcon="check-box"
              uncheckedIcon="check-box-outline-blank"
              iconType="material"
              checked={isChecked}
              onPress={() => setIsChecked(!isChecked)}
              containerStyle={styles.checkboxContainer}
              checkedColor={COLORS.blue043142}
              uncheckedColor={COLORS.blue043142}
            />

            {/* Label */}

            <Text
              variant="medium12"
              color={COLORS.blue043142}
              style={{marginTop: -3}}>
              I agree to{' '}
            </Text>

            <Text
              variant="bold12"
              color={COLORS.yellowF5BE00}
              style={{marginTop: -4}}
              // onPress={onTermsPress}
            >
              Terms of Service{' '}
            </Text>
            <Text
              variant="medium12"
              color={COLORS.blue043142}
              style={{marginTop: -3}}>
              and{' '}
            </Text>
            <Text
              variant="bold12"
              color={COLORS.yellowF5BE00}
              // onPress={onPrivacyPress}
              style={{marginTop: -4}}>
              Privacy Policy
            </Text>
          </View>
          <Button text="Sign up" />
          <SocialLogin />
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
              Already have an account!{' '}
            </Text>
            <RNText
              onPress={() => navigation.navigate('Login')}
              style={{
                color: COLORS.yellowF5BE00,
                fontSize: nh(12),
                fontFamily: APP_FONTS.PoppinsMedium,
              }}>
              Login
            </RNText>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignUp;

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
  container1: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: -10,
    marginBottom: nh(50),
  },
  checkboxContainer: {
    padding: 0,
    margin: 0,
    marginRight: nw(5),
  },
});
