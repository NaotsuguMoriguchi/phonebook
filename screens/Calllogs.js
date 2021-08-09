import React from 'react';
import { StyleSheet, Dimensions, ScrollView, View, ImageBackground } from 'react-native';
import { Button, Block, Text, Input, theme } from 'galio-framework';
import { Entypo } from '@expo/vector-icons';

import { Header } from '../components';

import { Images, materialTheme } from '../constants';


const { width, height } = Dimensions.get('screen');

export default function CallLogScreen({ navigation })
{
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
