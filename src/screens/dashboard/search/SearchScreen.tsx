import {StyleSheet, Text} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {moderateScale, scaleFont} from '../../../utils/Scaling';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../../navigation/stack/StackNavigator';
import {ROUTE} from '../../../constants/RouteNames';

const SearchScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate(ROUTE.IDENTIFY_PLANT);
        }}>
        <Text style={styles.buttonText}>Search By Image</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate(ROUTE.SEARCH_BY_NAME);
        }}>
        <Text style={styles.buttonText}>Search By Name</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  button: {
    backgroundColor: 'lightblue',
    padding: moderateScale(10),
    borderRadius: moderateScale(10),
  },
  buttonText: {
    fontSize: scaleFont(15),
    fontWeight: '300',
    color: 'black',
  },
});
