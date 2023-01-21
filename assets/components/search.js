import React, { useState, useEffect } from 'react';
import { View, FlatList, Button, Text, StyleSheet } from 'react-native';
import { SearchBar } from 'react-native-elements';

const Search = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [newData, setNewData] = useState('');

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((responseJson) => {
        setNewData(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const data = ['item1', 'item2', 'item3', 'item4', 'item5'];
console.log('newData', newData)
    const handleSearch = (text) => {
        setSearchTerm(text);
    }

    const handleGo = () => {
        const updatedData = data.filter((item) => item.includes(searchTerm));
        setFilteredData(updatedData);
    }

    return (
        <View>
            <SearchBar
                placeholder="Search for an item"
                onChangeText={handleSearch}
                value={searchTerm}
            />
            <Button
                title="Go"
                onPress={handleGo}
            />
            <FlatList
                data={data}
                renderItem={({ item }) => <Text>{item}</Text>}
                keyExtractor={(item) => item}
            />
        </View>
    );
};
export default Search;