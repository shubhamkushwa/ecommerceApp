import {Dropdown} from 'react-native-element-dropdown';
import React, {useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {FONTS} from '../styles/Fonts';
import {Color} from '../styles/Color';

export const DropDown = props => {
  const {title, width, data} = props;
  const [value, setValue] = useState(null);
  return (
    <View style={{marginTop: 20, width: width}}>
      <Text style={styles.title}>{title}</Text>
      <Dropdown
        placeholderStyle={styles.selectedTextStyle}
        selectedTextStyle={styles.selectedTextStyle}
        data={data}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={data[0].label}
        value={value}
        onChange={item => setValue(item.value)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  placeholderStyle: {
    fontSize: 16,
    color: 'white',
  },
  selectedTextStyle: {
    fontSize: 14,
    color: Color.White,
    fontWeight: '500',
    fontFamily: FONTS.ManropeRegular,
  },
  title: {
    color: Color.LightGray,
    fontSize: 11,
    fontWeight: '800',
    fontFamily: FONTS.ManropeBold,
  },
});
