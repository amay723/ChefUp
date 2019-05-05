import React from 'react';
import {AppRegistry, StyleSheet, Text, View, ScrollView, Alert, Button, Dimensions, Image} from 'react-native';

const reader = new FileReader();

export default class StepsView extends React.Component {

    constructor(props) {
        super(props);

        // Get ID passed from RecipeView. If not found use default value "NO-ID"
        this.id = this.props.navigation.getParam('recipeId', 'NO-ID');


        this.state = {
            data: [],
            id: this.id
        }
    }

    componentDidMount() {

        this.fetchData();

    }

    fetchData() {

        // POST request for current recipeId's info
        fetch('http://blue.cs.sonoma.edu:8142/stepsById', {
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

    render() {

        let screenWidth = Dimensions.get('window').width;
        let screenHeight = Dimensions.get('window').height;


        return (
            <View style={styles.container}>
                <ScrollView
                    horizontal={true}
                    pagingEnabled={true}
                    showHorizontalScrollIndicator={true}
                >
                {
                    this.state.data.map( (item, i) => {

                        return (
                            <View
                                key={i}
                                style={{
                                    alignItems: 'center',
                                    flex: 1,
                                    width: screenWidth,
                                    height: screenHeight,
                                    backgroundcolor: 'tomato'
                                }}
                            >
                                <Text style={styles.header}>Step Number: {item.Sorder}</Text>
                                <Text style={styles.titletext}>Step Description: </Text>
                                <Text style={styles.text}>{item.content}</Text>

                                <Image
                                    style={{
                                        resizeMode: 'contain',
                                        width: 300,
                                        height: 300
                                    }}
                                    source={{uri: item.gif_URL}}
                                />

                                { // If last page we want to render done button
                                    (i === this.state.data.length - 1) ? (<Button
                                        color = 'darksalmon'
                                        title="Done"
                                        onPress={() => this.props.navigation.pop(2)}
                                    />) : (<View></View>)

                                }


                            </View>
                        );


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
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'tomato',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
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
    header: {
        textAlign: 'center',
        fontSize: 25,
        color: 'firebrick',
    }
});

AppRegistry.registerComponent('StepsView', () => StepsView);