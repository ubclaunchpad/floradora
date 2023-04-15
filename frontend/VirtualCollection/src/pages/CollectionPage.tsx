import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useState } from 'react';
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
        }
        return result;
    };

    const postPic = async (pic: ImagePicker.ImagePickerResult) => {
        return pic ? 12.0 : 0.0;
    };

    useEffect(() => {
        async function fetchScore() {
            const pic = await selectPicture();
            const score = await postPic(pic);
            setScore(score);
        }
        fetchScore();
    }, []);

    return (
        <View>
            <Text>Collection</Text>
            <Button title="Home" onPress={() => navigation.goBack()} />
            <Button title="Select Picture" onPress={() => selectPicture()} />
            {score ? <p>The returned deata: {JSON.stringify(score)}</p> : <p>Loading...</p>}
            {selectedPicture && (
                <Image source={{ uri: selectedPicture }} style={{ width: 200, height: 200 }} />
            )}
        </View>
    );
}
