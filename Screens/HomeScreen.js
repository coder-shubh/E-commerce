import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, TextInput, Image, FlatList, ScrollView, Dimensions, StatusBar, Modal, ActivityIndicator } from "react-native";
import Globals from "../utils/Globals";
import Icon from 'react-native-vector-icons/AntDesign';
import { getApiCall } from "../utils/ApiHandler";
import Header from "../Component/Header";


export default function HomeScreen({ navigation }) {

    const [modalVisible, setModalVisible] = useState(false);
    const [isConnected, setIsConnected] = useState(false);
    const [data, setdata] = useState([]);
    const [brand, setbrand] = useState([]);
    const [images, setImages] = useState([]);




    useEffect(() => {
        CategoryApi();
    }, []);




    async function CategoryApi() {
        try {
            setModalVisible(true);

            let res = await getApiCall({ url: "products/categories" })

            if (Array.isArray(res) && res.length > 0) {

                setdata(res);
            }


            console.log(res)

        }
        catch (e) {
            alert(e)
        }
        finally {
            setModalVisible(false);
        }
    }


    React.useLayoutEffect(() => {
        navigation.setOptions({
            header: () => <Header />
        });
    }, [navigation]);




    const renderItem = ({ item, index }) => {

        return (
            <TouchableOpacity style={styles.itemContainer} activeOpacity={0.5} onPress={() => { navigation.navigate('Product', { item: item }) }}>

                <View style={{ height: '60%', width: '80%', backgroundColor: '#fff' }}>
                    <Image style={styles.imageThumbnail} source={require('../assets/cup.png')}></Image>
                </View>
                <Text style={{ fontSize: 12, textAlign: 'center', color: '#000', fontFamily: 'Sen-Bold' }}>{item}</Text>

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
                    <View style={{ backgroundColor: "white", padding: 10, borderRadius: 5, width: "80%", alignItems: "center" }}>
                        <Text style={styles.progressHeader}>Please wait...</Text>
                        <ActivityIndicator size="large" />
                    </View>
                </View>
            </Modal>

            <ScrollView>
                <SafeAreaView style={styles.input}>
                    <Icon style={styles.searchIcon} name="search1" size={20} color="#000" />
                    <TextInput style={{ width: '100%', color: '#808080' }} placeholder='Search for Product/Service' placeholderTextColor={'#808080'} onPressIn={() => navigation.navigate('SearchScreen')}>
                    </TextInput>
                </SafeAreaView>



                <View style={{ flex: 1 }}>
                    <Text style={styles.header}>Product By Categories</Text>
                    <FlatList
                        data={data}
                        renderItem={renderItem}
                        keyExtractor={index => index.toString()}
                        numColumns={3} />
                </View>



            </ScrollView>


        </View>

    );
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
    },

    input: {
        height: 50,
        margin: 8,
        borderWidth: 1,
        borderRadius: 30,
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
    header: {
        fontSize: 17,
        fontWeight: "bold",
        margin: 10,
        color: '#696969'
    },

    slide: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'transparent',
        borderRadius: 8,
    },
    sliderImage: {
        height: '100%',
        width: '100%',
        alignSelf: 'center',
        borderRadius: 8,
        resizeMode: 'contain'
    },
    sliderContainer: {
        height: 180,
        width: '95%',
        marginTop: 5,
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 8,
    },
    imageThumbnail: {
        alignSelf: 'center',
        height: '100%',
        width: '100%',
        resizeMode: 'center'
    },
    itemcon: {
        // backgroundColor: '#4D243D',
        backgroundColor: '#fcf2f0',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        borderRadius: 10,
        margin: 3,
        height: Dimensions.get('window').width / 3, // approximate a square
    },
    itemText: {
        color: '#000000',
        fontSize: 11,
        textAlign: 'center',
        width: Dimensions.get('window').width / 3.2
    },
    modal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    itemContainer: {
        flex: 1 / 3,
        shadowRadius: 10,
        backgroundColor: '#fff',
        borderColor: '#fff',
        height: 128,
        alignItems: 'center',
        margin: 4,
        borderRadius: 15,
        elevation: 5,
        justifyContent: "center"
    },
    image: {
        flex: 1,
        resizeMode: 'cover',
    },

});