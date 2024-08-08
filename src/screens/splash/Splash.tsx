import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {ROUTE} from '../../constants/RouteNames';
import {RootStackParamList} from '../../navigation/stack/StackNavigator';

const Splash: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate(ROUTE.BOTTOM_TAB);
    }, 2000);

    // Cleanup timer
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text>Antz Plant</Text>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
