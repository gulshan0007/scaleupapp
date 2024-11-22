import React from 'react';
import { View, StyleSheet } from 'react-native';
import SplashScreen from './src/screens/onboarding/SplashScreen';

const App = () => {

  return (
    <View style={styles.container}>
      <SplashScreen />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
