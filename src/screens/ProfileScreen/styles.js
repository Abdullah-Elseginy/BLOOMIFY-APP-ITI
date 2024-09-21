// import {StyleSheet} from 'react-native';
// export const style = StyleSheet.create({});




import {StyleSheet} from 'react-native';
export const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: '#fff',
    },
    row: {
      justifyContent: 'space-between',
    },
    productContainer: {
      flex: 1,
      backgroundColor: '#F3C0C7',
      margin: 8,
      borderRadius: 10,
      padding: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    productImage: {
      width: 150,
      height: 150,
      borderRadius: 8,
    },
    productName: {
      fontSize: 16,
      fontWeight: 'bold',
      marginTop: 10,
      textAlign: 'center',
    },
    productPrice: {
      fontSize: 14,
      color: 'gray',
      marginTop: 5,
    },
    addButton: {
      backgroundColor: '#4C1B1B',
      padding: 10,
      borderRadius: 5,
      marginTop: 10,
    },
    addButtonText: {
      color: '#fff',
      fontWeight: 'bold',
    },
  });