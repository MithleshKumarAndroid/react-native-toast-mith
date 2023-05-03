import {
  StyleSheet,
  View,
  DeviceEventEmitter,
  Animated,
  Dimensions,
  TouchableOpacity,
  Text,
  TextStyle,
  ImageStyle,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
let timeOut: any = null;
interface Props {
  BackgroundSuccessColor?: string | any;
  BackgroundErrorColor?: string | any;
  TimeOut?: number;
  TitleStyle?: TextStyle;
  MessageStyle?: TextStyle;
  IconStyle?: ImageStyle;
  ShowCloseIcon?: boolean;
}
const Toast: React.FC<Props> = ({
  BackgroundSuccessColor,
  BackgroundErrorColor,
  TitleStyle,
  MessageStyle,
  ShowCloseIcon,
}) => {
  const { height: windowHeight } = Dimensions.get('screen');
  const popAnim = useRef(new Animated.Value(windowHeight * -1)).current;
  const successHeader = 'Success!';
  const failHeader = 'Failed!';
  const [status, setStatus] = useState<string>('');
  const [msg, setMessage] = useState<string>('');

  useEffect(() => {
    DeviceEventEmitter.addListener('SHOW_TOAST', onNewToast);
    return () => {
      DeviceEventEmitter.removeAllListeners();
      clearTimeout(timeOut);
    };
  }, []);
  const onNewToast = (data: any) => {
    clearTimeout(timeOut);
    setStatus(data?.type);
    setMessage(data?.message);
    popIn();
  };

  const popIn = () => {
    Animated.timing(popAnim, {
      toValue: 50,
      duration: 1300,
      useNativeDriver: true,
    }).start(() => popOut());
  };

  const popOut = () => {
    timeOut = setTimeout(() => {
      Animated.timing(popAnim, {
        toValue: windowHeight * -1,
        duration: 2000,
        useNativeDriver: true,
      }).start();
    }, 5000);
  };

  const instantPopOut = () => {
    Animated.timing(popAnim, {
      toValue: windowHeight * -1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const dynamicStyle = styles({
    status,
    BackgroundSuccessColor,
    BackgroundErrorColor,
  });

  return (
    <Animated.View
      style={[
        dynamicStyle.toast_Con,
        {
          transform: [{ translateY: popAnim }],
        },
      ]}
    >
      <View style={dynamicStyle.toastRow}>
        <View style={dynamicStyle.left_Icon_Con}>
          <Text style={dynamicStyle.left_Icon}>
            {status === 'success' ? '✓' : '⚠'}
          </Text>
        </View>
        <View style={dynamicStyle.toastText}>
          <Text style={[dynamicStyle.title, TitleStyle]}>
            {status === 'success' ? successHeader : failHeader}
          </Text>
          <Text style={[dynamicStyle.msg_Label, MessageStyle]}>{msg}</Text>
        </View>
        {ShowCloseIcon && (
          <TouchableOpacity onPress={() => instantPopOut()}>
            <View style={dynamicStyle.close_Icon_Con}>
              <Text style={dynamicStyle.close_Label}>✗</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    </Animated.View>
  );
};

const styles = ({
  status,
  BackgroundSuccessColor,
  BackgroundErrorColor,
}: any) =>
  StyleSheet.create({
    toast_Con: {
      width: '90%',
      marginHorizontal: '5%',
      height: 60,
      zIndex: 99999,
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      position: 'absolute',
      top: 0,
      backgroundColor:
        status === 'success'
          ? BackgroundSuccessColor
            ? BackgroundSuccessColor
            : '#A4D0A4'
          : BackgroundErrorColor
          ? BackgroundErrorColor
          : '#FA9884',
    },
    toastRow: {
      width: '90%',
      height: '100%',
      marginHorizontal: '5%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-evenly',
    },
    left_Icon_Con: {
      width: 32,
      height: 32,
      borderRadius: 17,
      borderWidth: status === 'success' ? 1 : 0,
      borderColor: status === 'success' ? '#FFF' : 'red',
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
    },
    left_Icon: {
      color: status === 'success' ? '#FFF' : '#ff4d4d',
      fontWeight: 'bold',
      fontSize: status === 'success' ? 20 : 35,
      marginTop: status === 'success' ? 0 : -5,
    },
    toastText: {
      width: '70%',
      padding: 2,
    },
    title: {
      fontWeight: 'bold',
      marginTop: 3,
      marginBottom: 2,
      color: '#FFF',
    },
    msg_Label: {
      color: '#FFF',
    },
    icon: {
      width: 30,
      height: 30,
      resizeMode: 'contain',
    },
    close_Icon_Con: {
      width: 32,
      height: 32,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: '#FFF',
      justifyContent: 'center',
      alignItems: 'center',
    },
    close_Label: {
      color: '#FFF',
      fontWeight: 'bold',
      fontSize: 18,
    },
  });

export default Toast;
