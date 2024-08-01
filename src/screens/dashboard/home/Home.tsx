import {StyleSheet, TextInput, View} from 'react-native';
import React, {useState} from 'react';

const Home = () => {
  const [input, setInput] = useState('');

  return (
    <View style={styles.container}>
      <View>
        <View>
          <TextInput value={input} onChangeText={setInput} />
          <View style={{backgroundColor: 'blue'}} />
        </View>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
