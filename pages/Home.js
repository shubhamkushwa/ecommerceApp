/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {SearchBar} from '../components/SearchBar';
import {Color} from '../styles/Color';
import {FONTS} from '../styles/Fonts';
import {responsiveHeight, responsiveScreenHeight, responsiveScreenWidth} from 'react-native-responsive-dimensions';
import {sale} from '../assets';
import {CartIcon} from '../components/CartIcon';
import useApi from '../CustomHook/useApi';
import {DropDown} from '../components/DropDown';
import {ProductListItem} from '../components/ProductListItem';
import {useNavigation} from '@react-navigation/native';
import {DeliveryData, DummyData, TimeData} from '../styles/Constants';

function Home() {
  const [productData, setProductData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const navigation = useNavigation();
  const {data} = useApi('https://dummyjson.com/products');

  useEffect(() => {
    if (data && data.products) {
      let addedCountData = data.products.map(item => {
        return {...item, count: 1};
      });
      setProductData(addedCountData);
    }
  }, [data]);

  const getProductData = () => {
    let filteredData = productData.filter(item =>
      item.title.toLowerCase().includes(searchText.toLowerCase()),
    );
    return filteredData.length > 0 ? filteredData : productData;
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      bounces={false}
      style={styles.conatiner}>
      <View style={styles.headerView}>
        <View style={styles.widthNinety}>
          <View style={[styles.rowCenter, styles.topView]}>
            <Text style={styles.greetingText}>Hello, Rahul</Text>
            <CartIcon tintColor={'white'} />
          </View>
          <SearchBar searchText={searchText} setSearchText={setSearchText} />
          <View style={styles.rowCenter}>
            <DropDown data={DeliveryData} width={'50%'} title={'Delivery to'} />
            <DropDown data={TimeData} width={'20%'} title={'Within'} />
          </View>
        </View>
      </View>
      <View style={styles.offerMainView}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal
          removeClippedSubviews={true}
          data={DummyData}
          renderItem={() => (
            <TouchableOpacity style={styles.offerButtonView}>
              <Image source={sale} style={{height: 68, width: 68}} />
              <View>
                <Text style={styles.offerMainTitle}>Get</Text>
                <Text style={styles.offerOffTitle}>50% OFF</Text>
                <Text style={styles.offerNumber}>On first 03 order</Text>
              </View>
            </TouchableOpacity>
          )}
        />
        <Text style={styles.recommendedTitle}>Recommended</Text>
        <FlatList
          removeClippedSubviews={true}
          keyExtractor={(item) => item.id.toString()}
          scrollEnabled={false}
          style={styles.productFlatlistView}
          numColumns={2}
          showsHorizontalScrollIndicator={false}
          data={getProductData()}
          ListEmptyComponent={() => (
            <View
              style={{height:responsiveScreenHeight(100)}}>
              <ActivityIndicator />
            </View>
          )}
          renderItem={item => (
            <ProductListItem productData={item} navigation={navigation} />
          )}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  greetingText: {
    fontFamily: FONTS.ManropeBold,
    fontSize: 22,
    fontWeight: '600',
    color: Color.White,
  },
  conatiner: {flex: 1, backgroundColor: Color.Black},
  headerView: {
    alignItems: 'center',
    backgroundColor: Color.Blue,
    paddingBottom: 20,
  },
  topView: {
    marginTop: Platform.OS == 'ios' ? 60 : 30,
    marginBottom: 35,
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  offerMainView: {
    flex: 1,
    backgroundColor: Color.White,
    paddingVertical: 20,
    paddingLeft: 15,
    alignItems: 'center',
  },
  offerButtonView: {
    width: 250,
    flexDirection: 'row',
    height: 125,
    borderRadius: 16,
    backgroundColor: Color.DarkYellow,
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  offerMainTitle: {
    color: Color.White,
    fontWeight: '300',
    fontSize: 20,
    fontFamily: FONTS.ManropeLight,
  },
  offerOffTitle: {
    color: Color.White,
    fontWeight: '800',
    fontSize: 26,
    fontFamily: FONTS.ManropeBold,
  },
  offerNumber: {
    color: Color.White,
    fontWeight: '300',
    fontSize: 13,
    fontFamily: FONTS.ManropeLight,
  },
  recommendedTitle: {
    fontWeight: '400',
    fontFamily: FONTS.ManropeRegular,
    fontSize: 30,
    marginTop: 20,
    width: responsiveScreenWidth(90),
  },
  widthNinety: {
    width: responsiveScreenWidth(90),
  },
  productFlatlistView: {width: responsiveScreenWidth(95), marginTop: 20,flex:1},
});

export default Home;
