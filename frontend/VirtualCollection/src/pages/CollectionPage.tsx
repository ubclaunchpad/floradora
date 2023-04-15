import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { Button, Image, Text, View } from 'react-native';
import { Float } from 'react-native/Libraries/Types/CodegenTypes';
import { AppStackProps } from './types';

export default function CollectionPage({ navigation }: AppStackProps) {
    const [selectedPicture, setSelectedPicture] = useState('');
    const [score, setScore] = useState<null | Float>(null);

    const selectPicture = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setSelectedPicture(result.assets[0].uri);
            fetchScore(result);
        }
    };

    async function fetchScore(result: ImagePicker.ImagePickerResult) {
        const score: Float = await postPic(result);
        setScore(score);
    }

    const postPic = async (pic: ImagePicker.ImagePickerResult) => {
        return pic ? 12.0 : 0.0;
    };

    return (
        <View>
            <View>
                <Text>Collection</Text>
                <Button title="Home" onPress={() => navigation.goBack()} />
                <Button title="Select Picture" onPress={() => selectPicture()} />
                {score ? <Text>The returned data: {score}</Text> : <Text>Loading...</Text>}
                {selectedPicture && (
                    <Image source={{ uri: selectedPicture }} style={{ width: 200, height: 200 }} />
                )}
            </View>
        </View>
    );
}
