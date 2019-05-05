import React from 'react';
import {AppRegistry, StyleSheet, Text, View, Image} from 'react-native';

const creators = ["Adam May", "Caleb Yost", "Gregory Thomas", "Matthew Mulkeen"];

export default class About extends React.Component {

    render() {
        return (
            <View style={styles.welcome}>
                <Text style={styles.welcome}>ChefUp 2019 &reg;</Text>
                <Image
                    style={{width: 200, height: 200, alignItems: 'center'}}
                    source={require('../images/CookingBigYoshi.png')}
                />

                { // forEach doesn't work with this for some reason
                    creators.map( (name, idx) => {
                        return (<Text key={idx}>{name}</Text>);
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
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    }
});

AppRegistry.registerComponent('About', () => About);