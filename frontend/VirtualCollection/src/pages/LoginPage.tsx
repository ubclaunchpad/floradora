import { Pressable, StyleSheet, Text, View } from 'react-native';
import { ButtonStyle, Colors, Spacings, Texts } from '../styles';
import { AppStackProps } from './types';

export default function LoginPage({ navigation }: AppStackProps) {
    return (
        <View style={styles.pageContainer}>
            <View style={styles.circle}></View>
            <View style={styles.titleSpacing}>
                <Text style={styles.titleText}>Virtual Collection</Text>
                <Text style={styles.subheadingText}>Explore with us</Text>
            </View>
            <Pressable style={styles.loginButton} onPress={() => navigation.navigate('Home')}>
                <Text style={styles.loginButtonText}>Login with Google</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    circle: {
        height: 100,
        width: 100,
        borderRadius: 100,
        backgroundColor: 'green',
    },
    loginButton: {
        ...ButtonStyle.roundedCorners,
        ...ButtonStyle.longLength,
        ...ButtonStyle.verticalPadding,
        backgroundColor: Colors.secondary.color,
    },
    loginButtonText: {
        ...ButtonStyle.buttonText,
    },
    pageContainer: {
        ...Spacings.pageContainer,
        backgroundColor: Colors.white.color,
    },
    subheadingText: {
        ...Texts.subheadingText,
        color: Colors.primary.color,
    },
    titleText: {
        ...Texts.titleText,
    },
    titleSpacing: {
        ...Spacings.titleSpacing,
    },
});
