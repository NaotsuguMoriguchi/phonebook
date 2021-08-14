import React, { useEffect, useState } from 'react';
import { StyleSheet, Dimensions, ScrollView, View, ImageBackground, PermissionsAndroid, Platform } from 'react-native';
import { Button, Block, Text, Input, theme } from 'galio-framework';
import Icon from 'react-native-vector-icons/Entypo';
import CallLogs from 'react-native-call-log';

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
  }, []);

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
