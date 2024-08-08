import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {scaleHeight, scaleWidth} from '../../utils/Scaling';

interface Plant {
  id: number;
  name: string;
  plantNo: string;
  coordinate: {
    latitude: number;
    longitude: number;
  };
}

interface MapViewComponentProps {
  currentLocation: {
    latitude: number;
    longitude: number;
  } | null;
  plantData: Plant[];
}

const MapViewComponent: React.FC<MapViewComponentProps> = ({
  currentLocation,
  plantData,
}) => {
  const [region, setRegion] = useState<any>(null);
  const [markers, setMarkers] = useState<Plant[]>([]);
  const mapRef = useRef<MapView | null>(null);

  console.log('Plant Data --->', plantData);

  const customMapStyle = [
    {elementType: 'labels', stylers: [{visibility: 'off'}]},
  ];

  useEffect(() => {
    if (currentLocation) {
      setRegion({
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }
  }, [currentLocation]);

  useEffect(() => {
    setMarkers(plantData);
  }, [plantData]);

  const handleDragEnd = (
    id: number,
    newCoordinate: {latitude: number; longitude: number},
  ) => {
    setMarkers(
      markers.map(marker =>
        marker.id === id ? {...marker, coordinate: newCoordinate} : marker,
      ),
    );
  };

  return (
    <View style={[styles.container]}>
      <View
        style={{
          ...styles.sub_container,
        }}>
        <MapView
          style={styles.map}
          ref={mapRef}
          mapType="standard"
          showsUserLocation={true}
          customMapStyle={customMapStyle}
          scrollDuringRotateOrZoomEnabled={true}
          zoomControlEnabled
          zoomEnabled
          zoomTapEnabled
          rotateEnabled={false}
          scrollEnabled={true}
          region={{
            latitude: region?.latitude || 37.78825,
            longitude: region?.longitude || -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          {markers &&
            markers.map(marker => (
              <Marker
                key={marker.id}
                coordinate={marker.coordinate}
                title={`${marker.name} - ${marker.plantNo}`}
                draggable
                onDragEnd={e =>
                  handleDragEnd(marker.id, e.nativeEvent.coordinate)
                }
              />
            ))}
        </MapView>
      </View>
    </View>
  );
};

export default MapViewComponent;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: scaleHeight(10),
    paddingHorizontal: scaleWidth(10),
    marginVertical: scaleHeight(10),
    backgroundColor: '#E8F4F2',
    alignItems: 'center',
  },
  sub_container: {
    width: '100%',
    height: scaleHeight(400),
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
