import React, { useState ,useLayoutEffect,useEffect} from 'react'
import {View, Image, Text, TouchableOpacity, Keyboard, Alert} from 'react-native'

import firebase from 'firebase'
import { NavigationContainer } from '@react-navigation/native'
require("firebase/firestore")
require("firebase/firebase-storage")
import { TextInput,Button,Avatar } from 'react-native-paper';

export default function Save(props) {
    const [desc, setDesc] = useState("")
    const [price, setPrice] = useState("")
    const [name, setName] = useState("")
    const [isKeyboardVisible,setKeyboardVisible]=useState(false)
    const [phone, setPhone] = useState("")

    useEffect(() => {
        Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
        Keyboard.addListener("keyboardDidHide", _keyboardDidHide);

        // cleanup function
        return () => {
            Keyboard.removeListener("keyboardDidShow", _keyboardDidShow);
            Keyboard.removeListener("keyboardDidHide", _keyboardDidHide);
        };
    }, []);

    const [keyboardStatus, setKeyboardStatus] = useState(undefined);
    const _keyboardDidShow = () => setKeyboardVisible(true);
    const _keyboardDidHide = () => setKeyboardVisible(false);

    const uploadImage = async () => {
        Alert.alert(
            "Info",
            "uploading",
            [
                { text: 'OK' }
            ],
            { cancelable: false }
        );
        const uri = props.route.params.image;
        const childPath = `post/${firebase.auth().currentUser.uid}/${Math.random().toString(36)}`;
        console.log(childPath)

        const response = await fetch(uri);
        const blob = await response.blob();

        const task = firebase
            .storage()
            .ref()
            .child(childPath)
            .put(blob);

        const taskProgress = snapshot => {
            console.log(`transferred: ${snapshot.bytesTransferred}`)
        }

        const taskCompleted = () => {
            task.snapshot.ref.getDownloadURL().then((snapshot) => {
                savePostData(snapshot);
                console.log(snapshot)
            })
        }

        const taskError = snapshot => {
            console.log(snapshot)
        }

        task.on("state_changed", taskProgress, taskError, taskCompleted);
    }

    const savePostData = (downloadURL) => {

        console.log('props')
        console.log(price)
        console.log(name)
        console.log(desc)
        firebase.firestore()
            .collection('posts')
            .doc(firebase.auth().currentUser.uid)
            .collection("userPosts")
            .add({
                phone,
                price,
                name,
                desc,
                downloadURL,
                creation: firebase.firestore.FieldValue.serverTimestamp()
            }).then((function () {
            props.navigation.popToTop()
        }))
    }
    return (
        <>

            <View style={{ flex: 1 }}>
                <Button  icon="upload" mode="outlined" onPress={() => uploadImage()}>
                    upload
                </Button>
                    {/*<TouchableOpacity onPress={() => uploadImage()} style={{alignSelf: 'flex-end', paddingRight:10 , zIndex:2}}>*/}
                    {/*    <Text style={{fontSize: 23, fontWeight: "light", color: '#4285f4'}}>upload</Text>*/}
                    {/*    /!*<Button onPress={() => console.log("add")} title="Update count" />*!/*/}
                    {/*</TouchableOpacity>*/}

                {isKeyboardVisible ? <></>: <Image style={{aspectRatio: 1}} source={{ uri: props.route.params.image }} />}

                <TextInput
                    placeholder="Write a name. . ."
                    onChangeText={(text) => setName(text)}
                />
                <TextInput
                    placeholder="Write a price . . ."
                    onChangeText={(text) => setPrice(text)}
                />
                <TextInput
                    placeholder="phone number . . ."
                    onChangeText={(text) => setPhone(text)}
                />
                <TextInput style={{
                    flex:1,
                }}
                    placeholder="Write a description . . ."
                    onChangeText={(text) => {
                        setDesc(text)
                        console.log(text)
                        console.log(desc)
                    }}
                />
            </View>
        </>
    )
}