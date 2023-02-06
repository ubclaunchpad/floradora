import { Button, Text, View } from 'react-native';
import { AppStackProps } from './types';

export default function CollectionPage({ navigation }: AppStackProps) {
    return (
        <View>
            <Text>Collection</Text>
            <Button title="Home" onPress={() => navigation.goBack()} />
        </View>
    );
}
