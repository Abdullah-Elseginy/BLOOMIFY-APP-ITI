import {View, TouchableOpacity, Text} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {styles} from './styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {wp} from '../../constants/Dimensions';
import Constant from '../../constants/Constant';
const AppHeader = ({
  title,
  titleStyle,
  arrowBack,
  styleHeader,
  rightIcon,
  onRightIconPress,
  stylebtnRight,
  arrowBackColor,
}) => {
  const navigation = useNavigation();

  return (
    <View style={[styles.headerContainer, styles.rowCenter, styleHeader]}>
      {arrowBack && (
        <TouchableOpacity
          style={[styles.arrowBack, {backgroundColor: arrowBackColor}]}
          onPress={() => navigation.goBack()}>
          <MaterialIcons
            name={'arrow-back-ios'}
            size={wp(5)}
            color={Constant.colors['deep-burgundy']}
          />
        </TouchableOpacity>
      )}
      <View style={styles.titleBox}>
        <Text style={[styles.title, titleStyle]}>{title}</Text>
      </View>
      {rightIcon && (
        <TouchableOpacity style={stylebtnRight} onPress={onRightIconPress}>
          {rightIcon}
        </TouchableOpacity>
      )}
    </View>
  );
};

export default AppHeader;
