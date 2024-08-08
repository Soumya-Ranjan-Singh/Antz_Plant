import {StyleSheet, TextInput, TextInputProps} from 'react-native';
import React from 'react';
import {moderateScale, scaleFont, scaleHeight} from '../../utils/Scaling';

interface CommonInputProps extends TextInputProps {
  value: string;
  onChangeText: (text: string) => void;
}

const CommonInput: React.FC<CommonInputProps> = ({
  value,
  onChangeText,
  placeholder,
  ...props
}) => {
  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      style={styles.input}
      {...props}
    />
  );
};

export default CommonInput;

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: moderateScale(10),
    paddingHorizontal: moderateScale(10),
    fontSize: scaleFont(15),
    paddingVertical: moderateScale(2),
    marginVertical: scaleHeight(5),
  },
});
