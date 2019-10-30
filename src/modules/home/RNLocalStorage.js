import { storage } from "@cruxpay/js-sdk/dist/cruxpay-sdk";
import AsyncStorage from "@react-native-community/async-storage";

class RNLocalStorage extends storage.StorageService {

    setItem = async (key, value) => AsyncStorage.setItem(key, value)

    getItem = async (key) => AsyncStorage.getItem(key)
}

export {RNLocalStorage};
