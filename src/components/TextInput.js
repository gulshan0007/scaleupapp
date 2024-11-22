import React, { useState } from 'react';
import {
    TextInput,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';

const CustomTextInput = ({
    placeholder = 'Enter text', // Placeholder text
    value,
    onChangeText,
    onFocus = () => { }, // Callback when input is focused
    onBlur = () => { }, // Callback when input loses focus
    hasError = false, // Error state
    errorMessage = '', // Error message (icon + text)
    successMessage = '', // Success message (icon + text)
    isSuccess = false, // Success state
    rightIcon, // Component for the right-side icon
    onRightIconPress = () => { }, // Callback for right icon press
}) => {
    const [isFocused, setIsFocused] = useState(false);

    // Dynamic outline color based on focus, error, and success
    const getOutlineColor = () => {
        if (hasError) return '#FF4D4D'; // Red for error
        if (isSuccess) return '#4CAF50'; // Green for success
        return isFocused ? '#4CAF50' : '#CCCCCC'; // Green when focused, gray otherwise
    };

    return (
        <View style={styles.container}>
            {/* Input field */}
            <View
                style={[
                    styles.inputContainer,
                    {
                        borderColor: getOutlineColor(),
                        shadowColor: isFocused ? '#4CAF50' : '#000',
                    },
                ]}
            >
                <TextInput
                    style={styles.input}
                    placeholder={placeholder}
                    value={value}
                    onChangeText={onChangeText}
                    onFocus={() => {
                        setIsFocused(true);
                        onFocus();
                    }}
                    onBlur={() => {
                        setIsFocused(false);
                        onBlur();
                    }}
                    placeholderTextColor="#888"
                />
                {rightIcon && (
                    <TouchableOpacity onPress={onRightIconPress} style={styles.icon}>
                        {rightIcon}
                    </TouchableOpacity>
                )}
            </View>

            {/* Error or Success Message */}
            {(hasError || isSuccess) && (
                <View style={styles.messageContainer}>
                    {hasError ? (
                        <Text style={styles.errorMessage}>{errorMessage}</Text>
                    ) : (
                        <Text style={styles.successMessage}>{successMessage}</Text>
                    )}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        borderWidth: 1,
        borderRadius: 8,
        backgroundColor: '#FFF',
        elevation: 5, // Shadow for Android
        shadowOffset: { width: 0, height: 2 }, // Shadow for iOS
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    input: {
        flex: 1,
        height: 50,
        fontSize: 16,
        color: '#000',
    },
    icon: {
        marginLeft: 10,
    },
    messageContainer: {
        marginTop: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    errorMessage: {
        color: '#FF4D4D',
        fontSize: 14,
    },
    successMessage: {
        color: '#4CAF50',
        fontSize: 14,
    },
});

export default CustomTextInput;
