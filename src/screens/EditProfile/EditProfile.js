import React, {useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  StatusBar,
  View,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {COLORS} from '../../helper/colors';
import {DEVICE_WIDTH, nh, nw} from '../../helper/scales';
import Header from '../../components/Header';
import SquareToggle from '../../components/ToggleButton';
import Text from '../../components/Text';
import {images} from '../../assets/images';
import Icon from '../../helper/icon';
import CustomTextInput from '../../components/TextInput';
import Button from '../../components/Button';

const EditProfile = ({navigation, route}) => {
  const [selected, setSelected] = useState(0);
  const onSelect = number => {
    setSelected(number);
  };
  let professionData = [
    {
      image: images.preference,
      title: 'Preferences',
      subtitle: 'Update choices for recommendations',
      nav: 'Preferences',
    },

    {
      image: images.education,
      title: 'Educational Information',
      subtitle: 'Add your academic details',
      nav: 'Education',
    },
    {
      image: images.work,
      title: 'Work Experience',
      subtitle: 'Add your past work details',
      nav: 'WorkExperience',
    },
    {
      image: images.certification,
      title: 'Certifications',
      subtitle: 'Add your certificates',
      nav: 'Certifications',
    },
    {
      image: images.project,
      title: 'Projects',
      subtitle: 'Add the projects details you worked on',
      nav: 'Projects',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* StatusBar */}
      <StatusBar
        barStyle="dark-content"
        backgroundColor={COLORS.yellowF5BE00}
      />
      <Header
        title="Edit Profile"
        // backIcon={icons.backArrow} // Provide your back arrow icon
        // rightIcon={icons.menu} // Provide your right icon
        onBackPress={() => navigation.goBack()}
        // onRightIconPress={handleRightIconPress}
      />
      <View style={styles.layer1}>
        <View style={styles.layer2}>
          <SquareToggle
            options={['Personal', 'Professional']}
            selected={selected}
            onToggle={number => onSelect(number)}
          />
          <ScrollView>
            {selected == 0 && (
              <>
                <Text variant="semibold16" color={COLORS.green34A853}>
                  You only need 20% more
                </Text>
                <Text variant="medium14" color={COLORS.grey999999}>
                  Complete your profile and get personalized recommendations now
                </Text>
                <View style={styles.progresbar}>
                  <View style={styles.greenbar}></View>
                </View>
                <View>
                  <Image
                    source={images.logo}
                    style={styles.image}
                    resizeMode="cover"
                  />
                  <View style={styles.circle}>
                    <Icon
                      type="antdesign"
                      name="edit"
                      style={{marginLeft: 0.5}}
                      size={16}
                    />
                  </View>
                </View>

                <CustomTextInput label="Name" />
                <CustomTextInput label="Email" />
                <CustomTextInput label="Mobile No" />
                <CustomTextInput label="Location" />
                <CustomTextInput label="Date of Birth" />
                <CustomTextInput label="About" textinputType="L" />
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
              </>
            )}
            {selected == 1 &&
              professionData?.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.card}
                  onPress={() => navigation.navigate(item.nav)}>
                  <View style={styles.cardimage}>
                    <Image
                      source={item.image}
                      style={{height: nh(29), width: nw(29)}}
                      resizeMode="contain"
                    />
                  </View>
                  <View>
                    <Text variant="semibold14" color={COLORS.blue043142}>
                      {item.title}
                    </Text>
                    <Text variant="medium12" color={COLORS.grey999999}>
                      {item.subtitle}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EditProfile;

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
  progresbar: {
    borderWidth: 1,
    borderColor: COLORS.greyD6D6D6,

    height: nh(12),
    borderRadius: 10,
    marginTop: nh(10),
    marginBottom: nh(30),
  },
  greenbar: {
    backgroundColor: COLORS.green34A853,
    width: nw(200),
    height: nh(12),
    borderRadius: 10,
  },
  image: {
    height: nh(100),
    width: nh(100),
    borderRadius: nh(50),
    alignSelf: 'center',
    marginBottom: 30,
  },
  circle: {
    height: nh(25),
    width: nh(25),
    borderRadius: nh(12),
    backgroundColor: COLORS.yellowF5BE00,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: nw(120),
    top: nh(65),
  },
  card: {
    height: nh(65),
    boxShadow: '2 2 5 0 rgba(0, 0, 0, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(214, 214, 214, 0.2)',
    borderRadius: 8,
    marginBottom: nh(15),
    padding: nh(10),
    flexDirection: 'row',
  },
  cardimage: {
    height: nh(45),
    width: nh(45),
    backgroundColor: 'rgba(245, 190, 0, 0.15)',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: nw(10),
  },
});
