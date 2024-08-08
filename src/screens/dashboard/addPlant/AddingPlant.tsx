import React from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {scaleFont, scaleHeight, scaleWidth} from '../../../utils/Scaling';
import Header from '../../../components/views/Header';
import BasicDetails from './basicDetails/BasicDetails';
import AdvanceDetails from './advanceDetails/AdvanceDetails';
import References from './references/References';

const Tab = createMaterialTopTabNavigator();

const TabIndex = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: 'lightblue',
        tabBarInactiveTintColor: 'black',
        tabBarIndicatorStyle: {backgroundColor: 'lightblue'},
        tabBarStyle: {backgroundColor: '#E8F4F2', height: scaleHeight(50)}, // Increased height for better visuals
        tabBarLabelStyle: {
          fontSize: scaleFont(13),
          letterSpacing: 1,
          color: 'black',
        },
      }}>
      <Tab.Screen name="Details" component={BasicDetails} />
      {/* Uncomment and add your screens as needed */}
      <Tab.Screen name="Advance Details" component={AdvanceDetails} />
      <Tab.Screen name="References" component={References} />
    </Tab.Navigator>
  );
};

const AddingPlant: React.FC = () => {
  const navigation = useNavigation<NavigationProp<any>>();

  return (
    <SafeAreaView style={styles.container}>
      <Header
        onBackPress={() => {
          navigation.goBack();
        }}
        headerText="Add Plant"
      />
      <TabIndex />
    </SafeAreaView>
  );
};

export default AddingPlant;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: scaleWidth(16),
    paddingVertical: scaleHeight(10),
    backgroundColor: '#FFFFFF', // Ensures visibility and consistency
  },
});
