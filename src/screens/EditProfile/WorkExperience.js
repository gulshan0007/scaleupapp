import React, {useState} from 'react';
import {StyleSheet, SafeAreaView, StatusBar, View} from 'react-native';
import {COLORS} from '../../helper/colors';
import {DEVICE_WIDTH, nh, nw} from '../../helper/scales';
import Header from '../../components/Header';
import CustomTextInput from '../../components/TextInput';
import {CheckBox} from 'react-native-elements';
import Text from '../../components/Text';
import Button from '../../components/Button';

const WorkExperience = ({navigation, route}) => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      {/* StatusBar */}
      <StatusBar
        barStyle="dark-content"
        backgroundColor={COLORS.yellowF5BE00}
      />
      <Header
        title="Work Experience"
        // backIcon={icons.backArrow} // Provide your back arrow icon
        // rightIcon={icons.menu} // Provide your right icon
        onBackPress={() => navigation.goBack()}
        // onRightIconPress={handleRightIconPress}
      />
      <View style={styles.layer1}>
        <View style={styles.layer2}>
          <View style={styles.input}>
            <CustomTextInput
              width={(DEVICE_WIDTH - 55) / 2}
              label="Designation"
            />
            <CustomTextInput
              width={(DEVICE_WIDTH - 55) / 2}
              label="Company Name"
            />
          </View>
          <View style={styles.input}>
            <CustomTextInput
              width={(DEVICE_WIDTH - 55) / 2}
              label="Start Date"
            />
            <CustomTextInput width={(DEVICE_WIDTH - 55) / 2} label="End Date" />
          </View>
          <CustomTextInput label="Roles & Responsibilities" textinputType="L" />
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
              I currently work here
            </Text>
          </View>
          <View
            style={{
              marginTop: 30,
              marginLeft: DEVICE_WIDTH - 105,
              marginBottom: nh(100),
            }}>
            <Button
              text="Save"
              width={nw(63)}
              height={nh(35)}
              textStyle={{fontSize: 14}}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default WorkExperience;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.yellowF5BE00,
  },
  layer1: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginTop: nh(32),
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
  input: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: nh(15),
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
});
