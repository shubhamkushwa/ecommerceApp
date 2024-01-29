import { StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {responsiveScreenWidth} from 'react-native-responsive-dimensions';
import {FONTS} from '../styles/Fonts';
import {Color} from '../styles/Color';
import {addToCart, addToWishlist} from '../redux/CartSlice';
import FastImage from 'react-native-fast-image';

export default WishlistItem = ({productData, dispatch, navigation}) => {
  const {item,index} = productData;
  const removeButtonPressed = () => dispatch(addToWishlist(item));
  const addToCartButtonPressed = () => dispatch(addToCart(item));
  const navigateToDetailPage = () => navigation.navigate('ProductDetail',{data:item})
  return (
    <View key={index}>
      <View style={styles.rowView}>
        <TouchableOpacity onPress={navigateToDetailPage} style={styles.productView}>
          <FastImage
            style={styles.thumbnail}
            source={{
              uri: item.thumbnail,
              priority: FastImage.priority.normal
            }}
          />
          <View style={styles.titleMainView}>
            <Text style={styles.titleText}>{item.title}</Text>
            <Text style={styles.priceText}>${item.price}</Text>
          </View>
        </TouchableOpacity>
        <View>
          <TouchableOpacity
            onPress={removeButtonPressed}
            style={[styles.addCartMainView, {backgroundColor: 'red'}]}>
            <Text style={styles.addText}>Remove</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            onPress={addToCartButtonPressed}
            style={styles.addCartMainView}>
            <Text style={styles.addText}>Add To Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.dividerView} />
    </View>
  );
};

const styles = StyleSheet.create({
  addCartMainView: {
    backgroundColor: Color.Blue,
    borderRadius: 10,
    height: 35,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  addText: {
    fontSize: 14,
    fontFamily: FONTS.ManropeRegular,
    fontWeight: '600',
    color: Color.White,
  },
  thumbnail: {height: 30, width: 30, borderRadius: 5},
  rowView: {
    height: 42,
    width: responsiveScreenWidth(90),
    marginVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  productView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 5,
  },
  dividerView: {height: 1, flex: 1, backgroundColor: Color.LightGray},
  titleMainView: {marginLeft: 20, flex: 1},
  titleText: {
    fontSize: 14,
    fontWeight: '500',
    fontFamily: FONTS.ManropeRegular,
    color: '#1E222B',
    flex: 1,
  },
  priceText: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: FONTS.ManropeRegular,
    color: '#1E222B',
    marginTop: 3,
  },
});
