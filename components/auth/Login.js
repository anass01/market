import React, { Component } from 'react'
import { Text,View,Alert } from 'react-native'
import { TextInput,Button,Avatar } from 'react-native-paper';
import firebase from 'firebase'

export class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
        }

        this.onSignUp = this.onSignUp.bind(this)
    }

    onSignUp() {
        const { email, password } = this.state;
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((result) => {
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
                <View style={{alignItems: 'center',margin:'10%'}}>
                    <Avatar.Icon size={200} icon="lock" />
                </View>
                <TextInput
                    placeholder="email"
                    onChangeText={(email) => this.setState({ email })}
                />
                <TextInput
                    placeholder="password"
                    secureTextEntry={true}
                    onChangeText={(password) => this.setState({ password })}
                    onSubmitEditing={() => this.onSignUp()}
                />
                <View style={{alignItems: 'center',marginTop:'10%'}}>
                <Button icon="lock" mode="contained" onPress={() => this.onSignUp()}>
                    Sign In
                </Button>
                </View>
            </View>
        )
    }
}

export default Login