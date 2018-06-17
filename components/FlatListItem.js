import React, {Component} from 'react';
import {AppRegistry, FlatList, StyleSheet, Text, View, Image, Alert, ActivityIndicator, AsyncStorage} from 'react-native';
import Swipeout from 'react-native-swipeout';
import {connect} from 'react-redux';

class FlatListItem extends Component {
  constructor(props){
    super(props);
    this.state = {
    	coinID: '',
    	abc: []
    };
    this.addOn = this.addOn.bind(this);
  }
  addOn(){
  	const {coinID} = this.state;
  	this.props.dispatch({
  		type: 'ADD',
  		coinID: this.props.item.id
  	});
  }
	render(){
    const settingSwipeOut = {
      autoClose: true,
      right: [
      {
        onPress: () => {
        		//this.props.dispatch({type: 'UP'});
            //this.setState({ coinID: this.props.item.id });
            this.addOn();
            Alert.alert(
            	"hello: "+this.props.addFavorites.coinID
            );
          },
          text: 'Save', 
          type: 'save',
        },
      ]
    };
		var abc = -1;
		for (var i = 0; i< this.props.addFavorites.length; i++) {
		  if (this.props.addFavorites[i].coinID == this.props.item.id) {
		    abc = 1;
		  }
		}
		return(
      <View>
        <Swipeout style={styles.Swipeout} {...settingSwipeOut}>
          <View style={[styles.listItem,
          		this.props.checkScreen==2 && abc == -1 ?
      				{display:'none'}:null
          	]}>
            <Text style={styles.listItemRank}>{this.props.item.rank}</Text>
            <Image source={this.props.checkScreen==1 ? 
                {uri: "https://s2.coinmarketcap.com/static/img/coins/64x64/"+this.props.item.id+".png"} : 
                {uri: "https://s2.coinmarketcap.com/static/img/coins/32x32/"+this.props.item.id+".png"}
              } 
              style={this.props.checkScreen==1 ?
                {width: 32, height: 32, margin: 5}:
                {width: 48, height: 48, margin: 5}
              }>   
            </Image>
            <Text style={styles.listItemText}>{this.props.item.name}</Text>
            <Text style={[
              styles.listItemText, styles.listItemPercent, 
              {color: this.props.item.quotes.USD.percent_change_24h<0?'red':'green'
              }]}>
                {this.props.item.quotes.USD.percent_change_24h==null?
                	0:this.props.item.quotes.USD.percent_change_24h}%
            </Text>
            <Text style={[
              styles.listItemText, 
              styles.listItemDollar, 
              {
                color: this.props.item.quotes.USD.percent_change_24h<0?'red':'green',
                borderColor: this.props.item.quotes.USD.percent_change_24h<0?'red':'green'
              }]}>
                {this.props.item.quotes.USD.price<1?
                	(this.props.item.quotes.USD.price).toFixed(5):
                	(this.props.item.quotes.USD.price).toPrecision(6)}$
            </Text>
          </View>
        </Swipeout>
        <View style={[styles.listItemBottom,
        		this.props.checkScreen==2 && abc == -1 ?
      			{display:'none'}:null
        	]}></View>
      </View>
		);
	}
}
function mapStateToProps(state){
	return {
		addFavorites: state.addFavorites
	};
}
export default connect(mapStateToProps)(FlatListItem);

const styles = StyleSheet.create({
  Swipeout:{
    backgroundColor: 'white',
  },
	listItem:{
		flex:1,
		flexDirection: "row",
    backgroundColor: 'white',
	},
  listItemBottom:{
    borderBottomColor: '#bbb',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: 3,
  },
	listItemText:{
		flex:1,
		flexDirection: "column",
		alignSelf: "center",
	},
	listItemRank:{
		alignSelf: "center",
    textAlign: 'center',
    width: 35,
	},
  listItemPercent:{
    justifyContent: "flex-end",
    textAlign: 'right',
    marginRight: 10,
    flex: -1,
    width: 60,
  },
  listItemDollar:{
    borderRadius: 4,
    borderWidth: 1,
    padding:4,
    textAlign: 'center',
    flex: -1,
    width: 90,
    marginRight: 10,
  },
});