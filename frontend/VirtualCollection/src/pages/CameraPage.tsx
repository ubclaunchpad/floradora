import { Camera, CameraType } from 'expo-camera';
import { StatusBar } from 'expo-status-bar';
import React, { useRef, useState, useEffect } from 'react';
import * as MediaLibrary from 'expo-media-library';
import { Button, Image, StyleSheet, Text, View, SafeAreaView } from 'react-native';

export default function App() {
    //init and set permission variables
    let cameraRef = useRef<Camera>(null);
    const [hasCameraPermission, setHasCameraPermission] = useState(false);              // inits as false to be reset later on as true
    const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState(false);  // won't work without being set w false first
    const [permission, requestPermission] = Camera.useCameraPermissions();              // from the beforetimes
    type Photo = { uri: string };  // exists to stop photo from complaining
    const [photo, setPhoto] = useState<Photo | undefined>(); // tried to do useState() but would not work???
    const [type, setType] = useState(CameraType.back); // to change to back cam
    
    //ask permission before starting
    useEffect(() => {
        (async () => {
            const cameraPermission = await Camera.requestCameraPermissionsAsync();
            const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
            setHasCameraPermission(cameraPermission.status == "granted");
            setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
        })();
    }, []);
    
    // prompt enabling permission
    if (hasCameraPermission === false || hasCameraPermission === undefined){
        return <Text>Requesting permissions...</Text>
    } else if (!hasCameraPermission){
        //return <Text> Permission for camera not granted. Please change this in settings.</Text>
        requestPermission(); // requests permissions
    } 
    
    // back camera functionality (todo?)
    // const [type, setType] = useState(CameraType.back);
    // const [uri, setUri] = useState('');
    // const camera = useRef<Camera>(null); ignore this jungle

    function toggleCameraType() {
        setType((current) => (current === CameraType.back ? CameraType.front : CameraType.back));
    }

    // Camera UI
    let takePic = async () => {
        if (cameraRef.current){
        let options = {
            quality: 1,
            base64: true,
            exif: false
    };
                            //cameraRef no longer complains after typecasting
        let newPhoto = await (cameraRef.current as Camera).takePictureAsync(options); 
        setPhoto(newPhoto);
    }
};

    // save and view photo 
    if (photo){
        let savePhoto = () => { //can save photo
            MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
                setPhoto(undefined); //discards photo after saved
            });
        };
     
        return (
            <SafeAreaView style={styles.container}>
                <Image style={styles.preview} source={{ uri: "data:image/jpg" + photo }} />
                {hasMediaLibraryPermission ? <Button title="Save" onPress={savePhoto} /> : undefined }
                <Button title="Discard" onPress={() => setPhoto(undefined)} /> 
            </SafeAreaView>
        )
    }

    return (
        <Camera style = {styles.container} ref={cameraRef}> 
            <View style={styles.buttonContainer}>
                <Button title = "Snap a Picture" onPress={takePic} /> 
                <Button title = "Flip" onPress={toggleCameraType} /> 
            </View> 
            <StatusBar style="auto" />
        </Camera>
    );
}

  // style guideline
  const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    buttonContainer: {
        backgroundColor: '#ffff',
        alignSelf: 'flex-end'
    },

    preview: {
        alignSelf: 'stretch',
        flex: 1
    }
});
