import React, {useCallback, useMemo} from 'react';
import {
  Image,
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
  FlatList,
  Platform,
} from 'react-native';
import {back} from '../assets';
import {responsiveScreenWidth} from 'react-native-responsive-dimensions';
import {Color} from '../styles/Color';
import {FONTS} from '../styles/Fonts';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import CartItem from '../components/CartItem';

CheckoutPage = () => {
  const navigation = useNavigation();
  const cartData = useSelector(state => state.cart.cartData);
  const dispatch = useDispatch();
  const totalPrice = useMemo(() => {
    return cartData.reduce((accumulator, currentProduct) => {
      return accumulator + (currentProduct.count * currentProduct.price);
    }, 0);
  }, [cartData]);

  const PriceView = ({title, price}) => {
    return (
      <View style={styles.subTotalMainView}>
        <Text style={styles.subTotalText}>{title}</Text>
        <Text style={styles.priceText}>${price}</Text>
      </View>
    );
  };

  const backButtonPressed = useCallback(() => navigation.goBack(), []);

  return (
    <View style={styles.mainView}>
      <View style={styles.containerView}>
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
          <Text style={styles.headingText}>
            Shopping Cart ({cartData.length})
          </Text>
        </View>
        <FlatList
          removeClippedSubviews={true}
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
          data={cartData}
          bounces={false}
          ListEmptyComponent={() => (
            <View style={styles.emptyMainView}>
              <Text style={styles.emptytext}>No products in cart</Text>
            </View>
          )}
          renderItem={item => (
            <CartItem
              productData={item}
              dispatch={dispatch}
              navigation={navigation}
            />
          )}
        />
        {cartData.length != 0 && (
          <TouchableOpacity style={styles.editView}>
            <Text style={styles.editText}>Edit</Text>
          </TouchableOpacity>
        )}
        <View style={styles.amountMainView}>
          <PriceView title={'Subtotal'} price={totalPrice} />
          <PriceView title={'Delivery'} price={0} />
          <PriceView title={'Total'} price={totalPrice} />
            <TouchableOpacity style={styles.buyButtonView}>
              <Text style={styles.checkoutText}>Proceed To Checkout</Text>
            </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    paddingBottom: 0,
  },
  containerView: {
    flex: 1,
    width: responsiveScreenWidth(90),
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'white',
    marginTop: Platform.OS === 'ios' ? 65 : 30,
  },
  navigationBar: {
    width: responsiveScreenWidth(90),
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  backButtonView: {
    backgroundColor: Color.LightGray,
    borderRadius: 20,
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backImage: {height: 10, width: 5},
  headingText: {
    fontSize: 16,
    fontWeight: '400',
    fontFamily: FONTS.ManropeRegular,
    color: '#1E222B',
    marginLeft: 20,
  },
  buyButtonView: {
    backgroundColor: Color.Blue,
    borderRadius: 20,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    width: responsiveScreenWidth(80),
    marginTop: 20
  },
  checkoutText: {
    fontSize: 14,
    fontFamily: FONTS.ManropeRegular,
    fontWeight: '600',
    color: Color.White,
  },
  emptyMainView: {
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptytext: {
    fontSize: 18,
    fontWeight: '600',
    fontFamily: FONTS.ManropeBold,
  },
  editView: {
    width: responsiveScreenWidth(90),
    alignItems: 'flex-end',
    marginTop: 5,
  },
  editText: {
    color: Color.Blue,
    fontSize: 12,
    fontWeight: '500',
    fontFamily: FONTS.ManropeMedium,
  },
  amountMainView: {
    backgroundColor: '#F8F9FB',
    width: responsiveScreenWidth(95),
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: 20,
    alignItems: 'center',
    paddingVertical: 25,
  },
  subTotalMainView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%',
    marginVertical: 10,
  },
  subTotalText: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: FONTS.ManropeRegular,
  },
  priceText: {
    fontSize: 14,
    fontWeight: '500',
    fontFamily: FONTS.ManropeMedium,
  },
});

export default React.memo(CheckoutPage);
