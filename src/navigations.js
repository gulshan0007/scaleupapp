import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useToast} from './components/CustomToast';
import {createDrawerNavigator, DrawerContent} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';
import {setupAxiosInterceptors} from './services/axiosinstance';
import SplashScreen from './screens/onboarding/SplashScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const LoginStack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const LoginNavigator = () => {
  return (
    <LoginStack.Navigator initialRouteName={'SplashScreen'}>
      <LoginStack.Screen
        name={'SplashScreen'}
        component={SplashScreen}
        options={{headerShown: false}}
      />
      {/* <LoginStack.Screen
                name={'Login'}
                component={Login}
                options={{ headerShown: false }}
            /> */}
      {/* <LoginStack.Screen
                name={'SignUp'}
                component={SignUP}
                options={{ headerShown: false }}
            />

            <LoginStack.Screen
                name={'SmsVerification'}
                component={SmsVerification}
                options={{ headerShown: false }}
            /> */}
    </LoginStack.Navigator>
  );
};

// const TabNavigator = ({ navigation, route }) => {

//     const setBottomIcon = (RenderSvg) => {
//         return (
//             <RenderSvg resizeMode="contain" height={24} />
//         );
//     };

//     const setBottomIconText = (iconText, focused) => {
//         return (
//             <Text
//                 style={{
//                     fontFamily: FONTS.CircularstdMedium,
//                     color: focused ? COLORS.blue1E71F2 : COLORS.greyACACAC,
//                     fontSize: normalize(14),
//                     marginTop: normalize(7)
//                 }}>
//                 {iconText}
//             </Text>
//         );
//     };

//     return (
//         <Tab.Navigator
//             initialRouteName={'Feed'}
//             screenOptions={props => {
//                 return {
//                     tabBarLabelPosition: 'below-icon',
//                     headerShown: false,
//                     headerTransparent: true,
//                     tabBarHideOnKeyboard: true,
//                     showIcon: true,
//                     tabBarStyle: {
//                         paddingVertical: 14,
//                     },
//                     tabBarItemStyle: {
//                         backgroundColor: COLORS.whiteFFFFFF,
//                     }
//                 };
//             }}>
//             <Tab.Screen
//                 name={'GenAI'}
//                 component={GenAI}
//                 options={{
//                     headerShown: false,
//                     tabBarLabel: ({ focused }) => setBottomIconText('Gen AI', focused),
//                     tabBarIcon: ({ focused }) => setBottomIcon(focused ? GenaiBlueSVG : GenaiSVG),
//                 }}
//             />
//             < Tab.Screen
//                 name={'ChatBot'}
//                 component={ChatBot}
//                 options={{
//                     headerShown: false,
//                     tabBarLabel: ({ focused }) => setBottomIconText('Task bot', focused),
//                     tabBarIcon: ({ focused }) => setBottomIcon(focused ? TaskBotBlueSVG : TaskBotSVG),
//                 }}
//             />

//             <Tab.Screen
//                 name={'News'}
//                 component={News}
//                 options={{
//                     headerShown: false,
//                     tabBarLabel: ({ focused }) => setBottomIconText('News', focused),
//                     tabBarIcon: ({ focused }) => setBottomIcon(focused ? NewsBlueSVG : NewsSVG),
//                 }}
//             />
//             <Tab.Screen
//                 name={'Shop'}
//                 component={Shop}
//                 options={{
//                     headerShown: false,
//                     tabBarLabel: ({ focused }) => setBottomIconText('Shop', focused),
//                     tabBarIcon: ({ focused }) => setBottomIcon(focused ? CartBlueSVG : CartSVG),
//                 }}
//             />

//         </Tab.Navigator>
//     );
// };

const MainNavigator = () => {
  const {showToast} = useToast(); // Access useToast hook here
  const navigation = useNavigation();

  useEffect(() => {
    setupAxiosInterceptors(showToast, navigation);
  }, []);
  return (
    <Stack.Navigator
      screenOptions={{
        headerTransparent: true,
      }}
      initialRouteName={'LoginStack'}>
      <Stack.Screen
        name={'LoginStack'}
        component={LoginNavigator}
        options={{headerShown: false}}
      />

      {/* <Stack.Screen
                name={'TabNavigator'}
                component={TabNavigator}
                options={{ headerShown: false }}
            /> */}
    </Stack.Navigator>
  );
};

export const RootNavigator = props => {
  const {showToast} = useToast(); // Access useToast hook here
  const navigation = useNavigation();

  useEffect(() => {
    setupAxiosInterceptors(showToast, navigation);
  }, []);
  //   return (
  //     <Drawer.Navigator
  //       initialRouteName="Main"
  //       screenOptions={{
  //         drawerType: 'front',
  //         headerShown: false, // Hide header,
  //         swipeEnabled: false,
  //       }}
  //       drawerContent={props => <DrawerContent {...props} />}>
  //       <Drawer.Screen name="Main" component={MainNavigator} />
  //     </Drawer.Navigator>
  //   );

  return (
    <Stack.Navigator
      screenOptions={{
        headerTransparent: true,
      }}
      initialRouteName={'LoginStack'}>
      <Stack.Screen
        name={'LoginStack'}
        component={LoginNavigator}
        options={{headerShown: false}}
      />

      {/* <Stack.Screen
                name={'TabNavigator'}
                component={TabNavigator}
                options={{ headerShown: false }}
            /> */}
    </Stack.Navigator>
  );
};
