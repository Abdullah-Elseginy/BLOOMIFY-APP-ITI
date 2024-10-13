import {StyleSheet} from 'react-native';
import Constant from '../../constants/Constant';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginBottom: 25,
  },
  txt: {
    textAlign: 'justify',
    fontSize: 15,
    lineHeight: 25,
    marginBottom: 30,
    color: Constant.colors['dark-brownish'],
  },
  brnd: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Constant.colors['deep-burgundy'],
  },
  point: {
    // backgroundColor:'yellow',
    marginBottom: 15,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: Constant.colors['dark-brownish'],
  },
  subTitle: {
    textAlign: 'justify',
    fontWeight: 'bold',
    color: Constant.colors['light-brownish-gray'],
    fontSize: 14,
  },
  contnt: {
    textAlign: 'justify',
    fontSize: 12,
    marginBottom: 3,
    color: 'gray',
  },
});
