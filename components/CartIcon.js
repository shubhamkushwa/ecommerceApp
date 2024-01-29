import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import {Color} from '../styles/Color';
import {bag} from '../assets';
import {FONTS} from '../styles/Fonts';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {useCallback} from 'react';

export const CartIcon = ({tintColor}) => {
  const navigation = useNavigation();
  const cartData = useSelector(state => state.cart.cartData);

  const navigateToCheckout = useCallback(
    () => navigation.navigate('CheckoutPage'),
    [],
  );

  return (
    <TouchableOpacity onPress={navigateToCheckout}>
      <Image
        resizeMode={'contain'}
        source={bag}
        style={[styles.bagIcon, {tintColor}]}
      />
      <View style={styles.countMainView}>
        <Text style={styles.countText}>{cartData.length}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  bagIcon: {height: 24, width: 24},
  countMainView: {
    position: 'absolute',
    right: -10,
    top: -10,
    height: 24,
    width: 24,
    backgroundColor: Color.Yellow,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  countText: {
    fontFamily: FONTS.ManropeBold,
    color: Color.White,
    fontWeight: '600',
    fontSize: 14,
    marginTop: Platform.OS === 'ios' ? 0 : -3
  },
});
