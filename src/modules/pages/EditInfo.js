import React from 'react';
import { StyleSheet, Dimensions, ScrollView, View, Button, TextInput, ImageBackground } from 'react-native';
import { Block, Text, Input, theme } from 'galio-framework';

import Header from '../components/Header';
import materialTheme from '../../constants/Theme';


const { width, height } = Dimensions.get('screen');

export default function EditInfo({ navigation })
{

  return (
    <>
      <Header title={'電話番号入力情報'} move='App' navigation={navigation}></Header>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Block flex style={styles.home}>
          <Text style={styles.label}>電話番号</Text>
          <View style={{ flex: 1 }}>
            <View style={styles.row}>
              <Text style={styles.button}>市外局番</Text>
              <Text style={styles.button}>市内局番</Text>
              <Text style={styles.button}>加入者番号</Text>
            </View>
          </View>
          <Text style={styles.label}>地域</Text>
          <Input
            placeholder="着信課金用電話番号"
            color={'black'}
            placeholderTextColor={materialTheme.COLORS.MUTED}
            style={styles.input}
          ></Input>
          <Text style={styles.label}>番号種別</Text>
          <Input
            color={'black'}
            placeholderTextColor={materialTheme.COLORS.MUTED}
            style={styles.input}
          ></Input>
          <Text style={styles.label}>回線提供</Text>
          <Input
            color={'black'}
            placeholderTextColor={materialTheme.COLORS.MUTED}
            style={styles.input}
          ></Input>
          <View style={{ flex: 1, marginBottom: theme.SIZES.BASE / 2 }}>
            <View style={styles.row}>
              <View style={{ flexGrow: 3 }}>
                <Text>アクセス数</Text>
              </View>
              <View style={[styles.row, { flexGrow: 3 }]}>
                <Text>安全性</Text>
                <Text style={{ fontSize: 22, fontWeight: 'bold', color: materialTheme.COLORS.SUCCESS }}>15</Text>
              </View>
              <View style={{ flexGrow: 4, marginRight: theme.SIZES.BASE * 3, alignItems: 'flex-end' }}>
                <Text style={{ fontSize: 22, fontWeight: 'bold', color: materialTheme.COLORS.ERROR }}>7</Text>
              </View>
            </View>
          </View>
          <View style={{ flex: 1, marginBottom: theme.SIZES.BASE * 2 }}>
            <View style={styles.row}>
              <Text style={[styles.button1, { backgroundColor: materialTheme.COLORS.DEFAULT }]}>______+++++</Text>
              <Text style={[styles.button1, { backgroundColor: materialTheme.COLORS.SUCCESS }]}>迷惑電話じゃない！</Text>
              <Text style={[styles.button1, { backgroundColor: materialTheme.COLORS.ERROR }]}>迷惑電話だ！</Text>
            </View>
          </View>
          <Input
            color={'black'}
            placeholder='事業者名(必須)'
            placeholderTextColor={materialTheme.COLORS.MUTED}
            style={styles.input}
          ></Input>
          <Input
            color={'black'}
            placeholder='業種'
            placeholderTextColor={materialTheme.COLORS.MUTED}
            style={styles.input}
          ></Input>
          <Input
            color={'black'}
            placeholder='住所'
            placeholderTextColor={materialTheme.COLORS.MUTED}
            style={styles.input}
          ></Input>
          <Input
            color={'black'}
            placeholder='最寄駅'
            placeholderTextColor={materialTheme.COLORS.MUTED}
            style={styles.input}
          ></Input>
          <Input
            color={'black'}
            placeholder='アクセス'
            placeholderTextColor={materialTheme.COLORS.MUTED}
            style={styles.input}
          ></Input>
          <Input
            color={'black'}
            placeholder='公式サイト'
            placeholderTextColor={materialTheme.COLORS.MUTED}
            style={styles.input}
          ></Input>
          <TextInput
            numberOfLines={4}
            multiline={true}
            color={'black'}
            placeholder='事業内容'
            placeholderTextColor={materialTheme.COLORS.MUTED}
            style={[styles.input, { padding: theme.SIZES.BASE }]}
          ></TextInput>
          <Text
            style={{ fontSize: 17, color: materialTheme.COLORS.ERROR, marginTop: theme.SIZES.BASE }}
            onPress={() => navigation.navigate('EditComment')}
          >コメントログビューア</Text>
          <Text style={[styles.saveButton]}>保存</Text>
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

  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  label: {
    fontSize: 13,
    marginBottom: theme.SIZES.BASE / 2,
    marginTop: theme.SIZES.BASE
  },

  button: {
    // width: width / 4,
    color: 'black',
    borderRadius: 30,
    // elevation: 8,
    paddingVertical: theme.SIZES.BASE / 1.4,
    paddingHorizontal: theme.SIZES.BASE * 2,
    backgroundColor: materialTheme.COLORS.DEFAULT,
  },

  button1: {
    // width: width / 4,
    color: 'white',
    borderRadius: 50,
    // elevation: 8,
    // backgroundColor: materialTheme.COLORS.DEFAULT,
    paddingVertical: theme.SIZES.BASE / 1.4,
    paddingHorizontal: theme.SIZES.BASE / 1.5
  },

  saveButton: {
    color: 'white',
    borderRadius: 50,
    // elevation: 8,
    marginTop: theme.SIZES.BASE,
    textAlign: 'center',
    backgroundColor: materialTheme.COLORS.PRIMARY,
    paddingVertical: theme.SIZES.BASE,
    paddingHorizontal: theme.SIZES.BASE * 2
  },

  input: {
    borderRadius: 30,
    // borderColor: 'transparent',
    borderColor: materialTheme.COLORS.INPUT,
    backgroundColor: materialTheme.COLORS.DEFAULT,
    color: 'black',
  }


});
