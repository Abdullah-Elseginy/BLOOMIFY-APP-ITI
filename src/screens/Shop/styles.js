// import {StyleSheet} from 'react-native';
// export const style = StyleSheet.create({});

import {StyleSheet} from 'react-native';
import {hp, wp} from '../../constants/Dimensions';
import Constant from '../../constants/Constant';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: hp(1),
    paddingHorizontal: wp(3),
    backgroundColor: '#fff',
  },
  row: {
    justifyContent: 'flex-end',
  },
  productContainer: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 5,
    borderRadius: wp(2),
    paddingBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: wp(0.1),
    borderColor: Constant.colors['light-pink'],
  },
  headerOfView: {
    width: wp(45),
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  productImage: {
    width: '100%',
    height: hp(20),
    borderRadius: wp(2),
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
    color: Constant.colors['deep-burgundy'],
  },
  productPrice: {
    fontSize: 14,
    color: 'gray',
    marginTop: 5,
    fontWeight: '800',
  },
  addButton: {
    backgroundColor: '#4C1B1B',
    padding: 10,
    borderRadius: wp(2),
    marginTop: 10,
    width: wp(40),
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  activity: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
