import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Image, FlatList, TouchableOpacity, Modal, ActivityIndicator, Text, } from 'react-native';
import Globals from '../utils/Globals';
import { useDispatch, useSelector } from "react-redux";
import { addProductToMyCart, deleteMyCartItem, removeMyCartItem } from "../new_Redux/MyCartSlice";
import { decreaseQty, increaseQty } from "../new_Redux/MyProductSlice";
import { CartContext } from "../Component/CartContext";
import StackCustomHeader from "../Component/StackCustomHeader";
import OrderSuccessPopup from "../Component/OrderSuccessPopup";

export default function MyCart({ navigation }) {

    const [modalVisible, setModalVisible] = useState(false);
    const [data, setdata] = useState([]);

    const { increaseQuantity, decreaseQuantity, cartItems, addToCart, removeFromCart, clearCart } = useContext(CartContext);


    const getTotal = () => {
        let total = 0;
        cartItems.map(item => {
            total = total + cartItems.length * item.price;
        });
        return total;
    }

    React.useLayoutEffect(() => {
        navigation.setOptions({
            header: () => <StackCustomHeader title={"Cart"} />
        });
    }, [navigation]);

    const renderItem = ({ item, index }) => {
        return (

            <View style={styles.prodVw}>
                <Image style={styles.imgstyl} source={{ uri: item.thumbnail }} />
                <View style={{ padding: 10 }}>
                    <Text style={{ fontSize: 18, fontWeight: '600', color: '#000', marginLeft: 10 }}>{item.title.substring(0, 25) + '...'}</Text>
                    <Text style={{ fontWeight: '600', color: '#808080', marginLeft: 10 }}>{item.brand}</Text>
                    <Text style={{ fontSize: 16, fontWeight: '600', color: 'green', marginLeft: 10 }}>₹{item.price}</Text>
                    <View style={{ flexDirection: "row", alignItems: "center", marginTop: 5 }}>
                        <TouchableOpacity style={styles.incrBtn}
                            onPress={() => {
                                if (item.quantity > 1) {
                                    decreaseQuantity(item.id);
                                } else {
                                    removeFromCart(item.id)
                                }
                            }}>
                            <Text style={{ color: '#fff' }}>-</Text>
                        </TouchableOpacity>
                        <Text style={{ marginLeft: 10, fontWeight: '600', fontSize: 16, color: '#808080' }}>{item.quantity}</Text>

                        <TouchableOpacity style={styles.incrBtn}
                            onPress={() => {
                                increaseQuantity(item.id)
                            }}>
                            <Text style={{ color: '#fff' }}>+</Text>
                        </TouchableOpacity>

                    </View>
                </View>


            </View>
        );
    }

    const handlePlaceOrder = () => {
        clearCart();
        setModalVisible(true);

    };


    const hanDleColse = () => {
        setModalVisible(false)
        navigation.reset({
            index: 0,
            routes: [{ name: 'HomeScreen' }],
        });
    }



    return (
        <View style={styles.Container}>
            <OrderSuccessPopup
                isVisible={modalVisible}
                onClose={() => hanDleColse()}
            />
            {cartItems.length > 0 ?
                <FlatList data={cartItems} renderItem={renderItem} />
                :
                <View>
                    <Text style={{ textAlign: 'center', fontSize: 15, marginTop: 15, color: '#000' }}>There are no items in your cart.</Text>
                    <Text style={styles.btnStyle} onPress={() => navigation.navigate('HomeScreen')}>Go To Home</Text>
                </View>
            }
            <View style={{ height: 62 }}></View>



            {cartItems.length > 0 &&
                <View style={{ width: '100%', height: 60, backgroundColor: '#fff', position: "absolute", bottom: 0, flexDirection: "row", alignItems: "center", justifyContent: "space-evenly" }}>
                    <View style={{ width: '50%', justifyContent: "center", alignItems: "center", height: '100%' }}>
                        <Text style={{ fontSize: 16, fontWeight: '700', color: '#000' }}>{'added items' + '(' + cartItems.length + ')'}</Text>
                        <Text style={{ color: '#808080' }}>{'Total: ₹ ' + getTotal()}</Text>

                    </View>
                    <View style={{ width: '50%', justifyContent: "center", alignItems: "center", height: '100%' }}>
                        <TouchableOpacity style={{ width: '70%', height: 30, backgroundColor: 'green', justifyContent: "center", alignItems: "center", borderRadius: 7 }} onPress={() => { handlePlaceOrder() }}>
                            <Text style={{ color: '#fff' }}>Place Order</Text>

                        </TouchableOpacity>

                    </View>

                </View>
            }
        </View>
    );


}

const styles = StyleSheet.create({

    Container: {
        flex: 1,
        backgroundColor: '#f6f3ed'
    },
    btnStyle: {
        backgroundColor: 'black',
        margin: 10,
        color: 'white',
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 14,
        borderRadius: 5,
        height: 45,
        width: '60%',
        alignSelf: 'center'
    },
    prodVw:
    {
        width: '94%',
        height: 120,
        backgroundColor: '#fff',
        alignSelf: "center",
        marginTop: 10,
        borderRadius: 10,
        elevation: 1,
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 10
    },
    imgstyl:
    {
        width: 100,
        height: 100,
        borderRadius: 10,
        resizeMode: 'center'
    },
    incrBtn: {
        backgroundColor: 'green',
        borderRadius: 7,
        height: 27,
        justifyContent: "center",
        alignItems: "center",
        paddingLeft: 10,
        paddingRight: 10,
        marginLeft: 10
    }

})


