import { StyleSheet } from "react-native";
import {hp, wp} from '../../constants/Dimensions';
import Constant from '../../constants/Constant';

export const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff',
        padding:20,
        // justifyContent: 'space-between',
    },
    name: {
        fontWeight: 'bold',
        color: Constant.colors['deep-burgundy'],
        fontSize: wp(5.5),
        marginBottom:wp(3),
    },
    boxText: {
        fontWeight: '400',
        color: Constant.colors['dark-brownish'],
        lineHeight: 20,
        fontSize:15
    },
    form:{
        backgroundColor:Constant.colors["light-grayish"],
        marginTop:15,
        paddingVertical:40,
        paddingHorizontal:20,
        borderTopRightRadius:wp(40),
        borderBottomLeftRadius:wp(40),
        alignItems:'center'
    },
    contact:{
        flexDirection:'row',
        alignItems:'center',
        width:'90%',
        height:hp(7),
        borderBottomColor:Constant.colors["light-pink"],
        borderBottomWidth:0.5,
    },
    txt:{
        marginLeft:20,
        fontWeight:'500',
        fontSize:15,
        color:Constant.colors["dusty-mauve"]
    },
    icn:{
        backgroundColor:Constant.colors["dusty-mauve"],
        padding:6,
        borderRadius: 50,
    },
    title: {
        fontSize: wp(3.5),
        fontWeight: '400',
        color: Constant.colors['deep-burgundy'],
        marginTop:15
    },
    input:{
        borderColor:Constant.colors["dusty-mauve"],
        borderWidth:1,
        borderRadius: wp(2),
        height:hp(5),
        color:Constant.colors['deep-burgundy'],
        marginTop:12,
        paddingHorizontal:20,
        width:'90%',
    },
    addButton: {
        backgroundColor: Constant.colors['deep-burgundy'],
        padding: 10,
        borderRadius: wp(2),
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width:'90%',
    },
    addButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    social:{
        // backgroundColor:'red',
        width:'90%',
        flexDirection:'row',
        justifyContent:'space-between',
        // alignItems:'center',
        marginTop:20,
        paddingHorizontal:40,
    },
    errContainer:{
        width:'85%',
    },
    error:{
        color:'red',
        fontSize:12
    },
})