import React from 'react';
import { AppRegistry, StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import { Camera, Permissions } from 'expo';


export default class CameraPicture extends React.Component {

    constructor(props) {
        super(props)
    }

    state = {
        hasCameraPermission: null,
        type: Camera.Constants.Type.back,
    };

    async componentDidMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
    }

    snap = async () => {
        if (this.camera) {
            let photo = await this.camera.takePictureAsync();
            // console.log('photo:');
            // console.log(photo);

            // console.log(this.props.navigation);

            this.props.navigation.setParams({
                mainPic: photo.uri
            });

            /// / console.log('new params');
            // console.log(this.props.navigation);

            this.props.navigation.state.params.callback(photo.uri);

            this.props.navigation.pop();
            //console.log(this.props.navigation);
            // this.props.navigation.state.params.goBack({
            //     mainPic: photo.uri
            // });
            // this.props.navigation.pop();
            //console.log('nav', this.props.navigation);
        }
    };

    render() {
        const { hasCameraPermission } = this.state;
        if (hasCameraPermission === null) {
            return <View />;
        } else if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
        } else {
            return (
                <View style={{ flex: 1 }}>
                    <Camera
                        style={{ flex: 1 }}
                        type={this.state.type}
                        ref={ref => { this.camera = ref }}
                    >
                        <View
                            style={{
                                flex: 1,
                                backgroundColor: 'transparent',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                            }}>

                            <TouchableOpacity // Flip Camera
                                style={{
                                    flex: 0.1,
                                    alignSelf: 'flex-end',
                                    alignItems: 'center',
                                }}
                                onPress={() => {
                                    this.setState({
                                        type: this.state.type === Camera.Constants.Type.back
                                            ? Camera.Constants.Type.front
                                            : Camera.Constants.Type.back,
                                    });
                                }}>
                                <Text
                                    style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
                                    {' '}Flip{' '}
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity // Take Picture
                                style={{
                                    flex: 1,
                                    alignSelf: 'flex-end',
                                    alignItems: 'center',
                                }}
                                onPress={this.snap}>
                                <Text
                                    style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
                                    {' '}Take Picture{' '}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </Camera>
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
    },
    view: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    capture: {
        flex: 0,
        backgroundColor: 'steelblue',
        borderRadius: 10,
        color: 'red',
        padding: 15,
        margin: 45
    }
});

AppRegistry.registerComponent('CameraPicture', () => CameraPicture);