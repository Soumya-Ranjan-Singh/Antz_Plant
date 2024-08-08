import React, {useState} from 'react';
import {
  TouchableOpacity,
  Text,
  Image,
  Alert,
  TextInput,
  StyleSheet,
  ScrollView,
  View,
  ActivityIndicator,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  openCamera,
  openGallery,
  MediaOptions,
} from '../../../utils/ImagePicker';
import axios from 'axios';
import {
  moderateScale,
  scaleFont,
  scaleHeight,
  scaleWidth,
} from '../../../utils/Scaling';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../../components/views/Header';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../../navigation/stack/StackNavigator';
import Entypo from 'react-native-vector-icons/Entypo';
import {ROUTE} from '../../../constants/RouteNames';

const PlantIdentification: React.FC = () => {
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>('');
  const [description, setDescription] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const openImagePicker = () => {
    Alert.alert(
      'Select Option',
      'Choose an image from gallery or use the camera',
      [
        {
          text: 'Gallery',
          onPress: () => handleOpenGallery(),
        },
        {
          text: 'Camera',
          onPress: () => handleOpenCamera(),
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
    );
  };

  const handleOpenGallery = async () => {
    try {
      const options: MediaOptions = {
        mediaType: 'photo',
        selectionLimit: 1,
      };
      const files = await openGallery(options);
      const uri = files[0].uri;
      setPhotoUri(uri || null);
    } catch (error) {
      Alert.alert('Error', error as string);
    }
  };

  const handleOpenCamera = async () => {
    try {
      const options: MediaOptions = {
        mediaType: 'photo',
        selectionLimit: 1,
        cameraType: 'back',
      };
      const files = await openCamera(options);
      const uri = files[0].uri;
      setPhotoUri(uri || null);
    } catch (error) {
      Alert.alert('Error', error as string);
    }
  };

  const cleanDescription = (text: string) => {
    return text.replace(/\*\*/g, '').replace(/\*/g, '');
  };

  const identifyPlant = async () => {
    if (photoUri) {
      setLoading(true);
      try {
        // Create FormData instance
        const formData = new FormData();

        // Append the file to the FormData instance
        formData.append('file', {
          uri: photoUri,
          type: 'image/jpeg', // Adjust the type based on the image file type
          name: 'photo.jpg',
        } as any);

        // Post request with FormData
        const response = await axios.post(
          'https://imgid.ddnsfree.com/identify-plant',
          formData,
          {
            headers: {
              accept: 'application/json',
              'Content-Type': 'multipart/form-data',
            },
          },
        );

        // Handle the response
        const plantInfo = response.data.plant_info;
        console.log(plantInfo);
        const cleanedDescription = cleanDescription(plantInfo);
        setDescription(cleanedDescription);
      } catch (error) {
        // Type guard to check if error is an instance of Error
        if (axios.isAxiosError(error)) {
          Alert.alert(
            'Error',
            `Failed to identify plant: ${
              error.response?.data || error.message
            }`,
          );
        } else if (error instanceof Error) {
          Alert.alert('Error', `Failed to identify plant: ${error.message}`);
        } else {
          Alert.alert('Error', 'An unknown error occurred');
        }
      } finally {
        setLoading(false); // Stop loading
      }
    } else {
      Alert.alert('No Image', 'Please select an image first');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        headerText="Search By Name"
        onBackPress={() => {
          navigation.goBack();
        }}
      />
      <TouchableOpacity style={styles.imageBox} onPress={openImagePicker}>
        {photoUri ? (
          <Image source={{uri: photoUri}} style={styles.image} />
        ) : (
          <Text style={styles.placeholderText}>Choose Image</Text>
        )}
      </TouchableOpacity>
      <TextInput
        style={styles.textInput}
        placeholder="Enter prompt (optional)"
        value={prompt}
        onChangeText={setPrompt}
      />
      <TouchableOpacity style={styles.button} onPress={identifyPlant}>
        <Text style={styles.buttonTxt}>Identify</Text>
      </TouchableOpacity>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
      ) : (
        <ScrollView
          style={styles.descriptionContainer}
          showsVerticalScrollIndicator={false}>
          {description ? (
            <Text style={styles.descriptionText}>{description}</Text>
          ) : null}
        </ScrollView>
      )}
      <View style={styles.container1}>
        <TouchableWithoutFeedback
          onPress={() => {
            navigation.navigate(ROUTE.ADD_PLANT);
          }}>
          <View style={[styles.floatingButton, styles.menu]}>
            <Entypo name="plus" size={30} color="#FFF" />
          </View>
        </TouchableWithoutFeedback>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  imageBox: {
    width: scaleWidth(200),
    height: scaleHeight(250),
    borderRadius: moderateScale(5),
    borderWidth: 2,
    marginTop: scaleHeight(15),
    borderColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    marginBottom: scaleHeight(15),
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  placeholderText: {
    color: 'gray',
    fontSize: 18,
  },
  textInput: {
    width: '90%',
    height: scaleHeight(50),
    borderColor: 'gray',
    borderRadius: moderateScale(5),
    borderWidth: 1,
    marginTop: moderateScale(15),
    paddingHorizontal: scaleWidth(10),
    marginBottom: scaleHeight(15),
  },
  button: {
    backgroundColor: 'lightblue',
    padding: moderateScale(10),
    borderRadius: moderateScale(10),
    marginVertical: scaleHeight(10),
    width: '70%',
  },
  buttonTxt: {
    fontSize: scaleFont(18),
    fontWeight: '700',
    color: '#000',
    textAlign: 'center',
  },
  descriptionContainer: {
    width: '90%',
    marginTop: scaleHeight(15),
    flex: 1,
  },
  loader: {
    marginTop: scaleHeight(20),
  },
  descriptionText: {
    fontSize: scaleFont(16),
    color: '#333',
  },
  container1: {
    position: 'absolute',
    left: 0,
    right: 20,
    bottom: 80,
    alignItems: 'flex-end',
  },
  floatingButton: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    alignItems: 'center',
    justifyContent: 'center',
    shadowRadius: 10,
    shadowColor: 'lightblue',
    shadowOpacity: 0.3,
    shadowOffset: {width: 0, height: 10}, // Corrected shadowOffset
  },
  menu: {
    backgroundColor: 'lightblue',
  },
});

export default PlantIdentification;
