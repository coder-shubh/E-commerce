import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import SplashScreen from './Screens/SplashScreen';
import SignUpEmail from './Screens/SignUpEmail';
import HomeScreen from './Screens/HomeScreen';
import Product from './Screens/Product';
import ItemView from './Screens/ItemView';
import ViewImage from './Component/ViewImage';
import { CartProvider } from './Component/CartContext';
import MyCart from './Screens/MyCart';
import SearchScreen from './Component/SearchScreen';




const Stack = createNativeStackNavigator();



const App = ({ navigation }) => {
  return (
    <CartProvider>

      <NavigationContainer>

        <Stack.Navigator initialRouteName="SplashScreen" screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: 'transparent' },
        }}>


          <Stack.Screen name="SplashScreen" component={SplashScreen}
            options={{
              headerShown: false,
              animation: 'fade'
            }} />
          <Stack.Screen name="SignUpEmail" component={SignUpEmail}
            options={{
              headerShown: false,
              animation: 'fade'
            }} />


          <Stack.Screen name="HomeScreen" component={HomeScreen}
            options={{
              headerShown: true,
              animation: 'fade'
            }} />

          <Stack.Screen name="Product" component={Product}
            options={{
              headerShown: true,
              animation: 'fade'
            }} />
          <Stack.Screen name="ItemView" component={ItemView}
            options={{
              headerShown: true,
              animation: 'fade'
            }} />
          <Stack.Screen name="SearchScreen" component={SearchScreen}
            options={{
              headerShown: true,
              animation: 'fade'
            }} />


          <Stack.Screen name="ViewImage" component={ViewImage}
            options={{
              headerShown: false,
              animation: 'fade'
            }} />


          <Stack.Screen name="MyCart" component={MyCart}
            options={{
              headerShown: true,
              animation: 'fade'
            }} />
        </Stack.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
}

export default App;
