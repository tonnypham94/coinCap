import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  ScrollView,
  Image,
} from 'react-native';
import PushNotification from 'react-native-push-notification';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
  'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
  'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  constructor(props){
    super(props);
    this.state ={isLoading: true};
    console.disableYellowBox = true;
    this.showNoti = this.showNoti.bind(this);
  }
  showNoti(){
    PushNotification.localNotification({
      message: 'My Notification Message',
      bigText: "My big text that will be shown when notification is expanded", // (optional) default: "message" prop
      subText: "This is a subText"
    });
  }
  reload() {
    this.setState({
      isLoading: true,
    }, function(){

    });
    this.myData();
    if (this.state.dataSource.data.hashrate <= 100) {
      this.showNoti();
    }
  }
  async myData(){
    return fetch('https://api.nanopool.org/v1/eth/user/0xb8b1ce067b0540ec09c22eb9a7b0851f59d15322')
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
  componentWillMount(){
    this.myData();
  }
  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.container_first}>
          <ActivityIndicator/>
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <TouchableOpacity onPress={this.showNoti}>
            <Text>Click me</Text>
          </TouchableOpacity>
          <Text style={styles.al_center}>Account:</Text>
          <Text numberOfLines={1} style={styles.truncated}>{this.state.dataSource.data.account}</Text>
          <Text style={[styles.al_center, styles.myhead]}>Balance</Text>
          <PriceUsd getBalance={this.state.dataSource.data.balance}/>
          <DayPayment getHash={this.state.dataSource.data.avgHashrate.h6} getBalance1={this.state.dataSource.data.balance}/>
          <ForCheck/>
          <Text style={[styles.al_center, styles.myhead]}>Current Calculated Hashrate</Text>
          <Text style={styles.mycontent}>{this.state.dataSource.data.hashrate} Mh/s</Text>
          <Text style={[styles.al_center, styles.myhead]}>Average Hashrate</Text>
          <ScrollView style={styles.marginLR}>
            <Text style={[styles.al_center, styles.border_top]}>1 hour:    {this.state.dataSource.data.avgHashrate.h1} Mh/s</Text>
            <Text style={[styles.al_center, styles.border_lr]}>3 hour:    {this.state.dataSource.data.avgHashrate.h3} Mh/s</Text>
            <Text style={[styles.al_center, styles.border_lr]}>6 hour:    {this.state.dataSource.data.avgHashrate.h6} Mh/s</Text>
            <Text style={[styles.al_center, styles.border_lr]}>12 hour:   {this.state.dataSource.data.avgHashrate.h12} Mh/s</Text>
            <Text style={[styles.al_center, styles.border_bt]}>24 hour:   {this.state.dataSource.data.avgHashrate.h24} Mh/s</Text>
          </ScrollView>
          <FlatList
            data={this.state.dataSource.data.workers}
            renderItem={({item}) => <ScrollView style={styles.wrap_bg}>
              <Text style={styles.myMiner}>Miner: {item.id}</Text>
              <Text style={[styles.al_center, styles.myhead]}>Current Calculated Hashrate</Text>
              <Text style={styles.mycontent}>{item.hashrate} Mh/s</Text>
              <Text style={[styles.al_center, styles.myhead]}>Average Hashrate</Text>
              <ScrollView style={styles.marginLR}>
                <Text style={[styles.al_center, styles.border_top]}>1 hour:    {item.h1} Mh/s</Text>
                <Text style={[styles.al_center, styles.border_lr]}>3 hour:    {item.h3} Mh/s</Text>
                <Text style={[styles.al_center, styles.border_lr]}>6 hour:    {item.h6} Mh/s</Text>
                <Text style={[styles.al_center, styles.border_lr]}>12 hour:   {item.h12} Mh/s</Text>
                <Text style={[styles.al_center, styles.border_bt]}>24 hour:   {item.h24} Mh/s</Text>
              </ScrollView>
            </ScrollView>}
            keyExtractor={(item, index) => index}
          />
          <Text style={styles.end}>Design by me</Text>
        </ScrollView>
        <TouchableOpacity style={styles.refresh} onPress= {this.reload.bind(this)}><Image source={require('./img/refresh.png')} /></TouchableOpacity>
      </View>
    );
  }
}
class DayPayment extends Component {
  constructor(props){
    super(props);
    this.state ={ isLoading: true };
    console.disableYellowBox = true;
  }
  async myData(){
    return fetch('https://api.nanopool.org/v1/eth/approximated_earnings/' + this.props.getHash)
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        isLoading: false,
        dataSource1: responseJson,
      }, function(){

      });
    })
    .catch((error) =>{
      console.error(error);
    });
  }
  componentWillMount(){
    this.myData();
  }
  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.container_first}>
          <ActivityIndicator/>
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Payout getDayPayment={this.state.dataSource1.data.day.coins} getgetBalance1={this.props.getBalance1} getETHperMonth={this.state.dataSource1.data.month.coins}/>
        </ScrollView>
      </View>
    );
  }
}
class PriceUsd extends Component {
  constructor(props){
    super(props);
    this.state ={ isLoading: true };
    console.disableYellowBox = true;
  }
  async myData(){
    return fetch('https://api.nanopool.org/v1/eth/prices')
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        isLoading: false,
        dataSource2: responseJson,
      }, function(){

      });
    })
    .catch((error) =>{
      console.error(error);
    });
  }
  componentWillMount(){
    this.myData();
  }
  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.container_first}>
          <ActivityIndicator/>
        </View>
      )
    }
    return (
      <View>
        <Text style={styles.mycontent}>{this.props.getBalance} ({(this.state.dataSource2.data.price_usd * this.props.getBalance).toFixed(2)}$)</Text>
      </View>
    );
  }
}
class Payout extends Component {
  constructor(props){
    super(props);
    this.state ={ isLoading: true };
    console.disableYellowBox = true;
  }
  async myData(){
    return fetch('https://api.nanopool.org/v1/eth/usersettings/0xb8b1ce067b0540ec09c22eb9a7b0851f59d15322')
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        isLoading: false,
        dataSource3: responseJson,
      }, function(){

      });
    })
    .catch((error) =>{
      console.error(error);
    });
  }
  componentWillMount(){
    this.myData();
  }
  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.container_first}>
        <ActivityIndicator/>
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.payout}>Minimum payout is: {this.state.dataSource3.data.payout} ETH</Text>
          <Text style={styles.mycontent}>{(this.props.getgetBalance1/this.state.dataSource3.data.payout*100).toFixed(2)}% ({((this.state.dataSource3.data.payout-this.props.getgetBalance1)/this.props.getDayPayment).toFixed(2)} days) to payout.{"\n"}Approximated earnings per month: {this.props.getETHperMonth.toFixed(3)}</Text>
        </ScrollView>
      </View>
    );
  }
}
class getSetHash extends Component {
  constructor(props){
    super(props);
    console.disableYellowBox = true;
  }
  async myData(){
    return fetch('https://api.nanopool.org/v1/eth/reportedhashrates/0xb8b1ce067b0540ec09c22eb9a7b0851f59d15322')
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        dataSource5: responseJson,
      }, function(){

      });
    })
    .catch((error) =>{
      console.error(error);
    });
  }
  render() {
    return (
      <ForCheck getSetHash1={this.props.dataSource5.data[1].hashrate}/>
    );
  }
}
class ForCheck extends Component {
  constructor(props){
    super(props);
    console.disableYellowBox = true;
    this.showNoti1 = this.showNoti1.bind(this);
  }
  showNoti1(name){
    PushNotification.localNotification({
      message: 'Your miner: '+name+' has been lower 100mhs',
      bigText: "Miner app is caculated your miner has been low hash", // (optional) default: "message" prop
      subText: "Plz check your miner"
    });
  }
  async myData(){
    return fetch('https://api.nanopool.org/v1/eth/user/0xb8b1ce067b0540ec09c22eb9a7b0851f59d15322')
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        dataSource4: responseJson,
      }, function(){

      });
    })
    .catch((error) =>{
      console.error(error);
    });
  }
  componentDidMount(){
    this.timer = setInterval(()=> this.reLoad(), 3000);
  }
  async reLoad() {
    this.myData();
    // for(var i = 0; i < this.state.dataSource4.data.workers.length; i++){
    //   if (this.state.dataSource4.data.workers[i].hashrate >= this.props.getSetHash1.data[i].hashrate*0.5 && this.state.dataSource4.data.workers.id != "luckyboy") {
    //     var name = this.state.dataSource4.data.workers[i].id;
    //     this.showNoti1(name);
    //   }
    // }
    if (this.props.getSetHash1 >= 100) {
      var name = this.state.dataSource4.data.hashrate;
      //this.showNoti1(name);
      console.log(name);
    }
  }
  render() {
    return (
      <Text></Text>
    );
  }
}

