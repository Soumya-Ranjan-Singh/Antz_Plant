/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {moderateScale, scaleHeight, scaleWidth} from '../../utils/Scaling';

const SearchComponent = ({
  onSearch,
  onLoadMore,
  query,
  setQuery,
  page,
}: any) => {
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (query.length >= 3) {
      handleSearch(page);
    }
  }, [query, page]);

  const handleSearch = async (pageNumber: number) => {
    if (loading) {
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `https://imgid.ddnsfree.com/fuzzySearchPlants?query=${query}&limit=10&page=${pageNumber}`,
      );
      const newData = await response.json();
      if (pageNumber === 1) {
        onSearch(newData);
      } else {
        onLoadMore(newData);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search..."
          value={query}
          onChangeText={setQuery}
        />
        <TouchableOpacity onPress={() => handleSearch(1)}>
          <Feather name="search" size={24} color="#333" />
        </TouchableOpacity>
      </View>
      {loading && page === 1 && (
        <ActivityIndicator style={styles.loadingIndicator} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: scaleHeight(5),
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: moderateScale(5),
    paddingHorizontal: scaleWidth(8),
    margin: 15,
  },
  loadingIndicator: {
    marginTop: scaleHeight(10),
  },
  input: {
    flex: 1,
    height: scaleHeight(40),
  },
});

export default SearchComponent;
