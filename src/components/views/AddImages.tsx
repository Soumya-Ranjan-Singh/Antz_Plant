import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {
  moderateScale,
  scaleFont,
  scaleHeight,
  scaleWidth,
} from '../../utils/Scaling';

interface Props {
  setImages?: React.Dispatch<React.SetStateAction<string[]>>;
}

const AddImagesView: React.FC<Props> = ({setImages}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.headingText}>Add Images</Text>
      <View style={styles.subContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Open Camera</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Open Gallery</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddImagesView;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E8F4F2',
    width: '100%',
    marginVertical: scaleHeight(10),
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: scaleHeight(10),
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
