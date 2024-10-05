import {StyleSheet} from 'react-native';
import {hp, wp} from '../../constants/Dimensions';
import Constant from '../../constants/Constant';

export const styles = StyleSheet.create({
  arrowBack: {
    justifyContent: 'center',
    padding: wp(3),
    borderRadius: wp(1.5),
    position: 'absolute',
    left: wp(3),
    zIndex: 10,
  },
  headerContainer: {
    paddingVertical: hp(2),
    width: '100%',
    paddingHorizontal: wp(4),
    alignSelf: 'center',
    backgroundColor: Constant.colors['light-pink'],
    height: hp(8),
    elevation: 5,
  },
  titleBox: {
    flex: 1,
  },
  title: {
    fontSize: wp(4.5),
    color: Constant.colors['deep-burgundy'],
    textTransform: 'capitalize',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  rowCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
