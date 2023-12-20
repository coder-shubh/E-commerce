import React, { useState, useEffect, useContext } from "react";
import { View, Image, Text, ToastAndroid, TouchableOpacity, StyleSheet, Modal, ActivityIndicator, FlatList, Alert } from "react-native";
import Globals from "../utils/Globals";
import Icon from 'react-native-vector-icons/AntDesign';
import { useDispatch, useSelector } from "react-redux";
import { addMyProduct, decreaseQty, increaseQty } from "../new_Redux/MyProductSlice";
import { addProductToMyCart, deleteMyCartItem, removeMyCartItem } from "../new_Redux/MyCartSlice";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import IconNm from 'react-native-vector-icons/MaterialIcons';
import StackCustomHeader from "../Component/StackCustomHeader";
import { CartContext } from '../Component/CartContext';




const Tab = createMaterialTopTabNavigator();
export default function ItemView({ route, navigation }) {

    const [data, setData] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const { items } = route.params;
    const { title } = route.params;
    const { increaseQuantity, decreaseQuantity, cartItems, addToCart } = useContext(CartContext);
    React.useLayoutEffect(() => {
        navigation.setOptions({
            header: () => <StackCustomHeader title={title} />
        });
    }, [navigation]);


    function DiscriptionScreen() {
        return (
            <View style={{ flex: 1 }}>

                <FlatList data={data} renderItem={({ item, index }) => {
                    return (
                        <View style={{ margin: 10 }}>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 5 }}>
                                <Text style={styles.speciTxt}>Brand</Text>
                                <Text style={{ color: '#000' }}>{item.brand}</Text>
                            </View>

                            <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 5 }}>
                                <Text style={styles.speciTxt}>Product</Text>
                                <Text style={{ color: '#000', textAlign: "right" }}>{item.category}</Text>
                            </View>


                            <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 5 }}>
                                <Text style={styles.speciTxt}>Rating</Text>
                                <Text style={{ color: '#000' }}>{item.rating}/5</Text>
                            </View>

                            <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 5 }}>
                                <Text style={styles.speciTxt}>Stock Status</Text>
                                {item.stock != 0 ?
                                    <Text style={{ color: 'green', fontWeight: 'bold' }}>{item.stock}</Text>
                                    :
                                    <Text style={{ color: 'red', fontWeight: 'bold' }}>Out of stock</Text>
                                }
                            </View>

                        </View>

                    );
                }}
                    keyExtractor={item => item.Id} />
            </View>
        );
    }

    function SettingsScreen() {

        return (
            <View style={{ flex: 1 }}>
                <FlatList data={data} renderItem={({ item, index }) => {
                    return (
                        <View style={{ margin: 10 }}>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 5 }}>
                                <Text style={styles.speciTxt}>Description</Text>
                                <Text style={{ color: '#000', width: '50%' }} numberOfLines={4}>{item.description}</Text>
                            </View>

                        </View>

                    );
                }}
                    keyExtractor={item => item.id} />
            </View>
        );
    }


    useEffect(() => {
        let arr = [];
        arr.push(items);
        setData(arr);
    }, [items]);

    const showToast = () => {
        ToastAndroid.show('Item is added', ToastAndroid.SHORT);
    };

    // navigation.setOptions({
    //     headerRight: () => (
    //         <View style={{ flexDirection: 'row' }}>
    //             <IconNm name='shopping-cart' size={25} color={'#000'} style={{ backgroundColor: '#fff' }}
    //                 onPress={() => { navigation.navigate('MyCart'); }} />

    //             {myCartItem.length > 0 &&
    //                 <View style={{ backgroundColor: 'red', width: 15, borderRadius: 30, height: 15, justifyContent: 'center', alignItems: 'center' }}>
    //                     <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 10 }}>{myCartItem.length}</Text>
    //                 </View>
    //             }
    //         </View>
    //     ),
    // });






    const renderItem = ({ item, index }) => {
        return (
            <View style={styles.subCont}>

                <View style={styles.imgContainer}>
                    <TouchableOpacity onPress={() => { navigation.navigate('ViewImage', { image: item.thumbnail }) }}>
                        <Image style={{ height: '100%', width: '100%' }} resizeMode="contain" source={{ uri: item.thumbnail }} />
                    </TouchableOpacity>
                </View>
                <Text style={{ fontSize: 19, color: '#000', marginLeft: 10, fontWeight: '700' }}>{item.title}</Text>
                <View style={styles.priceCont}>
                    <Text style={{ fontWeight: "bold" }}>Sale Price: ₹{item.price}</Text>
                    <Text style={{ fontWeight: "bold" }}></Text>


                    <TouchableOpacity style={styles.btnCont}
                        onPress={() => {
                            addToCart(item)
                            showToast();
                        }}>
                        <Text style={styles.btnTxt}>ADD</Text>
                        <Icon name="plus" color={'#fff'} size={15} style={{ marginLeft: '20%' }} />
                    </TouchableOpacity>




                </View>
                <View style={styles.priceCont}>
                    <Text style={{ color: Globals.COLOR.defaultColor }}>Save <Text style={{ color: '#000' }}>₹{item.ProductPrice - item.DisPrice}  </Text> <Text style={{ color: '#000', fontWeight: "bold" }}>{item.price}</Text><Text style={{ backgroundColor: Globals.COLOR.defaultColor, color: '#fff', borderRadius: 10, marginLeft: 15, fontWeight: "bold" }}>{(item.discountPercentage)}%</Text></Text>
                    {cartItems.length > 0 &&
                        <TouchableOpacity style={styles.btnCont} onPress={() => { navigation.navigate('MyCart') }}>
                            <Text style={styles.btnTxt}>CHECKOUT</Text>
                        </TouchableOpacity>
                    }
                </View>

                <View style={{ height: 350 }}>
                    <NavigationContainer independent={true}>
                        <Tab.Navigator>
                            <Tab.Screen name="SPECIFICATION" component={DiscriptionScreen}
                                screenOptions={{
                                    tabBarLabelStyle: { fontSize: 12 },
                                    tabBarStyle: { backgroundColor: 'powderblue' },
                                }} />
                            <Tab.Screen name="DESCRIPTION" component={SettingsScreen}
                                screenOptions={{
                                    tabBarLabelStyle: { fontSize: 12 },
                                    tabBarStyle: { backgroundColor: 'powderblue' },
                                }} />
                        </Tab.Navigator>
                    </NavigationContainer>
                </View>

            </View>
        )
    }



    return (
        <View style={styles.Container}>
            <FlatList data={data} renderItem={renderItem}
                keyExtractor={index => index.toString()} />

        </View>
    );

}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        justifyContent: "center",
    },
    subCont: {
        margin: 1,
        borderRadius: 10,
        backgroundColor: '#fff',
        elevation: 5
    },
    imgContainer: {
        height: 400,
        width: '100%',
        alignSelf: "center"
    },
    priceCont: {
        flexDirection: "row",
        justifyContent: "space-between",
        margin: 20,
        alignItems: "center"
    },
    btnCont: {
        backgroundColor: Globals.COLOR.defaultColor,
        height: 40,
        width: '30%',
        justifyContent: "center",
        borderRadius: 5,
        flexDirection: "row",
        alignItems: "center"
    },
    btnTxt: {
        color: '#fff',
        fontWeight: "bold",
        textAlign: "center"
    },
    speciTxt: {
        color: '#000',
        fontWeight: "bold",
        fontSize: 16
    }
});