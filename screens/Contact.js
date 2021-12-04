import React, { useState, useEffect, Component } from 'react';
import { Paragraph, Dialog, Portal, Card, List, Button, TextInput } from 'react-native-paper';
import {RefreshControl, ScrollView, Image, Text,StyleSheet, SafeAreaView, TouchableHighlight, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

const contactRoute = () => {
  const [visible, setVisible] = React.useState(false);
  const [labelContact, setlabelContact] = React.useState('');
  const [placeholderContact, setplaceholderContact] = React.useState('');
  const [text, setText] = React.useState('');
  const [type, setType] = React.useState('');
  const [id, setId] = React.useState('');
  const [list, setList] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getList();
  }, []);

  const hideDialog = () => {
    setVisible(false);
  }

  const seeDialog = (title,description,type,id) => {
    setVisible(true);
    setlabelContact(title);
    setplaceholderContact(description);
    setType(type);
    setId(id);
  }

  const getList = async () => {
    try{
      if (list.length>0){
        const largo = list.length;
        for (let index = 0; index < largo; index++) {
          list.pop();
        }
      }
      console.log(list.length); 
      //setList(list.length = 0)
      const usuario = await AsyncStorage.getItem('usuario');
            //Tomar el valor de id desde asycstorage
            //consultar Datos del vecino
            const url = `${'http://20.121.32.18:4000/contacto'}/${usuario}`;
            const response= await fetch(url,{
              method:'GET',
              //headers para contenidos de lo mensje
              headers:{
                'Accept':'application/json',
                'Content-type':'application/json'
              }
            });
      
            const infoContacto= await response.json();
            //console.log('respues servidor',infoContacto);
            for (let index = 0; index < infoContacto.rows.rows.length; index++) {
              list.push( 
                {                 
                  title:"Contacto #" + (index+1),
                  description:infoContacto.rows.rows[index].nombre,
                  icon:"contacts",
                  type:'contacto',
                  id:infoContacto.rows.rows[index].telefono   
                },
                {                 
                  title:"Numero Telefonico #" + (index+1),
                  description:infoContacto.rows.rows[index].telefono,
                  icon:"cellphone",
                  type:'telefono',
                  id:infoContacto.rows.rows[index].nombre
                }
              )
              
            }

            setList(list);
            setRefreshing(false)

            //console.log(list);
            
          }catch (error){
            console.log(error);
            setRefreshing(false)
          }
          //enviar todos los datos por pos ya que es un login 
  }

  const changeData = async (type, text) => {
      try{
        if (type === "contacto") {
          const response= await fetch('http://20.121.32.18:4000/contacto/actualizar',{
            method:'POST',
            //headers para contenidos de lo mensje
            headers:{
              'Accept':'application/json',
              'Content-type':'application/json'
            },
            body:JSON.stringify({telefono:id, nombre:text,telefononuevo:id})
          });
          const res= await response.json();
          console.log('Respuesta del servidor:',res)
          if (res.code === 200) {
            Alert.alert(
              "Cambio de dato",
              "El cambio ha sido exitoso",
              [
                { text: "Ok", onPress: () => {
                    console.log("OK Pressed");
                  }
                }
              ],
              { cancelable: false }
            );
          } else {
            Alert.alert(
              "Cambio de dato",
              "Error en el cambio, contactese con el administrador",
              [
                { text: "Ok", onPress: () => {
                    console.log("OK Pressed");
                  }
                }
              ],
              { cancelable: false }
            );
          }

        } else if (type === "telefono") {
          const response= await fetch('http://20.121.32.18:4000/contacto/actualizar',{
            method:'POST',
            //headers para contenidos de lo mensje
            headers:{
              'Accept':'application/json',
              'Content-type':'application/json'
            },
            body:JSON.stringify({telefono:placeholderContact, nombre:id,telefononuevo:text})
          });
          const res= await response.json();
          console.log('Respuesta del servidor:',res)
          if (res.code === 200) {
            Alert.alert(
              "Cambio de dato",
              "El cambio ha sido exitoso",
              [
                { text: "Ok", onPress: () => {
                    console.log("OK Pressed");
                  }
                }
              ],
              { cancelable: false }
            );
          } else {
            Alert.alert(
              "Cambio de dato",
              "Error en el cambio, contactese con el administrador",
              [
                { text: "Ok", onPress: () => {
                    console.log("OK Pressed");
                  }
                }
              ],
              { cancelable: false }
            );
          }
        }
          setText('');
          setVisible(false);

      }catch (error){
        console.log(error);
        setVisible(false);
      }
      //enviar todos los datos por pos ya que es un login 
    }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor:'white', paddingTop: 50}}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
        <Card>
          <Card.Content>
            <List.Section title="Lista de contactos">
              {
                list.map((item, i) => (
                  <List.Item 
                    key={i} 
                    title= {item.title}
                    description= {item.description}
                    left={props => <List.Icon {...props} icon={item.icon} />}
                    right={props => 
                      <Button style={{paddingTop:0,paddingLeft:10, height: 40}} icon="pencil" mode="contained" onPress={() => seeDialog(item.title,item.description,item.type,item.id)}></Button>}
                    />
                  
                  ))
              }
            </List.Section>
          </Card.Content>
        </Card>
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Content>
              <List.Section title="Editar dato"> 
                <TextInput
                  mode = 'outlined'
                  label={labelContact}
                  placeholder={placeholderContact}
                  value={text}
                  onChangeText={text => setText(text)}
                />
              </List.Section>
              <Button icon="pencil" mode="contained" onPress={() => changeData(type,text)}>
                 Confirmar cambio
              </Button>
            </Dialog.Content>
          </Dialog>
        </Portal>
        </ScrollView>
      </SafeAreaView>
  );
};

export default contactRoute;
