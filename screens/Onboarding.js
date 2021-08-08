import React, { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient'
import { ImageBackground, StyleSheet, StatusBar, Dimensions } from 'react-native';
import { Block, Button, Text, theme } from 'galio-framework';
import * as Facebook from 'expo-facebook';
// import { useTwitter } from "react-native-simple-twitter";

const { height, width } = Dimensions.get('screen');

import materialTheme from '../constants/Theme';
import * as config from '../constants/config'
import Images from '../constants/Images';
import { Image } from 'react-native';

export default function Onboarding({ navigation }) 
{
  const [isLoggedin, setLoggedinStatus] = useState(false);
  const [userData, setUserData] = useState(null);
  // const { twitter, TWModal, loggedInUser, accessToken } = useTwitter({
  //   consumerKey: config.consumerKey,
  //   consumerSecret: config.consumerSecret,
  // });

  // useEffect(() =>
  // {
  //   console.log('twitter Twitter')
  // }, [loggedInUser, accessToken]);

  // //facebooklogin
  const facebookLogIn = async () =>
  {
    console.log('dddd')
    try
    {
      // await Facebook.initializeAsync({
      //   appId: config.app_id, //App_ID
      // });
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync(`${config.app_id}`, {
        permissions: ['public_profile'],
      });
      if (type === 'success')
      {
        // Get the user's name using Facebook's Graph API
        fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,picture.height(500)`)
          .then(response => response.json())
          .then(data =>
          {
            setLoggedinStatus(true);
            setUserData(data);
          })
          .catch(e => console.log(e))
      } else
      {
        // type === 'cancel'
      }
    } catch ({ message })
    {
      alert(`Facebook Login Error: ${message}`);
    }
  }

  //twitter login
  const twitterLogin = async () =>
  {
    try
    {
      await twitter.login();
    } catch (e)
    {
      console.log(e.errors);
    }
  }

  return (
    <Block flex style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor='rgba(0, 117, 255, 1)' />
      <LinearGradient
        colors={['rgba(0, 117, 255, 1)', 'rgba(0, 117, 255, 0.7)']}
        style={[styles.container]}>
        <Block flex space="between" style={styles.padded}>
          <Block style={{ zIndex: 2, marginTop: theme.SIZES.BASE * 5 }}>
            <Block>
              <Text color="white" size={25}>みんなで作る電話帳</Text>
            </Block>
            <Block center style={{ marginTop: theme.SIZES.BASE * 6 }}>
              <ImageBackground source={require('../assets/images/contact.png')}
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
                onPress={facebookLogIn}>
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
      </LinearGradient>
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
