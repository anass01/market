import {Button, Card, Paragraph, Title} from "react-native-paper";
import React from "react";
import {Alert, StyleSheet, TouchableOpacity} from "react-native";

export const Item = ({ title,id ,desc,pic,price }) => (
    <TouchableOpacity onPress={() => {console.log(id)}}>
        <Card elevation={5} style={styles.card}>
            <Card.Title title={title} subtitle={price}/>
            <Card.Content>
                <Paragraph>{desc}</Paragraph>
            </Card.Content>
            <Card.Cover source={{ uri: pic }} />
            {/*<Card.Actions>*/}
            {/*    <Button>Cancel</Button>*/}
            {/*    <Button>Ok</Button>*/}
            {/*</Card.Actions>*/}
        </Card>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    card: { backgroundColor: "white", margin: 10,},
    cover: { padding: 20, backgroundColor: "white" },
    title: { padding: 16 },
});