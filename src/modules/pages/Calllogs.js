import React, { useEffect, useState } from 'react'
import { StyleSheet, Dimensions, ScrollView, View, ImageBackground, PermissionsAndroid, Platform } from 'react-native'
import { Block, Text, theme } from 'galio-framework'
import Icon from 'react-native-vector-icons/MaterialIcons'
import CallLogs from 'react-native-call-log'
import CallDetectorManager from 'react-native-call-detection'
import { showMessage } from "react-native-flash-message"
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as MainServices from '../../services/mainService'

import Header from '../components/Header'
import materialTheme from '../../constants/Theme'


const { width, height } = Dimensions.get('screen')



export default function CallLogScreen({ navigation })
{
  const [callLog, setCallLog] = useState({})
  const [incomingNumber, setIncomingNumber] = useState(null)
  const [callType, setCallType] = useState()
  const [callState, setCallState] = useState(false)
  //Duplicated call log
  const duplicatedCallLog = (logs) =>
  {
    const duplicatedLog = {}
    logs.map((log) =>
    {
      if (duplicatedLog.hasOwnProperty(log.phoneNumber))
      {
        duplicatedLog[log.phoneNumber].push(log)
      } else
      {
        duplicatedLog[log.phoneNumber] = []
        duplicatedLog[log.phoneNumber].push(log)

      }
    })

    setCallLog(duplicatedLog)
  }
  //IOS getting calllogs
  const storeData = async (value) =>
  {
    try
    {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('call_log', jsonValue)
      console.log(jsonValue)
    } catch (e)
    {
      // saving error
    }
  }
  const getData = async () =>
  {
    try
    {
      const jsonValue = await AsyncStorage.getItem('call_log')
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e)
    {
      // error reading value
    }
  }
  //callLog
  useEffect(() =>
  {
    if (Platform.OS === 'android')
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

          if (granted === PermissionsAndroid.RESULTS.GRANTED)
          {

            CallLogs.loadAll().then(logs =>
            {
              duplicatedCallLog(logs)
            })

          } else
          {
            console.log('Call Log permission denied')
          }
        }
        catch (e)
        {
          console.log(e)
        }
      })()
    }
    if (Platform.OS === 'ios')
    {
      (async () =>
      {
        try
        {
          const callLogs = await getData()
          // const datetime = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
          // callLogs.push({phoneNumber: ' 08009198670', type: 'UNKNOWN', datetime})
          // await storeData(callLogs)
          duplicatedCallLog(callLogs)
        } catch (error)
        {
          console.log(error)
        }

      })()
    }
  }, [callState === false])

  useEffect(() =>
  {
    if (callState)
    {
      MainServices.search({ s: incomingNumber }).then(result =>
      {
        console.log(result.data)
        if (result.data.area)
        {
          const area = result.data.area.area_code
          const city = result.data.area.city_code
          const number = result.data.shimoketa
          MainServices.getIncomingCallInfo({ area, city, number }).then(result =>
          {
            showMessage({
              message: incomingNumber,
              description: result.data[0].company,
              type: "info",
              autoHide: false,
              style: { width: '90%' }
            })
          })
        } else
        {
          showMessage({
            message: incomingNumber,
            description: 'No result',
            type: "info",
            autoHide: false,
            style: { width: '90%' }
          })
        }

      })


    }
  }, [callState === true])

  //ios call log save
  const iosCallLogSave = async () =>
  {
    const callLogs = await getData()
    const datetime = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
    callLogs.push({ phoneNumber: incomingNumber, type: callType, datetime })
    await storeData(callLogs)
  }

  let callDetector = new CallDetectorManager(
    (event, number) =>
    {

      if (event === 'Disconnected')
      {
        setCallType('MISSED')
        // Do something call got disconnected
        setCallState(false)
        iosCallLogSave()
      } else if (event === 'Connected')
      {
        setCallType('INCOMING')
        iosCallLogSave()
        // Do something call got connected
        // This clause will only be executed for iOS
      } else if (event === 'Incoming')
      {
        setIncomingNumber(number)
        setCallState(true)
        setCallType('INCOMING')
        iosCallLogSave()
      } else if (event === 'Dialing')
      {
        setCallType('OUTGOING')
        iosCallLogSave()
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
      console.log('Permission Denied by User')
    },
    {
      title: 'Phone State Permission',
      message: 'This app needs access to your phone state',
    }
  )

  const renderCallLogType = (log) =>
  {
    switch (log.type)
    {
      case 'UNKNOWN':
        return (<Icon name="call-missed" family="Galio" color='red' size={20} />)
      case 'INCOMING':
        return (<Icon name="call-received" family="Galio" color='green' size={20} />)
      case 'MISSED':
        return (<Icon name="call-missed" family="Galio" color='red' size={20} />)
      case 'OUTGOING':
        return (<Icon name="call-made" family="Galio" color='grey' size={20} />)
      default:
        break
    }
  }
  const search = (key) =>
  {
    MainServices.search({ s: key }).then(result =>
    {
      console.log(result.data)
      if (result.data.area)
      {
        const area = result.data.area.area_code
        const city = result.data.area.city_code
        const number = result.data.shimoketa
        MainServices.getTelephoneInfo({ area, city, number }).then(res =>
        {
          console.log(res.data)
          navigation.navigate('EditInfo', { data: res.data })
        })
      } else
      {
        console.log('No result')
        showMessage({
          message: 'Can not access!',
          description: 'There is no data',
          type: "warning",
          autoHide: true,
          style: { width: '70%' }
        })
      }

    })
  }

  const logList = (logs) =>
  {
    var components = []
    for (const log in logs)
    {
      components.push(
        <View style={styles.row} key={log}>
          <View style={styles.info}>
            <ImageBackground
              source={require('../../assets/images/user.png')}
              style={styles.profileContainer}
              imageStyle={{ borderRadius: 50 }}
            >
            </ImageBackground>
            <Block>
              <Text style={{ fontSize: 19, marginLeft: theme.SIZES.BASE * 2 }}>{log} {logs[log].length > 1 ? `(${logs[log].length})` : ''}</Text>
              <Text style={{ fontSize: 12, marginLeft: theme.SIZES.BASE * 2 }}>
                {renderCallLogType(logs[log][0])}
                {logs[log][0].dateTime}</Text>
            </Block>
          </View>
          <Icon name="edit" family="Galio" color='black' size={24} onPress={() => search(log)} />
        </View>
      )
    }
    return components
  }

  return (
    <>
      <Header title={'プロフィール編集'} move={'Onboarding'} navigation={navigation}></Header>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Block flex style={styles.home}>
          <View style={{ flex: 1 }}>
            {
              logList(callLog)
            }
          </View>
        </Block>
      </ScrollView>
    </>

  )
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

})
