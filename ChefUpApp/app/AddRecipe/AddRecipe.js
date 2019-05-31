import React from 'react';
import { AppRegistry, StyleSheet, Text, View, ScrollView, Alert, Image, Button, TextInput, Picker, Dimensions, ActionSheetIOS, Platform  } from 'react-native';
import { Video, FileSystem } from 'expo'
import { CheckBox } from 'react-native-elements'

// Keyboard will not overlay selected text inputs
import KeyboardShift from './KeyboardShift';


//TODO: Merge CameraTest and CameraRecordTest into one file

//TODO: Put TextInput style into stylesheet so less repetitive code

export default class AddRecipe extends React.Component {

    //TODO: onPress method of the button gives a warning, as its value is initially undefined (since it is run before
    //TODO: componentDidMount which sets it. Find different way of doing this
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Add New Recipe',
            headerRight: (
                <Button
                    title="Submit"
                    onPress={navigation.getParam('submit')}
                />
            ),
        };
    };


    constructor(props) {

        super(props);

        // All serving sizes the user can choose from
        this.difficultyN = [1, 2, 3, 4, 5];

        this.state = {
            recipeName: "",
            recipeCategory: "",
            recipeDescription: "",
            mainPic: undefined,
            stepPics: [undefined],
            tools: [""],
            ingredients: [""],
            steps: [{info: "", timed: false, time: "0"}],
            difficulty: 1,
            time: "0"
        }


    }

    componentDidMount() {
        this.props.navigation.setParams({ submit: this._submit });
    }

    //TODO: {idempotent: true} should make it so invalid paths do not cause errors but does not. Need to look into
    //TODO: so checks for undefined won't be needed
    // When page is unloaded, delete all old cached images
    async componentWillUnmount() {

        if( this.state.mainPic !== undefined ) {
            await FileSystem.deleteAsync(this.state.mainPic, {idempotent: true});
        }

        for( let uri of this.state.stepPics) {
            if( uri !== undefined ) {
                await FileSystem.deleteAsync(uri, {idempotent: true});
            }
        }
    }


    setMainPic = uri => {
        this.setState({
            mainPic: uri
        })
    };

    setStepPic = async (uri, idx) => {

        const {stepPics} = this.state;

        if(stepPics[idx] !== undefined ) {
            await FileSystem.deleteAsync(stepPics[idx], {idempotent: true});
        }

        stepPics[idx] = uri;
        this.setState({stepPics})


    };

    changeDifficulty() {

        ActionSheetIOS.showActionSheetWithOptions(
            {
                options: [...this.difficultyN.map(String), 'Cancel'],
                cancelButtonIndex: this.difficultyN.length
            },
            (buttonIndex) => {
                // stuff for each button
                if( buttonIndex !== this.difficultyN.length ){
                    this.setState({difficulty: this.difficultyN[buttonIndex]})
                }
            }
        );

    }

    // Check to see if all fields are filled out correctly
    _submit = () => {

        const {recipeName, recipeCategory, recipeDescription, time, mainPic, stepPics, tools, ingredients, steps} = this.state;

        if( recipeName === "" ) {
            Alert.alert(
                'Form Not Completed',
                'Recipe Name not filled out',
                [
                    {text: 'OK'}
                ]
            );
        }
        else if( recipeCategory === "") {
            Alert.alert(
                'Form Not Completed',
                'Recipe Category not filled out',
                [
                    {text: 'OK'}
                ]
            );
        }
        else if( recipeDescription === "") {
            Alert.alert(
                'Form Not Completed',
                'Recipe Description not filled out',
                [
                    {text: 'OK'}
                ]
            );
        }
        else if( time === "" ) {
            Alert.alert(
                'Form Not Completed',
                'Total Time not filled out',
                [
                    {text: 'OK'}
                ]
            );
        }
        else if( mainPic === undefined) {
            Alert.alert(
                'Form Not Completed',
                'Main Picture not set',
                [
                    {text: 'OK'}
                ]
            );
        }
        else if( stepPics.includes(undefined) ) {
            Alert.alert(
                'Form Not Completed',
                'All Steps require images',
                [
                    {text: 'OK'}
                ]
            );
        }
        else if( tools.includes("") ) {
            Alert.alert(
                'Form Not Completed',
                'All tools require names',
                [
                    {text: 'OK'}
                ]
            );
        }
        else if( ingredients.includes("") ) {
            Alert.alert(
                'Form Not Completed',
                'All ingredients require names',
                [
                    {text: 'OK'}
                ]
            );
        }
        else {
            for( let step of steps) {
                if( step.info === "" ) {
                    Alert.alert(
                        'Form Not Completed',
                        'All steps require descriptions',
                        [
                            {text: 'OK'}
                        ]
                    );
                    break;
                }
                else if( step.timed && step.time === "") {
                    Alert.alert(
                        'Form Not Completed',
                        'All timed steps require times',
                        [
                            {text: 'OK'}
                        ]
                    );
                    break;
                }
            }
        }


    };

    render() {

        let screenWidth = Dimensions.get('window').width;
        let screenHeight = Dimensions.get('window').height;

        // IOS Picker does not work well in this design, so use platform specific serving size picker
        const DifficultySelector = Platform.select({
            ios: () => (<Button
                title={"Difficulty: " + this.state.difficulty}
                color='darkseagreen'
                onPress={ this.changeDifficulty.bind(this) }
            />),
            android: () => (<Picker
                selectedValue={this.state.difficulty}
                onValueChange={(itemValue, itemIndex) =>
                    this.setState({difficulty: itemValue})
                }>
                {
                    this.difficultyN.map( (item, idx) => (<Picker.Item key={idx} label={item.toString()} value={item} />))

                }
            </Picker>)
        });

        return (
            <KeyboardShift>
                {() => (
                    <View style={styles.container}>
                        <ScrollView>
                            <Text>Camera Main</Text>

                            <Text>Recipe Name</Text>
                            <TextInput
                                style={{
                                    borderWidth: 1,
                                    height: 40,
                                    width: 200,
                                    margin: 10,
                                    padding: 10,
                                    borderColor: 'gray'
                                }}
                                onChangeText={(recipeName) => {
                                    if( recipeName.length <= 15 )
                                        this.setState({recipeName})
                                }}
                                value={this.state.recipeName}
                                placeholder= "Enter Recipe Name"
                                selectTextOnFocus={true}
                                maxLength={15}
                                returnKeyType = "done"
                            />

                            <Text>Recipe Category</Text>
                            <TextInput
                                style={{
                                    borderWidth: 1,
                                    height: 40,
                                    width: 200,
                                    margin: 10,
                                    padding: 10,
                                    borderColor: 'gray'
                                }}
                                onChangeText={(recipeCategory) => this.setState({recipeCategory})}
                                value={this.state.recipeCategory}
                                placeholder = "Enter Recipe Category"
                                selectTextOnFocus={true}
                                maxLength={15}
                                returnKeyType = "done"
                            />

                            <Text>Recipe Description</Text>
                            <TextInput
                                style={{
                                    borderWidth: 1,
                                    height: 80,
                                    width: 200,
                                    margin: 10,
                                    padding: 10,
                                    borderColor: 'gray'
                                }}
                                onChangeText={(recipeDescription) => this.setState({recipeDescription})}
                                value={this.state.recipeDescription}
                                placeholder = "Enter Recipe Description"
                                selectTextOnFocus={true}
                                multiline={true}
                                numberOfLines={4}
                                maxLength={100}
                                returnKeyType = "done"
                            />

                            <DifficultySelector/>

                            <Text>Total Time (min)</Text>
                            <TextInput
                                style={{
                                    borderWidth: 1,
                                    height: 40,
                                    width: 200,
                                    margin: 5,
                                    padding: 10,
                                    borderColor: 'gray'
                                }}
                                onChangeText={ (time) => this.setState({time})}
                                value={this.state.time}
                                keyboardType = 'numeric'
                                selectTextOnFocus={true}
                                maxLength={4}
                                returnKeyType = "done"
                            />

                            <Text>Main Recipe Picture:</Text>
                            <View style={{flexDirection: 'row'}}>
                                {
                                    this.state.mainPic === undefined ?
                                        (
                                            <Image
                                                style={{width: 100, height: 100, alignItems: 'center'}}
                                                source={require('../images/no-image.jpg')}
                                            />
                                        ) :
                                        (
                                            <Image
                                                style={{width: 100, height: 100, alignItems: 'center'}}
                                                source={{uri: this.state.mainPic}}
                                            />
                                        )
                                }
                                <Button
                                    title = "Change Picture"
                                    color = 'darkseagreen'
                                    onPress={() => this.props.navigation.push('CameraPicture', {
                                        callback: this.setMainPic
                                    })}
                                />
                            </View>

                            <Text>Ingredients</Text>
                            {
                                this.state.ingredients.map( (ingredient, idx) => {
                                    return (
                                        <View key={idx} style={{flexDirection: 'row'}}>
                                            <TextInput
                                                style={{
                                                    borderWidth: 1,
                                                    height: 40,
                                                    width: 200,
                                                    margin: 5,
                                                    padding: 10,
                                                    borderColor: 'gray'
                                                }}
                                                onChangeText={ (newIngredient) => {
                                                    const {ingredients} = this.state;
                                                    ingredients[idx] = newIngredient;
                                                    this.setState({ingredients})
                                                }}
                                                value={this.state.ingredients[idx]}
                                                placeholder = "New Ingredient"
                                                selectTextOnFocus={true}
                                                maxLength={15}
                                                returnKeyType = "done"
                                            />

                                            <Button
                                                title="Remove"
                                                onPress={ () => {
                                                    const {ingredients} = this.state;
                                                    delete ingredients[idx];
                                                    this.setState({ingredients})
                                                }}
                                            />
                                        </View>
                                    )
                                })
                            }
                            <Button
                                title="Add Ingredient +"
                                onPress={ () => {
                                    const {ingredients} = this.state;
                                    ingredients.push("");
                                    this.setState({ingredients})
                                }}
                            />


                            <Text>Tools</Text>
                            {
                                this.state.tools.map( (tool, idx) => {
                                    return (
                                        <View key={idx} style={{flexDirection: 'row'}}>
                                            <TextInput
                                                style={{
                                                    borderWidth: 1,
                                                    height: 40,
                                                    width: 200,
                                                    margin: 5,
                                                    padding: 10,
                                                    borderColor: 'gray'
                                                }}
                                                onChangeText={ (newTool) => {
                                                    const {tools} = this.state;
                                                    tools[idx] = newTool;
                                                    this.setState({tools})
                                                }}
                                                value={this.state.tools[idx]}
                                                placeholder = "New Tool"
                                                selectTextOnFocus={true}
                                                maxLength={15}
                                                returnKeyType = "done"
                                            />

                                            <Button
                                                title="Remove"
                                                onPress={ () => {
                                                    const {tools} = this.state;
                                                    delete tools[idx];
                                                    this.setState({tools})
                                                }}
                                            />
                                        </View>
                                    )
                                })
                            }
                            <Button
                                title="Add Tool +"
                                onPress={ () => {
                                    const {tools} = this.state;
                                    tools.push("");
                                    this.setState({tools})
                                }}
                            />

                            <Text>Steps</Text>
                            {
                                this.state.steps.map( (step, idx) => {
                                    return (
                                        <View key={idx} >
                                            {/* Step Descriptions */}
                                            <View style={{flexDirection: 'row'}}>
                                                <TextInput
                                                    style={{
                                                        borderWidth: 1,
                                                        height: 40,
                                                        width: 200,
                                                        margin: 5,
                                                        padding: 10,
                                                        borderColor: 'gray'
                                                    }}
                                                    onChangeText={ (newStep) => {
                                                        const {steps} = this.state;
                                                        steps[idx].info = newStep;
                                                        this.setState({steps})
                                                    }}
                                                    value={this.state.steps[idx].info}
                                                    placeholder = "New Step"
                                                    selectTextOnFocus={true}
                                                    maxLength={15}
                                                    returnKeyType = "done"
                                                />

                                                <Button
                                                    title="Remove"
                                                    onPress={ async () => {

                                                        const {steps, stepPics} = this.state;

                                                        if(stepPics[idx] !== undefined ) {
                                                            await FileSystem.deleteAsync(stepPics[idx], {idempotent: true});
                                                        }

                                                        delete steps[idx];
                                                        delete stepPics[idx];
                                                        this.setState({steps, stepPics})
                                                    }}
                                                />
                                            </View>

                                            {/* Step Images/Videos */}
                                            <View style={{flexDirection: 'row'}}>
                                                {
                                                    this.state.stepPics[idx] === undefined ?
                                                        (
                                                            <Image
                                                                style={{width: 100, height: 100, alignItems: 'center'}}
                                                                source={require('../images/no-image.jpg')}
                                                            />
                                                        ) :
                                                        (
                                                            <Video
                                                                source={{ uri: this.state.stepPics[idx] }}
                                                                rate={1.0}
                                                                isMuted={true}
                                                                resizeMode="cover"
                                                                shouldPlay
                                                                isLooping
                                                                style={{ width: 100, height: 100 }}
                                                            />
                                                        )
                                                }
                                                <Button
                                                    title = "Change Picture"
                                                    color = 'darkseagreen'
                                                    onPress={() => this.props.navigation.push('CameraRecord', {
                                                        callback: this.setStepPic,
                                                        stepNo: idx
                                                    })}
                                                />
                                            </View>
                                            <CheckBox
                                                title='Step is Timed'
                                                center
                                                checkedColor = 'red'
                                                onPress={() => {
                                                    const {steps} = this.state;
                                                    steps[idx].timed = !steps[idx].timed;
                                                    this.setState({steps});
                                                }}
                                                checked={this.state.steps[idx].timed}
                                            />
                                            {
                                                this.state.steps[idx].timed ? (
                                                    <View>
                                                        <Text>Total Time (sec)</Text>
                                                        <TextInput
                                                            style={{
                                                                borderWidth: 1,
                                                                height: 40,
                                                                width: 200,
                                                                margin: 5,
                                                                padding: 10,
                                                                borderColor: 'gray'
                                                            }}
                                                            onChangeText={ (time) => {
                                                                const {steps} = this.state;
                                                                steps[idx].time = time;
                                                                this.setState({steps})
                                                            }}
                                                            value={this.state.steps[idx].time}
                                                            keyboardType = 'numeric'
                                                            selectTextOnFocus={true}
                                                            maxLength={4}
                                                            returnKeyType = "done"
                                                        />
                                                    </View>
                                                ) : (<View/>)
                                            }
                                        </View>
                                    )
                                })
                            }
                            <Button
                                title="Add Step +"
                                onPress={ () => {
                                    const {steps, stepPics} = this.state;
                                    steps.push({info: "", timed: false, time: "0"});
                                    stepPics.push(undefined);
                                    this.setState({steps, stepPics})
                                }}
                            />


                        </ScrollView>
                    </View>
                )}
            </KeyboardShift>
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
        fontSize: 25,
        backgroundColor: 'honeydew',
    },
    list: {
        flex: 2,
        margin: 1,
        backgroundColor: 'lavenderblush',
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'honeydew',
    }
});

AppRegistry.registerComponent('AddRecipe', () => AddRecipe);