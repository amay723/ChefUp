import React from 'react';
import { AppRegistry, StyleSheet, Text, View, ScrollView, Alert, Button, Image, Picker, Dimensions, ActionSheetIOS, Platform } from 'react-native';


export default class RecipeView extends React.Component {

    constructor(props) {
        super(props);

        // Get ID passed from RecipeMain. If not found use default value "NO-ID"
        this.id = this.props.navigation.getParam('recipeId', 'NO-ID');

        // All serving sizes the user can choose from
        this.servingN = [0.5, 1, 2, 3, 4, 5];

        this.state = {
            data: [],
            ingredients: [],
            tools: [],
            extra: false,
            servingSize: 1
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

        const { id, Rname, category, total_ingredients, difficulty, tools, info, Rtime, icon} = data;

        // IOS Picker does not work well in this design, so use platform specific serving size picker
        const ServingSizeSelector = Platform.select({
            ios: () => (<Button
                title={"Current Serving Size: " + this.state.servingSize}
                color='darkseagreen'
                onPress={ this.changeServings.bind(this) }
            />),
            android: () => (<Picker
                selectedValue={this.state.servingSize}
                onValueChange={(itemValue, itemIndex) =>
                    this.setState({servingSize: itemValue})
                }>
                {
                    this.servingN.map( (item, idx) => (<Picker.Item key={idx} label={item.toString()} value={item} />))

                }
            </Picker>)
        });

        return (
            <View key={idx} style={styles.container}>
                <Text style={styles.title}> {Rname}</Text>

                <Image
                    style={{
                        resizeMode: 'contain',
                        width: 300,
                        height: 300
                    }}
                    source={{uri: icon}}
                />

                <Text style={styles.desctext}>{info}</Text>
                <Text style={styles.space}> </Text>
                <Text style={styles.titletext}>Total Ingredients: </Text>
                {
                    // should probably use item.food !== undefined instead of this.state.extra. This causes weird results sometimes
                    this.state.ingredients.map( (item, idx) => {
                        return (<Text key={idx} style={styles.text}>{ item.food !== undefined ? item.food + ': ' + parseFloat(item.size)*this.state.servingSize + ' ' + item.unit : item}</Text>);
                    })
                }

                { // Check to see if we have extra ingredient data in order to show serving changes
                    this.state.ingredients.length !== 0 && this.state.ingredients[0].food !== undefined ?
                        (<ServingSizeSelector/>) :
                        (<View></View>)
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

    changeServings() {

        ActionSheetIOS.showActionSheetWithOptions(
            {
                options: [...this.servingN.map(String), 'Cancel'],
                cancelButtonIndex: this.servingN.length
            },
            (buttonIndex) => {
                // stuff for each button
                if( buttonIndex !== this.servingN.length ){
                    this.setState({servingSize: this.servingN[buttonIndex]})
                }
            }
        );

    }


    render() {

        let screenWidth = Dimensions.get('window').width;
        // let screenHeight = Dimensions.get('window').height;

        return (
            <View style={styles.container}>

                <ScrollView style={{position: 'absolute', top: 0, bottom: 50, width: screenWidth}}>
                    {
                        this.state.data.map( (item, idx) => {
                            return this.renderData(item, idx);
                        })
                    }
                </ScrollView>


                <View style={{position: 'absolute', bottom: 0, left: 0, right: 0, height: 50, backgroundColor: 'palegoldenrod'}}>
                    <Button
                        title="Show Steps"
                        color='darkseagreen'
                        onPress={() => this.props.navigation.push('Steps', {
                            recipeId: this.id
                        })}
                    />
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'honeydew',
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
        color: 'darkgreen',
    },
    titletext: {
        fontSize: 22,
        margin: 2,
        color: 'crimson',
    },
    text: {
        fontSize: 20,
        margin: 2,
        color: 'deeppink',
    },
    desctext: {
        fontSize: 15,
        margin: 2,
        color: 'mediumseagreen',
    },
    space: {
        textAlign:'center',
        margin: .5
    }
});

AppRegistry.registerComponent('RecipeView', () => RecipeView);