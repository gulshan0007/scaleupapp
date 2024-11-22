import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, View, Animated } from 'react-native';
import { COLORS } from '../helper/colors';

const SquareToggle = ({
    options = ['Option 1', 'Option 2', 'Option 3'], // Toggle options
    selectedColor = COLORS.whiteFFFFFF, // Selected text color
    unselectedColor = COLORS.yellowF5BE00, // Unselected text color
    selectedBackgroundColor = COLORS.yellowF5BE00, // Selected background color
    unselectedBackgroundColor = '#ffffff', // Unselected background color
    onToggle = () => { }, // Callback for toggle change
}) => {
    const [selected, setSelected] = useState(0);

    const handleToggle = (index) => {
        setSelected(index);
        onToggle(index);
    };

    return (
        <View style={styles.container}>
            {options.map((option, index) => {
                const isSelected = index === selected;
                return (
                    <TouchableOpacity
                        key={index}
                        style={[
                            styles.toggle,
                            isSelected && {

                                borderRadius: 4,
                            },
                            {
                                backgroundColor: isSelected
                                    ? selectedBackgroundColor
                                    : unselectedBackgroundColor,
                            },

                        ]}
                        onPress={() => handleToggle(index)}
                        activeOpacity={0.8}
                    >
                        <Text
                            style={[
                                styles.text,
                                {
                                    color: isSelected ? selectedColor : unselectedColor,
                                },
                            ]}
                        >
                            {option}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        overflow: 'hidden',
        marginHorizontal: 16
    },
    toggle: {
        flex: 1, // Equal width for all toggles
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,

    },
    text: {
        fontSize: 16,
        fontWeight: '500',
    },
});

export default SquareToggle;
