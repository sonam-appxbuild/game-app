import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import colors from '../constants/colors';

const MainButton = props =>{
    return (
    <TouchableOpacity activeOpacity={0.6} onPress={props.onPress}>
        <View style={styles.button}>
            <Text style={styles.buttonText}>{props.children}</Text>
        </View>
    </TouchableOpacity>
);
}

const styles = StyleSheet.create({
    button:{
        backgroundColor: colors.primary,
        paddingVertical: 12,
        paddingHorizontal: 15,
        borderRadius: 25
    },
    buttonText:{
        fontFamily: 'open-sans',
        fontSize: 18,
        color: 'white'
    }
});

export default MainButton