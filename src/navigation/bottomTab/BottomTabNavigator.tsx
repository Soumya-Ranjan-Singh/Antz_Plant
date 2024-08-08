import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../../screens/dashboard/home/Home';
import Feather from 'react-native-vector-icons/Feather';
import SearchScreen from '../../screens/dashboard/search/SearchScreen';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StyleSheet} from 'react-native';

// Define the type for your tab navigator's route names
type TabParamList = {
  Home: undefined;
  SearchScreen: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

// Define the Icon components outside of the main component
const HomeIcon: React.FC<{color: string; size: number}> = ({color, size}) => (
  <Feather name="home" color={color} size={size} />
);

const SearchIcon: React.FC<{color: string; size: number}> = ({color, size}) => (
  <Feather name="search" color={color} size={size} />
);

const BottomTabNavigator: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          tabBarActiveTintColor: '#e91e63',
        }}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
            title: 'Home',
            tabBarIcon: HomeIcon, // Use the defined icon component
            tabBarLabel: () => null,
          }}
        />
        <Tab.Screen
          name="SearchScreen"
          component={SearchScreen}
          options={{
            headerShown: false,
            title: 'Search Screens',
            tabBarIcon: SearchIcon, // Use the defined icon component
            tabBarLabel: () => null,
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default BottomTabNavigator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
