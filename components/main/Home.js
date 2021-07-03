import {Alert, FlatList, StyleSheet, Text, View} from "react-native";
import {Avatar, Button, Searchbar, TextInput} from "react-native-paper";
import React, {Component} from "react";
import firebase from "firebase";
import {Item} from "./CardItem";
require('firebase/firestore');

export class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            DATA:null,
            isloading:false,
            searchName:'',
        }


        this.loadPosts()
        this.renderItem = this.renderItem.bind(this)

    }

    renderItem ({ item }) {
        return(<Item title={item.name} id={item.id} desc={item.desc} pic={item.downloadURL} price={item.price} phone={item.phone}/>)
    }

    findPosts(name){
        console.log(name.length)
        if(name.length>3){
            this.setState({isloading:true})
            console.log("searching")
            console.log(name)
            firebase.firestore()
                .collectionGroup('userPosts')
                .where('name', '>=', name)
                .limit(15)
                .get()
                .then((snapshot) => {
                    let posts = snapshot.docs.map(doc => {
                        const data = doc.data();
                        const id = doc.id;
                        return { id, ...data }
                    });
                    console.log(posts)
                    this.setState({ DATA: posts })
                    this.setState({isloading:false})
                }).catch((err) => {console.log(err)})
        }
    }

    loadPosts(){
        this.setState({isloading:true})
        console.log('loading .... posts')
        firebase.firestore()
            .collectionGroup('userPosts')
            .orderBy("creation", "desc")
            .limit(15)
            .get()
            .then((snapshot) => {
                let posts = snapshot.docs.map(doc => {
                    const data = doc.data();
                    const id = doc.id;
                    return { id, ...data }
                });
                this.setState({ DATA: posts })
                this.setState({isloading:false})
            }).catch((err) => {console.log(err)})
    }
    // componentDidMount() {
    //     console.log('did mount')
    //     if (this.state.DATA==null){
    //         this.loadPosts()
    //     }
    // }
    render() {
        return (
            <View style={{ flex: 1, }}>
                <View style={{flex: 1 , height:'100%' ,}}>
                    <FlatList
                        style={{ paddingTop: '15%', zIndex:-1 ,flex:1}}
                        contentContainerStyle={{paddingBottom:'15%'}}
                        // columnWrapperStyle={{justifyContent: 'space-between'}}
                        // ItemSeparatorComponent={
                        //     () => <View style={{ width: '100%' }}/>
                        // }
                        onRefresh={() => this.loadPosts()}
                        refreshing={this.state.isloading}
                        data={this.state.DATA}
                        renderItem={this.renderItem}
                        keyExtractor={item => item.id}
                    />
                </View>
                <Searchbar onChangeText={(text) => this.setState({ searchName: text })}
                           onSubmitEditing={() => this.findPosts(this.state.searchName)} style={{margin:'2%',position:"absolute", zIndex:2,}}/>

            </View>
        )
    }
}


export default Home
