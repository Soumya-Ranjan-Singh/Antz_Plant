import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  ScrollView,
  Button,
} from 'react-native';
import {
  moderateScale,
  scaleFont,
  scaleHeight,
  scaleWidth,
} from '../../utils/Scaling';

interface CareRequirementsViewProps {
  watering: string;
  setWatering: React.Dispatch<React.SetStateAction<string>>;
  sunlight: string;
  setSunlight: React.Dispatch<React.SetStateAction<string>>;
  soil: string;
  setSoil: React.Dispatch<React.SetStateAction<string>>;
}

const CareRequirementsView: React.FC<CareRequirementsViewProps> = ({
  watering,
  setWatering,
  sunlight,
  setSunlight,
  soil,
  setSoil,
}) => {
  const [visibleWateringModal, setVisibleWateringModal] = useState(false);
  const [visibleSunlightModal, setVisibleSunlightModal] = useState(false);
  const [visibleSoilModal, setVisibleSoilModal] = useState(false);

  const wateringOptions = [
    'Daily',
    'Every 2 days',
    'Weekly',
    'Bi-weekly',
    'Monthly',
  ];

  const sunlightOptions = [
    'Full Sun',
    'Partial Sun',
    'Shade',
    'Indirect Light',
  ];

  const soilOptions = ['Well-draining', 'Loamy', 'Clayey', 'Sandy', 'Peaty'];

  const handleSelectOption = (
    type: 'watering' | 'sunlight' | 'soil',
    option: string,
  ) => {
    if (type === 'watering') {
      setWatering(option);
    }
    if (type === 'sunlight') {
      setSunlight(option);
    }
    if (type === 'soil') {
      setSoil(option);
    }
    setVisibleWateringModal(false);
    setVisibleSunlightModal(false);
    setVisibleSoilModal(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headingText}>Care Requirements</Text>
      <View style={styles.subContainer}>
        <Text style={styles.sub_headingText}>Watering</Text>
        <TouchableOpacity
          onPress={() => setVisibleWateringModal(true)}
          style={styles.input}>
          <Text>{watering || 'Select Watering'}</Text>
        </TouchableOpacity>
        <Text style={styles.sub_headingText}>Sunlight</Text>
        <TouchableOpacity
          onPress={() => setVisibleSunlightModal(true)}
          style={styles.input}>
          <Text>{sunlight || 'Select Sunlight'}</Text>
        </TouchableOpacity>
        <Text style={styles.sub_headingText}>Soil</Text>
        <TouchableOpacity
          onPress={() => setVisibleSoilModal(true)}
          style={styles.input}>
          <Text>{soil || 'Select Soil'}</Text>
        </TouchableOpacity>
      </View>

      {/* Watering Modal */}
      <Modal
        visible={visibleWateringModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setVisibleWateringModal(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ScrollView style={styles.modalScrollView}>
              {wateringOptions.map(option => (
                <TouchableOpacity
                  key={option}
                  onPress={() => handleSelectOption('watering', option)}
                  style={styles.modalItem}>
                  <Text style={styles.modalItemText}>{option}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <Button
              title="Close"
              onPress={() => setVisibleWateringModal(false)}
            />
          </View>
        </View>
      </Modal>

      {/* Sunlight Modal */}
      <Modal
        visible={visibleSunlightModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setVisibleSunlightModal(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ScrollView style={styles.modalScrollView}>
              {sunlightOptions.map(option => (
                <TouchableOpacity
                  key={option}
                  onPress={() => handleSelectOption('sunlight', option)}
                  style={styles.modalItem}>
                  <Text style={styles.modalItemText}>{option}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <Button
              title="Close"
              onPress={() => setVisibleSunlightModal(false)}
            />
          </View>
        </View>
      </Modal>

      {/* Soil Modal */}
      <Modal
        visible={visibleSoilModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setVisibleSoilModal(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ScrollView style={styles.modalScrollView}>
              {soilOptions.map(option => (
                <TouchableOpacity
                  key={option}
                  onPress={() => handleSelectOption('soil', option)}
                  style={styles.modalItem}>
                  <Text style={styles.modalItemText}>{option}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <Button title="Close" onPress={() => setVisibleSoilModal(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E8F4F2',
    width: '100%',
    paddingVertical: scaleHeight(10),
    paddingHorizontal: scaleWidth(10),
    borderRadius: moderateScale(10),
    marginVertical: scaleHeight(10),
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
  input: {
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: moderateScale(10),
    paddingHorizontal: moderateScale(10),
    fontSize: scaleFont(15),
    paddingVertical: moderateScale(10),
    marginVertical: scaleHeight(5),
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: moderateScale(10),
    padding: scaleHeight(10),
    alignItems: 'center',
  },
  modalScrollView: {
    width: '100%',
  },
  modalItem: {
    padding: moderateScale(10),
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
  },
  modalItemText: {
    fontSize: scaleFont(15),
  },
});

export default CareRequirementsView;
