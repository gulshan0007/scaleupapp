// Toast.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Modal from 'react-native-modal';
import { COLORS } from '../../helper/colors';
// import { Icon } from 'react-native-elements';
// import { ICON_TYPE } from '../../helper/iconType';
import { APP_FONTS } from '../../assets/fonts';

const Toast = ({ visible, message }) => {
  if (!visible) {
    return null;
  }

  return (
    <Modal
      isVisible={visible}
      animationIn={'zoomIn'}
      animationOut={'zoomOut'}
      animationInTiming={100}
      animationOutTiming={500}
    >
      <View style={{
        backgroundColor: COLORS.whiteFFFFFF,
        borderRadius: 8,
        position: "absolute",
        width: '100%',
        ...(message?.position == 'top' ? { top: 50 } : { bottom: 50 }),
        paddingVertical: 12,
        alignItems: 'center',
        flexDirection: 'row',
      }}>
        {/* <Icon


          type={ICON_TYPE.Antdesign}

          color={message?.type == 'success' ? COLORS.green28B446 : COLORS.redE14640}
          name={message?.type == 'success' ? "checkcircle" : "closecircle"}
          size={normalize(22)}
          style={{
            // height: message?.image ? 25 : 20,
            // width: message?.image ? 25 : 20,
            marginHorizontal: 10
          }}
        /> */}

        <Text style={styles.toastText}>{message?.title}</Text>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  toastText: {
    color: COLORS.black333333,
    fontSize: 14,
    textAlign: 'center',
    fontFamily: APP_FONTS.PoppinsMedium,
    letterSpacing: 0.3,
  },
});

export default Toast;
