import React, { useState } from 'react'
import { StyleSheet, Dimensions, ScrollView, View} from 'react-native'
import { Block, Text, theme } from 'galio-framework'

import Header from '../components/Header'

import materialTheme from '../../constants/Theme'
import * as MainServices from '../../services/mainService'

const { width, height } = Dimensions.get('screen')
const iPhoneX = () => Platform.OS === 'ios' && (height === 812 || width === 812 || height === 896 || width === 896);

export default function EditComment({ navigation, route })
{
  const [comments, setComments] = useState(route.params.data.com.data)

  const plus = (comment) =>
  {
    MainServices.commentPlus({
      id: comment.id,
      area: comment.area_code,
      city: comment.city_code,
      number: comment.telephone_numbers
    }).then(result =>
    {
      setComments(result.data.data)
    })
  }

  const minus = (comment) =>
  {
    MainServices.commentMinus({
      id: comment.id,
      area: comment.area_code,
      city: comment.city_code,
      number: comment.telephone_numbers
    }).then(result =>
    {
      setComments(result.data.data)
    })
  }

  const delReq = (comment) =>
  {
    MainServices.delReq({
      id: comment.id,
      area: comment.area_code,
      city: comment.city_code,
      number: comment.telephone_numbers
    }).then(result =>
    {
      setComments(result.data.data)
    })
  }


  return (
    <>
      <Header title={'コメントログビューア'} move={'EditInfo'} data={route.params.data} navigation={navigation}></Header>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Block flex style={styles.home}>
          {
            comments.map((comment, index) =>
            (
              <View style={{ marginBottom: theme.SIZES.BASE / 2 }} key={index}>
                <View style={{ flex: 1, }} >
                  <View style={styles.row}>
                    <View style={{ flexGrow: 1, marginRight: theme.SIZES.BASE }}>
                      <Text>&bull;</Text>
                    </View>
                    <View style={{ flexGrow: 10 }} >
                      <Text style={{ fontSize: 15 }}>{comment['comments']}</Text>
                      {/* <Text style={{ color: materialTheme.COLORS.INFO }}>0852 - 24 - 1171</Text> */}
                      <Text> {comment['created_at']}</Text>
                    </View>
                  </View>
                </View>
                <View style={{ flex: 1 }}>
                  <View style={styles.row}>
                    <View style={[styles.row, styles.alignCenter]}>
                      <Text style={[styles.button, { backgroundColor: materialTheme.COLORS.INFO }]} onPress={() => plus(comment)}>プラス</Text>
                      <Text> :{comment.plus}</Text>
                    </View>
                    <View style={[styles.row, styles.alignCenter]}>
                      <Text style={[styles.button, { backgroundColor: materialTheme.COLORS.ERROR }]} onPress={() => minus(comment)}>マイナス</Text>
                      <Text> :{comment.minus}</Text>
                    </View>
                    <View style={[styles.row, styles.alignCenter]}>
                      <Text style={[styles.button, { backgroundColor: materialTheme.COLORS.MUTED }]} onPress={() => delReq(comment)}>削除依頼</Text>
                      <Text> :{comment.sakujo}</Text>
                    </View>
                  </View>
                </View>
              </View>
            ))
          }
        </Block>
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  home: {
    width: width,
    padding: theme.SIZES.BASE
  },

  alignCenter: {
    alignItems: 'center',
  },

  row: {
    flexDirection: 'row',
    paddingLeft: theme.SIZES.BASE,
    paddingRight: theme.SIZES.BASE,
    paddingTop: theme.SIZES.BASE / 2,
    // flexWrap: 'wrap',
    // justifyContent: 'space-around',
  },
  button: {
    color: 'white',
    borderRadius: iPhoneX ? 18 : 30,
    paddingVertical: theme.SIZES.BASE / 1.4,
    paddingHorizontal: theme.SIZES.BASE / 1.5,
    overflow: iPhoneX ? 'hidden' : null
  },


})
