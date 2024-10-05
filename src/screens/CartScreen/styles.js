import {StyleSheet} from 'react-native';
import {hp, wp} from '../../constants/Dimensions';
import Constant from '../../constants/Constant';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: hp(1),
    backgroundColor: '#fff',
  },
  row: {
    justifyContent: 'flex-end',
  },
  listContainer: {
    padding: hp(1),
    backgroundColor: '#fff',
  },
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    margin: 5,
    borderRadius: wp(2),
    paddingBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: wp(0.1),
    borderColor: Constant.colors['light-pink'],
    elevation: 1,
  },
  itemImage: {
    width: wp(40),
    height: hp(25),
    borderRadius: wp(2),
  },
  itemDetails: {
    flex: 1,
    padding: 16,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    color: Constant.colors['deep-burgundy'],
  },
  itemPrice: {
    fontSize: 16,
    color: 'gray',
    marginTop: 5,
    fontWeight: '800',
  },
  itemCategory: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 8,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  quantityText: {
    fontSize: 16,
    marginHorizontal: 8,
    color: Constant.colors['deep-burgundy'],
  },
  button: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
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
  Plusminus: {
    color: Constant.colors['deep-burgundy'],
    fontSize: hp(2.5),
  },
  cartemptyimage: {
    width: wp(30),
    height: hp(15),
    alignSelf: 'center',
  },
  Text: {
    color: Constant.colors['deep-burgundy'],
    fontWeight: '500',
    textAlign: 'center',
  },
  center: {
    justifyContent: 'center',
    flex: 1,
    padding: wp(4),
  },
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: wp(2.8),
    backgroundColor: Constant.colors['deep-burgundy'],
    borderRadius: wp(2),
    marginTop: hp(3),
    width: wp(30),
    alignSelf: 'center',
  },
  textbtn: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: hp(2),
  },
});

export default styles;
