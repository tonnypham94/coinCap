import React, {Component} from 'react';
import {AppRegistry, FlatList, StyleSheet, Text, View, Image, Alert, ActivityIndicator, AsyncStorage} from 'react-native';
import {TabNavigator} from 'react-navigation';
import Swipeout from 'react-native-swipeout';
import FlatListItem from './components/FlatListItem';
//import {connect} from 'react-redux';

class FavoritesScreen extends Component{
  constructor(props){
    super(props);
    this.state ={isLoading: true};
    console.disableYellowBox = true;
  }
  myData(){
    return fetch('https://api.coinmarketcap.com/v2/ticker/?limit=100&structure=array')
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        isLoading: false,
        dataSource: responseJson,
      }, function(){

      });
    })
    .catch((error) =>{
      console.error(error);
    });
  }
  componentDidMount(){
    this.myData();
  }
  render(){
    if(this.state.isLoading){
      return(
        <View style={styles.lazy_load}>
          <ActivityIndicator/>
        </View>
      );
    }
    return(
      <View>
      {/*
        <View style={styles.wrap_all_favorites}>
          <View style={styles.all_favorites}>
            <Text style={styles.all}>All</Text>
            <Text style={styles.favorites}>Favorites</Text>
          </View>
        </View>
      */}
        <FlatList
          data={this.state.dataSource.data}
          renderItem={({item, index})=> {
            return(<FlatListItem item={item} index={index} checkScreen={2} parentFlatList={this}></FlatListItem>);
          }}
        />
      </View>
    );
  }
}
class MarketCapScreen extends Component{
  constructor(props){
    super(props);
    this.state ={isLoading: true};
    console.disableYellowBox = true;
  }
  myData(){
    return fetch('https://api.coinmarketcap.com/v2/ticker/?limit=100&structure=array')
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        isLoading: false,
        dataSource: responseJson,
      }, function(){

      });
    })
    .catch((error) =>{
      console.error(error);
    });
  }
  componentDidMount(){
    this.myData();
  }
  render(){
    if(this.state.isLoading){
      return(
        <View style={styles.lazy_load}>
          <ActivityIndicator/>
        </View>
      );
    }
  	return(
  		<View style={{flex:1}}>
  		{/*
        <View style={styles.wrap_all_favorites}>
          <View style={styles.all_favorites}>
            <Text style={styles.all}>All</Text>
            <Text style={styles.favorites}>Favorites</Text>
          </View>
        </View>
      	<Text>Num: {this.props.myValue} --- ID:  {this.props.myId}</Text>
      	<FlatList
					data={this.props.addFavorites}
					renderItem={({item})=> {
						return(<Text>ID:  {item.coinID}</Text>);
					}}
				/>
      */}
  			<FlatList
					data={this.state.dataSource.data}
					renderItem={({item, index})=> {
						return(<FlatListItem item={item} index={index} checkScreen={1} parentFlatList={this}></FlatListItem>);
					}}
				/>
  		</View>
  	);
  }
}
export default TabNavigator(
  {
    All: { screen: MarketCapScreen },
    Favorites: { screen: FavoritesScreen },
  },
  {
    swipeEnabled: false,
  }
);

//export default connect()(MarketCapScreen);

const styles = StyleSheet.create({
	lazy_load:{
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
  wrap_all_favorites:{
    height: 45,
    backgroundColor: 'tomato',
    flexDirection: 'row',
  },
  all_favorites:{
    borderColor: "#ccc",
    borderRadius: 4,
    borderWidth: 1,
    alignSelf: "center",
    textAlign: 'center',
    flexDirection: 'row',
    margin: 10,
  },
  all:{
    color: "white",
    flex:1,
    alignSelf: "center",
    textAlign: 'center',
    padding: 2,
    backgroundColor: '#ccc',
  },
  favorites:{
    flex:1,
    alignSelf: "center",
    textAlign: 'center',
    padding: 2,
    color: "white",
  }
});