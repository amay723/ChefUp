import React from 'react';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';
import { CheckBox } from 'react-native-elements'

import {
    saveToken,
    getToken,
    createToken
} from  './SetGetDietary.js'

export default class DietaryRestrictions extends React.Component {

    constructor() {
        super();

        this.state = {
            isVegan: false,
            isGlutenFree: false,
            isLactoOvoVegetarian: false,
            isLactoVegetarian: false,
            isOvoVegetarian: false
        };

        // All deals with checking currently set dietary filters
        this.saveToken = saveToken.bind(this);
        this.getToken = getToken.bind(this);
        this.createToken = createToken.bind(this);

    }

    componentDidMount() {

        this.getToken('isVegan');
        this.getToken('isGlutenFree');
        this.getToken('isLactoOvoVegetarian');
        this.getToken('isLactoVegetarian');
        this.getToken('isOvoVegetarian');

    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>Edit Dietary Restrictions</Text>
                <CheckBox
                    title='Vegan'
                    center
                    checkedColor = 'red'
                    onPress={() => this.saveToken('isVegan')}
                    checked={this.state.isVegan}
                />
                <CheckBox
                    title='Gluten-Free'
                    center
                    checkedColor = 'red'
                    onPress={() => this.saveToken('isGlutenFree')}
                    checked={this.state.isGlutenFree}
                />
                <CheckBox
                    title='Lacto-Ovo Vegetarian'
                    center
                    checkedColor = 'red'
                    onPress={() => this.saveToken('isLactoOvoVegetarian')}
                    checked={this.state.isLactoOvoVegetarian}
                />
                <CheckBox
                    title='Lacto Vegetarian'
                    center
                    checkedColor = 'red'
                    onPress={() => this.saveToken('isLactoVegetarian')}
                    checked={this.state.isLactoVegetarian}
                />
                <CheckBox
                    title='Ovo Vegetarian'
                    center
                    checkedColor = 'red'
                    onPress={() => this.saveToken('isOvoVegetarian')}
                    checked={this.state.isOvoVegetarian}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //justifyContent: 'center',
        //alignItems: 'center',
        backgroundColor: 'honeydew',
    },
    welcome: {
        fontSize: 25,
        textAlign: 'center',
        color: 'darkgreen',
        fontWeight: 'bold',
        margin: 35,
    }
});

AppRegistry.registerComponent('DietaryRestrictions', () => DietaryRestrictions);