import React, { useState } from 'react';
import { 
  View, 
  TouchableOpacity, 
  Image, 
  Platform,
  StyleSheet
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';
import Text from '../../components/Text';
import { nh, nw } from '../../helper/scales';
import { COLORS } from '../../helper/colors';

const StoryUpload = ({ userId, onStoryUploaded }) => {
  const [storyMedia, setStoryMedia] = useState(null);

  const pickStoryMedia = () => {
    const options = {
      mediaType: 'mixed',
      selectionLimit: 1,
    };

    launchImageLibrary(options, async (response) => {
      if (response.didCancel) return;
      if (response.errorCode) {
        console.error('Image picker error:', response.errorMessage);
        return;
      }

      const asset = response.assets[0];
      setStoryMedia({ uri: asset.uri });
      await uploadStory(asset);
    });
  };

  const uploadStory = async (mediaAsset) => {
    try {
      // Create form data
      const formData = new FormData();
      formData.append('story', {
        uri: mediaAsset.uri,
        type: mediaAsset.type,
        name: mediaAsset.fileName || 'story'
      });
      formData.append('userId', userId);

      // Upload to backend
      const response = await axios.post('http://192.168.1.100:5000/stories', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      onStoryUploaded(response.data);
      Alert.alert('Success', 'Story uploaded successfully!');
    } catch (error) {
      console.error('Story upload error:', error);
      Alert.alert('Error', 'Failed to upload story.');
    }
  };

  return (
    <TouchableOpacity onPress={pickStoryMedia}>
      <View style={styles.storyUploadContainer}>
        {storyMedia ? (
          <Image 
            source={storyMedia} 
            style={styles.storyPreview} 
          />
        ) : (
          <View style={styles.addStoryContainer}>
            <Text style={styles.addStoryText}>+ Add Story</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  storyUploadContainer: {
    marginRight: nw(10),
    alignItems: 'center',
    justifyContent: 'center'
  },
  storyPreview: {
    height: nh(50),
    width: nw(50),
    borderRadius: nh(25),
    borderWidth: 2,
    borderColor: COLORS.yellowF5BE00
  },
  addStoryContainer: {
    height: nh(50),
    width: nw(50),
    borderRadius: nh(25),
    backgroundColor: COLORS.yellowF5BE00,
    alignItems: 'center',
    justifyContent: 'center'
  },
  addStoryText: {
    color: COLORS.whiteFFFFFF,
    fontSize: nh(12)
  }
});

export default StoryUpload;
