import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type AppStackParamList = {
    Login: undefined;
    Home: undefined;
    Camera: undefined;
    Collection: undefined;
};

export type AppStackProps = NativeStackScreenProps<AppStackParamList>;
