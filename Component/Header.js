import React, { useContext } from "react";
import { Image, View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import Colors from "../utils/Colors";
import MaterialIcons from 'react-native-vector-icons/Entypo';
import { useNavigation } from "@react-navigation/native";
import { CartContext } from "./CartContext";




const Header = () => {
    const { increaseQuantity, decreaseQuantity, cartItems, addToCart } = useContext(CartContext);


    const navigation = useNavigation();
    return (
        <SafeAreaView style={{ backgroundColor: Colors.primary_theme_background, width: '100%', height: 50, alignSelf: "center", padding: 5 }}>
            <SafeAreaView style={{ backgroundColor: Colors.primary_theme_background, width: '100%', flexDirection: "row", justifyContent: "space-between", alignSelf: "center", }}>
                <SafeAreaView style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", left: 10 }}>

                    <TouchableOpacity style={{ width: 20, height: 20 }} activeOpacity={0.5} >

                    </TouchableOpacity>

                    <Text style={{ fontFamily: 'Sen-Bold', fontSize: 18, color: '#000', left: 10, }}>{'E-Commerce'}</Text>
                </SafeAreaView>
                <View style={{ flexDirection: 'row', width: '15%' }}>
                    <TouchableOpacity style={{ height: 25, width: '70%' }}
                        onPress={() => { navigation.navigate('MyCart') }}>
                        <Image style={{ height: '100%', width: '100%' }} resizeMode="contain" source={require('../assets/shopping-bag.png')} tintColor={'#000'} />
                    </TouchableOpacity>

                    {cartItems.length > 0 &&
                        <View style={{ backgroundColor: 'red', width: 15, borderRadius: 30, height: 15, justifyContent: 'center', alignItems: 'center', right: 10 }}>
                            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 10 }}>{cartItems.length}</Text>
                        </View>
                    }
                </View>
            </SafeAreaView>
            <Image style={{ height: 50, width: '90%', alignSelf: "center" }} resizeMode="contain" source={require('../assets/line.png')} tintColor={'#000'} />

        </SafeAreaView>
    )
}


export default Header;