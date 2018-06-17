import React, {Component} from 'react';
import { AppRegistry } from 'react-native';
import App from './App';
import TabNavigator from './CoinMarketCap';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

const defaultState = {
	addFavorites: [
		{id:1, coinID: 1},
		{id:2, coinID: 1027},
		{id:3, coinID: 52},
		{id:4, coinID: 1831},
		{id:5, coinID: 1765},
	],
	value:0, 
	getID:'hello'
};
const reducer = (state=defaultState,action)=>{
	switch (action.type){
		case 'UP':
			return{...state, value: state.value + 1, getID:state.getID};
		case 'DOWN':
			return{...state, value: state.value - 1, getID:state.getID};
		case 'ADD':
			return{
				...state, 
				value: state.value + 9, 
				addFavorites: state.addFavorites.concat({
					id: state.addFavorites.length +1,
					coinID: action.coinID
				})
			};
		default:
			break;
	}
	return state;
};
const store = createStore(reducer);

export default class CoinCap extends Component{
	render(){
		return(
			<Provider store={store}>
				<TabNavigator/>
			</Provider>
		);
	}
}

AppRegistry.registerComponent('ReactEffect', () => CoinCap);
