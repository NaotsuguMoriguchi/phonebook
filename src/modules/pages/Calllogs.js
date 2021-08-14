import React, { useEffect, useState } from 'react';
import { StyleSheet, Dimensions, ScrollView, View, ImageBackground, PermissionsAndroid, Platform } from 'react-native';
import { Button, Block, Text, theme } from 'galio-framework';
import Icon from 'react-native-vector-icons/Entypo';
import CallLogs from 'react-native-call-log';
import CallDetectorManager from 'react-native-call-detection'

import Header from '../components/Header';
import materialTheme from '../../constants/Theme';

const { width, height } = Dimensions.get('screen');

const filter = {
  phoneNumbers: '+1234567',
  minTimestamp: 1571835032,
  maxTimestamp: 1583318721264,
}

export default function CallLogScreen({ navigation })
{
  const [callLog, setCallLog] = useState([])
  const [callState, setCallState] = useState(false)
  //callLog
  useEffect(() =>
  {
    (async () =>
    {
      try
      {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_CALL_LOG,
          {
            title: 'Call Log Example',
            message:
              'Access your call logs',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        )
        console.log(granted)

        if (granted === PermissionsAndroid.RESULTS.GRANTED)
        {

          CallLogs.load(20).then(c => { console.log(c, 'LLLOOOGGGG'); setCallLog(c); });

        } else
        {
          console.log('Call Log permission denied');
        }
      }
      catch (e)
      {
        console.log(e);
      }
    })()
  }, [callState === false]);

  let callDetector = new CallDetectorManager(
    (event, number) =>
    {
      console.log('event -> ', event + (number ? ' - ' + number : ''));
      // var updatedCallStates = callStates;
      // updatedCallStates.push(event + (number ? ' - ' + number : ''));
      // setFlatListItems(updatedCallStates);
      // setCallStates(updatedCallStates);

      // For iOS event will be either "Connected",
      // "Disconnected","Dialing" and "Incoming"

      // For Android event will be either "Offhook",
      // "Disconnected", "Incoming" or "Missed"
      // phoneNumber should store caller/called number

      if (event === 'Disconnected')
      {
        // Do something call got disconnected
        setCallState(false)
      } else if (event === 'Connected')
      {
        // Do something call got connected
        // This clause will only be executed for iOS
      } else if (event === 'Incoming')
      {
        console.log('Incoming')
        setCallState(true)
        // Do something call got incoming
      } else if (event === 'Dialing')
      {
        // Do something call got dialing
        // This clause will only be executed for iOS
      } else if (event === 'Offhook')
      {
        //Device call state: Off-hook.
        // At least one call exists that is dialing,
        // active, or on hold,
        // and no calls are ringing or waiting.
        // This clause will only be executed for Android
      } else if (event === 'Missed')
      {
        setCallState(false)
        // Do something call got missed
        // This clause will only be executed for Android
      }
    },
    true, // To read the phone number of the incoming call [ANDROID]
    () =>
    {
      // If permission got denied [ANDROID]
      // Only If you want to read incoming number
      // Default: console.error
      console.log('Permission Denied by User');
    },
    {
      title: 'Phone State Permission',
      message: 'This app needs access to your phone state',
    }
  );

  console.log(callDetector)

  return (
    <>
      <Header title={'プロフィール編集'} move={'App'} navigation={navigation}></Header>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Block flex style={styles.home}>
          <View style={{ flex: 1 }}>
            {
              callLog.map((log, index) => (
                <View style={styles.row} key={index}>
                  <View style={styles.info}>
                    <ImageBackground
                      source={require('../../../assets/images/user.png')}
                      style={styles.profileContainer}
                      imageStyle={{ borderRadius: 50 }}
                    >
                    </ImageBackground>
                    <Block>
                      <Text style={{ fontSize: 19, marginLeft: theme.SIZES.BASE * 2 }}>{log.phoneNumber}</Text>
                      <Text style={{ fontSize: 12, marginLeft: theme.SIZES.BASE * 2 }}>{log.dateTime}</Text>
                    </Block>
                  </View>
                  <Icon name="edit" family="Galio" color='black' size={24} onPress={() => navigation.navigate('EditInfo')} />
                </View>
              ))
            }
          </View>
        </Block>
      </ScrollView>
    </>

  );
}

const styles = StyleSheet.create({
  home: {
    width: width,
    padding: theme.SIZES.BASE
  },

  profileContainer: {
    width: height / 15,
    height: height / 15,
  },

  row: {
    flexDirection: "row",
    padding: theme.SIZES.BASE / 2,
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: materialTheme.COLORS.BORDER_COLOR
  },

  info: {
    flexGrow: 8,
    flexDirection: "row",
    alignItems: 'center',
  }

});
