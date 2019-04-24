import React from 'react';
import { AppRegistry, StyleSheet, Text, View, ScrollView, Alert } from 'react-native';
import { SearchBar, ListItem } from 'react-native-elements';

export default class RecipeMain extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data: [],
            search: ''
        }
    }

    componentDidMount() {

        this.fetchData();

    }

    updateSearch = search => {
        this.setState({ search });
    };

    fetchData() {

        fetch('http://blue.cs.sonoma.edu:8142/AllRecipes')
            .then((response) => response.json())
            .then((response) => {
                this.setState({
                    data: [...response]
                });
            })
            .catch((error) => {
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

    render() {

        return (
            <View style={styles.container}>
                <SearchBar
                    placeholder="Type Here..."
                    onChangeText={this.updateSearch}
                    value={this.state.search}
                />
                <Text style={styles.welcome}>Recipes</Text>
                <ScrollView>
                {
                   this.state.data.map( (l, i) => {

                       // Lowercase allows for better search results
                       let sname = l.Rname.toLowerCase();
                       let scategory = l.category.toLowerCase();
                       let s = this.state.search.toLowerCase();

                       // Search for item in list and display if found
                       let found = (sname.search(s) !== -1) || (scategory.search(s) !== -1);
                       // If search is empty display all
                       found |= this.state.search.length === 0;

                       if (found) {
                           return (
                               <ListItem
                                   style={styles.list}
                                   key={i}
                                   topDivider={true}
                                   leftAvatar={{source: {uri: 'https://media.asicdn.com/images/jpgo/25390000/25391162.jpg'}}}
                                   title={l.Rname}
                                   subtitle={l.category}
                                   rightSubtitle={"Difficulty: " + "*".repeat(l.difficulty) + "\nPrice: $$$\nTime: " + l.Rtime + ' m'}
                                   onPress={() => this.SelectedRecipe(l.Rname, l.id)}
                               />
                           );
                       }
                       return (<View></View>);
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
        //justifyContent: 'center',
        //alignItems: 'center',
        backgroundColor: 'tomato'
    },
    welcome: {
        fontSize: 25,
        color: 'firebrick',
        textAlign: 'center',
        margin: 10,
    },
    list: {
        flex: 2,
        margin: 1,
        backgroundColor: 'ivory'
    }
});

AppRegistry.registerComponent('RecipeMain', () => RecipeMain);