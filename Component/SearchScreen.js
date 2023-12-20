import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, StyleSheet, TextInput, FlatList, Modal, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import Globals from "../utils/Globals";
import Icon from 'react-native-vector-icons/AntDesign';
import { getApiCall } from "../utils/ApiHandler";
import { useDispatch } from "react-redux";
import { addMyProduct } from "../new_Redux/MyProductSlice";


export default function SearchScreen({ navigation }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [filteredData, setFilteredData] = useState([]);
    const [data, setData] = useState([]);
    const [text, setText] = useState('');



    useEffect(() => {
        CategoryApi()
    }, []);

    const BindData = (item) => {
        filteredData.map(item => {
        });
        navigation.navigate('ItemView', { items: item, title: item.title })
    }




    useEffect(() => {
        searchItem();

    }, [text]);


    const searchItem = () => {
        if (text) {
            const newData = data.filter((item) => {
                const itemData = item.title.toLowerCase();
                const textData = text.toLowerCase();
                return itemData.indexOf(textData) > -1;
            });
            setFilteredData(newData);
        } else {
        }
    };



    async function CategoryApi() {
        try {
            setModalVisible(true);

            let res = await getApiCall({ url: "products" })

            if (Array.isArray(res) && res.length > 0) {
            }
            setData(res.products);

            console.log(res.products)
        }
        catch (e) {
            alert(e)
        }
        finally {
            setModalVisible(false);
        }
    }



    return (
        <View style={styles.Container}>
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
            <SafeAreaView style={styles.input}>
                <Icon style={styles.searchIcon} name="search1" size={20} color="#000" />
                <TextInput style={{ width: '100%', color: '#808080' }} placeholder='Search for Product' autoFocus={true} value={text} onChangeText={setText} placeholderTextColor={'#808080'} />
            </SafeAreaView>
            {filteredData.length != null &&
                <FlatList
                    data={filteredData}
                    renderItem={({ item }) =>
                        <TouchableOpacity style={styles.itemCont} activeOpacity={.5} onPress={() => { BindData(item) }} >
                            <View style={styles.imageThumbnail}>
                                <Image style={{ height: '100%', width: '100%', resizeMode: 'center' }} source={{ uri: item.thumbnail }} />
                            </View>
                            <View style={styles.itemDetail}>
                                <Text style={{ color: '#000', fontSize: 15, fontWeight: 'bold', padding: 3 }}>{item.title}</Text>
                                <Text style={{ fontSize: 14, fontWeight: 'bold', padding: 3 }}>Stock : {item.stock}</Text>
                                <Text style={styles.txtprice}>Total Price : {item.price}</Text>

                            </View>
                        </TouchableOpacity>
                    }
                    keyExtractor={index => index.toString()} />
            }

        </View>
    );
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: '#f6f3ed'
    },
    input: {
        height: 50,
        margin: 8,
        borderWidth: 1,
        borderRadius: 15,
        backgroundColor: '#fff',
        borderColor: Globals.COLOR.defaultColor,
        flexDirection: "row",
        width: '90%',
        alignSelf: "center"
    },
    searchIcon: {
        justifyContent: "center",
        alignSelf: "center",
        padding: 10

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
        width: '94%',
        height: 150,
        backgroundColor: '#fff',
        alignSelf: "center",
        marginTop: 10,
        borderRadius: 10,
        elevation: 1,
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 10
    },
    txtprice: {
        color: Globals.COLOR.defaultColor,
        fontSize: 13,
        fontWeight: 'bold',
        padding: 3
    }

});