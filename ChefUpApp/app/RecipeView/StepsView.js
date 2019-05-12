import React from 'react';
import {AppRegistry, StyleSheet, Text, View, ScrollView, Alert, Button, Dimensions, Image} from 'react-native';

export default class StepsView extends React.Component {

    constructor(props) {
        super(props);

        // Get ID passed from RecipeView. If not found use default value "NO-ID"
        this.id = this.props.navigation.getParam('recipeId', 'NO-ID');

        // Current scroll position on the page
        this.xPos = 0;

        this.state = {
            data: [],
            noData: false,
            loading: true
        };

        this.timerCountdown = this.timerCountdown.bind(this);

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
                id: this.id
            }),
        })
            .then((response) => response.json())
            .then((response) => {
                this.setState({
                    data: [...response],
                    noData: response.length === 0,
                    loading: false
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

    // Keep track of current position while scrolling
    handleScroll(event) {
        this.xPos = event.nativeEvent.contentOffset.x;
    }

    timerCountdown(i) {

        let iSeconds = i + "Seconds";
        let newTime = this.state[iSeconds] -1;

        if( newTime === 0) {
            let iTimer = i + 'TimerId';
            clearInterval(this.state[iTimer]);
            Alert.alert(
                'Timer Done',
                'Step ' + i + ' is finished!',
                [
                    {text: 'OK'}
                ]
            )
        }
        this.setState({ [iSeconds]: newTime });
    }

    render() {

        let screenWidth = Dimensions.get('window').width;
        let screenHeight = Dimensions.get('window').height;

        if( this.state.loading ) {
            return (
                <View style={styles.loading}>
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

        if( this.state.noData ) {
            return (
                <View style={styles.container}>
                    <Text style={styles.header}>Sorry, no data here</Text>
                    <Image
                        style={{resizeMode: 'contain'}}
                        source={require('../images/ConstructionBigYoshi.png')}
                    />
                </View>

            );
        }

        return (
            <View style={styles.container}>
                <ScrollView
                    style={{position: 'absolute', top: 0, bottom: 50, width: screenWidth}}
                    ref={(ref) => this.myScroll = ref}  // Allows us to use scrollTo (maybe?)
                    horizontal={true}
                    pagingEnabled={true}
                    showHorizontalScrollIndicator={true}
                    onScroll={this.handleScroll.bind(this)}
                    scrollEventThrottle={8} // number between 1-16, how often to recheck position during scroll event
                >

                {
                    this.state.data.map( (item, i) => {

                        // Give each button a unique dynamic key to mark which are enabled/disabled
                        //this.state[i] = false;

                        let iSeconds = i + "Seconds";
                        let iStarted = i + "Started";
                        if( item.seconds > 0 && this.state[iStarted] === undefined) {
                            this.state[iSeconds] = item.seconds;
                            this.state[i] = false;
                        }

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
                                <Text style={styles.header}>Step Number: {item.Sorder}/{this.state.data.length}</Text>
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


                                { item.seconds > 0 ? (
                                    <View>
                                        <Text>Time Left: {this.state[iSeconds]}</Text>
                                        <Button
                                            title="Start Timer"
                                            color='darkseagreen'
                                            disabled={this.state[i]}
                                            onPress={() => {
                                                let timerId = setInterval(() => this.timerCountdown(i), 1000);
                                                console.log('timer id', timerId, 'started');
                                                let iTimer = i + 'TimerId';
                                                let iStarted = i + "Started";
                                                console.log('i=', i);
                                                this.setState({[iTimer]: timerId, [i]: true, [iStarted]: true});
                                            }}
                                        />
                                    </View>) : (<Text></Text>)
                                }


                                { // If last page we want to render done button
                                    (i === this.state.data.length - 1) ? (<Button
                                        color = 'darkseagreen'
                                        title="Done"
                                        onPress={() => this.props.navigation.pop(2)}
                                    />) : (<View></View>)

                                }
                            </View>
                        );


                    })
                }
                </ScrollView>

                <View style={styles.bottomButtons}>
                    <Button
                        color = 'darkseagreen'
                        title="Previous"
                        onPress={() => {
                            // Don't go before the first step
                            let newPos = Math.max(this.xPos - screenWidth, 0);
                            // Make sure that new position is at center of new step (prevents button spamming from making screen offset)
                            newPos -= newPos % screenWidth; //375;
                            this.xPos = newPos;
                            this.myScroll.scrollTo({x: newPos, animated: true});
                        }}
                    />

                    <Button
                        color = 'darkseagreen'
                        title="Next"
                        onPress={() => {
                            // Don't go beyond the last step
                            let newPos = Math.min(this.xPos + screenWidth, screenWidth*(this.state.data.length-1) );
                            // Make sure that new position is at center of new step
                            newPos -= newPos % screenWidth;
                            this.xPos = newPos;
                            this.myScroll.scrollTo({x: newPos, animated: true});
                        }}
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
        backgroundColor: 'honeydew'
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
    header: {
        textAlign: 'center',
        fontSize: 25,
        color: 'darkgreen',
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'honeydew',
    },
    bottomButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 50,
        backgroundColor: 'palegoldenrod'
    }
});

AppRegistry.registerComponent('StepsView', () => StepsView);