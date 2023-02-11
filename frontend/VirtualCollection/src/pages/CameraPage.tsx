import { Button, Text, TouchableOpacity, View, ViewBase } from 'react-native';
import { AppStackProps } from './types';
import React = require('react');
import { Camera, Permissions } from 'expo'; // needs to be installed but ya boi is struggling

// may use this later

interface Props{}

export default class CameraPage {
    camera?: Camera;

    state = {
        hasCameraPermission: null,
        type: Camera.ConstantsType.back,
        previewUri: undefined, 
    };

    async componentDidMount(){
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({hasCameraPermission: status == 'granted' }); // setState is complaining bc expo has not been imported
    }
    
    snap = async() => {
        if(this.camera){
            let photo = await this.camera.takePictureAsync();
            alert('PhotoTaken');
            this.setState({previewUri: photo.uri});
        }
    };
    
    render({ navigation }: AppStackProps) {
        const {hasCameraPermission} = this.state;
        if (hasCameraPermission == null){
            return < View />;
        } else if (hasCameraPermission == false){
            return( 
            <View>
                <Text> No camera access :// </Text>
            </View>
            ); 
        }

        // allows you to preciew the picture you just took
        if (this.state.previewUri){
            <View style={{ flex: 1}}>
                <Image source={{uri: this.state.previewUri}} /> 
            </View>
        } //needs props??? stack overflow says needs changes to index.js or index.d.ts

        return (
            <View>
                <Text>Camera</Text>
                <Button title="Home" onPress={() => navigation.goBack()} />
                <Button title="Snap pic" onPress={() => {this.snap}} /> 
            <Camera
                style = {{ flex: 1 }}
                type = {this.state.type}
                ref = {ref => {
                    this.camera = ref;
                }}>

                </Camera>

                <Camera style ={{ flex: 1}} type = {this.state.type}>
                    <View
                        style={{
                            flex: 1,
                            backgroundColor: 'transparent',
                            flexDirection: 'row',
                        }}>
                        <TouchableOpacity
                            style={{
                                flex: 0.1,
                                alignSelf: 'flex-end',
                                alignItems: 'center',
                            }}
                            onPress={() => {
                                this.setState((
                                    type: this.setState({
                                        type: this.state.type == Camera.Constants.Type.back
                                        ? Camera.Constants.Type.front 
                                        : Camera.Constants.Type.back,
                                    });
                            }}>
                            <Text
                                style={{ fontSize: 18, marginBottom: 10, color: 'white'}}>
                                    {' '}Flip{' '}
                                </Text>
                            </TouchableOpacity>
                        </View>
                        
                </Camera>

            </View>
        );
    }
}
