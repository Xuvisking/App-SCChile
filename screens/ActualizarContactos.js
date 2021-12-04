import React, { useState, useEffect, Component } from 'react';
import { render } from 'react-dom';
import {View, StyleSheet,Alert} from 'react-native';
import { Card, ListItem, Button,Icon, Input } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';

function ActualizarContactos({route, navigation}){
   //hook vecino, para actualizar datos
  //para obetener los contactos necesito el id el vecino.

  const datos=route.params;
  var data=datos;

  //
    return(
      <View style={styles.screen}>
        <Card >
          <Card.Title>Actualizar Informacion Para Emergencias
          </Card.Title>
          <Card.Divider/>
          <Input
                label="Contacto Emergencia 1"
                placeholder={datos.name_contact}
                leftIcon={{ name: 'person-add' }}
                style={styles}
                onChangeText={ name_contact => data.name_contact=name_contact}
          />
          <Input
                label="Telefono Emergencia 1"
                placeholder={datos.numb_contact}
                leftIcon={{name: 'call' }}
                style={styles}
                onChangeText={ numb_contact => data.numb_contact=numb_contact}
          />
          <Input
                label="Contacto Emergencia 2"
                placeholder={datos.name_contact2}
                leftIcon={{ name: 'person-add' }}
                style={styles}
                onChangeText={ name_contact2 => data.name_contact2=name_contact2}
          />
          <Input
                label="Telefono Emergencia 2"
                placeholder={datos.numb_contact2}
                leftIcon={{ name: 'call' }}
                style={styles}
                onChangeText={ numb_contact2 => data.numb_contact2=numb_contact2}
          />
          <Button s title="Actualizar" onPress={() => UpdateContactos(data)}/>
          <Card.Divider/>

        </Card>
      </View>
      
    );

}
/// Just some styles
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
  },
  texto:{
    color:'black',
    fontSize:20
  },
  titulo:{
    color:'black',
    fontSize:40
  },
  subtitlo:{
    color:'black',
    fontSize:30
  },subtitleView: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingTop: 5
  },
  ratingImage: {
    height: 19.21,
    width: 100
  },
  ratingText: {
    paddingLeft: 10,
    color: 'grey'
  },
  boton:{
    justifyContent: 'space-between',
  },
});
UpdateContactos= async (datosActualizados) =>{

  try{
    const token = await AsyncStorage.getItem('token');
    console.log(datosActualizados)
    const response= await fetch(`http://52.188.69.248:4000/api/vecino/updateVecinoApp`,{
      method:'POST',
      headers:{
        'x-token':token,
        'Accept':'application/json',
        'Content-type':'application/json'
      },
      body:JSON.stringify({
        name_contact:datosActualizados.name_contact,
        numb_contact:datosActualizados.numb_contact,
        name_contact2:datosActualizados.name_contact2,
        numb_contact2:datosActualizados.numb_contact2
      })
    });

    const infoContacto= await response.json();
    console.log('respues servidor',infoContacto);

    if(infoContacto.msg){
      Alert.alert('Actualizacion',infoContacto.msg,{ text: "OK", onPress: () => navigation.goBack() });
    }
  }catch (error){
    console.log(error);
  }
  
  //enviar todos los datos por pos ya que es un login 
}
export default ActualizarContactos;
