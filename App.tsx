import React from 'react';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  createNavigationContainerRef,
  NavigationContainer,
} from '@react-navigation/native';
import { RootNavigator } from './src/navigations';
import { ToastProvider } from './src/components/CustomToast';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import reduxStore from './src/redux/store';

export const mainNavigationRef = createNavigationContainerRef();

function App(): React.JSX.Element {
  return (
    // <SafeAreaView style={backgroundStyle}>
    //   <StatusBar
    //     barStyle={isDarkMode ? 'light-content' : 'dark-content'}
    //     backgroundColor={COLORS.yellowF5BE00}
    //   />
    //   <GradientScreen />

    // </SafeAreaView>
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={reduxStore}>
        <NavigationContainer ref={mainNavigationRef}>
          <SafeAreaProvider>
            <ToastProvider>
              <RootNavigator />
            </ToastProvider>
          </SafeAreaProvider>
        </NavigationContainer>
      </Provider>
    </GestureHandlerRootView>
  );
}

export default App;
