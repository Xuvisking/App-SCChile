// import React from 'react';
// import { ImageBackground, Image, StyleSheet, StatusBar, Dimensions, Platform } from 'react-native';
// import { Block, Button, Text, theme } from 'galio-framework';
// import { Images, nowTheme } from '../constants/';
// import { HeaderHeight } from '../constants/utils';
// import Carousel from 'react-native-snap-carousel';
// const { height, width } = Dimensions.get('screen');

import * as React from 'react';
import {
  Text,
  Image, 
  View,
  SafeAreaView } from 'react-native';
import { Button } from 'react-native-paper';

import { Images } from '../constants/';

import Carousel from 'react-native-snap-carousel';

class Intro extends React.Component {

  constructor(props){
      super(props);
      this.state = {
        activeIndex:0,
        carouselItems: [
        {
            image: Images.logo,
            title:"BIENVENIDOS A SCChile-APP",
            text: "Donde será un lugar seguro para ti y toda tu familia",
        },
        {
            image:Images.alarm,
            title:"SISTEMA DE ALARMA",
            text: "Entraras sistemas de alarmas, las cuales te brindaran todo el apoyo durante una emergencia",
        },
        {
            image:Images.escolta,
            title:"ESCOLTAS",
            text: "Además podras pedir escoltas para llevarte a fuera del condominio",
        },
      ]
    }
  }

  _renderItem({item,index}){
    return (
      <View style={{
          backgroundColor:'#EEF5FD',
          borderRadius: 8,
          height: 500,
          padding: 25,
          marginLeft: 30,
          marginRight: 50, }}>
        <Image 
          style={{
            flex: 1,
            width: null,
            height: null,
            resizeMode: 'contain'
          }}
          source = {item.image}
        />
        <Text style={{fontSize: 35, textAlign: 'center', color:'#6B8599'}}>{item.title}</Text>
        <Text style={{fontSize: 20, textAlign: 'center', color:'#6B8599'}}>{item.text}</Text>

      </View>

    )
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor:'white', paddingTop: 50, }}>
        <View style={{ flex: 1, flexDirection:'row', justifyContent: 'center', }}>
            <Carousel
              layout={"default"}
              ref={ref => this.carousel = ref}
              data={this.state.carouselItems}
              sliderWidth={300}
              itemWidth={420}
              renderItem={this._renderItem}
              onSnapToItem = { index => this.setState({activeIndex:index}) } />
        </View>
        <Button mode="contained" onPress={() => this.props.navigation.navigate('Login')}>
          ingresar
        </Button>
      </SafeAreaView>
    );
  }
}

// const styles = StyleSheet.create({
//     container: {
//       backgroundColor: theme.COLORS.BLACK,
//       marginTop: Platform.OS === 'android' ? -HeaderHeight : 0
//     },
//     padded: {
//       paddingHorizontal: theme.SIZES.BASE * 2,
//       zIndex: 3,
//       position: 'absolute',
//       bottom: Platform.OS === 'android' ? theme.SIZES.BASE * 2 : theme.SIZES.BASE * 3
//     },
//     button: {
//       width: width - theme.SIZES.BASE * 4,
//       height: theme.SIZES.BASE * 3,
//       shadowRadius: 0,
//       shadowOpacity: 0
//     },
  
//     gradient: {
//       zIndex: 1,
//       position: 'absolute',
//       bottom: 0,
//       left: 0,
//       right: 0,
//       height: 66
//     }
// });

export default Intro;