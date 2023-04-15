import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { Button, Image, Text, View } from 'react-native';
import { AppStackProps } from './types';

export default function CollectionPage({ navigation }: AppStackProps) {
    const [selectedPicture, setSelectedPicture] = useState('');

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
    };

    return (
        <View>
            <Text>Collection</Text>
            <Button title="Home" onPress={() => navigation.goBack()} />
            <Button title="Select Picture" onPress={() => selectPicture()} />
            {selectedPicture && (
                <Image source={{ uri: selectedPicture }} style={{ width: 200, height: 200 }} />
            )}
        </View>
    );
}
