import React, {useState} from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import Constant from '../constants/Constant';
import {hp, wp} from '../constants/Dimensions';

const SearchBar = ({products, setFilteredProducts}) => {
  const [searchText, setSearchText] = useState('');

  const handleSearch = text => {
    setSearchText(text);

    if (text === '') {
      // If search bar is cleared, reset to the original products
      setFilteredProducts(products);
    } else {
      // Filter products based on the search text
      const filtered = products.filter(item =>
        item.name.toLowerCase().includes(text.toLowerCase()),
      );
      setFilteredProducts(filtered);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search products..."
        placeholderTextColor={Constant.colors['deep-burgundy']}
        value={searchText}
        onChangeText={handleSearch}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: wp(0.2),
    borderColor: Constant.colors['light-pink'],
    borderRadius: wp(2),
    marginBottom: wp(2),
    alignSelf: 'center',
    width: '100%',
  },
  input: {
    height: hp(5),
    borderColor: '#ccc',
    paddingHorizontal: wp(2),
    color: Constant.colors['deep-burgundy'],
  },
});

export default SearchBar;
