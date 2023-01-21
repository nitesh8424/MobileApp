import { Button, ListItem, SearchBar } from "react-native-elements";
import filter from "lodash.filter";
import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  FlatList,
  TextInput,
} from 'react-native';

const Search = () => {
  const [search, setSearch] = useState('');
  const [dataList, setDataList] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((responseJson) => {
        setFilteredDataSource(responseJson);
        setMasterDataSource(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const data = [
    {
      id: "1",
      title: "Data Structures",
    },
    {
      id: "2",
      title: "STL",
    },
    {
      id: "3",
      title: "C++",
    },
    {
      id: "4",
      title: "Java",
    },
    {
      id: "5",
      title: "Python",
    },
    {
      id: "6",
      title: "CP",
    },
    {
      id: "7",
      title: "ReactJs",
    },
    {
      id: "8",
      title: "NodeJs",
    },
    {
      id: "9",
      title: "MongoDb",
    },
    {
      id: "10",
      title: "ExpressJs",
    },
    {
      id: "11",
      title: "PHP",
    },
    {
      id: "12",
      title: "MySql",
    },
  ];


  const searchFilterFunction = (text) => {
    console.log(text);
    if (text) {
      const newData = masterDataSource.filter(
        function (item) {
          const itemData = item.title
            ? item.title.toUpperCase()
            : ''.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
      });
      console.log('newData', newData)
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(masterDataSource);
      // setDataList(filteredDataSource);
      setDataList(newData);
      log
      setSearch(text);
    }
  };

  const ItemView = ({item}) => {
    return (
      // Flat List Item
      <Text
        style={styles.itemStyle}
        onPress={() => getItem(item)}>
        {item.id}
        {'.'}
        {item.title.toUpperCase()}
      </Text>
    );
  };

  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: '#C8C8C8',
        }}
      />
    );
  };
  const getItem = (item) => {
    // Function for click on an item
    alert('Id : ' + item.id + ' Title : ' + item.title);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.topBar}>
        <TextInput
          style={styles.textInputStyle}
          onChangeText={(text) => searchFilterFunction(text)}
          value={search}
          underlineColorAndroid="transparent"
          placeholder="Search Here"
        />
        </View>
        <View style={styles.container}>
        <FlatList
          data={dataList}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  topBar:{
    flexDirection:"row",
    justifyContent: 'center',
    alignContent:"center",
    textShadowColor:'red',
  },
  searchBtn:{
    backgroundColor:"red",
  },
  container: {
    backgroundColor: 'white',
    justifyContent:"center",
  },
  itemStyle: {
    padding: 10,
  },
  textInputStyle: {
    height: 40,
    flex:1,
    borderWidth:   1,
    paddingLeft: 20,
    margin: 5,
    borderColor: '#009688',
    backgroundColor: '#FFFFFF',
  },
});

export default Search;