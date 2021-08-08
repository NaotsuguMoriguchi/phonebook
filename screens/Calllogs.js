import React from 'react';
import { StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Button, Block, Text, Input, theme } from 'galio-framework';

import materialTheme from "../constants/Theme";
import { Icon, Header } from '../components';

const { width } = Dimensions.get('screen');

export default function CallLogScreen()
{

  return (
    <>
      <Header title={'プロフィール編集'}></Header>
      <Block flex style={styles.home}>
        <Block>
          <Text style={{ fontSize: 18 }}>123456789</Text>
          <Icon size={16}
            name="shop"
            family="GalioExtra"
            color={materialTheme.COLORS.MUTED}></Icon>
        </Block>
      </Block>
    </>

  );
}

const styles = StyleSheet.create({
  home: {
    width: width,
    padding: theme.SIZES.BASE
  },

});
