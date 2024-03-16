import React, { useEffect, useRef, useState } from 'react';
import {
  Text,
  View,
  FlatList,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import { ActivityIndicator, Searchbar } from 'react-native-paper';
import { Divider } from 'react-native-elements';
import Color from '../../Config/Color';
import ItemCard from '../../Components/ItemCard';
import { Poppins } from '../../Global/FontFamily';
import fetchData from '../../Config/fetchData';
import { Media } from '../../Global/Media';
import { useSelector } from 'react-redux';

const { height, width } = Dimensions.get('screen');

const SearchScreen = ({ navigation, route }) => {
  const [location, setLocation] = useState(route.params.location);
  const [search, setSearch] = useState('');
  const [Data, setData] = useState([]);
  const [suggestionData, setSuggestionsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [endReached, setEndReached] = useState(false);
  const [page, setPage] = useState(1);
  const userData = useSelector(state => state.UserReducer.userData);
  var { user_id } = userData;

  const propertySearch = async data => {
    setSearch(data);
    setLoading(true);
    try {
      const data =
        'like=' + search + '&location=' + location + '&user_id=' + user_id;
      const getData = await fetchData.Properties(data);
      setData(getData);
      const suggestions = await fetchData.location_suggestion(data);
      setSuggestionsData(suggestions);
      setLoading(false);
    } catch (error) {
      console.log('error', error);
    }
  };

  const loadMoreData = async () => {
    if (loadMore || endReached) {
      return;
    }
    setLoadMore(true);
    try {
      const nextPage = page + 1;
      const data =
        'like=' +
        search +
        '&location=' +
        location +
        '&page_number=' +
        nextPage +
        '&user_id=' +
        user_id;
      const responseData = await fetchData.Properties(data);
      if (responseData.length > 0) {
        setPage(nextPage);
        const updatedData = [...Data, ...responseData];
        setData(updatedData);
      } else {
        setEndReached(true);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoadMore(false);
    }
  };

  const getApiData = async () => {
    try {
      const data =
        'like=' + search + '&location=' + location + '&user_id=' + user_id;
      const responseData = await fetchData.Properties(data);
      setData(responseData);
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    setLoading(true);
    getApiData().finally(() => {
      setLoading(false);
    });
  }, []);

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 10,
        marginVertical: 10,
        paddingBottom: 5,
        backgroundColor: Color.white,
      }}>
      <Searchbar
        placeholder={`Search your Flat/House/Plot/Shop/Villa`}
        placeholderTextColor={Color.grey}
        onChangeText={query => propertySearch(query)}
        value={search}
        style={{
          borderRadius: 10,
          backgroundColor: Color.white,
          borderWidth: 1,
          borderColor: Color.grey,
          color: Color.black,
        }}
        inputStyle={{ color: Color.black }}
        iconColor={Color.grey}
      />
      {suggestionData.length > 0 && (
        <View
          style={{
            backgroundColor: Color.white,
            marginTop: 5,
            borderRadius: 5,
            elevation: 3,
            maxHeight: height * 0.3,
            paddingHorizontal: 10,
            paddingTop: 5,
          }}>
          <FlatList
            data={suggestionData}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  setSearch(item?.value);
                  setSuggestionsData([]);
                }}
                style={{ paddingVertical: 5 }}>
                <Text>{item?.value}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
      {loading ? (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={{ uri: Media.loader }}
            style={{ width: 80, height: 80, resizeMode: 'contain' }}
          />
        </View>
      ) : (
        <FlatList
          data={Data}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <ItemCard key={index} ItemData={item} navigation={navigation} />
          )}
          onEndReached={loadMoreData}
          onEndReachedThreshold={0.1}
          ListFooterComponent={() => {
            return (
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                {loadMore && Data?.length > 10 && (
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text
                      style={{
                        fontSize: 12,
                        color: Color.black,
                        marginHorizontal: 10,
                        fontFamily: Poppins.Medium,
                      }}>
                      Loading...
                    </Text>
                    <ActivityIndicator />
                  </View>
                )}
              </View>
            );
          }}
          ListEmptyComponent={() => {
            if (Data?.length === 0) {
              return (
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginVertical: 10,
                    height: height / 2,
                    flex: 1,
                  }}>
                  <Image
                    source={{ uri: Media.noProperty }}
                    style={{
                      width: 100,
                      height: 80,
                      resizeMode: 'contain',
                    }}
                  />
                  <Text
                    style={{
                      fontSize: 12,
                      padding: 5,
                      paddingHorizontal: 20,
                      marginStart: 5,
                      borderRadius: 5,
                      marginVertical: 10,
                      color: Color.primary,
                    }}>
                    No Properties Found
                  </Text>
                </View>
              );
            }
            return null;
          }}
        />
      )}
    </View>
  );
};

export default SearchScreen;
