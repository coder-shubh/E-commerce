import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, StatusBar, Modal, ActivityIndicator, Alert } from "react-native";
import { getApiCall } from "../utils/ApiHandler";
import Globals from "../utils/Globals";
import IconN from 'react-native-vector-icons/AntDesign';
import StackCustomHeader from "../Component/StackCustomHeader";




export default function Product({ route, navigation }) {

    const [modalVisible, setModalVisible] = useState(false);
    const [data, setdata] = useState([]);
    const [Home, setHome] = useState([]);
    const [Inventory, setInventory] = useState([]);

    const { item } = route.params;


    useEffect(() => {
        InventoryApi(item);
    }, []);


    React.useLayoutEffect(() => {
        navigation.setOptions({
            header: () => <StackCustomHeader title={item} />
        });
    }, [navigation]);


    async function InventoryApi(item) {
        console.log("#@#$#$#$#$", item)
        try {
            setModalVisible(true);

            let res = await getApiCall({ url: "products/category/" + item })

            if (Array.isArray(res) && res.length > 0) {
            }
            setdata(res.products);
            console.log('#$#$#', res)
        }
        catch (e) {
            console.log(e);
        }
        finally {
            setModalVisible(false);
        }
    }



    const renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity style={styles.itemCont} onPress={() => { navigation.navigate('ItemView', { items: item, title: item.title }) }} >
                <View style={styles.imageThumbnail}>
                    <Image style={{ height: '100%', width: '100%', resizeMode: 'center' }} source={{ uri: item.thumbnail }} />
                </View>
                <View style={styles.itemDetail}>
                    <Text style={{ color: '#000', fontSize: 15, fontFamily: 'Sen-Bold', padding: 3 }}>{item.title}</Text>
                    <Text style={{ fontSize: 14, padding: 3, color: '#808080', fontFamily: 'Sen-Bold' }}>Stock : {item.stock}</Text>
                    <Text style={styles.txtprice}>Total Price : ₹{item.price}</Text>
                    <Text style={styles.txtprice}>discount Percentage : ₹{item.discountPercentage}</Text>
                </View>
            </TouchableOpacity>
        )
    }








    return (
        <View style={styles.Container}>
            <StatusBar barStyle="dark-content" backgroundColor='#fff' />
            <Modal
                transparent={true}
                visible={modalVisible}>
                <View style={styles.modal}>
                    <View style={{ backgroundColor: "#fff", padding: 10, borderRadius: 5, width: "80%", alignItems: "center" }}>
                        <Text style={styles.progressHeader}>Please wait...</Text>
                        <ActivityIndicator size="large" />
                    </View>
                </View>
            </Modal>


            {data.length > 0 ? (
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={1}
                />
            ) : (
                <View style={styles.noDataContainer}>
                    <Text style={styles.noDataText}>No data available</Text>
                </View>
            )}

        </View>
    );
}
const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    itemDetail: {
        borderRadius: 3,
        justifyContent: 'center',
        padding: 10,
        width: '70%'
    },
    imageThumbnail: {
        justifyContent: 'center',
        alignSelf: 'center',
        height: '80%',
        width: '32%',
        borderRadius: 4,
    },
    modal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    itemCont: {
        flexDirection: 'row',
        height: 170,
        elevation: 10,
        padding: 10,
        marginTop: 1,
        borderRadius: 10,
        backgroundColor: '#fff',
        margin: 5
    },
    txtprice: {
        color: Globals.COLOR.defaultColor,
        fontSize: 13,
        fontFamily: 'Sen-Bold',
        padding: 3
    }

});
