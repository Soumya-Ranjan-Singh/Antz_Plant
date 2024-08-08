import React from 'react';
import {ROUTE} from '../../constants/RouteNames';
import {
  createStackNavigator,
  CardStyleInterpolators,
  StackNavigationOptions,
} from '@react-navigation/stack';
import {Platform} from 'react-native';
import Splash from '../../screens/splash/Splash';
import AddingPlant from '../../screens/dashboard/addPlant/AddingPlant';
import PlantIdentification from '../../screens/dashboard/generation_AI/PlantIdentification';
import BottomTabNavigator from '../bottomTab/BottomTabNavigator';
import SearchByName from '../../screens/searchByName/SearchByName';

export type RootStackParamList = {
  [ROUTE.SPLASH]: undefined;
  [ROUTE.IDENTIFY_PLANT]: undefined;
  [ROUTE.ADD_PLANT]: undefined;
  [ROUTE.BOTTOM_TAB]: undefined;
  [ROUTE.SEARCH_BY_NAME]: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const screenOptions: StackNavigationOptions = {
  headerShown: false,
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
  cardStyle: {backgroundColor: 'white', flex: 1},
  presentation: Platform.OS === 'android' ? 'transparentModal' : 'card',
};

const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={ROUTE.SPLASH}
      screenOptions={screenOptions}>
      <Stack.Screen name={ROUTE.SPLASH} component={Splash} />
      <Stack.Screen name={ROUTE.ADD_PLANT} component={AddingPlant} />
      <Stack.Screen
        name={ROUTE.IDENTIFY_PLANT}
        component={PlantIdentification}
      />
      <Stack.Screen name={ROUTE.SEARCH_BY_NAME} component={SearchByName} />
      <Stack.Screen name={ROUTE.BOTTOM_TAB} component={BottomTabNavigator} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
