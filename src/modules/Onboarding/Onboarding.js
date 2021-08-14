import React, { useState } from 'react';
import { ImageBackground, StyleSheet, StatusBar, Dimensions } from 'react-native';
import { Block, Button, Text, theme } from 'galio-framework';
// import { useTwitter } from "react-native-simple-twitter";

const { height, width } = Dimensions.get('screen');

import materialTheme from '../../constants/Theme';

export default function Onboarding({ navigation })
{
  // const { twitter, TWModal, loggedInUser, accessToken } = useTwitter({
  //   consumerKey: config.consumerKey,
  //   consumerSecret: config.consumerSecret,
  // });

  // useEffect(() =>
  // {
  //   console.log('twitter Twitter')
  // }, [loggedInUser, accessToken]);

  console.log(navigation.navigate)
  // //facebooklogin
  const facebookLogIn = async () =>
  {
    console.log('dddd')

  }

  //twitter login
  const twitterLogin = async () =>
  {

  }

  return (

    <Block flex style={styles.container}>

      {/* <StatusBar barStyle="light-content" backgroundColor='rgba(0, 117, 255, 1)' /> */}
      <ImageBackground source={require('../../../assets/images/background.png')}
        style={styles.container}>
        <Block flex space="between" style={styles.padded}>
          <Block style={{ zIndex: 2, marginTop: theme.SIZES.BASE * 5 }}>
            <Block>
              <Text color="white" size={25}>みんなで作る電話帳</Text>
            </Block>
            <Block center style={{ marginTop: theme.SIZES.BASE * 6 }}>
              <ImageBackground source={require('../../../assets/images/contact.png')}
                style={{ width: 200, height: 200, }}>
              </ImageBackground>
            </Block>
            <Block center style={{ marginTop: theme.SIZES.BASE * 2 }}>
              <Button
                shadowless
                style={styles.button}
                color={materialTheme.COLORS.DANGER}
                onPress={() => navigation.navigate('App')}>
                Login with Twitter
              </Button>
              <Button
                shadowless
                style={styles.button}
                color={materialTheme.COLORS.INFO}
                onPress={() => facebookLogIn()}>
                Login with Facebook
              </Button>
              {/* <Button
                shadowless
                style={styles.button}
                color={materialTheme.COLORS.SUCCESS}
                onPress={twitterLogin}>
                Login with Twitter
              </Button> */}
            </Block>
          </Block>
        </Block>
      </ImageBackground>
    </Block>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  padded: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    position: 'relative',
    bottom: theme.SIZES.BASE,
  },
  button: {
    width: width - theme.SIZES.BASE * 4,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0,
  },
});
