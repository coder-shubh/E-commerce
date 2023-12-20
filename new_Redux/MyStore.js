import { configureStore } from "@reduxjs/toolkit";
import MyProductSlice from "./MyProductSlice";
import MyCartReducer from "../new_Redux/MyCartSlice";
import { combineReducers } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";


let persistConfig={
    key:'rooot',
    storage:AsyncStorage,

}

let rootReducer = combineReducers({product:MyProductSlice,cart:MyCartReducer});

let persistedReducer=persistReducer(persistConfig,rootReducer);

export const mystore = configureStore({
    reducer:persistedReducer,
    
});