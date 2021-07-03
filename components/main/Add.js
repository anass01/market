// import React, {Component} from "react";
// import {Text} from "react-native";
// import Home from "./Home";
//
// export class Add extends Component{
//     constructor(props) {
//         super(props);
//     }
//     render(){
//         return(
//             <Text>add screen</Text>
//         )
//     }
// }
//
// export default Add
import React, {useState, useEffect, useLayoutEffect} from 'react';
import {StyleSheet, Text, View, Button, Image, TouchableOpacity, Alert} from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

export default function Add({ navigation }) {
    const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [camera, setCamera] = useState(null);
    const [image, setImage] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);

    useEffect(() => {
        (async () => {
            const cameraStatus = await Camera.requestPermissionsAsync();
            setHasCameraPermission(cameraStatus.status === 'granted');

            const galleryStatus = await ImagePicker.requestCameraRollPermissionsAsync();
            setHasGalleryPermission(galleryStatus.status === 'granted');

        })();
    }, []);
    useEffect(()=> console.log(image),[image]);

    const takePicture = async () => {
        if (camera) {
            const data = await camera.takePictureAsync(null);
            const manipResult = await ImageManipulator.manipulateAsync(
                data.uri,
                [{ resize:{ width:1080, height:1080 }}],
                { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
            );
            console.log('resizing')
            console.log(manipResult.uri);
            setImage(manipResult.uri);
        }
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });
        console.log(result);

        if (!result.cancelled) {
            const manipResult = await ImageManipulator.manipulateAsync(
                result.uri,
                [{ resize:{ width:1080, height:1080 }}],
                { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
            );
            console.log('resized')
            console.log(manipResult.uri)
            setImage(manipResult.uri);
        }
    };

    if (hasCameraPermission === null || hasGalleryPermission === false) {
        return <View />;
    }
    if (hasCameraPermission === false || hasGalleryPermission === false) {
        return <Text>No access to camera</Text>;
    }
    const delImage = function(){
        if(image!=null){
            console.log('removing image')
            setImage(null);
        }
    }
    return (
        <View style={{ flex: 1 }}>
            <View style={styles.cameraContainer}>
                {image ? <Image source={{ uri: image }} style={{ flex: 1 }} />
                    : <Camera
                    ref={ref => setCamera(ref)}
                    style={styles.fixedRatio}
                    type={type}
                    ratio={'1:1'} />}

            </View>

            <View style={{flexDirection: 'row', justifyContent: 'space-between',alignItems: 'center',paddingHorizontal:"10%"}}>

                <TouchableOpacity onPress={() => {
                    setType(
                        type === Camera.Constants.Type.back
                            ? Camera.Constants.Type.front
                            : Camera.Constants.Type.back
                    );
                }}>
                <MaterialIcons name="flip-camera-ios" size={50} color="black" /></TouchableOpacity>
                {image ?
                    <TouchableOpacity onPress={() => delImage()} ><Ionicons name="ios-close-circle" size={120} color="black" /></TouchableOpacity>
                    : <TouchableOpacity onPress={() => takePicture()} ><FontAwesome name="circle" size={120} color="black" /></TouchableOpacity>}
                {image ?
                    <TouchableOpacity onPress={() => navigation.navigate('Save', { image ,navigation })} ><Ionicons name="checkmark-circle" size={50} color="black" /></TouchableOpacity>
                    : <TouchableOpacity onPress={() => pickImage()}><MaterialIcons name="photo-album" size={50} color="black" /></TouchableOpacity>}

            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    cameraContainer: {
        flex: 1,
        width:"100%",
        aspectRatio: 1/1
    },
    fixedRatio: {
        flex: 1,
        aspectRatio: 1
    }

})