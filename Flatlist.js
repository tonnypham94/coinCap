import React, {Component} from 'react';
import {AppRegistry, FlatList, StyleSheet, Text, View, Image, Alert} from 'react-native';
import flatlistData from './data/flatlistData';
import Swipeout from 'react-native-swipeout';

class FlatListItem extends Component{
	constructor(props){
		super(props);
		this.state = {
			activeRowKey: null
		};
	}
	render(){
		const swipeSettings = {
			autoClose: true,
			onClose: (secID, rowId, direction) => {
				if(this.state.activeRowKey != null){
					this.setState({activeRowKey: null});
				}
			},
			onOpen: (secID, rowId, direction) => {
				this.setState({activeRowKey: this.props.item.key});
			},
			right: [
			{
				onPress: () => {
					const deletingRow = this.state.activeRowKey;
					Alert.alert(
						'Alert',
						'Are you sure you want to delete it?',
						[
						{text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
						{text: 'Yes', onPress: () => {
							flatlistData.splice(this.props.index,1);
							this.props.parentFlatList.refreshFlatList(deletingRow);
						}},
						],
							{cancelable:true}
						);
					},
					text: 'Delete', 
					type: 'delete',
				},

			{
				onPress: () => {
					Alert.alert(
						'Alert',
						'Are you sure you want to note it?',
						[
						{text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
						{text: 'Yes', onPress: () => {
							flatlistData.splice(this.props.index,1);
						}},
						],
							{cancelable:true}
						);
					},
					text: 'Note', 
					type: 'note',
					backgroundColor: '#ccc',
				}
			]
		}
		return(
			<Swipeout {...swipeSettings}>
				<View style={{
					flex: 1,
					flexDirection: 'column'
				}}>
					<View style={{
						flex: 1,
						flexDirection: 'row',
						//backgroundColor: this.props.index%2?'cyan':'tomato',
						backgroundColor: 'cyan',
					}}>
						<Image source={{uri: this.props.item.image}} style={{width: 100, height: 100, margin: 5}}></Image>
						<View style={{flex: 1, flexDirection: 'column'}}>
							<Text style={styles.listItem}>{this.props.item.name}</Text>
							<Text style={styles.listItem}>{this.props.item.foodDescription}</Text>
						</View>
					</View>
					<View style={{height: 1, backgroundColor:'white'}}>
					</View>
				</View>
			</Swipeout>
		);
	}
}

export default class BasicFlatList extends Component{
	constructor(props){
		super(props);
		this.state = ({
			deletedRowKey: null,
		});
	}
	refreshFlatList = (deletedKey) => {
		this.setState((prevState) => {
			return{
				deletedRowKey: deletedKey
			};
		});
	}
	render(){
		return (
			<View>
				<FlatList
					data={flatlistData}
					renderItem={({item, index})=>{
						return(<FlatListItem item={item} index={index} parentFlatList={this}></FlatListItem>);
					}}
				>
				
				</FlatList>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	listItem:{
		marginTop: 20,
		marginBottom: 20,
		marginLeft: 20,
	}
});