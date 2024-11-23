import React, {useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  StatusBar,
  View,
  Image,
  TouchableOpacity,
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
import {images} from '../../assets/images';
import SquareToggle from '../../components/ToggleButton';

const Login = ({navigation, route}) => {
  const [selected, setSelected] = useState(0);
  const [isChecked, setIsChecked] = useState(false);
  const [requestedotp, setRequestedotp] = useState(false);

  const onSelect = number => {
    setSelected(number);
    setRequestedotp(false);
  };
  return (
    <SafeAreaView style={styles.container}>
      {/* StatusBar */}
      <StatusBar
        barStyle="dark-content"
        backgroundColor={COLORS.yellowF5BE00}
      />
      <View style={styles.layer1}>
        <View style={styles.layer2}>
          <Image source={images.ciclelogo} style={styles.logo} />
          <Text variant="semibold18" color={COLORS.blue043142}>
            Welcome Back..!
          </Text>
          <Text variant="medium14" color={COLORS.grey999999}>
            Unlock Focused, Distraction-free Learning
          </Text>
          <Text
            variant="semibold14"
            color={COLORS.grey999999}
            style={{marginBottom: nh(30)}}>
            Login now
          </Text>
          <SquareToggle
            options={['Username', 'Mobile No']}
            selected={selected}
            onToggle={number => onSelect(number)}
          />
          {selected == 0 && (
            <>
              <CustomTextInput placeholder="Username/Email" errorMessage="" />
              <CustomTextInput placeholder="Password" rightIcon={icons.hide} />
              <View
                style={{
                  marginBottom: nh(50),
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View style={styles.container1}>
                  {/* Checkbox */}
                  <CheckBox
                    checkedIcon="check-box"
                    uncheckedIcon="check-box-outline-blank"
                    iconType="material"
                    checked={isChecked}
                    onPress={() => setIsChecked(!isChecked)}
                    containerStyle={styles.checkboxContainer}
                    checkedColor={COLORS.grey999999}
                    uncheckedColor={COLORS.grey999999}
                  />

                  {/* Label */}

                  <Text
                    variant="medium12"
                    color={COLORS.grey999999}
                    style={{marginTop: -3}}>
                    Remember me
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => navigation.navigate('ForgotPassword')}>
                  <Text
                    variant="medium12"
                    color={COLORS.grey999999}
                    style={{textDecorationLine: 'underline'}}>
                    Forgot Password?
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )}
          {selected == 1 && (
            <>
              <CustomTextInput placeholder="Mobile No" errorMessage="" />
              {requestedotp && (
                <>
                  <CustomTextInput placeholder="OTP" />
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-end', // Centers content horizontally
                      alignItems: 'center', // Aligns items vertically
                      marginBottom: nh(50),
                    }}>
                    <Text
                      style={{
                        color: COLORS.grey999999,
                        fontSize: nh(12),
                        fontFamily: APP_FONTS.PoppinsMedium,
                      }}>
                      Didn’t receive OTP?{' '}
                    </Text>
                    <Text
                      style={{
                        color: COLORS.yellowF5BE00,
                        fontSize: nh(12),
                        fontFamily: APP_FONTS.PoppinsMedium,
                        textDecorationLine: 'underline',
                      }}>
                      Resend Code
                    </Text>
                  </View>
                </>
              )}
            </>
          )}

          <Button
            text={selected == 0 || requestedotp ? 'Login' : 'Request OTP'}
            onPress={() => {
              if (selected == 0) {
              } else {
                setRequestedotp(true);
              }
            }}
          />
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
              Don’t have an account!{' '}
            </Text>
            <Text
              style={{
                color: COLORS.yellowF5BE00,
                fontSize: nh(12),
                fontFamily: APP_FONTS.PoppinsMedium,
              }}>
              Sign up
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;

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
  },
  logo: {
    height: nh(75),
    width: nh(75),
    alignSelf: 'center',
    marginBottom: nh(30),
  },

  checkboxContainer: {
    padding: 0,
    margin: 0,
    marginRight: nw(5),
  },
});
