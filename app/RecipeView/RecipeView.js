import React from 'react';
import { AppRegistry, StyleSheet, Text, View, ListView, Alert, Button } from 'react-native';


export default class RecipeView extends React.Component {

    constructor(props) {
        super(props);

        // Get ID passed from RecipeMain. If not found use default value "NO-ID"
        this.id = this.props.navigation.getParam('recipeId', 'NO-ID');

        // Initialize dataset
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.state = {
            data: ds,
            ingredients: [],
            tools: [],
            id: this.id
        };

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
                id: this.state.id
            }),
        })
            .then((response) => response.json())
            .then((response) => {
                this.setState({
                    data: this.state.data.cloneWithRows(response),
                    ingredients: [...response][0].total_ingredients.split(', '),
                    tools: [...response][0].tools.split(', ')
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

    fetchIngredients() {
        // POST request for current recipeId's info
        fetch('http://blue.cs.sonoma.edu:8142/ingredientsById', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: this.state.id
            }),
        })
            .then((response) => response.json())
            .then((response) => {
                this.setState({
                    ingredients: [...response]
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


    renderRow(item, sectionId, rowId, highlightRow) {

        const { id, Rname, category, total_ingredients, difficulty, tools, info, Rtime} = item;


        return (
            <View style={styles.container}>
                <Text style={styles.title}> {Rname}</Text>
                <Text style={styles.desctext}>{info}</Text>
                <Text style={styles.space}> </Text>
                <Text style={styles.titletext}>Total Ingredients: </Text>
                {
                    this.state.ingredients.map( (item, idx) => {
                        return (<Text key={idx} style={styles.text}>{item}</Text>);
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

        if(0) {
            return (
                <View style={styles.container}>
                    <ListView
                        dataSource={this.state.data}
                        renderRow={this.renderRow.bind(this)}

                    />

                    <Button
                        title="Show Steps"
                        color='darksalmon'
                        onPress={() => this.props.navigation.push('Steps', {
                            recipeId: this.state.id
                        })}

                    />
                </View>
            );
        }
        else {
            return (
                <View style={styles.container}>
                    <ListView
                        dataSource={this.state.data}
                        renderRow={this.renderRow.bind(this)}

                    />

                    <Button
                        title="Show Steps"
                        color='darksalmon'
                        onPress={() => this.props.navigation.push('Steps', {
                            recipeId: this.state.id
                        })}

                    />
                </View>
            );
        }
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