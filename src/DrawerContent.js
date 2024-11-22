import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {DrawerContentScrollView} from '@react-navigation/drawer';
// import { appendExtenstion, logoutUser } from '../../utils/commonFunctions';
import {useDispatch, useSelector} from 'react-redux';
// import { FONTS } from '../../assets/fonts';
import {COLORS} from './helper/colors';
import {normalize} from './helper/scal.utils';

const DrawerContent = ({navigation}) => {
  const dispatch = useDispatch();
  // const profileData = useSelector(state => state?.profileData)
  const [isVisible, setvisibleModal] = useState(false);
  const menu = [
    {
      title: 'Accounts and Settings',
      nav: () => navigation.navigate('AccountSettings'),
    },
    {
      title: 'Notifications (Email)',
      nav: null,
    },
    {
      title: 'QR Code',
      nav: null,
    },
    {
      title: 'Professional Account',
      nav: null,
    },
    {
      title: 'View Archive',
      nav: null,
    },
    {
      title: 'Ad Tools',
      nav: null,
    },
    {
      title: 'Insights',
      nav: null,
    },
    {
      title: 'GenAI History',
      nav: null,
    },
    {
      title: 'Task Bot History',
      nav: null,
    },
    {
      title: 'Switch Accounts',
      nav: null,
    },
    {
      title: 'Report a Problem',
      nav: null,
    },
    {
      title: 'Log Out',
      nav: () => setvisibleModal(true),
    },
    {
      title: 'Cancel',
      nav: () => navigation.closeDrawer(),
    },
  ];

  return (
    <DrawerContentScrollView style={{backgroundColor: COLORS.blue043142}}>
      {/* <Modal
                isVisible={isVisible}

                useNativeDriver={true}
                animationIn={'fadeIn'}
                animationInTiming={500}
                onBackButtonPress={() => setvisibleModal(false)}
                onBackdropPress={() => setvisibleModal(false)}
                backdropOpacity={0.5}
            >
                <View style={{

                    backgroundColor: COLORS.whiteFFFFFF,

                    borderRadius: normalize(20),
                    minHeight: normalize(100),
                    alignItems: "center"


                }}>
                    <Image source={{ uri: appendExtenstion(profileData.profile_picture) }} style={{ height: normalize(100), width: normalize(100), borderRadius: normalize(50), borderWidth: 0.2, borderColor: COLORS.greyA7A7A7, marginTop: normalize(32) }} />
                    <Text style={{
                    
                        fontSize: normalize(16),
                        color: '#515151',
                        marginTop: normalize(27),
                        textAlign: 'center'

                    }}>{"Are you sure you want to log out\n"}

                        <Text style={{ fontFamily: FONTS.CircularstdBold, fontWeight: "700" }}>
                            @{profileData.name}
                        </Text>

                    </Text>
                    <CustomButton btnText='LOG OUT' btnContainerStyle={{
                        backgroundColor: COLORS.redE95050,
                        marginTop: normalize(25),
                        marginBottom: normalize(13),
                        height: normalize(36),
                        width: normalize(240)
                    }}
                        btnTextStyle={{

                            fontSize: normalize(16)
                        }}
                        handleBtnPressed={() => {
                            logoutUser(navigation, dispatch)
                            navigation.closeDrawer()
                        }}
                    />
                    <CustomButton btnText='CANCEL' btnContainerStyle={{
                        backgroundColor: COLORS.greyD1D1D1,
                        height: normalize(36),
                        width: normalize(240),
                        marginBottom: normalize(28)
                    }}
                        btnTextStyle={{
                            color: COLORS.black333333,
                            fontSize: normalize(14)
                        }}
                        handleBtnPressed={() => setvisibleModal(false)}
                    />
                </View>
            </Modal > */}
      <View style={{marginLeft: normalize(20), marginTop: normalize(85)}}>
        <TouchableOpacity
          onPress={() => {
            navigation.closeDrawer();
            // dispatch(actions.setTab(7))
          }}
          style={{
            marginBottom: normalize(36),
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          {/* {profileData?.profile_picture ?
                        <Image
                            source={{ uri: appendExtenstion(profileData?.profile_picture) }}
                            style={{ height: normalize(60), width: normalize(60), borderRadius: normalize(60 / 2) }}
                        /> : null} */}
          <View style={{marginLeft: normalize(8)}}>
            <Text
              style={{
                fontSize: normalize(16),
                color: COLORS.whiteFFFFFF,
                fontWeight: '700',
              }}>
              {'profileData.user_name'}
            </Text>
            <Text
              style={{
                fontSize: normalize(12),
                color: COLORS.whiteFFFFFF,
                marginTop: normalize(4),
              }}>
              @{'profileData.name'}
            </Text>
          </View>
        </TouchableOpacity>
        {menu?.map((u, i) => {
          return (
            <TouchableOpacity
              key={i}
              style={{marginBottom: normalize(20)}}
              onPress={u.nav}>
              <Text
                style={{fontSize: normalize(18), color: COLORS.whiteFFFFFF}}>
                {u.title}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </DrawerContentScrollView>
  );
};

export default DrawerContent;
