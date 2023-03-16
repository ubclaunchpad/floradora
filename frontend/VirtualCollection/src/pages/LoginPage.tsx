import { Pressable, StyleSheet, Text, View } from 'react-native';
import { ButtonStyle, Colors, Spacings, Texts } from '../styles';

import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { useEffect, useState } from 'react';

WebBrowser.maybeCompleteAuthSession();

export default function LoginPage() {
    const [token, setToken] = useState('');
    const [userInfo, setUserInfo] = useState(null);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [request, response, promptAsync] = Google.useAuthRequest({
        expoClientId: '485163119792-dbqlktvmh8046q5jaef2ton1riuvq9hs',
        iosClientId: '485163119792-dbqlktvmh8046q5jaef2ton1riuvq9hs.apps.googleusercontent.com',
        androidClientId: '485163119792-odmfe32gi9mgrib6qc953ctvgoq6p0kd.apps.googleusercontent.com',
        redirectUri: 'com.app.floradora:/oauthredirect',
    });

    useEffect(() => {
        if (response?.type === 'success') {
            const token = response.authentication?.accessToken;
            if (token) {
                setToken(token);
                getUserInfo();
            }
        }
    }, [response, token]);

    const getUserInfo = async () => {
        try {
            const response = await fetch('https://www.googleapis.com/userinfo/v2/me', {
                headers: { Authorization: `Bearer ${token}` },
            });

            const user = await response.json();
            setUserInfo(user);
        } catch (error) {
            console.log(`Error on sign-in: ${error}`);
        }
        console.log(userInfo);
    };

    return (
        <View style={styles.pageContainer}>
            <View style={styles.circle}></View>
            <View style={styles.titleSpacing}>
                <Text style={styles.titleText}>Virtual Collection</Text>
                <Text style={styles.subheadingText}>Explore with us</Text>
            </View>
            <Pressable style={styles.loginButton} onPress={() => promptAsync()}>
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
