import React, {useState} from 'react';
import {StyleSheet, FlatList, ActivityIndicator} from 'react-native';
import SearchComponent from '../../components/inputs/Searchinput';
import Card from '../../components/card/PlantListCard';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../components/views/Header';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation/stack/StackNavigator';

interface Plant {
  id: string;
  scientfiicname: string;
  family: string;
  genus: string;
  references: string;
}

const ListFooter: React.FC<{loadingMore: boolean}> = ({loadingMore}) => {
  return loadingMore ? <ActivityIndicator /> : null;
};

const SearchByName: React.FC = () => {
  const [results, setResults] = useState<Plant[]>([]);
  const [query, setQuery] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleSearchResults = (newResults: Plant[]) => {
    setResults(newResults);
    setPage(1);
  };

  const handleLoadMoreResults = (moreResults: Plant[]) => {
    setResults(prevResults => [...prevResults, ...moreResults]);
    setLoadingMore(false);
  };

  const loadMore = () => {
    if (!loadingMore && results.length >= 10 * page) {
      setLoadingMore(true);
      setPage(prevPage => prevPage + 1);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        headerText="Search By Name"
        onBackPress={() => {
          navigation.goBack();
        }}
      />
      <SearchComponent
        onSearch={handleSearchResults}
        onLoadMore={handleLoadMoreResults}
        query={query}
        setQuery={setQuery}
        page={page}
      />
      <FlatList
        data={results}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => `${item?.id}_${index}`}
        renderItem={({item}) => (
          <Card
            scientificName={item?.scientfiicname}
            family={item?.family}
            genus={item?.genus}
            reference={item?.references}
            imageUrl="https://swanhose.com/cdn/shop/articles/water-plant-growth.jpg?v=1683652693"
          />
        )}
        onEndReachedThreshold={0.5}
        onEndReached={loadMore}
        ListFooterComponent={<ListFooter loadingMore={loadingMore} />}
      />
    </SafeAreaView>
  );
};

export default SearchByName;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
