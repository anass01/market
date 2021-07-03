import React, { Component } from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchUser, fetchUserPosts } from '../redux/actions/index'

import HomeScreen from './main/Home'
import ProfileScreen from './main/Profile'

import { createDrawerNavigator } from '@react-navigation/drawer';
import {FAB} from "react-native-paper";
const Drawer = createDrawerNavigator();

const EmptyScreen = () => {
    return (null)
}

export class Main extends Component {
    componentDidMount() {
        this.props.fetchUser();
        this.props.fetchUserPosts();
    }
    render() {
        return (
            <>
            <Drawer.Navigator overlayColor="transparent">
                <Drawer.Screen name="market" component={HomeScreen} />
                <Drawer.Screen name="Profile" component={ProfileScreen} />

            </Drawer.Navigator>
                <FAB
                    style={{
                        position: 'absolute',
                        margin: 16,
                        right: 0,
                        bottom: 0,
                    }}
                    small
                    icon="plus"
                    onPress={() => this.props.navigation.navigate("Add")}
                />
            </>
        )
    }
}

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser
})
const mapDispatchProps = (dispatch) => bindActionCreators({ fetchUser, fetchUserPosts }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(Main);