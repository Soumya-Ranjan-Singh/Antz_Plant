/* eslint-disable react-hooks/exhaustive-deps */
import {Alert, PermissionsAndroid, Platform, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import AutoScrollingCard from '../../../../components/card/AutoScrollCard';
import AddImagesView from '../../../../components/views/AddImages';
import AboutView from '../../../../components/views/AboutView';
import OtherNamesViewComponent from '../../../../components/views/OtherNameView';
import DescriptionView from '../../../../components/views/DescriptionView';
import {scaleHeight} from '../../../../utils/Scaling';
import MapViewComponent from '../../../../components/views/MapView';
import Geolocation from 'react-native-geolocation-service';
import {useIsFocused} from '@react-navigation/native';

interface OtherName {
  id: number;
  name: string;
  isEditing: boolean;
}

interface Plant {
  id: number;
  name: string;
  plantNo: string;
  coordinate: {
    latitude: number;
    longitude: number;
  };
}

const BasicDetails = () => {
  const [images, setImages] = useState<string[]>([]);
  const [commonName, setCommonName] = useState('');
  const [scientificName, setScientificName] = useState('');
  const [plantID, setPlantID] = useState('');
  const [plantNo, setPlantNo] = useState('');
  const [otherNames, setOtherNames] = useState<OtherName[]>([]);
  const [description, setDescription] = useState('');
  const [currentLocation, setCurrentLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [plants, setPlants] = useState<Plant[]>([]);

  const isFocoused = useIsFocused();

  useEffect(() => {
    if (Platform.OS === 'android') {
      requestLocationPermission();
    } else {
      Geolocation.requestAuthorization('whenInUse');
      getCurrentLocation();
    }
  }, [isFocoused]);

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'We need your location to show it on the map.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        // Geolocation.requestAuthorization('whenInUse');
        getCurrentLocation();
      } else {
        Alert.alert('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setCurrentLocation({latitude, longitude});
      },
      error => {
        console.log('Error getting location:', error.code, error.message);
        Alert.alert('Error', `Unable to fetch location: ${error.message}`);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000, // Increased timeout to 15 seconds
        maximumAge: 10000,
        forceRequestLocation: true,
      },
    );
  };

  const updatePlantMarkers = () => {
    if (currentLocation) {
      if (!currentLocation || !plantNo || !commonName) {
        return;
      }

      const numberOfPlants = parseInt(plantNo, 10);
      const newPlants: Plant[] = [];

      for (let i = 0; i < numberOfPlants; i++) {
        newPlants.push({
          id: i + 1,
          name: commonName,
          plantNo: (i + 1).toString().padStart(3, '0'),
          coordinate: {
            latitude: currentLocation.latitude + (Math.random() - 0.5) * 0.01, // Randomly spread markers around the location
            longitude: currentLocation.longitude + (Math.random() - 0.5) * 0.01,
          },
        });
      }

      setPlants(newPlants);
    }
  };

  return (
    <ScrollView
      style={styles.scrollView}
      nestedScrollEnabled
      showsVerticalScrollIndicator={false}>
      <AutoScrollingCard showViewMore={false} images={images} />
      <AddImagesView setImages={setImages} />
      <AboutView
        commonName={commonName}
        setCommonName={setCommonName}
        scientificName={scientificName}
        setScientificName={setScientificName}
        plantID={plantID}
        setPlantID={setPlantID}
        plantNo={plantNo}
        setPlantNo={setPlantNo}
        updatePlantMarkers={updatePlantMarkers}
      />
      <OtherNamesViewComponent
        otherNames={otherNames}
        setOtherNames={setOtherNames}
      />
      <DescriptionView
        description={description}
        setDescription={setDescription}
      />
      {currentLocation && (
        <MapViewComponent
          currentLocation={currentLocation}
          plantData={plants}
        />
      )}
    </ScrollView>
  );
};

export default BasicDetails;

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white',
    paddingTop: scaleHeight(10),
  },
});
