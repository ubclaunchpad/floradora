import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import CameraPage from './src/pages/CameraPage';
import CollectionPage from './src/pages/CollectionPage';
import HomePage from './src/pages/HomePage';
import LoginPage from './src/pages/LoginPage';
import { AppStackParamList } from './src/pages/types';

export default function App() {
    const Stack = createStackNavigator<AppStackParamList>();
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Login" component={LoginPage} />
                <Stack.Screen name="Home" component={HomePage} />
                <Stack.Screen name="Camera" component={CameraPage} />
                <Stack.Screen name="Collection" component={CollectionPage} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
