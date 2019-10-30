import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';

import 'react-native-get-random-values';
import {CruxClient} from "@cruxpay/js-sdk/dist/cruxpay-sdk"
import { fonts, colors } from '../../styles';
import { Text } from '../../components/StyledText';
import {Button} from "../../components"
import {RNLocalStorage} from "./RNLocalStorage";


export default function HomeScreen({ isExtended, setIsExtended }) {
  // const rnsUrl = 'https://reactnativestarter.com';
  // const handleClick = () => {
  //   Linking.canOpenURL(rnsUrl).then(supported => {
  //     if (supported) {
  //       Linking.openURL(rnsUrl);
  //     } else {
  //       console.log(`Don't know how to open URI: ${rnsUrl}`);
  //     }
  //   });
  // };

  const makeid = (length) => {
    let result           = '';
    const characters       = '0123456789';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  const testCrux = async () => {

    const s = new RNLocalStorage();
    s.setJSON("payIDClaim", {"identitySecrets":"{\"iv\":\"59ZAnVm5vyC6zIZz\",\"encBuffer\":\"1JstBA1vk8LpSfI9kPlGtWytcAZUbGN51g5E8NA/OVXjSsygdjdceeW0bb/2GbR9qkkq4P7nuP9lCjxbXWcsJaj/0AWUOA82AmZnbP7yUH8ATQwdSgyhUQDGboSVsO2JYFg1tPg2P+kA0jIoRYYGpAlcT8hhEe5jRSp9NBZ2cFWV/z3yDRMZtXHUQtwY/bPenREqBv7iBgwnqWLzrDMoY+KrjOXzUC3BWCByYfj02WkXLq6tQnJyPepCl1OGhpfoDCBgRbrIZ+uJxDp0RrAbp52OSREPaHPF/6oShTm5Pre1ZswBxufqwWMfNARY0wA=\"}","virtualAddress":"yadu007@cruxdev.crux"})
    const cruxClientOptions = {
      getEncryptionKey: () => 'fookey',
      walletClientName: 'cruxdev',
      storage: s
    }
    const newId = makeid(6);
    const cruxClient = new CruxClient(cruxClientOptions);
    cruxClient.init().then(() => {
      alert("init done");

      cruxClient.getAddressMap().then((addressMap) => {
        alert(`before change addressMap ripple identifier: ${  addressMap.ripple.secIdentifier}`);

        const newAddressMapping = {
          "bitcoin": {"addressHash": "1HX4KvtPdg9QUYwQE1kNqTAjmNaDG7w82V"},
          "ethereum": {"addressHash": "0x0a2311594059b468c9897338b027c8782398b481"},
          "ripple": {"addressHash": "rpfKAA2Ezqoq5wWo3XENdLYdZ8YGziz48h", "secIdentifier": newId},
          "tron": {"addressHash": "TG3iFaVvUs34SGpWq8RG9gnagDLTe1jdyz"}
        }

        cruxClient.putAddressMap(newAddressMapping).then((res) => {
          console.log(res);
          cruxClient.getAddressMap().then((afterPutAddressMap) => {
            alert(`after change addressMap ripple identifier: ${  afterPutAddressMap.ripple.secIdentifier}`);
            // AsyncStorage.getAllKeys().then((keys1)=>{
            //   alert(keys1);
            // })
          }).catch((err) => {
            alert(`ERROR after change addressMap${  err.message}`);
          })

        }).catch((err) => {
          console.log('putAddressMap errorCode', err.errorCode);
          console.log('errorMessage', err.message);
          alert(`ERROR putAddressMap${  err.errorCode  }${err.message}`);
        })

      }).catch((err) => {
        console.log('before getAddressMap errorCode', err.errorCode);
        console.log('errorMessage', err.message);
        alert(`ERROR before change addressMap${  err.message}`);
      })

    })

  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../../assets/images/background.png')}
        style={styles.bgImage}
        resizeMode="cover"
      >
        <View style={styles.section}>
          <Text size={20} white>
            Crux Test
          </Text>
          <Button
            primary
            caption="Test PutAddress Mapping"
            onPress={() => testCrux()}
          />
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  bgImage: {
    flex: 1,
    marginHorizontal: -20,
  },
  section: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionLarge: {
    flex: 2,
    justifyContent: 'space-around',
  },
  sectionHeader: {
    marginBottom: 8,
  },
  priceContainer: {
    alignItems: 'center',
  },
  description: {
    padding: 15,
    lineHeight: 25,
  },
  titleDescription: {
    color: '#19e7f7',
    textAlign: 'center',
    fontFamily: fonts.primaryRegular,
    fontSize: 15,
  },
  title: {
    marginTop: 30,
  },
  price: {
    marginBottom: 5,
  },
  priceLink: {
    borderBottomWidth: 1,
    borderBottomColor: colors.primary,
  },
});
