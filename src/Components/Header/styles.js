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
    borderColor: Constant.colors['dusty-mauve'],
    borderBottomWidth: hp(0.1),
    borderStartWidth: hp(0.1),
    borderEndWidth: hp(0.1),
    borderBottomStartRadius: hp(2),
    borderBottomEndRadius: hp(2),
    backgroundColor: Constant.colors['deep-burgundy'],
    height: hp(8),
  },
  titleBox: {
    flex: 1,
  },
  title: {
    fontSize: wp(4.5),
    color: '#fff',
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
