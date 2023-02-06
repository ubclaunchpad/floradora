import { Button, Text, View } from 'react-native';
import { AppStackProps } from './types';

export default function HomePage({ navigation }: AppStackProps) {
    return (
        <View>
            <Text>Hello</Text>
            <Button title="Camera" onPress={() => navigation.navigate('Camera')} />
            <Button title="Collection" onPress={() => navigation.navigate('Collection')} />
            <Button title="Logout" onPress={() => navigation.navigate('Login')} />
        </View>
    );
}
