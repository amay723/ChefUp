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
            <View>
                <Text>Edit Dietary Restrictions</Text>
                <CheckBox
                    title='Vegan'
                    center
                    onPress={() => this.saveToken('isVegan')}
                    checked={this.state.isVegan}
                />
                <CheckBox
                    title='Gluten-Free'
                    center
                    onPress={() => this.saveToken('isGlutenFree')}
                    checked={this.state.isGlutenFree}
                />
                <CheckBox
                    title='Lacto-Ovo Vegetarian'
                    center
                    onPress={() => this.saveToken('isLactoOvoVegetarian')}
                    checked={this.state.isLactoOvoVegetarian}
                />
                <CheckBox
                    title='Lacto Vegetarian'
                    center
                    onPress={() => this.saveToken('isLactoVegetarian')}
                    checked={this.state.isLactoVegetarian}
                />
                <CheckBox
                    title='Ovo Vegetarian'
                    center
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

AppRegistry.registerComponent('DietaryRestrictions', () => DietaryRestrictions);