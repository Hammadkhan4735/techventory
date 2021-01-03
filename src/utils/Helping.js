import {ToastAndroid,Platform,Alert} from 'react-native'


export const showToastMessage = (msg) => {
    if (Platform.OS === 'android') {
        ToastAndroid.show(msg, ToastAndroid.LONG)
    } else {
        Alert.alert(msg);
    }
}