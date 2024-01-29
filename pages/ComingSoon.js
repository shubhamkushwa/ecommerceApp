import {Text, View} from 'react-native';
import {FONTS} from '../styles/Fonts';

export default ComingSoon = () => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{fontSize: 24, fontFamily: FONTS.ManropeExtaBold}}>
        Coming Soon!
      </Text>
    </View>
  );
};
