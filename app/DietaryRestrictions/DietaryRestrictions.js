import React from 'react';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';
import { CheckBox } from 'react-native-elements'

import {
    saveVegan,
    getVegan,
    createVegan,

    saveGlutenFree,
    getGlutenFree,
    createGlutenFree,

    saveLactoOvoVegetarian,
    getLactoOvoVegetarian,
    createLactoOvoVegetarian,

    saveLactoVegetarian,
    getLactoVegetarian,
    createLactoVegetarian,

    saveOvoVegetarian,
    getOvoVegetarian,
    createOvoVegetarian
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
        this.saveVegan = saveVegan.bind(this);
        this.getVegan = getVegan.bind(this);
        this.createVegan = createVegan.bind(this);

        this.saveGlutenFree = saveGlutenFree.bind(this);
        this.getGlutenFree = getGlutenFree.bind(this);
        this.createGlutenFree = createGlutenFree.bind(this);

        this.saveLactoOvoVegetarian = saveLactoOvoVegetarian.bind(this);
        this.getLactoOvoVegetarian = getLactoOvoVegetarian.bind(this);
        this.createLactoOvoVegetarian = createLactoOvoVegetarian.bind(this);

        this.saveLactoVegetarian = saveLactoVegetarian.bind(this);
        this.getLactoVegetarian = getLactoVegetarian.bind(this);
        this.createLactoVegetarian = createLactoVegetarian.bind(this);

        this.saveOvoVegetarian = saveOvoVegetarian.bind(this);
        this.getOvoVegetarian = getOvoVegetarian.bind(this);
        this.createOvoVegetarian = createOvoVegetarian.bind(this);
    }

    componentDidMount() {

        this.getVegan();
        this.getGlutenFree();
        this.getLactoOvoVegetarian();
        this.getLactoVegetarian();
        this.getOvoVegetarian();

    }

    render() {
        return (
            <View>
                <Text>Edit Dietary Restrictions</Text>
                <CheckBox
                    title='Vegan'
                    center
                    onPress={() => this.saveVegan()}
                    checked={this.state.isVegan}
                />
                <CheckBox
                    title='Gluten-Free'
                    center
                    onPress={() => this.saveGlutenFree()}
                    checked={this.state.isGlutenFree}
                />
                <CheckBox
                    title='Lacto-Ovo Vegetarian'
                    center
                    onPress={() => this.saveLactoOvoVegetarian()}
                    checked={this.state.isLactoOvoVegetarian}
                />
                <CheckBox
                    title='Lacto Vegetarian'
                    center
                    onPress={() => this.saveLactoVegetarian()}
                    checked={this.state.isLactoVegetarian}
                />
                <CheckBox
                    title='Ovo Vegetarian'
                    center
                    onPress={() => this.saveOvoVegetarian()}
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