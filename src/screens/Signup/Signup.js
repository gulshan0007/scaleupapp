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
import Routes from '../../helper/routes';
import {useToast} from '../../components/CustomToast';
import {registerApi} from '../../services/apiService';

const SignUp = ({navigation, route}) => {
  const {showToast} = useToast();
  const [isChecked, setIsChecked] = useState(false);
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [secureText, setSecureText] = useState(true);
  const [secureText1, setSecureText1] = useState(true);

  const callRegApi = async params => {
    try {
      const {data} = await registerApi(params);
      showToast({type: 'success', title: data?.message});
      navigation.navigate(Routes.Login);
      setEmail('');
      setFirstName('');
      setLastName('');
      setUserName('');
      setPassword('');
      setConfirmPassword('');
    } catch (error) {
      console.log('🚀 ~ callRegApi ~ error:', error);
    }
  };

  const registerUser = () => {
    let emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    let testedEmail = emailRegex.test(email);
    let passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    let testPassword = passwordRegex.test(password);

    if (userName === '') {
      showToast({title: 'Please Enter UserName'});
    } else if (email === '') {
      showToast({title: 'Please Enter email.'});
    } else if (!testedEmail) {
      showToast({title: 'Please Enter valid email address'});
    } else if (phone === '') {
      showToast({title: "Phone number can't be empty"});
    } else if (phone.length !== 10) {
      showToast({title: 'Phone number must be valid'});
    } else if (password === '') {
      showToast({title: 'Please Enter Password.'});
    } else if (!testPassword) {
      showToast({
        title:
          'Password must be at least 8 characters long, include one letter, one number, and one special character.',
      });
    } else if (password !== confirmPassword) {
      showToast({title: 'Passwords do not match.'});
    } else if (!isChecked) {
      showToast({title: 'Please agree to the terms.'});
    } else {
      const data = {
        username: userName,
        email: email,
        password: password,
        // firstname: firstName,
        // lastname: lastName,
        phoneNumber: phone,
      };
      callRegApi(data);
    }
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

          <CustomTextInput
            placeholder="Username"
            value={userName}
            onChangeText={setUserName}
          />
          <CustomTextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
          <CustomTextInput
            dropDown={true}
            placeholder="Mobile No"
            value={phone}
            onChangeText={setPhone}
            keyboardType="number-pad"
          />
          <CustomTextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            onRightIconPress={() => setSecureText(!secureText)}
            rightIcon={secureText ? icons.hide : icons.unhide}
            secureTextEntry={secureText}
          />
          <CustomTextInput
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            onRightIconPress={() => setSecureText1(!secureText1)}
            rightIcon={secureText1 ? icons.hide : icons.unhide}
            marginBottom={10}
            secureTextEntry={secureText1}
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
              style={{marginTop: -4}}>
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
              style={{marginTop: -4}}>
              Privacy Policy
            </Text>
          </View>

          <Button text="Sign up" onPress={registerUser} />
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
              onPress={() => navigation.navigate(Routes.Login)}
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
