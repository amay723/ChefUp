import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, View, ListView, Image} from 'react-native';

const creators = ["Adam May", "Caleb Yost", "Gregory Thomas", "Matthew Mulkeen"];

type Props = {};
export default class About extends Component<Props> {

    constructor() {
        super();

        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(['row 1', 'row 2']),
        };

        this.state = {
            names: ds.cloneWithRows(creators)
        };
    }

    renderRow(name, sectionId, rowId, hilightRow) {

        return (
            <View>
                <Text style={styles.welcome}>{name}</Text>
            </View>
        );

    }


    render() {
        return (
            <View>
                <Text style={styles.welcome}>ChefUp 2019 &reg;</Text>
                <Image
                    style={{width: 200, height: 200, alignItems: 'center'}}
                    source={require('../images/CookingBigYoshi.png')}
                />
                <ListView
                    dataSource={this.state.names}
                    renderRow={this.renderRow.bind(this)}
                />
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