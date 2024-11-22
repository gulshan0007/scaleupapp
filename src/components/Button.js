import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { COLORS } from '../helper/colors';
import { APP_FONTS } from '../assets/fonts';
// import { Ionicons } from '@expo/vector-icons'; // Replace with your icon library if needed.

const Button = ({
    text = '',
    leftIcon = null,
    rightIcon = null,
    justIcon = null,
    onPress = () => { },
    variant = 'solid', // 'solid' or 'outline'
    backgroundColor = COLORS.blue043142, // Default color for solid button
    outlineColor = COLORS.blue043142, // Default outline color for outline button
    textColor = COLORS.whiteFFFFFF, // Default text color
    shadow = true, // Enables shadow for solid button
    height = 50, // Default height
    width = 200, // Default width
}) => {
    const isSolid = variant === 'solid';

    return (
        <TouchableOpacity
            style={[
                styles.button,
                {
                    height,
                    width,
                },
                isSolid
                    ? { backgroundColor, ...styles.shadow }
                    : { backgroundColor: 'transparent', borderColor: outlineColor, borderWidth: 2, ...styles.shadow },
            ]}
            onPress={onPress}
        >
            <View style={styles.content}>
                {/* {justIcon && <Ionicons name={justIcon} size={20} color={isSolid ? textColor : outlineColor} />}
                {leftIcon && <Ionicons name={leftIcon} size={20} color={isSolid ? textColor : outlineColor} style={styles.icon} />} */}
                {text ? <Text style={[styles.text, { color: isSolid ? textColor : outlineColor }]}>{text}</Text> : null}
                {/* {rightIcon && <Ionicons name={rightIcon} size={20} color={isSolid ? textColor : outlineColor} style={styles.icon} />} */}
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: "center"
    },
    shadow: {
        // shadowColor: '#000',
        // shadowOffset: { width: 0, height: 4 }, // Shadow only at the bottom
        // shadowOpacity: 0.3,
        // shadowRadius: 4,
        // elevation: 5, // Android shadow
        boxShadow: '1 5 5 0  rgba(0,0,0,0.25)'
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 16,

        fontFamily: APP_FONTS.PoppinsSemiBold,
        // fontWeight: '600'
    },
    icon: {
        marginHorizontal: 5,
    },
});

export default Button;
// 