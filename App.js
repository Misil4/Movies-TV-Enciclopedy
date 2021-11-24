/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import { Image,StyleSheet,View,Text,TouchableOpacity,Modal, ActivityIndicator,ScrollView  } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

const App = () => {
  const [value, onChangeText] = useState('');
  const [modalVisible,setModalVisible] = useState(false)
  const [searchResult,setSearchResult] = useState({});
  const [isLoading,setLoadingVisible] = useState(false);
  const getMoviesFromAPiAsync = async () => {
    try {
      let response = await fetch(
        'http://www.omdbapi.com/?i=tt3896198&apikey=cf7197eb&t=' +value
      );
      let json = await response.json();
      setSearchResult(json);
      setLoadingVisible(false);
      console.log(json)
    } catch (error) {
      console.error(error)
    }
  }
  const onPress = () => {
    setModalVisible(true);
    setLoadingVisible(true);
    getMoviesFromAPiAsync()
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>OMDb API</Text>
      <Text>The Open Movie Database</Text>
      <TextInput style={styles.input}
      onChangeText={text => onChangeText(text)}
      value={value}/>
      <TouchableOpacity
        style={styles.button}
        onPress={onPress}
        >
          <Text>Search</Text>
      </TouchableOpacity>
      <Modal
      style={styles.modalSettings}
      animationType="fade"
      transparent={false}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(false);
      }}
      >
        {(!isLoading) ? <ScrollView>
          <Image
          source={{uri : searchResult.Poster}} style={styles.backgroundImage} />
          <Text>Title : {searchResult.Title}</Text>
          <Text>Type: {searchResult.Type}</Text>
          <Text>Genre : {searchResult.Genre}</Text>
          <Text>Actors : {searchResult.Actors}</Text>
          <Text>Awards : {searchResult.Awards}</Text>
          <Text>Director : {searchResult.Director}</Text>
          <Text>Languages : {searchResult.Language}</Text>
          <Text>Sinopsis : {searchResult.Plot}</Text>
          <Text>Released : {searchResult.Released}</Text>
          <Text>Runtime : {searchResult.Runtime}</Text>
          <Text>Writer : {searchResult.Writer}</Text>
          <Text>imdbRating : {searchResult.imdbRating}</Text>
          <Text>imdbVotes : {searchResult.imdbVotes}</Text>
          <Text>Seasons : {searchResult.totalSeasons}</Text>
          </ScrollView> 
          : 
        <View style={[styles.container]}>
          <ActivityIndicator size={100} color="#4CB53D" />
          </View>}
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  container : {
    flex : 1,
    alignItems : 'center',
    justifyContent : 'center'
  },
  title : {
    textAlign : 'center',
    marginVertical : 8,
    fontSize : 48,
    fontWeight : "bold"
  },
  input : {
    height : 40,
    borderColor : 'gray',
    borderWidth : 1,
    alignSelf : 'stretch',
    margin : 10,
    padding : 10
  },
  button: {
    alignItems : "center",
    backgroundColor :"#4CB53D",
    margin : 10,
    padding : 10,
    alignSelf : 'stretch',
    color : "red"
  },
  modalSettings: {
    justifyContent :'center',
    alignItems : 'center'
  },backgroundImage: {
    resizeMode : 'contain',
    flex : 1,
    aspectRatio : 1
  }
});
export default App