import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  moderateScale,
  scaleFont,
  scaleHeight,
  scaleWidth,
} from '../../utils/Scaling';
import CommonInput from '../inputs/CommonInput';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface AboutViewProps {
  commonName: string;
  setCommonName: React.Dispatch<React.SetStateAction<string>>;
  scientificName: string;
  setScientificName: React.Dispatch<React.SetStateAction<string>>;
  plantID: string;
  setPlantID: React.Dispatch<React.SetStateAction<string>>;
  plantNo: string;
  setPlantNo: React.Dispatch<React.SetStateAction<string>>;
  updatePlantMarkers: (noOfPlants: number) => void; // Assuming this function is defined in BasicDetails
}

const AboutView: React.FC<AboutViewProps> = ({
  commonName,
  setCommonName,
  scientificName,
  setScientificName,
  plantID,
  setPlantID,
  plantNo,
  setPlantNo,
  updatePlantMarkers,
}) => {
  const [isEditing, setIsEditing] = useState(true);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      // If switching from editing to viewing, trigger the update function
      const numOfPlants = parseInt(plantNo, 10);
      if (!isNaN(numOfPlants)) {
        updatePlantMarkers(numOfPlants);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headingText}>About</Text>
      <View style={styles.subContainer}>
        <Text style={styles.sub_headingText}>Common Name</Text>
        <CommonInput
          value={commonName}
          onChangeText={setCommonName}
          placeholder="Enter Common Name"
        />
        <Text style={styles.sub_headingText}>Scientific Name</Text>
        <CommonInput
          value={scientificName}
          onChangeText={setScientificName}
          placeholder="Enter Scientific Name"
        />
        <View style={styles.idContainer}>
          <View>
            <Text style={styles.sub_headingText}>Plant ID</Text>
            <TextInput
              value={plantID}
              onChangeText={setPlantID}
              placeholder="Enter ID"
              style={styles.input}
            />
          </View>
          <View>
            <Text style={styles.sub_headingText}>No. of Plants</Text>
            <TextInput
              value={plantNo}
              onChangeText={text => setPlantNo(text.replace(/[^0-9]/g, ''))} // Only allow numeric input
              placeholder="Enter No"
              style={styles.input}
              keyboardType="numeric"
              editable={isEditing} // TextInput is editable only if isEditing is true
            />
          </View>
        </View>
      </View>
      <TouchableOpacity onPress={handleEditToggle} style={styles.editButton}>
        <Ionicons
          name={isEditing ? 'checkmark' : 'create'}
          size={24}
          color="black"
        />
      </TouchableOpacity>
    </View>
  );
};

export default AboutView;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E8F4F2',
    width: '100%',
    paddingVertical: scaleHeight(10),
    paddingHorizontal: scaleWidth(10),
    borderRadius: moderateScale(10),
  },
  headingText: {
    fontSize: scaleFont(20),
    fontWeight: '500',
    color: 'grey',
  },
  subContainer: {
    marginVertical: scaleHeight(10),
  },
  sub_headingText: {
    fontSize: scaleFont(15),
    fontWeight: '500',
    color: 'black',
  },
  idContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: moderateScale(10),
    paddingHorizontal: moderateScale(10),
    fontSize: scaleFont(15),
    paddingVertical: moderateScale(2),
    marginVertical: scaleHeight(5),
    width: scaleWidth(120),
  },
  editButton: {
    alignSelf: 'flex-end',
    marginTop: scaleHeight(10),
  },
});
