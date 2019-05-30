import { AsyncStorage } from 'react-native';

// NOTE, functions cannot use arrow function notation because binding from external classes
// (like in DietaryRestrictions and RecipeMain) is not allowed for arrow functions

//TODO implement getAll tokens

export let saveToken = async function(token) {

    let items = {};
    items[token] = !this.state[token];

    await AsyncStorage.setItem(token, JSON.stringify(items));

    this.setState({
        [token]: !this.state[token]
    });
};

export let getToken = async function(token) {

    let storageToken = await AsyncStorage.getItem(token);

    if( storageToken === null ) {
        console.log('no token', token, 'found, creating new one');
        this.createToken(token);
    }

    let newV = JSON.parse(storageToken);

    this.setState({
        [token]: newV[token]
    });

};

export let createToken = async function(token) {

    let items = {};
    items[token] = false;

    await AsyncStorage.setItem(token, JSON.stringify(items));
    this.setState({
        [token]: false
    });

};