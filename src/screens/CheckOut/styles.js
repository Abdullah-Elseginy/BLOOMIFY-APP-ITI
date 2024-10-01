import {StyleSheet} from 'react-native';
import {hp, wp} from '../../constants/Dimensions';
import Constant from '../../constants/Constant';

const styles = StyleSheet.create({
  container: {
    padding: hp(2),
  },
  payment: {
    color: Constant.colors['deep-burgundy'],
    alignSelf: 'center',
    fontSize: hp(3),
    fontWeight: 'bold',
  },
  img: {
    width: wp(35),
    height: hp(4),
    marginTop: hp(2),
  },
  img2: {
    width: wp(20),
    height: hp(2),
    marginTop: hp(2),
  },
  Line: {
    height: hp(0.1),
    opacity: 0.5,
    backgroundColor: Constant.colors['light-pink'],
    marginVertical: hp(2),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  btn: {
    backgroundColor: Constant.colors['deep-burgundy'],
    padding: wp(3.5),
    marginBottom: hp(5),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp(2),
    marginTop: hp(6),
  },
  textbtn: {
    fontSize: wp(3.5),
    color: Constant.colors['white'],
    fontWeight: '600',
  },
  paymentMethosSelected: {
    width: wp(42),
    backgroundColor: Constant.colors['deep-burgundy'],
    padding: wp(3.5),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp(2),
  },
  paymentMethosnotselected: {
    borderWidth: wp(0.2),
    width: wp(42),
    backgroundColor: Constant.colors.white,
    padding: wp(3.5),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp(2),
    borderColor: Constant.colors['deep-burgundy'],
  },
  textnotselected: {
    color: Constant.colors['deep-burgundy'],
    fontSize: wp(3.5),
    fontWeight: '600',
  },
  rowbetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputTitle: {
    fontSize: wp(3.5),
    fontWeight: 'bold',
    marginBottom: hp(1),
    color: Constant.colors['deep-burgundy'],
  },
  marginTop: {
    // backgroundColor: '#00d',
    // height: hp(50),
    justifyContent: 'center',
  },
  marginTop2: {
    marginTop: hp(3),
  },
  CVV: {
    marginTop: hp(3),
    width: wp(42),
  },
  textInput: {
    borderWidth: wp(0.2),
    borderColor: Constant.colors['deep-burgundy'],
    paddingHorizontal: wp(2),
    borderRadius: wp(2),
    color: Constant.colors['deep-burgundy'],
    backgroundColor: Constant.colors.white,
  },
  cash: {
    fontSize: wp(3.5),
    fontWeight: '400',
    color: Constant.colors['deep-burgundy'],
    textAlign: 'center',
  },
  successMsg: {
    color: '#0eab25',
    marginTop: hp(2),
    fontWeight: '700',
  },
  totla: {
    fontSize: hp(2.5),
    color: Constant.colors['deep-burgundy'],
    textAlign: 'center',
    fontWeight: '500',
  },
  totlaamout: {
    fontSize: hp(2.3),
    color: '#0eab25',
    fontWeight: '600',
  },
  orders: {
    marginBottom: hp(2),
    elevation: 2,
    backgroundColor: Constant.colors.white,
    padding: hp(1),
    borderRadius: wp(1),
  },
  marginr: {
    marginLeft: wp(2),
  },
  text: {
    color: Constant.colors['dark-brownish'],
  },
  amout: {
    justifyContent: 'center',
  },
  errorText: {
    color: '#991111',
    marginTop: hp(0.5),
  },
});
export default styles;
