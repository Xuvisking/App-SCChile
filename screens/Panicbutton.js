// import React, { useState, useEffect, Component } from 'react';
// import { Card, ListItem, Button, Icon } from 'react-native-elements';
// import { Text, Image, View, SafeAreaView, TouchableHighlight } from 'react-native';

// import { Images } from '../constants/';

// const panicbuttonRoute = () => {
//     return (
//         <SafeAreaView style={{flex: 1, backgroundColor:'white', paddingTop: 50, alignItems: 'center', justifyContent:'center'}}>
//             <TouchableHighlight onPress={() => this.moveToAddNewCustomer()}>
//                 <Image style={{width: 350, height: 350}} source={Images.sos} />
//             </TouchableHighlight>
//         </SafeAreaView>
//       );
//     };

// export default panicbuttonRoute;

import React, { useState, useEffect, Component } from 'react';
import { render } from 'react-dom';
import {Image, Text, SafeAreaView, TouchableHighlight, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Paragraph, Dialog, Portal, Card, List, Button, TextInput } from 'react-native-paper';

import { Images } from '../constants/';

//redux
import { connect } from 'react-redux';

class panicbuttonRoute extends Component{

  constructor(props){
    super(props);
    
    this.state = {
      Estado:"",
      Mensaje:""
    };
    //para no perder contexto del componente
    this.handlefortuna = this.handlefortuna.bind(this);

  }
  //funcion que modifica el valor del alerta
  handlefortuna(valor){
    const {Estado,Mensaje} = this.state;
    this.setState({Estado:valor});
    this.setState({Mensaje:'Hemos recibido su alarma, estamos enviado ayuda...'});
  }

  NoDisponible = () => {
    Alert.alert("Aún no disponible")
  }


  postAlarma = async () =>{
    try{
      //capatar los input
      const usuario = await AsyncStorage.getItem('usuario');
      const token = await AsyncStorage.getItem('token');
      console.log(usuario);

      //crear alarma
      const response= await fetch('http://20.121.32.18:4000/crearAlarma',{
        method:'POST',
        //headers para contenidos de lo mensje
        headers:{
          'x-token': token,
          'Accept':'application/json',
          'Content-type':'application/json'
        },
        body:JSON.stringify({idvecino:usuario})
      });
      const data= await response.json();
      console.log(data);
      this.handlefortuna('Activo');
      if(data.msg){
        Alert.alert(data.msg);
      }
      
    }catch (error){
      console.log(error);
    }
  }


  CrearAlarma = async () =>{
    console.log('=============================');
    console.log('Creando alarma...');
    console.log('=============================');

    Alert.alert(
      "Confirmación de alarma activada",
      "Confirma la alerta para enviar una patrulla en tu ayuda.",
      [
        {
          text: "Cancelar",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Confirmar", onPress: () => {
            console.log("OK Pressed");
            this.postAlarma();
          }
        }
      ],
      { cancelable: false }
    );
  }
  solicitudCancelaralarma = async (idalarma) =>{
    console.log(idalarma)
    try{
      //capatar los input
      const token = await AsyncStorage.getItem('token');

      //consulta login vecino
      const response= await fetch('http://20.121.32.18:4000/cancelarAlarma',{
        method:'POST',
        //headers para contenidos de lo mensje
        headers:{
          //'x-token': token,
          'x-token': token,
          'Accept':'application/json',
          'Content-type':'application/json'
        },
        body:JSON.stringify({idalarma:idalarma})
      });
  
      const res= await response.json();
      console.log('Respuesta del servidor:',res)
      if (res.code === 200) {
        Alert.alert(
          "Estado de la alarma",
          "La alarma ha sido cancelada",
          [
            { text: "Ok", onPress: () => {
                console.log("OK Pressed");
              }
            }
          ],
          { cancelable: false }
        );
      }
      
    }catch (error){
      console.log(error);
    }
    //enviar todos los datos por pos ya que es un login 
  }

  cancelarAlarma = async () => {
    try{
      const usuario = await AsyncStorage.getItem('usuario');
      const token = await AsyncStorage.getItem('token');
      const url = `${'http://20.121.32.18:4000/Alarma'}/${usuario}`;
      //consulta login vecino
      const response= await fetch(url,{
        method: 'GET',
        mode: 'cors',
        credentials: 'omit',
        referrerPolicy: 'no-referrer',
        headers: {
          'x-token': token
        }
      });
  
      const res= await response.json();
      //console.log('Respuesta del servidor:',res)
      if (res.code === 200) {
        const largores = res.rows.rows.length
        console.log(res)
        if (res.rows.rows[largores-1].estado === "activa") {
          this.solicitudCancelaralarma(res.rows.rows[largores-1].idalarma);
        } else {
          Alert.alert(
            "Estado de la alarma",
            "La alarma aun no ha sido solicitada",
            [
              { text: "Ok", onPress: () => {
                  console.log("OK Pressed");
                }
              }
            ],
            { cancelable: false }
          );
        }
      } else {
        Alert.alert(
          "Estado de la alarma",
          "La alarma aun no ha sido solicitada",
          [
            { text: "Ok", onPress: () => {
                console.log("OK Pressed");
              }
            }
          ],
          { cancelable: false }
        );
      }
      
    }catch (error){
      console.log(error);
    }
    //enviar todos los datos por pos ya que es un login 
  }
    
  render(){
    
    
    //aqui guardar el estado
    const {Estado,Mensaje}= this.state;
  
    //despliegues
    const buttonClickedHandler = () => {
        console.log('===============================================================')
        console.log('Boton:ALerta Activada!!! desde');
        //traigo el token de redux y se lo entrego a el boton
        this.CrearAlarma();
        
    }
    return(
        <SafeAreaView style={{flex: 1, backgroundColor:'white', justifyContent:'center'}}>
          <Card style={{ paddingTop: 50, alignItems: 'center', justifyContent:'center'}}>
            <TouchableHighlight onPress={() => buttonClickedHandler()}>
                <Image style={{width: 350, height: 350}} source={Images.sos} />
            </TouchableHighlight>
          </Card>
          <Card  style={{alignItems: 'center', justifyContent:'center'}}>
            <Button icon="cancel" mode="contained" onPress={() => this.cancelarAlarma()}>
              Cancelar alarma
            </Button>
          </Card>
          <Card  style={{paddingTop: 10,alignItems: 'center', justifyContent:'center'}}>

            <Button  icon ="map-marker" mode="contained" onPress={() => this.NoDisponible()}>
              Enviar ubicación
            </Button>
          </Card>
        </SafeAreaView>
    );
  }
}


//redux
const mapStateToProps = (state) => {
  const { alarma} = state
  return { alarma }
};

export default connect(mapStateToProps)(panicbuttonRoute);
