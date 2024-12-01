import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useToast} from './components/CustomToast';
import {useNavigation} from '@react-navigation/native';
import {setupAxiosInterceptors} from './services/axiosinstance';
import Routes from './helper/routes';
// screens
import SplashScreen from './screens/Onboarding/SplashScreen';
import OnboardingScreen from './screens/Onboarding/Onboarding';
import SignUp from './screens/Signup/Signup';
import Login from './screens/Login/Login';
import ForgotPassword from './screens/Login/ForgotPassword';
import Verification from './screens/Login/Verification';
import Preferences from './screens/Preferences/Preferences';
import EditProfile from './screens/EditProfile/EditProfile';
import WorkExperience from './screens/EditProfile/WorkExperience';
import Education from './screens/EditProfile/Education';
import Certifications from './screens/EditProfile/Certifications';
import Projects from './screens/EditProfile/Projects';
import SetNewPassword from './screens/Login/SetNewPassword';
import Home from './screens/Home/Home';
import BasicDetails from './screens/Signup/BasicDetails';
import Notifications from './screens/Notification/Notification';

const Stack = createNativeStackNavigator();
const LoginStack = createNativeStackNavigator();

const LoginNavigator = ({route}) => {
  return (
    <LoginStack.Navigator
      initialRouteName={route.params?.initialRoute || Routes.SplashScreen}>
      <LoginStack.Screen
        name={Routes.SplashScreen}
        component={SplashScreen}
        options={{headerShown: false}}
      />
      <LoginStack.Screen
        name={Routes.OnboardingScreen}
        component={OnboardingScreen}
        options={{headerShown: false}}
      />
      <LoginStack.Screen
        name={Routes.SignUp}
        component={SignUp}
        options={{headerShown: false}}
      />
      <LoginStack.Screen
        name={Routes.BasicDetails}
        component={BasicDetails}
        options={{headerShown: false}}
      />
      <LoginStack.Screen
        name={Routes.Login}
        component={Login}
        options={{headerShown: false}}
      />
      <LoginStack.Screen
        name={Routes.ForgotPassword}
        component={ForgotPassword}
        options={{headerShown: false}}
      />
      <LoginStack.Screen
        name={Routes.Verification}
        component={Verification}
        options={{headerShown: false}}
      />
      <LoginStack.Screen
        name={'Preferences'}
        component={Preferences}
        options={{headerShown: false}}
      />

      <LoginStack.Screen
        name={'EditProfile'}
        component={EditProfile}
        options={{headerShown: false}}
      />
      <LoginStack.Screen
        name={'WorkExperience'}
        component={WorkExperience}
        options={{headerShown: false}}
      />
      <LoginStack.Screen
        name={'Education'}
        component={Education}
        options={{headerShown: false}}
      />
      <LoginStack.Screen
        name={'Certifications'}
        component={Certifications}
        options={{headerShown: false}}
      />
      <LoginStack.Screen
        name={'Projects'}
        component={Projects}
        options={{headerShown: false}}
      />
      <LoginStack.Screen
        name={Routes.SetNewPassword}
        component={SetNewPassword}
        options={{headerShown: false}}
      />
    </LoginStack.Navigator>
  );
};

export const RootNavigator = () => {
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
      initialRouteName={Routes.LoginStack}>
      <Stack.Screen
        name={Routes.LoginStack}
        component={LoginNavigator}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name={Routes.Home}
        component={Home}
        options={{headerShown: false}}
      />
      <LoginStack.Screen
        name={Routes.Notifications}
        component={Notifications}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
