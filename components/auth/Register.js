import React, { Component } from 'react'
import {Alert, View, Keyboard,Image} from 'react-native'
import { TextInput,Button,Avatar } from 'react-native-paper';
import KeyboardListener from 'react-native-keyboard-listener';
import firebase from 'firebase'

export class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            name: '',
            isKeyboadVisible: false
        }

        this.onSignUp = this.onSignUp.bind(this)
    }
    componentDidMount() {
        this.keyboardDidShowListener = Keyboard.addListener(
            "keyboardDidShow",
            this._keyboardDidShow
        );
        this.keyboardDidHideListener = Keyboard.addListener(
            "keyboardDidHide",
            this._keyboardDidHide
        );
    }
    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }
    _keyboardDidShow = () => {
        this.setState({
            isKeyboadVisible: true
        });
    };

    _keyboardDidHide = () => {
        this.setState({
            isKeyboadVisible: false
        });
    };
    onSignUp() {
        const { email, password, name } = this.state;
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((result) => {
                firebase.firestore().collection("users")
                    .doc(firebase.auth().currentUser.uid)
                    .set({
                        name,
                        email
                    })
                console.log(result)
            })
            .catch((error) => {
                Alert.alert(
                    error.code.replace("auth/",""),
                    error.message,
                    [
                        { text: 'OK' }
                    ],
                    { cancelable: false }
                );
            })
    }

    render() {
        return (
            <View style={{flex:1}}>
                {!this.state.isKeyboadVisible && (
                    <View style={{alignItems: 'center',margin:'10%'}}>
                        <Avatar.Icon size={200} icon="badge-account" />
                    </View>
                )}

                <TextInput
                    placeholder="name"
                    onChangeText={(name) => this.setState({ name })}
                />
                <TextInput
                    placeholder="email"
                    onChangeText={(email) => this.setState({ email })}
                />
                <TextInput
                    placeholder="password"
                    secureTextEntry={true}
                    onChangeText={(password) => this.setState({ password })}
                />
                <View style={{alignItems: 'center',marginTop:'10%'}}>
                    <Button icon="content-save" mode="contained" onPress={() => this.onSignUp()}>
                        Sign Up
                    </Button>
                </View>
            </View>
        )
    }
}

export default Register