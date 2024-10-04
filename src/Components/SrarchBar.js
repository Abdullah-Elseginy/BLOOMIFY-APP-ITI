import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const SearchBar = ({ products, setFilteredProducts }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  return (
    <View style={styles.searchContainer}>
      <TextInput
        placeholder="Search products..."
        value={searchQuery}
        onChangeText={handleSearch}
        style={styles.searchInput}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    margin: 10,
    padding: 5,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
  },
  searchInput: {
    height: 40,
    paddingLeft: 10,
  },
});

export default SearchBar;
