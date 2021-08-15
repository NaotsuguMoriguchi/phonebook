import React from 'react'
import { StyleSheet, Dimensions, ScrollView } from 'react-native'
import { Button, Block, Text, Input, theme } from 'galio-framework'

import Header from '../components/Header'
import materialTheme from '../../constants/Theme'



const { width } = Dimensions.get('screen')

export default function ContactScreen({ navigation })
{

  return (
    <>
      <Header title={'電話番号検索'} move='App' navigation={navigation}></Header>
      <Block flex style={styles.home}>
        <Text>検索ワードを入力してください。</Text>
        <Input
          placeholder="電話番号、事務所名"
          color={'black'}
          placeholderTextColor={materialTheme.COLORS.MUTED}
          style={styles.input}
        ></Input>
      </Block>

    </>
  )
}

const styles = StyleSheet.create({
  home: {
    width: width,
    padding: theme.SIZES.BASE
  },

  input: {
    borderRadius: 30,
    borderColor: materialTheme.COLORS.INPUT,
    backgroundColor: materialTheme.COLORS.DEFAULT,
    color: 'black',
  }

})
