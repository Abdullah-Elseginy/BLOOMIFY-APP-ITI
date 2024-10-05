import React, {useState} from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import Constant from '../constants/Constant';
import {wp} from '../constants/Dimensions';

const SearchBar = ({products, setFilteredProducts}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = query => {
    setSearchQuery(query);
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase()),
    );
    setFilteredProducts(filtered);
  };

  return (
    <View style={styles.searchContainer}>
      <TextInput
        placeholder="Search products..."
        placeholderTextColor={Constant.colors['deep-burgundy']}
        value={searchQuery}
        onChangeText={handleSearch}
        style={styles.searchInput}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    margin: 5,
    // padding: 5,
    borderRadius: 10,
    borderColor: Constant.colors['light-pink'],
    borderWidth: wp(0.3),
  },
  searchInput: {
    height: 40,
    paddingHorizontal: 12,
    color: Constant.colors['dark-brownish'],
  },
});

export default SearchBar;
