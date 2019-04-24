import React from 'react';
import { AppRegistry, StyleSheet, Text, View, AsyncStorage } from 'react-native';
import { CheckBox } from 'react-native-elements'


export default class DietaryRestrictions extends React.Component {

    constructor() {
        super();

        this.state = {
            isVegan: false
        }
    }

    componentDidMount() {

        this.getVegan();

    }

    saveVegan = ()=> {

        let items = {
            isVegan: !this.state.isVegan
        };

        AsyncStorage.setItem('isVegan', JSON.stringify(items));
        this.setState({
            isVegan: !this.state.isVegan
        });
    };

    getVegan = async() => {
        let storageVegan = await AsyncStorage.getItem('isVegan');

        if( storageVegan === null ) {
            console.log('no vegan found, creating new data');
            this.createVegan();
        }

        let newV = JSON.parse(storageVegan);

        this.setState({
            isVegan: newV.isVegan
        });
    };

    createVegan = ()=> {

        let items = {
            isVegan: false
        };

        AsyncStorage.setItem('isVegan', JSON.stringify(items));
        this.setState({
            isVegan: false
        });
    };
/*
    async getVegan() {
        try {
            const value = await AsyncStorage.getItem('isVegan');
            console.log('vegan value: ' + value);
            this.setState({isVegan: value ? true : false});
        } catch (error) {
            console.log("Error retrieving data" + error);
        }
    }

    async saveVegan(value) {
        try {
            await AsyncStorage.setItem('isVegan', value);
        } catch (error) {
            console.log("Error saving data" + error);
        }
    }
    */

    veganCheck() {
        //this.saveVegan(!this.state.isVegan);
        this.setState({
            isVegan: !this.state.isVegan
        });
    }

    render() {
        return (
            <View>
                <Text>Inside Dietary Restrictions</Text>
                <CheckBox
                    title='Vegan'
                    center
                    onPress={() => this.saveVegan()}
                    checked={this.state.isVegan}
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