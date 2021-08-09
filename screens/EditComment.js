import React from 'react';
import { StyleSheet, Dimensions, ScrollView, View, Button, TextInput, ImageBackground } from 'react-native';
import { Block, Text, Input, theme } from 'galio-framework';
import { Entypo } from '@expo/vector-icons';

import { Header } from '../components';

import { Images, materialTheme } from '../constants';

const { width, height } = Dimensions.get('screen');

export default function EditComment({ navigation })
{

  return (
    <>
      <Header title={'コメントログビューア'} move={'EditInfo'}></Header>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Block flex style={styles.home}>
          <View style={{ flex: 1 }}>
            <View style={styles.row}>
              <View style={{ flexGrow: 1, marginRight: theme.SIZES.BASE }}>
                <Text>&bull;</Text>
              </View>
              <View >
                <Text style={{ fontSize: 15 }}>一言で言って最低です こちらが電力について分からないのをいいことに無理やり島根銀行と一緒に約一時間も一方的に喋り脅してこられ契約したあとはだんまり。必要な書類や連絡も無しときましたので、解約です 直接島根銀行にクレームを言いましょう。</Text>
                <Text style={{ color: materialTheme.COLORS.INFO }}>0852-24-1171</Text>
                <Text> 2021-07-29 02:33:19</Text>
              </View>
            </View>
          </View>
          <View style={{ flex: 1 }}>
            <View style={styles.row}>
              <View style={{ flexGrow: 1, marginRight: theme.SIZES.BASE }}>
                <Text>&bull;</Text>
              </View>
              <View >
                <Text style={{ fontSize: 15 }}>一言で言って最低です こちらが電力について分からないのをいいことに無理やり島根銀行と一緒に約一時間も一方的に喋り脅してこられ契約したあとはだんまり。必要な書類や連絡も無しときましたので、解約です 直接島根銀行にクレームを言いましょう。</Text>
                <Text style={{ color: materialTheme.COLORS.INFO }}>0852-24-1171</Text>
                <Text> 2021-07-29 02:33:19</Text>
              </View>
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

  row: {
    flexDirection: 'row',
    padding: theme.SIZES.BASE,
    // flexWrap: 'wrap',
    // justifyContent: 'space-around',
    // alignItems: 'center',
  },

  label: {
    fontSize: 13,
    marginBottom: theme.SIZES.BASE / 2,
    marginTop: theme.SIZES.BASE
  },

  button: {
    // width: width / 4,
    color: 'black',
    borderRadius: 50,
    // elevation: 8,
    backgroundColor: materialTheme.COLORS.DEFAULT,
    paddingVertical: theme.SIZES.BASE / 1.4,
    paddingHorizontal: theme.SIZES.BASE * 2
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

  input: {
    borderRadius: 30,
    // borderColor: materialTheme.COLORS.INPUT,
    backgroundColor: materialTheme.COLORS.DEFAULT,
    color: 'black',
  }


});
