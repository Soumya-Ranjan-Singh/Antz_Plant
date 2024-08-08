import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {moderateScale, scaleFont, scaleHeight} from '../../utils/Scaling';

interface HeaderProps {
  onBackPress: () => void;
  headerText: string;
}

const Header: React.FC<HeaderProps> = ({onBackPress, headerText}) => {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity style={styles.backButton} onPress={onBackPress}>
        <Ionicons name="arrow-back" size={30} color="black" />
      </TouchableOpacity>
      <View style={styles.headingTextContainer}>
        <Text style={styles.headingText}>{headerText}</Text>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F4F2',
    width: '100%',
    marginBottom: scaleHeight(10),
  },
  backButton: {
    padding: moderateScale(10),
    zIndex: 1,
  },
  headingTextContainer: {
    alignSelf: 'center',
    position: 'absolute',
    right: 0,
    left: 0,
  },
  headingText: {
    fontSize: scaleFont(25),
    fontWeight: '500',
    color: 'black',
    textAlign: 'center',
  },
});
