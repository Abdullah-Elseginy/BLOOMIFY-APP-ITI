import {StyleSheet} from 'react-native';
import {hp, wp} from '../../constants/Dimensions';
import Constant from '../../constants/Constant';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imgContainer: {
    height: hp(45),
    width: '100%',
    shadowColor: '#6C5A4B',
    elevation: 6,
    shadowOffset: {width: 0, height: 3},
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: 'hidden',
  },
  img: {
    width: '100%',
    height: '100%',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  body: {
    padding: 20,
    justifyContent: 'space-between',
  },
  name: {
    fontWeight: 'bold',
    color: Constant.colors['deep-burgundy'],
    fontSize: wp(5.5),
  },
  boxDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  boxText: {
    fontWeight: '400',
    color: Constant.colors['dark-brownish'],
  },
  sections: {
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginVertical: 12,
    minHeight: hp(7),
  },
  title: {
    fontSize: wp(4.5),
    fontWeight: '700',
    color: Constant.colors['deep-burgundy'],
  },
  addButton: {
    backgroundColor: Constant.colors['deep-burgundy'],
    padding: 10,
    borderRadius: wp(2),
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  comment: {
    paddingTop: 20,
  },
  commentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    paddingBottom: 13,
    borderBottomWidth: 0.5,
    borderBottomColor: Constant.colors['pale-grayish'],
    width: '100%',
  },
  commentImg: {
    width: wp(13),
    height: hp(6.5),
    borderRadius: 50,
    borderColor: Constant.colors['dark-brownish'],
    borderWidth: 0.5,
  },
  commentDetails: {
    marginLeft: 15,
    alignItems: 'flex-start',
    justifyContent: 'center',
    // backgroundColor:'pink',
    width: '80%',
  },
  activity: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});
