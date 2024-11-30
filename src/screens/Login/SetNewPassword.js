import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  StatusBar,
  View,
  Image,
  Text as RNText,
} from 'react-native';
import {COLORS} from '../../helper/colors';
import {nh, nw} from '../../helper/scales';
import Text from '../../components/Text';
import CustomTextInput from '../../components/TextInput';
import Button from '../../components/Button';
import {APP_FONTS} from '../../assets/fonts';
import {images} from '../../assets/images';
import {icons} from '../../assets/icons';
import Routes from '../../helper/routes';
import {isValidEmail} from '../../helper/commonFunctions';

const SetNewPassword = ({navigation}) => {
  const [form, setForm] = useState({
    email: '',
    code: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    code: '',
    password: '',
    confirmPassword: '',
  });

  const [resendTimer, setResendTimer] = useState(60);
  const [isResendDisabled, setIsResendDisabled] = useState(false);

  useEffect(() => {
    let timer;
    if (resendTimer > 0 && isResendDisabled) {
      timer = setInterval(() => {
        setResendTimer(prev => prev - 1);
      }, 1000);
    } else if (resendTimer === 0) {
      setIsResendDisabled(false);
      setResendTimer(60); // Reset timer
    }

    return () => clearInterval(timer);
  }, [resendTimer, isResendDisabled]);

  const handleResendClick = () => {
    setIsResendDisabled(true);
    setResendTimer(60);
    console.log('Resend email logic triggered');
    // Add resend email API call logic here
  };

  const handleInputChange = (field, value) => {
    setForm({...form, [field]: value});

    if (errors[field]) {
      setErrors({...errors, [field]: ''});
    }
  };

  const validateFields = () => {
    let isValid = true;
    const newErrors = {};

    if (!form.email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!isValidEmail(form.email)) {
      newErrors.email = 'Please Enter valid email address';
      isValid = false;
    }

    if (!form.code) {
      newErrors.code = 'Code is required';
      isValid = false;
    }

    if (!form.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (form.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
      isValid = false;
    }

    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = 'Password does not match';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = () => {
    if (validateFields()) {
      console.log('Password reset successfully');
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
          <Image source={images.set} style={styles.logo} />
          <Text variant="semibold18" color={COLORS.blue043142}>
            Set New Password
          </Text>
          <Text
            variant="medium14"
            color={COLORS.grey999999}
            style={{marginBottom: 30}}>
            Great, now set a strong password
          </Text>

          <CustomTextInput
            placeholder="Email"
            value={form.email}
            onChangeText={value => handleInputChange('email', value)}
            errorMessage={errors.email}
          />

          <CustomTextInput
            placeholder="Code"
            value={form.code}
            onChangeText={value => handleInputChange('code', value)}
            errorMessage={errors.code}
          />

          <View style={styles.resendContainer}>
            <Text style={styles.resendText}>Didn’t receive the email? </Text>
            {isResendDisabled ? (
              <Text style={styles.timerText}>Resend in {resendTimer}s</Text>
            ) : (
              <RNText onPress={handleResendClick} style={styles.resendLink}>
                Click to resend
              </RNText>
            )}
          </View>

          <CustomTextInput
            placeholder="Password"
            value={form.password}
            onChangeText={value => handleInputChange('password', value)}
            errorMessage={errors.password}
            rightIcon={icons.hide}
          />

          <CustomTextInput
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChangeText={value => handleInputChange('confirmPassword', value)}
            errorMessage={errors.confirmPassword}
            rightIcon={icons.hide}
          />
          <View style={{marginBottom: nh(20)}} />
          <Button text={'Reset password'} onPress={handleSubmit} />

          <View style={styles.backToLogin}>
            <Text style={styles.backToLoginText}>Back to </Text>
            <RNText
              onPress={() => navigation.navigate(Routes.Login)}
              style={styles.loginLink}>
              Login
            </RNText>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

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
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: nh(10),
  },
  resendText: {
    color: COLORS.grey999999,
    fontSize: nh(12),
    fontFamily: APP_FONTS.PoppinsMedium,
  },
  timerText: {
    color: COLORS.redFF0000,
    fontSize: nh(12),
    fontFamily: APP_FONTS.PoppinsMedium,
  },
  resendLink: {
    color: COLORS.yellowF5BE00,
    fontSize: nh(12),
    fontFamily: APP_FONTS.PoppinsMedium,
    textDecorationLine: 'underline',
  },
  backToLogin: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backToLoginText: {
    color: COLORS.grey999999,
    fontSize: nh(12),
    fontFamily: APP_FONTS.PoppinsMedium,
  },
  loginLink: {
    color: COLORS.yellowF5BE00,
    fontSize: nh(12),
    fontFamily: APP_FONTS.PoppinsMedium,
  },
});

export default SetNewPassword;
