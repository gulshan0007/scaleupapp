import React, { useState, useEffect, useRef } from 'react';
import { 
  StyleSheet, 
  SafeAreaView, 
  StatusBar, 
  View, 
  FlatList, 
  Image, 
  TouchableOpacity,
  Dimensions,
  Animated
} from 'react-native';
import axios from 'axios';
import { COLORS } from '../../helper/colors';
import { nh, nw } from '../../helper/scales';
import MainHeader from '../../components/MainHeader';
import Text from '../../components/Text';
import StoryUpload from './StoryUpload';
import Post from './Post';

// Story Viewer Component
const StoryViewer = ({ stories, onClose }) => {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const progressAnim = useRef(new Animated.Value(0)).current;
  const timerRef = useRef(null);

  useEffect(() => {
    startProgressAnimation();
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [currentStoryIndex]);

  const startProgressAnimation = () => {
    Animated.timing(progressAnim, {
      toValue: 1,
      duration: 10000, // 10 seconds
      useNativeDriver: false,
    }).start(() => {
      // Move to next story
      if (currentStoryIndex < stories.length - 1) {
        setCurrentStoryIndex(currentStoryIndex + 1);
        progressAnim.setValue(0);
      } else {
        onClose(); // Close story viewer if last story
      }
    });
  };

  const handleStoryPress = (direction) => {
    progressAnim.stopAnimation();
    if (direction === 'next' && currentStoryIndex < stories.length - 1) {
      setCurrentStoryIndex(currentStoryIndex + 1);
      progressAnim.setValue(0);
    } else if (direction === 'prev' && currentStoryIndex > 0) {
      setCurrentStoryIndex(currentStoryIndex - 1);
      progressAnim.setValue(0);
    }
  };

  const currentStory = stories[currentStoryIndex];

  return (
    <View style={styles.storyViewerContainer}>
      {/* Progress Bar */}
      <View style={styles.progressBarContainer}>
        {stories.map((_, index) => (
          <View key={index} style={styles.progressBarBackground}>
            <Animated.View 
              style={[
                styles.progressBarForeground, 
                { 
                  width: index === currentStoryIndex 
                    ? progressAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0%', '100%']
                      }) 
                    : index < currentStoryIndex 
                      ? '100%' 
                      : '0%'
                }
              ]} 
            />
          </View>
        ))}
      </View>

      {/* Story Image */}
      <TouchableOpacity 
        style={styles.storyFullScreen}
        activeOpacity={1}
        onPressIn={(e) => {
          const { locationX } = e.nativeEvent;
          const screenWidth = Dimensions.get('window').width;
          handleStoryPress(locationX < screenWidth / 2 ? 'prev' : 'next');
        }}
      >
        <Image 
          source={{ uri: currentStory.mediaUrl }} 
          style={styles.storyFullScreenImage} 
          resizeMode="cover"
        />
      </TouchableOpacity>

      {/* Close Button */}
      <TouchableOpacity 
        style={styles.closeButton} 
        onPress={onClose}
      >
        <Text style={styles.closeButtonText}>✕</Text>
      </TouchableOpacity>
    </View>
  );
};

const Home = ({navigation, route}) => { 
  const [stories, setStories] = useState([]);
  const [selectedStory, setSelectedStory] = useState(null);

  useEffect(() => { 
    fetchStories(); 
  }, []);

  const fetchStories = async () => { 
    try { 
      const response = await axios.get('http://192.168.1.100:5000/stories'); 
      setStories(response.data); 
    } catch (error) { 
      console.error('Failed to fetch stories', error); 
    } 
  };

  const renderStoryItem = ({ item, index }) => { 
    if (index === 0) { 
      return ( 
        <StoryUpload 
          userId="current-user-id" 
          onStoryUploaded={fetchStories} 
        /> 
      ); 
    }

    const validUri = item?.mediaUrl 
      ? { uri: item.mediaUrl } 
      : require('../../assets/images/ciclelogo.png');

    return ( 
      <TouchableOpacity 
        onPress={() => setSelectedStory(stories)}
        style={styles.storyItemContainer}
      > 
        <Image 
          source={validUri} 
          style={styles.storyImage} 
        /> 
      </TouchableOpacity> 
    ); 
  };

  if (selectedStory) {
    return (
      <StoryViewer 
        stories={selectedStory} 
        onClose={() => setSelectedStory(null)} 
      />
    );
  }

  return ( 
    <SafeAreaView style={styles.container}> 
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.yellowF5BE00} /> 
      <MainHeader /> 
      <View style={styles.layer1}> 
        <View style={styles.layer2}> 
        <Text variant="semibold16" style={{ paddingLeft: nw(16), marginTop: nh(15), color: 'black' }}> 
            Announcements 
          </Text>
          <View style={{height: nh(70)}}> 
            <FlatList 
              data={[null, ...stories]} 
              horizontal 
              contentContainerStyle={{ 
                paddingLeft: nw(16), 
                marginTop: nh(10) 
              }} 
              showsHorizontalScrollIndicator={false} 
              renderItem={renderStoryItem} 
              keyExtractor={(item, index) => item?._id?.toString() || `story-${index}`} 
            /> 
          </View>
          
          <Post /> 
        </View> 
      </View> 
    </SafeAreaView> 
  ); 
};

const styles = StyleSheet.create({
  storyItemContainer: {
    borderWidth: 2,
    borderColor: COLORS.yellowF5BE00,
    borderRadius: nh(35),
    padding: 2,
    marginRight: nw(10),
  },
  storyImage: { 
    height: nh(50), 
    width: nw(50), 
    borderRadius: nh(25), 
  },
  storyViewerContainer: {
    flex: 1,
    backgroundColor: 'black',
  },
  storyFullScreen: {
    flex: 1,
  },
  storyFullScreenImage: {
    width: '100%',
    height: '100%',
  },
  progressBarContainer: {
    position: 'absolute',
    top: 10,
    left: 0,
    right: 0,
    flexDirection: 'row',
    paddingHorizontal: 10,
    zIndex: 1,
  },
  progressBarBackground: {
    flex: 1,
    height: 3,
    backgroundColor: 'rgba(255,255,255,0.3)',
    marginHorizontal: 2,
    borderRadius: 1.5,
    overflow: 'hidden',
  },
  progressBarForeground: {
    height: '100%',
    backgroundColor: 'white',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 24,
  },
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
  }, 
});

export default Home;