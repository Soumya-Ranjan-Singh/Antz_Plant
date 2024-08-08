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

const BasicDetailsView = () => {
  const [hasFlower, setHasFlower] = useState<boolean | null>(null);
  const [flowerColor, setFlowerColor] = useState<string>('');
  const [floweringSeason, setFloweringSeason] = useState<string>('');
  const [hasFruit, setHasFruit] = useState<boolean | null>(null);
  const [isFruitEdible, setIsFruitEdible] = useState<boolean | null>(null);
  const [fruitColor, setFruitColor] = useState<string>('');
  const [fruitSeason, setFruitSeason] = useState<string>('');
  const [harvestingSeason, setHarvestingSeason] = useState<string>('');
  const [hasMedicinalProperty, setHasMedicinalProperty] = useState<
    boolean | null
  >(null);
  const [medicinalProperties, setMedicinalProperties] = useState<string[]>([]);
  const [isPoisonousToHumans, setIsPoisonousToHumans] = useState<
    boolean | null
  >(null);
  const [isPoisonousToAnimals, setIsPoisonousToAnimals] = useState<
    boolean | null
  >(null);
  const [poisonousAnimals, setPoisonousAnimals] = useState<string>('');
  const [isDroughtTolerant, setIsDroughtTolerant] = useState<boolean | null>(
    null,
  );
  const [isExotic, setIsExotic] = useState<boolean | null>(null);
  const [isRareSpecies, setIsRareSpecies] = useState<boolean | null>(null);
  const [isSuitableForIndoor, setIsSuitableForIndoor] = useState<
    boolean | null
  >(null);
  const [careLevel, setCareLevel] = useState<string>('');
  const [maintenanceLevel, setMaintenanceLevel] = useState<string>('');

  const [visibleModal, setVisibleModal] = useState<
    | 'flowerColor'
    | 'floweringSeason'
    | 'fruitColor'
    | 'fruitSeason'
    | 'harvestingSeason'
    | 'careLevel'
    | 'maintenanceLevel'
    | null
  >(null);

  const handleModalSelect = (type: string, option: string) => {
    switch (type) {
      case 'flowerColor':
        setFlowerColor(option);
        break;
      case 'floweringSeason':
        setFloweringSeason(option);
        break;
      case 'fruitColor':
        setFruitColor(option);
        break;
      case 'fruitSeason':
        setFruitSeason(option);
        break;
      case 'harvestingSeason':
        setHarvestingSeason(option);
        break;
      case 'careLevel':
        setCareLevel(option);
        break;
      case 'maintenanceLevel':
        setMaintenanceLevel(option);
        break;
    }
    setVisibleModal(null);
  };

  const flowerColorOptions = [
    'Red',
    'Yellow',
    'Pink',
    'White',
    'Purple',
    'Blue',
  ];
  const floweringSeasonOptions = ['Spring', 'Summer', 'Autumn', 'Winter'];
  const fruitColorOptions = ['Red', 'Yellow', 'Green', 'Orange', 'Purple'];
  const fruitSeasonOptions = ['Spring', 'Summer', 'Autumn', 'Winter'];
  const harvestingSeasonOptions = ['Spring', 'Summer', 'Autumn', 'Winter'];
  const careLevelOptions = ['Easy', 'Moderate', 'Challenging'];
  const maintenanceLevelOptions = ['Low', 'Medium', 'High'];

  const handleTagAdd = (tag: string) => {
    setMedicinalProperties([...medicinalProperties, tag]);
  };

  const handleTagRemove = (tag: string) => {
    setMedicinalProperties(medicinalProperties.filter(t => t !== tag));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.headingText}>Basic Details</Text>
      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>Does this plant have flowers?</Text>
        <View style={styles.radioContainer}>
          <TouchableOpacity
            onPress={() => setHasFlower(true)}
            style={styles.radioOption}>
            <View
              style={[
                styles.radioCircle,
                hasFlower === true && styles.radioCircleSelected,
              ]}
            />
            <Text>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setHasFlower(false)}
            style={styles.radioOption}>
            <View
              style={[
                styles.radioCircle,
                hasFlower === false && styles.radioCircleSelected,
              ]}
            />
            <Text>No</Text>
          </TouchableOpacity>
        </View>
        {hasFlower && (
          <>
            <Text style={styles.subQuestionText}>Flower Color</Text>
            <TouchableOpacity
              onPress={() => setVisibleModal('flowerColor')}
              style={styles.input}>
              <Text>{flowerColor || 'Select Flower Color'}</Text>
            </TouchableOpacity>
            <Text style={styles.subQuestionText}>Flowering Season</Text>
            <TouchableOpacity
              onPress={() => setVisibleModal('floweringSeason')}
              style={styles.input}>
              <Text>{floweringSeason || 'Select Flowering Season'}</Text>
            </TouchableOpacity>
          </>
        )}

        <Text style={styles.questionText}>Does this plant have fruits?</Text>
        <View style={styles.radioContainer}>
          <TouchableOpacity
            onPress={() => setHasFruit(true)}
            style={styles.radioOption}>
            <View
              style={[
                styles.radioCircle,
                hasFruit === true && styles.radioCircleSelected,
              ]}
            />
            <Text>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setHasFruit(false)}
            style={styles.radioOption}>
            <View
              style={[
                styles.radioCircle,
                hasFruit === false && styles.radioCircleSelected,
              ]}
            />
            <Text>No</Text>
          </TouchableOpacity>
        </View>
        {hasFruit && (
          <>
            <Text style={styles.subQuestionText}>Is the fruit edible?</Text>
            <View style={styles.radioContainer}>
              <TouchableOpacity
                onPress={() => setIsFruitEdible(true)}
                style={styles.radioOption}>
                <View
                  style={[
                    styles.radioCircle,
                    isFruitEdible === true && styles.radioCircleSelected,
                  ]}
                />
                <Text>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setIsFruitEdible(false)}
                style={styles.radioOption}>
                <View
                  style={[
                    styles.radioCircle,
                    isFruitEdible === false && styles.radioCircleSelected,
                  ]}
                />
                <Text>No</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.subQuestionText}>Fruit Color</Text>
            <TouchableOpacity
              onPress={() => setVisibleModal('fruitColor')}
              style={styles.input}>
              <Text>{fruitColor || 'Select Fruit Color'}</Text>
            </TouchableOpacity>
            <Text style={styles.subQuestionText}>Fruit Season</Text>
            <TouchableOpacity
              onPress={() => setVisibleModal('fruitSeason')}
              style={styles.input}>
              <Text>{fruitSeason || 'Select Fruit Season'}</Text>
            </TouchableOpacity>
            <Text style={styles.subQuestionText}>Harvesting Season</Text>
            <TouchableOpacity
              onPress={() => setVisibleModal('harvestingSeason')}
              style={styles.input}>
              <Text>{harvestingSeason || 'Select Harvesting Season'}</Text>
            </TouchableOpacity>
          </>
        )}

        <Text style={styles.questionText}>
          Does this plant have medicinal properties?
        </Text>
        <View style={styles.radioContainer}>
          <TouchableOpacity
            onPress={() => setHasMedicinalProperty(true)}
            style={styles.radioOption}>
            <View
              style={[
                styles.radioCircle,
                hasMedicinalProperty === true && styles.radioCircleSelected,
              ]}
            />
            <Text>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setHasMedicinalProperty(false)}
            style={styles.radioOption}>
            <View
              style={[
                styles.radioCircle,
                hasMedicinalProperty === false && styles.radioCircleSelected,
              ]}
            />
            <Text>No</Text>
          </TouchableOpacity>
        </View>
        {hasMedicinalProperty && (
          <>
            <Text style={styles.subQuestionText}>Medicinal Properties</Text>
            <View style={styles.tagInputContainer}>
              {medicinalProperties.map((tag, index) => (
                <View key={index} style={styles.tag}>
                  <Text>{tag}</Text>
                  <TouchableOpacity
                    onPress={() => handleTagRemove(tag)}
                    style={styles.removeTagButton}>
                    <Text style={styles.removeTagText}>X</Text>
                  </TouchableOpacity>
                </View>
              ))}
              <TextInput
                style={styles.tagInput}
                placeholder="Add a property"
                onSubmitEditing={e => handleTagAdd(e.nativeEvent.text)}
              />
            </View>
          </>
        )}

        <Text style={styles.questionText}>Is it poisonous to humans?</Text>
        <View style={styles.radioContainer}>
          <TouchableOpacity
            onPress={() => setIsPoisonousToHumans(true)}
            style={styles.radioOption}>
            <View
              style={[
                styles.radioCircle,
                isPoisonousToHumans === true && styles.radioCircleSelected,
              ]}
            />
            <Text>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setIsPoisonousToHumans(false)}
            style={styles.radioOption}>
            <View
              style={[
                styles.radioCircle,
                isPoisonousToHumans === false && styles.radioCircleSelected,
              ]}
            />
            <Text>No</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.questionText}>Is it poisonous to animals?</Text>
        <View style={styles.radioContainer}>
          <TouchableOpacity
            onPress={() => setIsPoisonousToAnimals(true)}
            style={styles.radioOption}>
            <View
              style={[
                styles.radioCircle,
                isPoisonousToAnimals === true && styles.radioCircleSelected,
              ]}
            />
            <Text>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setIsPoisonousToAnimals(false)}
            style={styles.radioOption}>
            <View
              style={[
                styles.radioCircle,
                isPoisonousToAnimals === false && styles.radioCircleSelected,
              ]}
            />
            <Text>No</Text>
          </TouchableOpacity>
        </View>
        {isPoisonousToAnimals && (
          <TextInput
            style={styles.input}
            placeholder="Mention the animal"
            value={poisonousAnimals}
            onChangeText={setPoisonousAnimals}
          />
        )}

        <Text style={styles.questionText}>Is it drought tolerant?</Text>
        <View style={styles.radioContainer}>
          <TouchableOpacity
            onPress={() => setIsDroughtTolerant(true)}
            style={styles.radioOption}>
            <View
              style={[
                styles.radioCircle,
                isDroughtTolerant === true && styles.radioCircleSelected,
              ]}
            />
            <Text>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setIsDroughtTolerant(false)}
            style={styles.radioOption}>
            <View
              style={[
                styles.radioCircle,
                isDroughtTolerant === false && styles.radioCircleSelected,
              ]}
            />
            <Text>No</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.questionText}>Is it an exotic plant?</Text>
        <View style={styles.radioContainer}>
          <TouchableOpacity
            onPress={() => setIsExotic(true)}
            style={styles.radioOption}>
            <View
              style={[
                styles.radioCircle,
                isExotic === true && styles.radioCircleSelected,
              ]}
            />
            <Text>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setIsExotic(false)}
            style={styles.radioOption}>
            <View
              style={[
                styles.radioCircle,
                isExotic === false && styles.radioCircleSelected,
              ]}
            />
            <Text>No</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.questionText}>Is it a rare species?</Text>
        <View style={styles.radioContainer}>
          <TouchableOpacity
            onPress={() => setIsRareSpecies(true)}
            style={styles.radioOption}>
            <View
              style={[
                styles.radioCircle,
                isRareSpecies === true && styles.radioCircleSelected,
              ]}
            />
            <Text>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setIsRareSpecies(false)}
            style={styles.radioOption}>
            <View
              style={[
                styles.radioCircle,
                isRareSpecies === false && styles.radioCircleSelected,
              ]}
            />
            <Text>No</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.questionText}>Is it suitable for indoor?</Text>
        <View style={styles.radioContainer}>
          <TouchableOpacity
            onPress={() => setIsSuitableForIndoor(true)}
            style={styles.radioOption}>
            <View
              style={[
                styles.radioCircle,
                isSuitableForIndoor === true && styles.radioCircleSelected,
              ]}
            />
            <Text>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setIsSuitableForIndoor(false)}
            style={styles.radioOption}>
            <View
              style={[
                styles.radioCircle,
                isSuitableForIndoor === false && styles.radioCircleSelected,
              ]}
            />
            <Text>No</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.questionText}>Care Level</Text>
        <TouchableOpacity
          onPress={() => setVisibleModal('careLevel')}
          style={styles.input}>
          <Text>{careLevel || 'Select Care Level'}</Text>
        </TouchableOpacity>

        <Text style={styles.questionText}>Maintenance Level</Text>
        <TouchableOpacity
          onPress={() => setVisibleModal('maintenanceLevel')}
          style={styles.input}>
          <Text>{maintenanceLevel || 'Select Maintenance Level'}</Text>
        </TouchableOpacity>
      </View>

      {/* Modals */}
      {visibleModal && (
        <Modal
          visible={!!visibleModal}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setVisibleModal(null)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <ScrollView style={styles.modalScrollView}>
                {visibleModal === 'flowerColor' &&
                  flowerColorOptions.map(option => (
                    <TouchableOpacity
                      key={option}
                      onPress={() => handleModalSelect('flowerColor', option)}
                      style={styles.modalItem}>
                      <Text style={styles.modalItemText}>{option}</Text>
                    </TouchableOpacity>
                  ))}
                {visibleModal === 'floweringSeason' &&
                  floweringSeasonOptions.map(option => (
                    <TouchableOpacity
                      key={option}
                      onPress={() =>
                        handleModalSelect('floweringSeason', option)
                      }
                      style={styles.modalItem}>
                      <Text style={styles.modalItemText}>{option}</Text>
                    </TouchableOpacity>
                  ))}
                {visibleModal === 'fruitColor' &&
                  fruitColorOptions.map(option => (
                    <TouchableOpacity
                      key={option}
                      onPress={() => handleModalSelect('fruitColor', option)}
                      style={styles.modalItem}>
                      <Text style={styles.modalItemText}>{option}</Text>
                    </TouchableOpacity>
                  ))}
                {visibleModal === 'fruitSeason' &&
                  fruitSeasonOptions.map(option => (
                    <TouchableOpacity
                      key={option}
                      onPress={() => handleModalSelect('fruitSeason', option)}
                      style={styles.modalItem}>
                      <Text style={styles.modalItemText}>{option}</Text>
                    </TouchableOpacity>
                  ))}
                {visibleModal === 'harvestingSeason' &&
                  harvestingSeasonOptions.map(option => (
                    <TouchableOpacity
                      key={option}
                      onPress={() =>
                        handleModalSelect('harvestingSeason', option)
                      }
                      style={styles.modalItem}>
                      <Text style={styles.modalItemText}>{option}</Text>
                    </TouchableOpacity>
                  ))}
                {visibleModal === 'careLevel' &&
                  careLevelOptions.map(option => (
                    <TouchableOpacity
                      key={option}
                      onPress={() => handleModalSelect('careLevel', option)}
                      style={styles.modalItem}>
                      <Text style={styles.modalItemText}>{option}</Text>
                    </TouchableOpacity>
                  ))}
                {visibleModal === 'maintenanceLevel' &&
                  maintenanceLevelOptions.map(option => (
                    <TouchableOpacity
                      key={option}
                      onPress={() =>
                        handleModalSelect('maintenanceLevel', option)
                      }
                      style={styles.modalItem}>
                      <Text style={styles.modalItemText}>{option}</Text>
                    </TouchableOpacity>
                  ))}
              </ScrollView>
              <Button title="Close" onPress={() => setVisibleModal(null)} />
            </View>
          </View>
        </Modal>
      )}
    </ScrollView>
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
  questionContainer: {
    marginVertical: scaleHeight(10),
  },
  questionText: {
    fontSize: scaleFont(15),
    fontWeight: '500',
    color: 'black',
  },
  radioContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: scaleHeight(5),
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: moderateScale(5),
  },
  radioCircle: {
    height: moderateScale(20),
    width: moderateScale(20),
    borderRadius: moderateScale(10),
    borderWidth: moderateScale(2),
    borderColor: 'grey',
    marginRight: moderateScale(5),
  },
  radioCircleSelected: {
    backgroundColor: 'blue',
  },
  subQuestionText: {
    fontSize: scaleFont(14),
    fontWeight: '400',
    color: 'black',
    marginVertical: scaleHeight(5),
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
  tagInputContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: scaleHeight(5),
  },
  tag: {
    backgroundColor: '#d1e7dd',
    borderRadius: moderateScale(5),
    padding: moderateScale(5),
    marginRight: moderateScale(5),
    marginBottom: moderateScale(5),
    flexDirection: 'row',
    alignItems: 'center',
  },
  removeTagButton: {
    marginLeft: moderateScale(5),
  },
  removeTagText: {
    color: 'red',
  },
  tagInput: {
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: moderateScale(5),
    paddingHorizontal: moderateScale(10),
    fontSize: scaleFont(15),
    paddingVertical: moderateScale(5),
    marginVertical: scaleHeight(5),
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: moderateScale(10),
    padding: moderateScale(20),
    width: '80%',
  },
  modalScrollView: {
    maxHeight: scaleHeight(200),
  },
  modalItem: {
    paddingVertical: moderateScale(10),
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
  },
  modalItemText: {
    fontSize: scaleFont(16),
  },
});

export default BasicDetailsView;
