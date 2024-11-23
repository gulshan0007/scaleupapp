import React from 'react';
import {
    StyleSheet,
    SafeAreaView,
    StatusBar,
    View,
} from 'react-native';
import { COLORS } from '../../helper/colors';
import { nh, nw } from '../../helper/scal.utils';

const SignUp = ({ navigation, route }) => {


    return (
        <SafeAreaView style={styles.container}>
            {/* StatusBar */}
            <StatusBar barStyle="dark-content" backgroundColor={COLORS.yellowF5BE00} />
            <View style={styles.layer1}>
                <View style={styles.layer2}>

                </View>
            </View>

        </SafeAreaView>
    );
};

export default SignUp;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.yellowF5BE00,
    },
    layer1: {
        flex: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        marginTop: nh(30),
        marginHorizontal: nw(16),
        borderTopLeftRadius: nh(25),
        borderTopRightRadius: nh(25)
    },
    layer2: {
        flex: 1,
        backgroundColor: COLORS.whiteFFFFFF,
        marginTop: nh(15),
        marginHorizontal: nw(-16),
        borderTopLeftRadius: nh(25),
        borderTopRightRadius: nh(25),
        paddingHorizontal: nw(16),
        paddingTop: nh(30)
    }

});
