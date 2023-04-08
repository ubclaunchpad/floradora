import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef, useState } from 'react';
import { Button, Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';

export default function CameraPage() {
    // Init and set permission variables
    const cameraRef = useRef<Camera>(null);
    const [hasCameraPermission, setHasCameraPermission] = useState(false);
    const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState(false);

    type Photo = { uri: string }; // exists to stop photo from complaining
    const [photo, setPhoto] = useState<Photo | undefined>();

    // Ask permission before starting
    useEffect(() => {
        (async () => {
            const cameraPermission = await Camera.requestCameraPermissionsAsync();
            const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
            setHasCameraPermission(cameraPermission.status == 'granted');
            setHasMediaLibraryPermission(mediaLibraryPermission.status === 'granted');
        })();
    }, []);

    // Prompt enabling permission
    if (hasCameraPermission === false || hasCameraPermission === undefined) {
        return <Text>Requesting permissions...</Text>;
    }

    // Camera UI
    const takePic = async () => {
        if (cameraRef.current) {
            const options = {
                quality: 1,
                base64: true,
                exif: false,
            };
            (cameraRef.current as Camera)
                .takePictureAsync(options)
                .then((photo) => setPhoto(photo));
        }
    };

    // Save and view photo
    if (photo) {
        const savePhoto = () => {
            // Can save photo
            MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
                setPhoto(undefined); // Discards photo after saved
            });
        };

        return (
            <SafeAreaView style={styles.container}>
                <Image style={styles.preview} source={{ uri: photo.uri }} />
                {hasMediaLibraryPermission ? (
                    <Button title="Save" onPress={savePhoto} />
                ) : undefined}
                <Button title="Discard" onPress={() => setPhoto(undefined)} />
            </SafeAreaView>
        );
    }

    return (
        <Camera style={styles.container} ref={cameraRef}>
            <View style={styles.buttonContainer}>
                <Button title="Snap a Picture" onPress={takePic} />
            </View>
            <StatusBar style="auto" />
        </Camera>
    );
}

// Style guideline
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    buttonContainer: {
        backgroundColor: '#ffff',
        alignSelf: 'flex-end',
    },

    preview: {
        alignSelf: 'stretch',
        flex: 1,
    },
});
