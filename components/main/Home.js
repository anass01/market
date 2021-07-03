import {Alert, FlatList, StyleSheet, Text, View} from "react-native";
import {Avatar, Button, Searchbar, TextInput} from "react-native-paper";
import React, {Component} from "react";
import firebase from "firebase";
import {Item} from "./CardItem";


export class Home extends Component {
    constructor(props) {
        super(props);

        this.DATA = [
                {
                    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
                    title: 'First Item',
                    desc:"good condition 1",
                    pic:"https://previews.123rf.com/images/vimax001/vimax0011501/vimax001150100008/36083290-image-of-crashed-car-bad-weather-condition.jpg",
                    price:"500"
                },
                {
                    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
                    title: 'Second Item',
                    desc:"good condition 2",
                    pic:"https://static.carthrottle.com/workspace/uploads/posts/2017/12/67bd95bf13223fb18fe3f20ffccc3667.jpg",
                    price:"1223"
                },
                {
                    id: '58694a0f-3da1-471f-bd96-145571e29d72',
                    title: 'Third Item',
                    desc:"good condition 3",
                    pic:"https://media.istockphoto.com/photos/car-that-needs-repair-picture-id116032621?k=6&m=116032621&s=612x612&w=0&h=OB_w3G6_A68bKSbD-0htqHhNTsqzY1t7aQO5qAZ2Ykg=",
                    price:"4984"
                },
            ];
        this.renderItem = this.renderItem.bind(this)
    }

    renderItem ({ item }) {
        return(<Item title={item.title} id={item.id} desc={item.desc} pic={item.pic} price={item.price}/>)
    }

    render() {

        return (
            <View style={{ flex: 1, }}>

                <View style={{flex: 1 , height:'100%' ,}}>
                    <FlatList
                        style={{ paddingTop: '15%', zIndex:-1}}
                        contentContainerStyle={{paddingBottom:'15%'}}
                        // columnWrapperStyle={{justifyContent: 'space-between'}}
                        ItemSeparatorComponent={
                            () => <View style={{ width: '100%', backgroundColor: 'pink' }}/>
                        }
                        data={this.DATA}
                        renderItem={this.renderItem}
                        keyExtractor={item => item.id}
                    />
                </View>
                <Searchbar style={{margin:'2%',position:"absolute", zIndex:2,}}/>

            </View>
        )
    }
}


export default Home
