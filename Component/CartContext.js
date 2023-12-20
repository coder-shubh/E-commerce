import React, { createContext, useReducer } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            // Check if the product is already in the cart
            const existingProduct = state.find(item => item.id === action.payload.id);

            if (existingProduct) {
                // If the product is already in the cart, increase its quantity
                return state.map(item =>
                    item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                // If the product is not in the cart, add it with quantity 1
                return [...state, { ...action.payload, quantity: 1 }];
            }
        case 'REMOVE_FROM_CART':
            // Implement logic to remove a product from the cart
            return state.filter(item => item.id !== action.payload);
        case 'INCREASE_QUANTITY':
            // Implement logic to increase the quantity of a product in the cart
            return state.map(item =>
                item.id === action.payload ? { ...item, quantity: item.quantity + 1 } : item
            ); case 'DECREASE_QUANTITY':
            // Implement logic to decrease the quantity of a product in the cart
            return state.map(item =>
                item.id === action.payload && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            );
        case 'CLEAR_CART':
            // Clear the entire cart
            return [];
        default:
            return state;
    }
};

const CartProvider = ({ children }) => {
    const [cartItems, dispatch] = useReducer(cartReducer, []);

    const addToCart = (product) => {
        dispatch({ type: 'ADD_TO_CART', payload: product });
    };

    const removeFromCart = (productId) => {
        dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
    };

    const increaseQuantity = (productId) => {
        dispatch({ type: 'INCREASE_QUANTITY', payload: productId });
    };

    const decreaseQuantity = (productId) => {
        dispatch({ type: 'DECREASE_QUANTITY', payload: productId });
    };
    const clearCart = () => {
        dispatch({ type: 'CLEAR_CART' });
    };



    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                increaseQuantity,
                decreaseQuantity,
                clearCart
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export { CartContext, CartProvider };
