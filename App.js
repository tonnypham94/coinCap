/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';
import { StackNavigator } from 'react-navigation';

type Props = {};

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Button
          title="Go to Details"
          onPress={() => {this.props.navigation.navigate("Details", {
              itemId: 999,
              myName: "Hai",
            });
          }}
        />
      </View>
    );
  }
}
class DetailsScreen extends React.Component {
  render() {
    const {params} = this.props.navigation.state;
    const itemId = params ? params.itemId : null;
    const myName = params ? params.myName : null;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
        <Text>Get ID: {JSON.stringify(itemId)}</Text>
        <Text>Get Name: {JSON.stringify(myName)}</Text>
        <Button
          title="Go to Details... again"
          onPress={() => this.props.navigation.navigate("Contents")}
        />
        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}
class ContentsScreen extends React.Component {
  render() {
    const {params} = this.props.navigation.state;
    const itemId = params ? params.itemId : null;
    const myName = params ? params.myName : null;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
        <Text>Get ID: {JSON.stringify(itemId)}</Text>
        <Text>Get Name: {JSON.stringify(myName)}</Text>
        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}
const RootStack = StackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Details: {
      screen: DetailsScreen,
    },
    Contents: {
      screen: ContentsScreen,
    },
  },
  {
    initialRouteName: 'Home',
  }
);
export default class App extends Component<Props> {
  render() {
    return (
      <RootStack />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