const styles = StyleSheet.create({
  container_first: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
  },
  balance:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  payout: {
    backgroundColor: '#e74c3c',
    color: '#fff',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 20,
    paddingTop: 8,
    paddingBottom: 8,
    marginLeft: 10,
    marginRight: 10,
  },
  font_20: {
    fontSize: 20,
  },
  truncated: {
    color: '#00b7ff',
    textAlign: 'center',
    marginBottom: 15,
  },
  myhead: {
    backgroundColor: '#e95420',
    color: '#fff',
    alignItems: 'center',
    fontSize: 20,
    paddingTop: 8,
    paddingBottom: 8,
    marginLeft: 10,
    marginRight: 10,
  },
  marginLR: {
    marginLeft: 10,
    marginRight: 10,
  },
  mycontent: {
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#e95420',
    paddingTop: 10,
    paddingBottom: 10,
    marginBottom: 15,
    marginLeft: 10,
    marginRight: 10,
    fontSize: 18,
    backgroundColor: '#fff',
  },
  border_top:{
    borderWidth: 1,
    borderColor: '#e95420',
    borderBottomWidth: 0,
    paddingTop: 10,
    fontSize: 18,
    backgroundColor: '#fff',
  },
  border_lr:{
    borderWidth: 1,
    borderColor: '#e95420',
    borderBottomWidth: 0,
    borderTopWidth: 0,
    fontSize: 18,
    backgroundColor: '#fff',
  },
  border_bt:{
    borderWidth: 1,
    borderColor: '#e95420',
    borderTopWidth: 0,
    marginBottom: 15,
    paddingBottom: 10,
    fontSize: 18,
    backgroundColor: '#fff',
  },
  al_center: {
    textAlign: 'center',
    fontSize: 18,
  },
  myMiner:{
    backgroundColor: '#05A5D1',
    color: '#fff',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    textAlign: 'left',
    fontSize: 18,
  },
  end:{
    backgroundColor: '#05A5D1',
    color: '#fff',
    paddingTop: 15,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    textAlign: 'right',
    fontSize: 13,
    marginLeft: -10,
    marginRight: -10,
    marginTop: 25,
  },
  refresh:{
    position: 'absolute',
    width: 45,
    height: 45,
    bottom: 18,
    right: 7,
  },
  wrap_bg: {
    backgroundColor: '#05A5D1',
    marginBottom: 15,
    marginTop: 25,
  },
});