import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Button,
} from 'react-native';
import {
  moderateScale,
  scaleFont,
  scaleHeight,
  scaleWidth,
} from '../../utils/Scaling';

interface FamilyOriginViewProps {
  family: string;
  setFamily: React.Dispatch<React.SetStateAction<string>>;
  origin: string;
  setOrigin: React.Dispatch<React.SetStateAction<string>>;
}

const FamilyOriginView: React.FC<FamilyOriginViewProps> = ({
  family,
  setFamily,
  origin,
  setOrigin,
}) => {
  const [familySuggestions, setFamilySuggestions] = useState<string[]>([]);
  const [visibleFamilyModal, setVisibleFamilyModal] = useState(false);
  const [visibleOriginModal, setVisibleOriginModal] = useState(false);

  const dummyFamilyData = [
    'Rosaceae',
    'Fabaceae',
    'Poaceae',
    'Asteraceae',
    'Brassicaceae',
    'Solanaceae',
    'Lamiaceae',
    'Apiaceae',
    'Cucurbitaceae',
    'Arecaceae',
    'Rutaceae',
    'Malvaceae',
  ];

  const origins = [
    'Tropics',
    'Subtropics',
    'Temperate',
    'Arctic',
    'Mediterranean',
    'Desert',
    'Rainforest',
    'Savanna',
    'Grassland',
    'Mountain',
    'Wetland',
    'Island',
  ];

  const handleFamilySearch = (text: string) => {
    setFamily(text);
    const suggestions = dummyFamilyData.filter(item =>
      item.toLowerCase().includes(text.toLowerCase()),
    );
    setFamilySuggestions(suggestions);
  };

  const handleSelectFamily = (selectedFamily: string) => {
    setFamily(selectedFamily);
    setFamilySuggestions([]);
    setVisibleFamilyModal(false);
  };

  const handleSelectOrigin = (selectedOrigin: string) => {
    setOrigin(selectedOrigin);
    setVisibleOriginModal(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headingText}>Family and Origin</Text>
      <View style={styles.subContainer}>
        <Text style={styles.sub_headingText}>Family</Text>
        <TouchableOpacity
          onPress={() => setVisibleFamilyModal(true)}
          style={styles.input}>
          <Text>{family || 'Select Family'}</Text>
        </TouchableOpacity>
        <Text style={styles.sub_headingText}>Origin</Text>
        <TouchableOpacity
          onPress={() => setVisibleOriginModal(true)}
          style={styles.input}>
          <Text>{origin || 'Select Origin'}</Text>
        </TouchableOpacity>
      </View>

      {/* Family Modal */}
      <Modal
        visible={visibleFamilyModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setVisibleFamilyModal(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.modalSearchInput}
              placeholder="Search Family"
              onChangeText={handleFamilySearch}
            />
            <ScrollView style={styles.modalScrollView}>
              {familySuggestions.map(item => (
                <TouchableOpacity
                  key={item}
                  onPress={() => handleSelectFamily(item)}
                  style={styles.modalItem}>
                  <Text style={styles.modalItemText}>{item}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <Button
              title="Close"
              onPress={() => setVisibleFamilyModal(false)}
            />
          </View>
        </View>
      </Modal>

      {/* Origin Modal */}
      <Modal
        visible={visibleOriginModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setVisibleOriginModal(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ScrollView style={styles.modalScrollView}>
              {origins.map(item => (
                <TouchableOpacity
                  key={item}
                  onPress={() => handleSelectOrigin(item)}
                  style={styles.modalItem}>
                  <Text style={styles.modalItemText}>{item}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <Button
              title="Close"
              onPress={() => setVisibleOriginModal(false)}
            />
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
  modalSearchInput: {
    width: '100%',
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: moderateScale(10),
    paddingHorizontal: moderateScale(10),
    fontSize: scaleFont(15),
    marginBottom: scaleHeight(10),
  },
  modalScrollView: {
    width: '100%',
    height: scaleHeight(250),
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

export default FamilyOriginView;
