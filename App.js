import React from 'react';
import {StyleSheet, Text, View, Button, Image} from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";

import DetailsScreen from './app/RecipeView/RecipeMain'
import RecipeScreen from './app/RecipeView/RecipeView'
import StepScreen from './app/RecipeView/StepsView'
import AboutScreen from './app/About/About'
import DietaryScreen from './app/DietaryRestrictions/DietaryRestrictions'


class HomeScreen extends React.Component {
    render() {
        return (
            <View style={styles.container}>
              <Image
                  style={{resizeMode: 'contain'}}
                  source={require('./app/images/chefuplogov2.png')}
              />
              <Text style={styles.welcome}>Welcome to Chef Up!</Text>
              <Button
                  title = "Show Recipes"
                  color = 'darksalmon'
                  onPress={() => this.props.navigation.push('Details')}
              />
                <Text style={styles.space}> </Text>
                <Button
                    title = "Edit Dietary Preferences"
                    color = 'darksalmon'
                    onPress={() => this.props.navigation.push('Dietary')}
                />
                <Text style={styles.space}> </Text>
              <Button
                  title = "About Us"
                  color = 'darksalmon'
                  onPress={() => this.props.navigation.push('About')}
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
        color: 'firebrick',
        fontSize: 25,
        textAlign: 'center',
        fontWeight: 'bold',
        margin: 35
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5
    },
    space: {
        textAlign:'center',
        margin: .5
    }
});

// Put all Navigatable screens into the navigator
const AppNavigator = createStackNavigator(
    {
        Home: HomeScreen,
        Details: DetailsScreen,
        Recipe: RecipeScreen,
        About: AboutScreen,
        Dietary: DietaryScreen,
        Steps: StepScreen
    },
    {
        initialRouteName: "Home"
    }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
    render() {
        return <AppContainer />;
    }
}