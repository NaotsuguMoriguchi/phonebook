import React, { useEffect } from 'react';
import { StyleSheet, Dimensions, ScrollView, View, ImageBackground, PermissionsAndroid } from 'react-native';
import { Button, Block, Text, Input, theme } from 'galio-framework';
import { Entypo } from '@expo/vector-icons';
import CallLogs from 'react-native-call-log';

import { Header } from '../components';

import { Images, materialTheme } from '../constants';


const { width, height } = Dimensions.get('screen');

export default function CallLogScreen({ navigation })
{
  const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android:
      'Double tap R on your keyboard to reload,\n' +
      'Shake or press menu button for dev menu',
  });
  //Android
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
        if (granted === PermissionsAndroid.RESULTS.GRANTED)
        {

          // CallLogs.load(-1, filter).then(c => console.log(c, '00000000'));
          CallLogs.loadAll().then(c => console.log(c, '00000000'));
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
      <Header title={'プロフィール編集'} move={'App'}></Header>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Block flex style={styles.home}>
          <View style={{ flex: 1 }}>
            <View style={styles.row}>
              <View style={styles.info}>
                <ImageBackground
                  source={require('../assets/images/user.png')}
                  style={styles.profileContainer}
                  imageStyle={{ borderRadius: 50 }}
                >
                </ImageBackground>
                <Text style={{ fontSize: 19, marginLeft: theme.SIZES.BASE * 2 }}>123456789</Text>
              </View>
              <Entypo
                name="edit"
                size={24}
                color="black"
                onPress={() => navigation.navigate('EditInfo')}
              />
            </View>
            <Text>{instructions}</Text>

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
