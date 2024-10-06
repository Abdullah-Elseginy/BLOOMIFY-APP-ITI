import {StyleSheet} from 'react-native';
import {hp, wp} from '../../constants/Dimensions';
import Constant from '../../constants/Constant';

export const styles = StyleSheet.create({
    title: {
        fontWeight: 'bold',
        color: Constant.colors['deep-burgundy'],
        fontSize: wp(5.5),
        marginBottom:wp(10),
      },
      addButton: {
        backgroundColor: Constant.colors['deep-burgundy'],
        padding: 10,
        borderRadius: wp(2),
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width:'100%'
      },
      addButtonText: {
        color: '#fff',
        fontWeight: 'bold',
      },
      comment: {
        padding: 20,
        alignItems:'flex-start',
        height:'100%',
        backgroundColor:'white',
      },
      input:{
        borderColor:Constant.colors['dark-brownish'],
        borderWidth:1,
        borderRadius: wp(2),
        height:hp(5),
        color:Constant.colors['deep-burgundy'],
        marginVertical:30,
        paddingHorizontal:20,
        width:'100%'
      },
})