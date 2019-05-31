import React from 'react';
import {StyleSheet, Text, View, Button, Image} from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";

import DetailsScreen from './app/RecipeView/RecipeMain'
import RecipeScreen from './app/RecipeView/RecipeView'
import StepScreen from './app/RecipeView/StepsView'
import AboutScreen from './app/About/About'
import DietaryScreen from './app/DietaryRestrictions/DietaryRestrictions'

import CameraPictureScreen from './app/AddRecipe/CameraPicture'
import CameraRecordScreen from './app/AddRecipe/CameraRecord'
import AddRecipeScreen from './app/AddRecipe/AddRecipe'

class HomeScreen extends React.Component {
    render() {
        return (
            <View style={styles.container}>
              <Image
                  style={{resizeMode: 'contain'}}
                  style={{width: 300, height: 300, alignItems: 'center'}}
                  source={require('./app/images/ChefUpLogo.png')}
              />
              <Text style={styles.welcome}>Welcome!</Text>
              <Button
                  title = "Show Recipes"
                  color = 'darkseagreen'
                  onPress={() => this.props.navigation.push('Details')}
              />
                <Text style={styles.space}> </Text>
                <Button
                    title = "Edit Dietary Preferences"
                    color = 'darkseagreen'
                    onPress={() => this.props.navigation.push('Dietary')}
                />
                <Text style={styles.space}> </Text>
              <Button
                  title = "About Us"
                  color = 'darkseagreen'
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
        backgroundColor: 'honeydew',
    },
    welcome: {
        color: 'darkgreen',
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

// Put all Navigation screens into the navigator
const AppNavigator = createStackNavigator(
    {
        Home: HomeScreen,
        Details: DetailsScreen,
        Recipe: RecipeScreen,
        About: AboutScreen,
        Dietary: DietaryScreen,
        Steps: StepScreen,
        CameraPicture: CameraPictureScreen,
        AddRecipe: AddRecipeScreen,
        CameraRecord: CameraRecordScreen
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