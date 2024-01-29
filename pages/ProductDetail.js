import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Platform
} from 'react-native';
import {Color} from '../styles/Color';
import {
  responsiveScreenWidth,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {CartIcon} from '../components/CartIcon';
import {useNavigation} from '@react-navigation/native';
import {FONTS} from '../styles/Fonts';
import {back, emptyStar, halfStar, like, star, unlike} from '../assets';
import Stars from 'react-native-stars';
import {SliderBox} from 'react-native-image-slider-box';
import {useDispatch, useSelector} from 'react-redux';
import {addToCart, addToWishlist} from '../redux/CartSlice';

export default ProductDetail = props => {
  const {data} = props.route.params;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const wishlistData = useSelector(state => state.cart.wishlistData);
  const wishListIndex = wishlistData.findIndex(item => data.id === item.id);

  function calculateDiscountedPrice(originalPrice, discountPercentage) {
    discountPercentage = Math.max(0, Math.min(100, discountPercentage));
    const discountAmount = (originalPrice * discountPercentage) / 100;
    return `${discountAmount.toFixed(1)}`;
  }

  const backButtonPressed = () => navigation.goBack();

  const addRemoveFromWishlist = () => dispatch(addToWishlist(data));

  const addToCartButtonPressed = () => dispatch(addToCart(data));

  const buyNowAction = () => {
    addToCartButtonPressed();
    navigation.navigate('CheckoutPage');
  };
  return (
    <ScrollView style={styles.scrollView} bounces={false}>
      <SafeAreaView style={styles.mainView}>
        <View style={styles.navigationBar}>
          <TouchableOpacity
            onPress={backButtonPressed}
            style={styles.backButtonView}>
            <Image
              source={back}
              resizeMode={'contain'}
              style={styles.backImage}
            />
          </TouchableOpacity>
          <CartIcon tintColor={'black'} />
        </View>
        <View style={styles.headingView}>
          <Text style={styles.mainTitle}>{data.title}</Text>
          <Text style={styles.brandName}>{data.brand}</Text>
          <View pointerEvents="none" style={styles.starMainView}>
            <Stars
              half={true}
              default={data.rating}
              spacing={4}
              starSize={13}
              count={5}
              fullStar={star}
              emptyStar={emptyStar}
              halfStar={halfStar}
            />
            <Text style={styles.reviewText}>{data.stock} reviews</Text>
          </View>
          <View style={styles.sliderMainView}>
            <SliderBox
              resizeMethod={'resize'}
              resizeMode={'contain'}
              images={data.images}
              parentWidth={responsiveWidth(100)}
              sliderBoxHeight={207}
              dotColor={Color.DarkYellow}
              inactiveDotColor="#E4E4E4"
              paginationBoxStyle={styles.paginationBox}
              dotStyle={styles.dotStyle}
              imageLoadingColor="#F8F9FB"
              sharedTransitionTag="tag"
            />
            <View style={styles.likeMainView}>
              <TouchableOpacity
                onPress={addRemoveFromWishlist}
                style={styles.likeButtonView}>
                <Image
                  source={wishListIndex == -1 ? unlike : like}
                  style={styles.likeImage}
                  resizeMode={'contain'}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.priceMainView}>
            <Text style={styles.priceText}>$ {data.price}</Text>
            <View style={styles.discountMainView}>
              <Text style={styles.discountText}>
                ${calculateDiscountedPrice(data.price, data.discountPercentage)}{' '}
                OFF
              </Text>
            </View>
          </View>

          <View style={styles.buttonMainView}>
            <View style={styles.container}>
              <TouchableOpacity
                onPress={addToCartButtonPressed}
                style={styles.addCartMainView}>
                <Text style={styles.addText}>Add To Cart</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.container}>
              <TouchableOpacity
                onPress={buyNowAction}
                style={styles.buyButtonView}>
                <Text style={styles.buyText}>Buy Now</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.widthNinety}>
            <Text style={styles.detailsText}>Details</Text>
            <Text style={styles.descriptionsText}>{data.description}</Text>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

ProductDetail.sharedElements = navigation => {
  const {data} = navigation.route.params;
  return [`tag${data.id}`];
};

const styles = StyleSheet.create({
  container: {flex: 1},
  scrollView: {backgroundColor: 'white'},
  mainView: {alignItems: 'center', backgroundColor: 'white'},
  navigationBar: {
    width: responsiveScreenWidth(90),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Platform.OS == 'ios' ? 0 : 20
  },
  backButtonView: {
    backgroundColor: Color.LightGray,
    borderRadius: 20,
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  widthNinety: {width: responsiveScreenWidth(90)},
  backImage: {height: 10, width: 5},
  headingView: {marginTop: 20, alignItems: 'center'},
  mainTitle: {
    fontSize: 40,
    fontFamily: FONTS.ManropeExtaLight,
    width: responsiveWidth(90),
  },
  brandName: {
    fontSize: 40,
    fontFamily: FONTS.ManropeBold,
    width: responsiveWidth(90),
  },
  starMainView: {
    alignItems: 'center',
    width: responsiveWidth(90),
    marginVertical: 10,
    flexDirection: 'row',
  },
  reviewText: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: FONTS.ManropeRegular,
    color: '#A1A1AB',
    marginLeft: 5,
  },
  sliderMainView: {height: 207},
  paginationBox: {
    position: 'absolute',
    bottom: 10,
    padding: 0,
    alignItems: 'center',
    alignSelf: 'flex-start',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  dotStyle: {
    width: 17,
    height: 5,
    borderRadius: 5,
    marginHorizontal: 0,
    padding: 0,
    margin: 0,
    backgroundColor: 'rgba(128, 128, 128, 0.92)',
  },
  likeMainView: {
    height: 58,
    width: 58,
    backgroundColor: Color.White,
    position: 'absolute',
    borderRadius: 20,
    right: 20,
    top: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  likeButtonView: {
    height: 58,
    width: 58,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  likeImage: {height: 20, width: 20},
  priceMainView: {
    flexDirection: 'row',
    alignItems: 'center',
    width: responsiveWidth(90),
    marginTop: 20,
  },
  priceText: {
    color: Color.Blue,
    fontSize: 16,
    fontFamily: FONTS.ManropeRegular,
    fontWeight: '400',
  },
  discountMainView: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: Color.Blue,
    borderRadius: 20,
    marginLeft: 10,
  },
  discountText: {
    color: Color.White,
    fontSize: 12,
    fontFamily: FONTS.ManropeRegular,
    fontWeight: '400',
  },
  buttonMainView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: responsiveWidth(90),
    marginTop: 20,
  },
  addCartMainView: {
    borderColor: Color.Blue,
    borderWidth: 1,
    borderRadius: 20,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  addText: {
    fontSize: 14,
    fontFamily: FONTS.ManropeRegular,
    fontWeight: '600',
    color: Color.Blue,
  },
  buyButtonView: {
    backgroundColor: Color.Blue,
    borderRadius: 20,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  buyText: {
    fontSize: 14,
    fontFamily: FONTS.ManropeRegular,
    fontWeight: '600',
    color: Color.White,
  },
  detailsText: {
    marginTop: 40,
    fontFamily: FONTS.ManropeRegular,
    fontSize: 16,
    fontWeight: '400',
  },
  descriptionsText: {
    marginTop: 5,
    fontFamily: FONTS.ManropeRegular,
    fontSize: 16,
    fontWeight: '400',
    color: '#8891A5',
  },
});
