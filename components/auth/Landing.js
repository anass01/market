import React from 'react'
import { Text, View } from 'react-native'
import { TextInput,Button,Avatar } from 'react-native-paper';

export default function Landing({ navigation }) {
    return (

        <View style={{ flex: 1, justifyContent: 'center' }}>
            <View style={{justifyContent: 'center' ,alignSelf: 'center',}}>
                <Avatar.Icon size={200} icon="home" />
            </View>
            <View style={{width:'80%',alignSelf: 'center', }}>
                <Button style={{margin:"10%"}} icon="book" mode="contained" onPress={() => navigation.navigate("Register")}>
                    Register
                </Button>
                <Button style={{margin:"10%"}} icon="lock" mode="contained" onPress={() => navigation.navigate("Login")}>
                    Login
                </Button>
            </View>
        </View>
    )
}