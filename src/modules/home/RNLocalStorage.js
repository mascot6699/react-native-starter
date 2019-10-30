import { storage } from "@cruxpay/js-sdk/dist/cruxpay-sdk";
import * as AsyncStorage from "react-native/Libraries/Storage/AsyncStorage";

class RNLocalStorage extends storage.StorageService {

    setItem = async (key, value) => AsyncStorage.setItem(key, value)

    getItem = async (key) => AsyncStorage.getItem(key)
}

export {RNLocalStorage};
