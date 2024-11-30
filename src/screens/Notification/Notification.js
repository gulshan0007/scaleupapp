import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  StatusBar,
  View,
  Image,
  ImageBackground,
  FlatList,
} from 'react-native';
import {COLORS} from '../../helper/colors';
import {DEVICE_WIDTH, nh, nw} from '../../helper/scales';
import Header from '../../components/Header';
import {images} from '../../assets/images';
import CustomTextInput from '../../components/TextInput';
import ToggleWithUnderline from '../../components/TogglewithUnderline';
import Text from '../../components/Text';
import Button from '../../components/Button';

const Notifications = ({navigation, route}) => {
  let data = [
    {
      date: 'Yesterday, June 30',
      notifications: [
        {
          image: '',
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, ',
          time: '09:10am',
        },
        {
          image: '',
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, ',
          time: '09:10am',
        },
      ],
    },
    {
      date: 'Yesterday, June 30',
      notifications: [
        {
          image: '',
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, ',
          time: '09:10am',
        },
        {
          image: '',
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, ',
          time: '09:10am',
        },
      ],
    },
    {
      date: 'Yesterday, June 30',
      notifications: [
        {
          image: '',
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, ',
          time: '09:10am',
        },
        {
          image: '',
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, ',
          time: '09:10am',
        },
      ],
    },
    {
      date: 'Yesterday, June 30',
      notifications: [
        {
          image: '',
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, ',
          time: '09:10am',
        },
        {
          image: '',
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, ',
          time: '09:10am',
        },
      ],
    },
  ];
  return (
    <SafeAreaView style={styles.container}>
      {/* StatusBar */}
      <StatusBar
        barStyle="dark-content"
        backgroundColor={COLORS.yellowF5BE00}
      />

      <ImageBackground
        source={images.ellipse}
        style={styles.semicirlce}
        resizeMode="stretch">
        <Header
          title="Notifications"
          // backIcon={icons.backArrow} // Provide your back arrow icon
          rightIcon={false} // Provide your right icon
          // onBackPress={handleBackPress}
          // onRightIconPress={handleRightIconPress}
        />
      </ImageBackground>

      <View style={{position: 'absolute', left: nw(16), right: 0, top: 80}}>
        <CustomTextInput width={DEVICE_WIDTH - 32} height={nh(50)} />
      </View>
      {data.length == 0 ? (
        <View>
          <View style={{marginHorizontal: nw(16)}}>
            <ToggleWithUnderline options={['ALL', 'READ', 'UNREAD']} />
          </View>

          <FlatList
            data={data}
            renderItem={({item}) => {
              return (
                <View
                  style={{
                    marginHorizontal: nw(16),
                    marginTop: nh(15),
                    marginBottom: 5,
                  }}>
                  <Text variant="medium12" color={COLORS.greyBBBBBB}>
                    {item?.date}
                  </Text>
                  {item.notifications.map(u => (
                    <View style={styles.card}>
                      <Image
                        style={styles.image}
                        source={images.ciclelogo}
                        resizeMode="contain"
                      />
                      <Text
                        variant="medium12"
                        color={COLORS.blue043142}
                        style={{width: '70%'}}>
                        {u.text}
                      </Text>
                      <Text variant="medium12" color={COLORS.grey999999}>
                        {`\n${u.time}`}
                      </Text>
                    </View>
                  ))}
                </View>
              );
            }}
          />
        </View>
      ) : (
        <View>
          <Image
            source={images.notification}
            resizeMode="contain"
            style={styles.notimage}
          />

          <Text
            variant="semibold20"
            color={COLORS.blue043142}
            style={{textAlign: 'center', marginTop: nh(30)}}>
            You’re All Caught Up{' '}
          </Text>
          <Text
            variant="medium14"
            color={COLORS.grey999999}
            style={{
              textAlign: 'center',
              marginTop: nh(5),
              marginBottom: nh(20),
            }}>
            No new notifications right now. Check back later or explore more
            content in the meantime.
          </Text>
          <Button text="Explore Content" />
        </View>
      )}
    </SafeAreaView>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.whiteFFFFFF,
  },
  semicirlce: {
    width: DEVICE_WIDTH,
    height: nh(120),
    marginBottom: nh(20),
  },
  image: {
    height: nh(40),
    width: nw(40),
    borderRadius: nh(20),
    marginRight: 10,
  },
  card: {
    flexDirection: 'row',
    boxShadow: '0 4 4 0 #0000001A',
    height: nh(60),
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: 'rgba(214, 214, 214, 0.25)',
    borderRadius: nh(10),
  },
  notimage: {
    height: nh(275),
    width: nw(300),
    alignSelf: 'center',
    marginTop: nh(30),
  },
});
