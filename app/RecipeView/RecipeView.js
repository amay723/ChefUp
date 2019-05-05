import React from 'react';
import { AppRegistry, StyleSheet, Text, View, ScrollView, Alert, Button } from 'react-native';


export default class RecipeView extends React.Component {

    constructor(props) {
        super(props);

        // Get ID passed from RecipeMain. If not found use default value "NO-ID"
        this.id = this.props.navigation.getParam('recipeId', 'NO-ID');

        this.state = {
            data: [],
            ingredients: [],
            tools: [],
            extra: false
        };

        this.renderData = this.renderData.bind(this);

    }

    componentDidMount() {

        this.fetchData();

    }

    fetchData() {

        // POST request for current recipeId's info
        fetch('http://blue.cs.sonoma.edu:8142/recipeById', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: this.id
            }),
        })
            .then((response) => response.json())
            .then((response) => {
                this.setState({
                    data: [...response],
                    ingredients: [...response][0].total_ingredients.split(', '),
                    tools: [...response][0].tools.split(', ')
                });
            })
            .then( this.fetchIngredients() )
            .catch((error) => {
            console.log('error in first');
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

    // Only for foods with extra info
    fetchIngredients() {
        // POST request for current recipeId's info
        fetch('http://blue.cs.sonoma.edu:8142/ingredientsById', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: this.id
            }),
        })
            .then((response) => response.json())
            .then((response) => {
                // If the ingredients table has an entry for this recipe, use it's additional ingredients info instead
                if(response.length > 0) {
                    this.setState({
                        ingredients: [...response],
                        extra: true
                    });
                }
            })
            .catch((error) => {
                console.log('error in second');
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


    renderData(data, idx) {

        const { id, Rname, category, total_ingredients, difficulty, tools, info, Rtime} = data;

        return (
            <View key={idx} style={styles.container}>
                <Text style={styles.title}> {Rname}</Text>
                <Text style={styles.desctext}>{info}</Text>
                <Text style={styles.space}> </Text>
                <Text style={styles.titletext}>Total Ingredients: </Text>
                {
                    this.state.ingredients.map( (item, idx) => {
                        return (<Text key={idx} style={styles.text}>{ this.state.extra ? item.food + ': ' + item.size + ' ' + item.unit : item}</Text>);
                    })
                }
                <Text style={styles.space}> </Text>
                <Text style={styles.titletext}>Tools: </Text>
                {
                    this.state.tools.map( (item, idx) => {
                        return (<Text key={idx} style={styles.text}>{item}</Text>);
                    })
                }
                <Text style={styles.space}> </Text>
                <Text style={styles.text}>Difficulty: {difficulty} </Text>
                <Text style={styles.space}> </Text>
                <Text style={styles.text}>Total Time: {Rtime} m</Text>
            </View>
        )
    }



    render() {

        return (
            <View style={styles.container}>

                <ScrollView>
                    {
                        this.state.data.map( (item, idx) => {
                            return this.renderData(item, idx);
                        })
                    }
                </ScrollView>

                <Button
                    title="Show Steps"
                    color='darksalmon'
                    onPress={() => this.props.navigation.push('Steps', {
                        recipeId: this.id
                    })}

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
        backgroundColor: 'tomato',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    title: {
        flex: 1,
        fontSize: 25,
        alignItems: 'center',
        fontWeight: 'bold',
        color: 'firebrick',
    },
    titletext: {
        fontSize: 22,
        margin: 2,
        color: 'papayawhip',
    },
    text: {
        fontSize: 20,
        margin: 2,
        color: 'moccasin',
    },
    desctext: {
        fontSize: 15,
        margin: 2,
        color: 'moccasin',
    },
    space: {
        textAlign:'center',
        margin: .5
    }
});

AppRegistry.registerComponent('RecipeView', () => RecipeView);