import {StyleSheet} from 'react-native';
import {hp, wp} from '../../constants/Dimensions';
import Constant from '../../constants/Constant';

export const styles = StyleSheet.create({
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
      input:{
        borderColor:Constant.colors['dark-brownish'],
        borderWidth:1,
        borderRadius: wp(2),
        height:hp(5),
        color:Constant.colors['deep-burgundy'],
        marginTop:15,
        paddingHorizontal:20
      },
})