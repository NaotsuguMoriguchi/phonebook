import React from 'react';
import { LinearGradient } from 'expo-linear-gradient'
import { ImageBackground, StyleSheet, StatusBar, Dimensions } from 'react-native';
import { Block, Button, Text, theme } from 'galio-framework';

const { height, width } = Dimensions.get('screen');

import materialTheme from '../constants/Theme';
import Images from '../constants/Images';
import { Image } from 'react-native';

export default class Onboarding extends React.Component
{
  render()
  {
    const { navigation } = this.props;

    return (
      <Block flex style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor='rgba(0, 117, 255, 1)' />
        <LinearGradient
          colors={['rgba(0, 117, 255, 1)', 'rgba(0, 117, 255, 0.7)']}
          style={[styles.container]}>
          <Block flex space="between" style={styles.padded}>
            <Block style={{ zIndex: 2, marginTop: theme.SIZES.BASE * 6 }}>
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
                  Twitter login
                </Button>
                <Button
                  shadowless
                  style={styles.button}
                  color={materialTheme.COLORS.INFO}
                  onPress={() => navigation.navigate('App')}>
                  Facebook login
                </Button>
                <Button
                  shadowless
                  style={styles.button}
                  color={materialTheme.COLORS.SUCCESS}
                  onPress={() => navigation.navigate('App')}>
                  Facebook login
                </Button>
              </Block>
            </Block>
          </Block>
        </LinearGradient>
      </Block>
    );
  }
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
