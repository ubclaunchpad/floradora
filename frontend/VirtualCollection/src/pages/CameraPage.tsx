import { Button, Text, View } from 'react-native';
import { AppStackProps } from './types';

export default function CameraPage({ navigation }: AppStackProps) {
    return (
        <View>
            <Text>Camera</Text>
            <Button title="Home" onPress={() => navigation.goBack()} />
        </View>
    );
}
