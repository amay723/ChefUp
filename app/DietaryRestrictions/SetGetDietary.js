import { AsyncStorage } from 'react-native';

// NOTE, functions cannot use arrow function notation because binding from external classes
// (like in DietaryRestrictions and RecipeMain) is not allowed for arrow functions

// All Vegan functions
export let saveVegan = function() {

    let items = {
        isVegan: !this.state.isVegan
    };

    AsyncStorage.setItem('isVegan', JSON.stringify(items));
    this.setState({
        isVegan: !this.state.isVegan
    });
};

export let getVegan = async function() {
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

export let createVegan = async function() {

    let items = {
        isVegan: false
    };

    await AsyncStorage.setItem('isVegan', JSON.stringify(items));
    this.setState({
        isVegan: false
    });
};

// All Gluten Free functions
export let saveGlutenFree = function () {

    let items = {
        isGlutenFree: !this.state.isGlutenFree
    };

    AsyncStorage.setItem('isGlutenFree', JSON.stringify(items));
    this.setState({
        isGlutenFree: !this.state.isGlutenFree
    });
};

export let getGlutenFree = async function() {
    let storageGlutenFree= await AsyncStorage.getItem('isGlutenFree');

    if( storageGlutenFree === null ) {
        console.log('no gluten free found, creating new data');
        this.createGlutenFree();
    }

    let newV = JSON.parse(storageGlutenFree);

    this.setState({
        isGlutenFree: newV.isGlutenFree
    });
};

export let createGlutenFree = async function () {

    let items = {
        isGlutenFree: false
    };

    await AsyncStorage.setItem('isGlutenFree', JSON.stringify(items));
    this.setState({
        isGlutenFree: false
    });
};

// All Lacto-Ovo Vegetarian functions
export let saveLactoOvoVegetarian = function() {

    let items = {
        isLactoOvoVegetarian: !this.state.isLactoOvoVegetarian
    };

    AsyncStorage.setItem('isLactoOvoVegetarian', JSON.stringify(items));
    this.setState({
        isLactoOvoVegetarian: !this.state.isLactoOvoVegetarian
    });
};

export let getLactoOvoVegetarian = async function() {
    let storageLactoOvoVegetarian= await AsyncStorage.getItem('isLactoOvoVegetarian');

    if( storageLactoOvoVegetarian === null ) {
        console.log('no lacto-ovo vegetarian found, creating new data');
        this.createLactoOvoVegetarian();
    }

    let newV = JSON.parse(storageLactoOvoVegetarian);

    this.setState({
        isLactoOvoVegetarian: newV.isLactoOvoVegetarian
    });
};

export let createLactoOvoVegetarian = async function() {

    let items = {
        isLactoOvoVegetarian: false
    };

    await AsyncStorage.setItem('isLactoOvoVegetarian', JSON.stringify(items));
    this.setState({
        isLactoOvoVegetarian: false
    });
};

// All Lacto Vegetarian functions
export let saveLactoVegetarian = function() {

    let items = {
        isLactoVegetarian: !this.state.isLactoVegetarian
    };

    AsyncStorage.setItem('isLactoVegetarian', JSON.stringify(items));
    this.setState({
        isLactoVegetarian: !this.state.isLactoVegetarian
    });
};

export let getLactoVegetarian = async function() {
    let storageLactoVegetarian= await AsyncStorage.getItem('isLactoVegetarian');

    if( storageLactoVegetarian === null ) {
        console.log('no lacto vegetarian found, creating new data');
        this.createLactoVegetarian();
    }

    let newV = JSON.parse(storageLactoVegetarian);

    this.setState({
        isLactoVegetarian: newV.isLactoVegetarian
    });
};

export let createLactoVegetarian = async function() {

    let items = {
        isLactoVegetarian: false
    };

    await AsyncStorage.setItem('isLactoVegetarian', JSON.stringify(items));
    this.setState({
        isLactoVegetarian: false
    });
};

// All Ovo Vegetarian functions
export let saveOvoVegetarian = function() {

    let items = {
        isOvoVegetarian: !this.state.isOvoVegetarian
    };

    AsyncStorage.setItem('isOvoVegetarian', JSON.stringify(items));
    this.setState({
        isOvoVegetarian: !this.state.isOvoVegetarian
    });
};

export let getOvoVegetarian = async function() {
    let storageOvoVegetarian= await AsyncStorage.getItem('isOvoVegetarian');

    if( storageOvoVegetarian === null ) {
        console.log('no ovo vegetarian found, creating new data');
        this.createOvoVegetarian();
    }

    let newV = JSON.parse(storageOvoVegetarian);

    this.setState({
        isOvoVegetarian: newV.isOvoVegetarian
    });
};

export let createOvoVegetarian = async function() {

    let items = {
        isOvoVegetarian: false
    };

    await AsyncStorage.setItem('isOvoVegetarian', JSON.stringify(items));
    this.setState({
        isOvoVegetarian: false
    });
};