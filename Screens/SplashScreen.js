import React, { useEffect } from "react";
import { View, Image, Text } from "react-native";
import LottieView from 'lottie-react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Globals from "../utils/Globals";

const LoaderAnimation = require('../assets/animation_lm5430dd.json');

export default function SplashScreen({ navigation }) {

    React.useEffect(() => {
        setTimeout(() => {
            getUser()
        }, 3000);
    }, [navigation]);




    async function getUser() {
        try {
            const token = await AsyncStorage.getItem('token');

            Globals.token = token;
            if (token != null) {
                navigation.replace('HomeScreen');
            } else {
                navigation.replace('SignUpEmail');
            }
        } catch (e) {
            console.log(e);
        }

    }


    return (
        <View style={{ flex: 1, backgroundColor: '#F0F1F5', justifyContent: "center", alignItems: "center" }}>
            <View style={{ flexDirection: "row", marginTop: '10%' }}>
                <Text style={{ color: '#0C875B', fontSize: 36, fontFamily: 'Sen-Bold' }}>E-</Text>
                <Text style={{ color: '#272727', fontSize: 36, fontFamily: 'Sen-Bold' }}>Commerce</Text>
            </View>
            <LottieView style={{
                width: 100,
                height: 100,
                backgroundColor: 'transparent',
                top: 30
            }} source={LoaderAnimation} autoPlay loop />


        </View>

    )
}