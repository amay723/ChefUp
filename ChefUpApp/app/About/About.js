import React from 'react';
import {AppRegistry, StyleSheet, Text, View, Image} from 'react-native';

const creators = ["Adam May", "Greg Thomas", "Caleb Yost", "Matthew Mulkeen", "Smashicon's Gastronomy Set"];

export default class About extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>ChefUp 2019 &reg;</Text>
                <Image
                    style={{width: 200, height: 200, alignItems: 'center'}}
                    source={require('../images/bigyoshiPancakes.png')}
                />

                {
                    creators.map( (name, idx) => {
                        return (<Text key={idx} style={styles.credits}>{name}</Text>);
                    })
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'honeydew',
        fontWeight: 'bold',
        color: 'darkgreen',
    },
    welcome: {
        fontSize: 40,
        textAlign: 'center',
        margin: 10,
        color: 'darkgreen',
    },
    credits: {
        fontSize: 20,
        textAlign: 'center',
        margin: 5,
        color: 'darkgreen',
    }
});

AppRegistry.registerComponent('About', () => About);