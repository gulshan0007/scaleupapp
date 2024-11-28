import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {logoutUser} from '../../helper/commonFunctions';

type Props = {};

const Home = (props: Props) => {
  return (
    <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
      <Text>Home</Text>
      <Text onPress={logoutUser}>Logout</Text>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
