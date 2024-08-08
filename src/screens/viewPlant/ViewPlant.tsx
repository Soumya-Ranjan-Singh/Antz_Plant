import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import AutoScrollingCard from '../../components/card/AutoScrollCard';
import {
  moderateScale,
  scaleFont,
  scaleHeight,
  scaleWidth,
} from '../../utils/Scaling';
import OtherNamesComponent from '../../components/views/OtherNameView';
import AddImagesView from '../../components/views/AddImages';
import AboutView from '../../components/views/AboutView';
import FamilyOriginView from '../../components/views/FamilyOriginView';
import {ScrollView} from 'react-native-gesture-handler';
import CareRequirementsView from '../../components/views/RequirementView';
import GeneralInformationView from '../../components/views/GeneralInformationView';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface OtherName {
  id: number;
  name: string;
  isEditing: boolean;
}

const ViewPlant = () => {
  const [commonName, setCommonName] = useState('');
  const [scientificName, setScientificName] = useState('');
  const [plantID, setPlantID] = useState('');
  const [plantNo, setPlantNo] = useState('');
  const [otherNames, setOtherNames] = useState<OtherName[]>([]);
  const [family, setFamily] = useState('');
  const [origin, setOrigin] = useState('');
  const [watering, setWatering] = useState('');
  const [sunlight, setSunlight] = useState('');
  const [soilType, setSoilType] = useState('');
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

  const image = [
    {
      img: 'https://swanhose.com/cdn/shop/articles/water-plant-growth.jpg?v=1683652693',
    },
    {
      img: 'https://img.freepik.com/free-vector/hand-drawn-houseplant-collection_23-2148910610.jpg',
    },
    {
      img: 'https://www.ugaoo.com/cdn/shop/files/jade-plant-mini-32515564568708.jpg?v=1688724899&width=1500',
    },
    {
      img: 'https://5.imimg.com/data5/OQ/JF/MD/SELLER-81676912/cateracterum-palm-plants-500x500.jpg',
    },
    {
      img: 'https://assets.architecturaldigest.in/photos/60084e6b669ad19b3b105113/16:9/w_2560%2Cc_limit/peace-lily-1366x768.jpg',
    },
  ];

  const onClickViewMore = () => {
    console.log('View More');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#E8F4F2',
          width: '100%',
          marginBottom: scaleHeight(10),
        }}>
        <TouchableOpacity
          style={{padding: moderateScale(10), zIndex: 1}}
          onPress={() => {
            console.log('Back Press');
          }}>
          <Ionicons name="arrow-back" size={30} color="black" />
        </TouchableOpacity>
        <View
          style={{
            alignSelf: 'center',
            position: 'absolute',
            right: 0,
            left: 0,
          }}>
          <Text
            style={{
              fontSize: scaleFont(25),
              fontWeight: '500',
              color: 'black',
              textAlign: 'center',
            }}>
            Plant Details
          </Text>
        </View>
      </View>
      <ScrollView
        style={styles.scrollView}
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}>
        <AutoScrollingCard
          // images={image}
          onClickViewMore={onClickViewMore}
        />
        <AddImagesView />
        <AboutView
          commonName={commonName}
          setCommonName={setCommonName}
          scientificName={scientificName}
          setScientificName={setScientificName}
          plantID={plantID}
          setPlantID={setPlantID}
          plantNo={plantNo}
          setPlantNo={setPlantNo}
        />
        <OtherNamesComponent
          otherNames={otherNames}
          setOtherNames={setOtherNames}
        />
        <FamilyOriginView
          family={family}
          setFamily={setFamily}
          origin={origin}
          setOrigin={setOrigin}
        />
        <CareRequirementsView
          watering={watering}
          setWatering={setWatering}
          sunlight={sunlight}
          setSunlight={setSunlight}
          soil={soilType}
          setSoil={setSoilType}
        />
        <GeneralInformationView />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ViewPlant;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: scaleWidth(16),
    paddingVertical: scaleHeight(10),
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
    width: '100%',
  },
});
