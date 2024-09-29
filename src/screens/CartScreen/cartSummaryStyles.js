import { StyleSheet } from 'react-native';
import { hp, wp } from '../../constants/Dimensions';
import Constant from '../../constants/Constant';

export const styles = StyleSheet.create({
    summaryContainer: {
        marginTop: hp(2),
        padding: wp(4),
        backgroundColor: Constant.colors['pale-grayish'],
        borderRadius: wp(2.5),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: hp(0.25) },
        shadowOpacity: 0.2,
        shadowRadius: wp(1),
        elevation: 5,
    },
    heading: {
        fontSize: wp(4.5),
        fontWeight: '500',
        color: Constant.colors['dark-brownish'],
        borderBottomWidth: wp(0.25),
        borderBottomColor: Constant.colors['dark-brownish'],
        paddingBottom: wp(2.5),
    },
    summaryDetails: {
        marginTop: hp(2),
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: hp(1.25),
    },
    detailText: {
        fontSize: wp(3.5),
        color: Constant.colors['deep-burgundy'],
    },
    detailValue: {
        fontSize: wp(3.5),
        fontWeight: '500',
        color: Constant.colors['dark-brownish'],
    },
    totalRow: {
        borderTopWidth: wp(0.25),
        borderTopColor: Constant.colors['dark-brownish'],
        paddingTop: hp(2),
    },
    totalText: {
        fontSize: wp(4.5),
        fontWeight: '500',
        color: Constant.colors['dark-brownish'],
    },
    checkoutButton: {
        marginTop: hp(2.5),
        paddingVertical: hp(1.5),
        borderRadius: wp(7.5),
        alignItems: 'center',
    },
    activeButton: {
        backgroundColor: Constant.colors['deep-burgundy'],
    },
    disabledButton: {
        backgroundColor: Constant.colors['dusty-mauve'],
    },
    buttonText: {
        color: '#FFF',
        fontSize: wp(4),
        fontWeight: '500',
    },
});

export default styles;
