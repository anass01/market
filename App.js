import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LandingScreen from './components/auth/Landing'
import RegisterScreen from './components/auth/Register'
import LoginScreen from './components/auth/Login'
import MainScreen from "./components/Main";
import AddScreen from "./components/main/Add"
import SaveScreen from './components/main/Save'
import * as firebase from 'firebase'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './redux/reducers'
import thunk from 'redux-thunk'
const store = createStore(rootReducer, applyMiddleware(thunk))



import { apiKey,authDomain,projectId,storageBucket,messagingSenderId,appId } from '@env'

import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';

const Stack = createStackNavigator();
const firebaseConfig = {
  apiKey: apiKey,
  authDomain: authDomain,
  projectId: projectId,
  storageBucket: storageBucket,
  messagingSenderId: messagingSenderId,
  appId: appId
};
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig)
}

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    }
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.setState({
          loggedIn: false,
          loaded: true,
        })
      } else {
        this.setState({
          loggedIn: true,
          loaded: true,
        })
      }
    })
  }
  render() {
    const { loggedIn, loaded } = this.state;
    if (!loaded) {
      return (
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <Text>Loading</Text>
          </View>
      )
    }
  if (!loggedIn) {
    return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Landing">
              <Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown: false }} />
              <Stack.Screen name="Register" component={RegisterScreen} />
              <Stack.Screen name="Login" component={LoginScreen} />

          </Stack.Navigator>
        </NavigationContainer>
    );
  }
    return (
        <Provider store={store}>
            <StatusBar style="inverted" hidden={false} translucent={false} />
            <NavigationContainer >
                <Stack.Navigator initialRouteName="Home">
                    <Stack.Screen name="Home" component={MainScreen} options={{ headerShown: false }}/>
                    <Stack.Screen name="Add" component={AddScreen} options={{ headerShown: true }} navigation={this.props.navigation}/>
                    <Stack.Screen name="Save" component={SaveScreen} navigation={this.props.navigation}/>
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    )
  }
}

export default App