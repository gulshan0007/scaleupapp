import React, {useState} from 'react';
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import {nh, nw} from '../helper/scal.utils';
import {COLORS} from '../helper/colors';
import {APP_FONTS} from '../assets/fonts';
import {icons} from '../assets/icons';

const CustomTextInput = ({
  placeholder = 'Enter text', // Placeholder text
  value,
  onChangeText,
  errorMessage = '', // Error message (icon + text)
  successMessage = '', // Success message (icon + text)
  rightIcon, // Component for the right-side icon
  onRightIconPress = () => {}, // Callback for right icon press
  marginBottom = 15,
  dropDown = false,
  secureTextEntry = false,
  keyboardType = 'default',
}) => {
  const [selectedCountry, setSelectedCountry] = useState({
    name: 'India',
    flag: '🇮🇳',
    code: '+91',
  });
  return (
    <View>
      {/* Input field */}
      <View
        style={[
          styles.inputContainer,
          {
            marginBottom: marginBottom,
          },
        ]}>
        {/* Country Dropdown */}
        {dropDown && (
          <TouchableOpacity
            style={styles.countryDropdown}
            // onPress={() => setModalVisible(true)}
          >
            <Text style={styles.flagIcon}>{selectedCountry.flag}</Text>
          </TouchableOpacity>
        )}
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          placeholderTextColor={COLORS.grey999999}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
        />
        {rightIcon && (
          <TouchableOpacity onPress={onRightIconPress}>
            <Image source={rightIcon} style={styles.icon} />
          </TouchableOpacity>
        )}
      </View>

      {/* Error or Success Message */}
      {(errorMessage || successMessage) &&
        (errorMessage ? (
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        ) : (
          <Text style={styles.successMessage}>{successMessage}</Text>
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: nw(20),
    paddingRight: nw(10),
    paddingTop: 5,

    borderWidth: 1,
    borderRadius: nh(10),
    height: nh(40),
    backgroundColor: COLORS.whiteFFFFFF,
    borderColor: 'rgba(214, 214, 214, 0.2)',
    boxShadow: '2 2 5 0 rgba(0, 0, 0, 0.1)',
  },
  input: {
    flex: 1,
    alignItems: 'center',

    height: nh(40),
    fontSize: nh(12),
    color: '#000',
    fontFamily: APP_FONTS.PoppinsMedium,
  },

  errorMessage: {
    marginTop: -5,
    color: COLORS.redEA4335,
    fontSize: nh(12),
    fontFamily: APP_FONTS.PoppinsMedium,
    textAlign: 'right',
    marginBottom: nh(10),
  },

  successMessage: {
    marginTop: -5,
    color: COLORS.green34A853,
    fontSize: nh(12),
    fontFamily: APP_FONTS.PoppinsSemiBold,
    textAlign: 'right',
    marginBottom: nh(10),
  },
  icon: {
    height: nh(20),
    width: nw(20),
  },
  countryDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: nw(10),
    marginLeft: nw(-13),
    borderRightWidth: 1,
    borderColor: '#ddd',
  },
  flagIcon: {
    fontSize: 25,
    marginRight: nw(15),
    marginTop: -5,
  },
});

export default CustomTextInput;
