import React, {useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  StatusBar,
  View,
  Image,
  TouchableOpacity,
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
import {images} from '../../assets/images';
import SquareToggle from '../../components/ToggleButton';
import {useToast} from '../../components/CustomToast';
import {getOtp, loginApi, verifyOtp} from '../../services/apiService';
import Routes from '../../helper/routes';
import Icon from '../../helper/icon';

const Login = ({navigation}) => {
  const {showToast} = useToast();
  const [selected, setSelected] = useState(0);
  const [isChecked, setIsChecked] = useState(false);
  const [requestedotp, setRequestedotp] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [otp, setOtp] = useState('');

  const onSelect = number => {
    setSelected(number);
    setRequestedotp(false);
  };

  const getOtpApi = async () => {
    try {
      const {data} = await getOtp({phoneNumber: username});
      showToast({title: data?.message});
    } catch (error) {
      console.log('🚀 ~ getOtpApi ~ error:', error);
    }
  };

  const userLoginApi = async () => {
    try {
      const {data} = await loginApi({
        loginIdentifier: username,
        password: password,
      });
      showToast({title: data?.message});
    } catch (error) {
      console.log('🚀 ~ userLoginApi ~ error:', error);
    }
  };

  const verifyOtpApi = async () => {
    try {
      const {data} = await verifyOtp({
        phoneNumber: mobileNumber,
        userOTP: otp,
      });
      showToast({title: data?.message});
    } catch (error) {
      console.log('🚀 ~ verifyOtpApi ~ error:', error);
    }
  };

  const loginUser = () => {
    if (selected == 0) {
      if (!username) showToast({type: 'error', title: 'Please Enter UserName'});
      else if (!username)
        showToast({type: 'error', title: 'Please Enter Password'});
      else userLoginApi();
    } else {
      if (requestedotp) {
        if (!otp) showToast({type: 'error', title: 'Please Enter OTP'});
        else verifyOtpApi();
      } else {
        if (!mobileNumber)
          showToast({
            type: 'error',
            title: 'Phone number be valid phone number',
          });
        else {
          getOtpApi();
          setRequestedotp(true);
        }
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
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
              <CustomTextInput
                placeholder="Username/Email"
                value={username}
                onChangeText={setUsername}
                errorMessage=""
              />
              <CustomTextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                rightIcon={secureTextEntry ? icons.hide : icons.unhide}
                onRightIconPress={() => setSecureTextEntry(!secureTextEntry)}
                secureTextEntry={secureTextEntry}
              />
              <View style={styles.rememberContainer}>
                <View style={styles.checkboxContainer}>
                  <CheckBox
                    checkedIcon="check-box"
                    uncheckedIcon="check-box-outline-blank"
                    iconType="material"
                    checked={isChecked}
                    onPress={() => setIsChecked(!isChecked)}
                    containerStyle={styles.checkboxStyle}
                    checkedColor={COLORS.grey999999}
                    uncheckedColor={COLORS.grey999999}
                  />
                  <Text variant="medium12" color={COLORS.grey999999}>
                    Remember me
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => navigation.navigate(Routes.ForgotPassword)}>
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
              <CustomTextInput
                placeholder="Mobile No"
                value={mobileNumber}
                onChangeText={setMobileNumber}
                errorMessage=""
                keyboardType="number-pad"
              />
              {requestedotp && (
                <>
                  <CustomTextInput
                    placeholder="OTP"
                    value={otp}
                    onChangeText={setOtp}
                  />
                  <View style={styles.otpResendContainer}>
                    <Text style={styles.otpText}>Didn’t receive OTP? </Text>
                    <Text style={styles.resendText}>Resend Code</Text>
                  </View>
                </>
              )}
            </>
          )}

          <Button
            text={selected == 0 || requestedotp ? 'Login' : 'Request OTP'}
            onPress={loginUser}
          />
          <SocialLogin />
          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Don’t have an account! </Text>
            <RNText
              onPress={() => navigation.navigate(Routes.SignUp)}
              style={styles.signupLink}>
              Sign up
            </RNText>
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
  logo: {
    height: nh(75),
    width: nh(75),
    alignSelf: 'center',
    marginBottom: nh(30),
  },
  rememberContainer: {
    marginBottom: nh(50),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxStyle: {
    padding: 0,
    margin: 0,
    marginRight: nw(5),
  },
  otpResendContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: nh(50),
  },
  otpText: {
    color: COLORS.grey999999,
    fontSize: nh(12),
    fontFamily: APP_FONTS.PoppinsMedium,
  },
  resendText: {
    color: COLORS.yellowF5BE00,
    fontSize: nh(12),
    fontFamily: APP_FONTS.PoppinsMedium,
    textDecorationLine: 'underline',
  },
  signupContainer: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupText: {
    color: COLORS.grey999999,
    fontSize: nh(12),
    fontFamily: APP_FONTS.PoppinsMedium,
  },
  signupLink: {
    color: COLORS.yellowF5BE00,
    fontSize: nh(12),
    fontFamily: APP_FONTS.PoppinsMedium,
  },
});
