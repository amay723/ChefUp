import React from 'react';
import { AppRegistry, StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';

import { Camera, Permissions } from 'expo';


export default class CameraRecord extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            hasVideoPermission: false,
            hasAudioPermission: false,
        }
        this.recordingTest = false;
    }

    state = {
        hasCameraPermission: null,
        type: Camera.Constants.Type.back,
    };

    async componentDidMount() {
        this.askPermissions()
        // const { status } = await Permissions.askAsync(Permissions.CAMERA);
        // this.setState({ hasCameraPermission: status === 'granted' });
    }

    snap = async () => {
        if (this.camera) {

            this.setState({isRecording: true});

            let photo = await this.camera.recordAsync();

            this.props.navigation.state.params.callback(photo.uri, this.props.navigation.state.params.stepNo);

            this.props.navigation.pop();
        }
    };

    askPermissions = async () => {
        const { status: status_video } = await Permissions.askAsync(Permissions.CAMERA);
        const { status: status_audio } = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
        this.setState({ hasVideoPermission: status_video === 'granted', hasAudioPermission: status_audio === 'granted' });
    };

    toggleCameraRecording = () => {
        if(this.recordingTest){
            this.camera.stopRecording()
        }else{
            // Alert.alert('start recording');
            this.recordingTest = true;
            this.camera.recordAsync().then(res => {
                // Alert.alert('stop recording');
                // this.recordingTest = false;
                //console.log(res);
                this.props.navigation.state.params.callback(res.uri, this.props.navigation.state.params.stepNo);

                this.props.navigation.pop();
            })
        }
    };

    render() {
        const { hasVideoPermission } = this.state;
        if (hasVideoPermission === null) { // this.state.hasAudioPermission && this.state.hasVideoPermission
            return <View />;
        } else if (hasVideoPermission === false) {
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
                                onPress={this.toggleCameraRecording}>
                                {/*onPress={ !this.state.isRecording ? this.snap : this.camera.stopRecording.bind(this) }>*/}
                                <Text
                                    style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
                                    {' '}Start Recording{' '}
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

AppRegistry.registerComponent('CameraRecord', () => CameraRecord);