import React, {Component} from "react";
import firebase from "firebase";
import {Button} from "react-native-paper";
import {FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Home from "./Home";
import { connect } from 'react-redux'
import {bindActionCreators} from "redux";
import {fetchUser, fetchUserPosts} from "../../redux/actions";
require('firebase/firestore');

export class Profile extends Component{
    constructor(props) {
        super(props);
        this.onLogout = this.onLogout.bind(this)
    }
    componentDidMount() {
        this.props.fetchUserPosts();
    }

    onLogout(){
        firebase.auth().signOut();
    }
    deletePost(id){
        console.log("searching")
        console.log(id)
        firebase.firestore()
            .collection("posts")
            .doc(firebase.auth().currentUser.uid)
            .collection("userPosts")
            .doc(id)
            .delete()
            .then(this.props.fetchUserPosts())
            .catch((err) => {console.log(err)})
    }
    render() {

        return(

            <View style={styles.container}>
                <Button style={{color:"red"}} icon="logout" onPress={this.onLogout}>
                    logout
                </Button>
                <Image
                    style={styles.profileimage}
                    source={{ uri: "data:image/jpeg;base64,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" }}
                />
                <View style={styles.containerInfo}>
                    <Text style={{fontWeight:"bold",alignSelf:'center',}}>{this.props.currentUser.name}</Text>
                </View>

                <View style={styles.containerGallery}>
                    <FlatList
                        numColumns={3}
                        horizontal={false}
                        data={this.props.posts}
                        renderItem={({ item }) => (
                            <View
                                style={styles.containerImage}>
                                    <TouchableOpacity onLongPress={() =>{
                                        console.log("top")
                                        this.deletePost(item.id)}}>
                                    <Image
                                        style={styles.image}
                                        source={{ uri: item.downloadURL }}
                                    />
                                    </TouchableOpacity>
                            </View>

                        )}

                    />
                </View>
            </View>
        );

    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerInfo: {
        alignSelf:'center',
        margin: 20
    },
    containerGallery: {
        flex: 1
    },
    containerImage: {
        flex: 1/3

    },
    image: {
        margin:1,
        flex: 1,
        aspectRatio: 1 / 1
    },
    profileimage: {
        alignSelf:'center',
        width:'50%',
        aspectRatio: 1 / 1
    }
})

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
    posts: store.userState.posts
})

const mapDispatchProps = (dispatch) => bindActionCreators({ fetchUser, fetchUserPosts }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(Profile);