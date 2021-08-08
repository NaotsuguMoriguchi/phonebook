import React from 'react';
import { StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Button, Block, Text, Input, theme } from 'galio-framework';

import { Icon, Header } from '../components';

const { width } = Dimensions.get('screen');

export default function ContactScreen()
{

  return (
    <>
      <Header title={'電話番号検索'}></Header>
      <Block flex center style={styles.home}>
        <Text>Contact</Text>
      </Block>
    </>
  );
}

const styles = StyleSheet.create({
  home: {
    width: width,
  },

});
