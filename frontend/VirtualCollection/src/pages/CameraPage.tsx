import { Camera, CameraType } from 'expo-camera';
import React, { useRef, useState } from 'react';
import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function App() {
    const [type, setType] = useState(CameraType.back);
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const [uri, setUri] = useState('');
    const camera = useRef<Camera>(null);

    if (!permission || !permission.granted) {
        requestPermission();
    }

    function toggleCameraType() { // todo: fix toggle button
        setType((current) => (current === CameraType.back ? CameraType.front : CameraType.back));
    }

    function snap() {
        camera.current?.takePictureAsync().then((photo) => {
            setUri(photo.uri);
        });
    }

    if (uri.length == 0) {
        return (
            <View style={{ display: 'flex' }}>
                <Camera style={{ height: '100%' }} type={type} ref={camera}>
                    <View>
                        <TouchableOpacity onPress={toggleCameraType}>
                            <Button title="Snap pic" onPress={snap} />
                            <Text>Flip Camera </Text>
                        </TouchableOpacity>
                    </View>
                </Camera>
            </View>
        );
    } else {
        return (
            <View style={{ display: 'flex' }}>
                <Image style={{ width: '100%', height: '100%' }} source={{ uri: uri }} />
            </View>
        );
    }
}
