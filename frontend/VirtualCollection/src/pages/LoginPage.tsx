import { Button, Text, View } from 'react-native';
import { AppStackProps } from './types';

export default function LoginPage({ navigation }: AppStackProps) {
    return (
        <View>
            <Text>Login</Text>
            <Button title="Home" onPress={() => navigation.navigate('Home')} />
        </View>
    );
}
