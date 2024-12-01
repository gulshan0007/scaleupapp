import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  StatusBar,
} from 'react-native';
import Text from '../../components/Text';
import {nh, nw} from '../../helper/scales';
import {images} from '../../assets/images';
import Icon from '../../helper/icon';
import {COLORS} from '../../helper/colors';
import {FlatList} from 'react-native';

const Post = () => {
  const PostView = () => {
    return (
      <View>
        <View style={styles.view}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image source={images.ciclelogo} style={styles.image} />
            <Text variant="medium14" color={COLORS.blue043142}>
              ankita
            </Text>
          </View>

          <Icon
            type="entypo"
            name="dots-three-vertical"
            size={21}
            color={COLORS.blue043142}
          />
        </View>

        <Image style={styles.postimage} />

        <View style={styles.view}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon
              type="antdesign"
              name="like2"
              size={24}
              color={COLORS.blue043142}
              style={{marginRight: nw(10)}}
            />

            <Icon
              type="ionicon"
              name="chatbubble-outline"
              size={24}
              color={COLORS.blue043142}
              style={{marginRight: nw(10)}}
            />
            <Icon
              type="feather"
              name="share-2"
              size={24}
              color={COLORS.blue043142}
            />
          </View>
          <Icon
            type="feather"
            name="bookmark"
            size={24}
            color={COLORS.blue043142}
          />
        </View>
        <Text
          variant="medium12"
          color={COLORS.grey333333}
          numberOfLines={2}
          style={{marginTop: nh(10)}}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore etfhfh hfhfhhf hfhfh
        </Text>
        <View style={{flexDirection: 'row', width: '100%'}}>
          {['', '', ''].map(() => (
            <View style={styles.yellowview}>
              <Text variant="medium12" color={COLORS.blue043142}>
                Design
              </Text>
            </View>
          ))}
        </View>
      </View>
    );
  };
  return (
    <View style={{paddingHorizontal: nw(16)}}>
      <Text
        variant="semibold16"
        style={{marginBlock: nh(16)}}
        color={COLORS.blue043142}>
        Post
      </Text>
      <FlatList
        data={['', '', '', '', '', '', '', '']}
        renderItem={() => <PostView />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  image: {
    height: nh(30),
    width: nw(30),
    borderRadius: nh(15),
    marginRight: nw(7),
  },
  postimage: {
    height: nh(175),
    backgroundColor: COLORS.grey999999,
    borderRadius: 10,
    marginTop: nh(10),
    marginBottom: nh(15),
  },
  yellowview: {
    backgroundColor: 'rgba(245, 190, 0, 0.15)',
    alignItems: 'flex-start',
    paddingVertical: 6,
    paddingHorizontal: nh(10),
    borderRadius: 8,
    marginRight: 10,
    marginTop: nh(10),
  },
});

export default Post;
