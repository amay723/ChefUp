import React from 'react';
import { AppRegistry, StyleSheet, Text, View, ScrollView, Alert, Image } from 'react-native';
import { SearchBar, ListItem } from 'react-native-elements';

import {
    getToken,
    createToken
} from  '../DietaryRestrictions/SetGetDietary.js'

// React likes each rendered item to have a unique key
let uniqueSeed = 0;
function nextUniqueKey() {
    return uniqueSeed += 1;
}

export default class RecipeMain extends React.Component {

    constructor() {

        super();

        this.state = {
            recipes: [],
            dietary: [],
            search: '',
            loading: true // depending on recipe load times set to true to use loading screen
        };

        // Could make this based off features returned from AsyncStorage Tokens
        //this.filters = ['Vegan', 'Gluten-free', 'Lacto-Ovo Vegetarian', 'Lacto Vegetarian', 'Ovo Vegetarian'];

        // All deals with checking currently set dietary filters
        this.getToken = getToken.bind(this);
        this.createToken = createToken.bind(this);

    }

    componentDidMount() {

        // Get dietary restrictions
        this.getToken('isVegan');
        this.getToken('isGlutenFree');
        this.getToken('isLactoOvoVegetarian');
        this.getToken('isLactoVegetarian');
        this.getToken('isOvoVegetarian');
        /* doesn't work async atm
        this.filters.map( filter => {
            this.getToken(filter);
        });
        */

        // Fetch recipe data
        this.fetchRecipes();

    }

    // If page is reloaded will force the reload screen to display instead of empty page with search bar
    componentWillUnmount() {
        this.setState({
            loading: true
        })
    }

    updateSearch = search => {
        this.setState({ search });
    };

    fetchRecipes() {
        fetch('http://blue.cs.sonoma.edu:8142/AllRecipes')
            .then((recipeData) => recipeData.json())
            .then((recipeData) => {

                this.setState({
                    recipes: [...recipeData]
                });

            })
            .then(

                fetch('http://blue.cs.sonoma.edu:8142/allDietary')
                    .then((filterData) => filterData.json())
                    .then((filterData) => {

                        this.setState({
                            dietary: [...filterData],
                            loading: false // only render the full page when we have all the data
                        });

                    })
                    .catch((error) => {
                        //console.log(error); error will be caught in below catch statement
                    })
            )
            .catch((error) => {
                console.log(error);
                Alert.alert(
                    'Database Connection Error',
                    'fetch request failed',
                    [
                        {text: 'OK', onPress: () => this.props.navigation.pop() }
                    ]
                )
            });
    }

    SelectedRecipe(recipe, id) {
        this.props.navigation.push('Recipe', {
           recipeId: id
        });
    }

    checkFilter(id, type) {

        // We find a matching item from our recipe list and our dietary filter list (item.id === id)
        // and check to see if that item has a tag that we are looking for. If the tag is not found
        // (a return of undefined) the item does not match our dietary filters

        return this.state.dietary.find( (item) => {
                return item.id === id && item.Dname === type
            }) !== undefined;

    }

    render() {

        if( this.state.loading ) {
            return (
                <View style={styles.container}>
                    <Text>Please wait while your results load</Text>
                    <Image
                        style={{
                            resizeMode: 'contain',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 50,
                            height: 50
                        }}
                        source={require('../images/loading.gif')}
                    />
                </View>
            );
        }

        return (
            <View style={styles.container}>
                <SearchBar
                    placeholder="Search Recipes..."
                    onChangeText={this.updateSearch}
                    value={this.state.search}
                />
                <Text style={styles.welcome}>Recipes
                    <Text style={{fontSize: 10}}>
                    { this.state.isVegan ? ', Vegan' : "" }
                    { this.state.isGlutenFree ? ', Gluten-Free' : "" }
                    { this.state.isLactoOvoVegetarian ? ', LactoOvoVegetarian' : "" }
                    { this.state.isLactoVegetarian ? ', LactoVegetarian' : "" }
                    { this.state.isOvoVegetarian ? ', OvoVegetarian' : "" }
                    </Text>
                </Text>
                <ScrollView>
                {
                   this.state.recipes.map( (l, i) => {

                       // Lowercase allows for better search results
                       let sname = l.Rname.toLowerCase();           // Current item Recipe Name
                       let scategory = l.category.toLowerCase();    // Current item Category
                       let s = this.state.search.toLowerCase();     // Current search term

                       // Search for item (by name and category) in list and display if found
                       let found = (sname.search(s) !== -1) || (scategory.search(s) !== -1);
                       // If search is empty display all
                       found |= this.state.search.length === 0;


                       ////////// Check all set filters to see if we should display the item //////////
                       //TODO Make this an iterable thing through this.filters
                       let showFromFilter = true;

                       if( this.state.isVegan ) {
                           showFromFilter = this.checkFilter(l.id, 'Vegan');
                       }
                       // Also add an early break out if any of the previous filters return false
                       if( showFromFilter && this.state.isGlutenFree) {
                           showFromFilter = this.checkFilter(l.id, 'Gluten-free');
                       }
                       if( showFromFilter && this.state.isLactoOvoVegetarian) {
                           showFromFilter = this.checkFilter(l.id, 'Lacto-Ovo Vegetarian');
                       }
                       if( showFromFilter && this.state.isLactoVegetarian) {
                           showFromFilter = this.checkFilter(l.id, 'Lacto Vegetarian');
                       }
                       if( showFromFilter && this.state.isOvoVegetarian) {
                           showFromFilter = this.checkFilter(l.id, 'Ovo Vegetarian');
                       }

                       if (found && showFromFilter) {
                           return (
                               <ListItem
                                   style={styles.list}
                                   key={nextUniqueKey()}
                                   topDivider={true}
                                   leftAvatar={{source: {uri: l.icon}}}
                                   title={l.Rname}
                                   subtitle={l.category}
                                   rightSubtitle={"Difficulty: " + "*".repeat(l.difficulty) + "\nPrice: $$$\nTime: " + l.Rtime + ' m'}
                                   onPress={() => this.SelectedRecipe(l.Rname, l.id)}
                               />
                           );
                       }

                   })
                }
                </ScrollView>


            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'tomato'
    },
    welcome: {
        fontSize: 25,
        backgroundColor: 'tomato'
    },
    list: {
        flex: 2,
        margin: 1,
        backgroundColor: 'ivory'
    }
});

AppRegistry.registerComponent('RecipeMain', () => RecipeMain);