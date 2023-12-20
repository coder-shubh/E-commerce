import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function CustomButton({ text, Press, width }) {

    return (
        <TouchableOpacity style={[styles.button, { width: width != null ? '100%' : '90%' }]} onPress={Press} activeOpacity={0.5}>
            <Text style={styles.title}>{text}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        height: 58,
        backgroundColor: '#000',
        alignSelf: "center",
        borderRadius: 16,
        alignItems: "center",
        justifyContent: "center"
    },
    title: {
        color: '#fff',
        fontFamily: 'Century Gothic Std Bold',
        fontSize: 20
    }
})

