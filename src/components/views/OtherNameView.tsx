import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {
  moderateScale,
  scaleFont,
  scaleHeight,
  scaleWidth,
} from '../../utils/Scaling';

interface OtherName {
  id: number;
  name: string;
  isEditing: boolean;
}

interface Props {
  otherNames: OtherName[];
  setOtherNames: React.Dispatch<React.SetStateAction<OtherName[]>>;
}

const OtherNamesViewComponent: React.FC<Props> = ({
  otherNames,
  setOtherNames,
}) => {
  const addOtherName = () => {
    setOtherNames([...otherNames, {id: Date.now(), name: '', isEditing: true}]);
  };

  const handleNameChange = (id: number, newName: string) => {
    setOtherNames(
      otherNames.map(item =>
        item.id === id ? {...item, name: newName} : item,
      ),
    );
  };

  const toggleEditing = (id: number) => {
    setOtherNames(
      otherNames.map(item =>
        item.id === id ? {...item, isEditing: !item.isEditing} : item,
      ),
    );
  };

  const deleteName = (id: number) => {
    setOtherNames(otherNames.filter(item => item.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Other Names</Text>
      {otherNames.map(item => (
        <View key={item.id} style={styles.otherNameContainer}>
          {item.isEditing ? (
            <TextInput
              style={styles.textInput}
              value={item.name}
              onChangeText={text => handleNameChange(item.id, text)}
              placeholder="Enter Other Names"
            />
          ) : (
            <Text style={styles.nameText}>{item.name}</Text>
          )}
          <TouchableOpacity
            onPress={() => toggleEditing(item.id)}
            style={[
              styles.containerBtn,
              {
                marginHorizontal: scaleWidth(10),
              },
            ]}>
            <Text style={styles.buttonText}>
              {item.isEditing ? '✔️' : '✏️'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => deleteName(item.id)}
            style={styles.containerBtn}>
            <Text style={styles.buttonText}>➖</Text>
          </TouchableOpacity>
        </View>
      ))}
      <TouchableOpacity style={styles.addButton} onPress={addOtherName}>
        <Text style={styles.addButtonText}>Add Other Names</Text>
      </TouchableOpacity>
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
    marginVertical: scaleHeight(10),
  },
  title: {
    fontSize: scaleFont(20),
    fontWeight: '500',
    color: 'grey',
  },
  otherNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderRadius: moderateScale(10),
    marginVertical: scaleHeight(10),
  },
  textInput: {
    flex: 1,
    fontSize: scaleFont(15),
    fontWeight: '300',
    color: 'black',
    borderWidth: 1,
    borderColor: 'grey',
    paddingVertical: moderateScale(5),
    paddingHorizontal: moderateScale(10),
  },
  nameText: {
    flex: 1,
    fontSize: scaleFont(15),
    fontWeight: '300',
    color: 'black',
  },
  buttonText: {
    fontSize: scaleFont(15),
    fontWeight: '300',
    color: 'black',
    textAlign: 'center',
    marginHorizontal: moderateScale(10),
  },
  addButton: {
    backgroundColor: 'lightblue',
    padding: moderateScale(10),
    borderRadius: moderateScale(10),
    marginVertical: scaleHeight(10),
  },
  addButtonText: {
    fontSize: scaleFont(15),
    fontWeight: '300',
    color: 'black',
    textAlign: 'center',
  },
  containerBtn: {
    paddingVertical: moderateScale(10),
  },
});

export default OtherNamesViewComponent;
