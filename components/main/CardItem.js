import {Button, Card, Paragraph, Title} from "react-native-paper";
import React from "react";
import {Linking, StyleSheet, TouchableOpacity} from "react-native";

export const Item = ({ title,id ,desc,pic,price,phone }) => (
    <TouchableOpacity onPress={() => {Linking.openURL(`tel:${phone}`)}}>
        <Card elevation={5} style={styles.card}>
            <Card.Title title={title} subtitle={price}/>
            <Card.Content>
                <Paragraph>{desc}</Paragraph>
            </Card.Content>
            <Card.Cover style={styles.cover} source={{ uri: pic }} />
            {/*<Card.Actions>*/}
            {/*    <Button>Cancel</Button>*/}
            {/*    <Button>Ok</Button>*/}
            {/*</Card.Actions>*/}
        </Card>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    card: { backgroundColor: "white", margin: 10,flex: 1,flexGrow: 1,},
    cover: {backgroundColor: "white" ,flex: 1,aspectRatio:1,width:'100%',justifyContent:'center',height:'100%'},
    title: { padding: 16 },
});