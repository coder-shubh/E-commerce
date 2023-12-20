import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { Neomorph } from 'react-native-neomorph-shadows';
import { postApiCall } from '../utils/ApiHandler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from '../Component/Button';
import { TextInput } from "react-native-paper";
import Globals from '../utils/Globals';


const SignUpEmail = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setpassword] = useState('');
  const [show, setShow] = useState(true);

  const [isValidEmail, setIsValidEmail] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);


  const validateEmail = (inputEmail) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const isValid = emailRegex.test(inputEmail);
    setIsValidEmail(isValid);
    setEmail(inputEmail);

  }


  function showPassword() {
    if (show == true) {
      setShow(false);
    }
    else {
      setShow(true)
    }
  }
  async function SignUpAPI() {
    let info =
    {
      username: email,
      password: password,
    };
    console.log(info);
    try {
      setModalVisible(true);
      let res = await postApiCall({ url: 'auth/login', json: info })
      console.log(":::::::::::::::::::::", res)
      if (res.id) {
        SaveUser(res.token);
      } else {
        alert('Failed to register');
      }
      console.log(res);
    }
    catch (e) {
      alert(e)
    }
    finally {
      setModalVisible(false);
    }
  }



  async function SaveUser(token) {
    try {
      AsyncStorage.setItem('token', token.toString());
    } catch (e) {
      console.log(e);
    }
    finally {
      getUser();
    }
  }


  async function getUser() {
    setModalVisible(true);
    try {
      const token = await AsyncStorage.getItem('token');
      Globals.token = token;
      navigation.reset({
        index: 0,
        routes: [{ name: 'HomeScreen' }],
      });
    } catch (e) {
      console.log(e);
    } finally {
      setModalVisible(false);
    }

  }



  return (
    <View style={styles.Container}>


      <View style={{ flexDirection: "row", justifyContent: "space-between", margin: 10 }}>
        <Text style={styles.Label}>Log In</Text>

      </View>

      <TextInput style={{ width: '87%', color: '#000', alignSelf: "center", borderRadius: 15 }} label='Enter Email' placeholderTextColor={'#808080'} value={email} onChangeText={setEmail} mode='outlined' />
      <TextInput style={{ width: '87%', color: '#000', alignSelf: "center", marginTop: 5, borderRadius: 15 }} label='Enter your password' placeholderTextColor={'#808080'} value={password} onChangeText={setpassword} mode='outlined' secureTextEntry={show} right={<TextInput.Icon icon="eye" onPress={() => showPassword()} />} />



      <View style={{ bottom: '5%', position: 'absolute', width: '100%' }}>
        <CustomButton text={'Login'} Press={() => { SignUpAPI() }} />
      </View>



    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 5,
    justifyContent: 'center'
  },
  inputContainer: {
    // shadowRadius: 7,
    // width: 300,
    // height: 60,
    // borderRadius: 7,
    // flexDirection: 'row',
    // alignItems: 'center',
    // paddingHorizontal: 15,
    // backgroundColor: '#E5E7ED',
    // borderColor: '#B6B6B6',
    // borderWidth: 0.5,
    // marginTop: 20
    shadowRadius: 2,
    borderRadius: 10,
    backgroundColor: '#D7D9DF',
    width: 280,
    height: 60,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 15,

  },
  searchIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000'
  },
  Label: {
    fontSize: 24,
    color: 'black',
    fontFamily: 'notoserif',
    fontWeight: 'bold',
    margin: 10
  },
  input: {
    height: 50,
    margin: 8,
    borderWidth: 1,
    fontSize: 20,
    borderRadius: 5,
    backgroundColor: '#fff',
    alignItems: "center",
    flexDirection: "row",
    width: '87%',
    justifyContent: "space-between",
    padding: 5,
    alignSelf: "center"
  },
});

export default SignUpEmail;
