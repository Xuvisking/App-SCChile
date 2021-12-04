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


  postAlarma = async () =>{
    try{
      //capatar los input
      const usuario = await AsyncStorage.getItem('usuario');
      console.log(usuario);

      //crear alarma
      const response= await fetch('http://20.121.32.18:4000/crearAlarma',{
        method:'POST',
        //headers para contenidos de lo mensje
        headers:{
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
        <SafeAreaView style={{flex: 1, backgroundColor:'white', paddingTop: 50, alignItems: 'center', justifyContent:'center'}}>
            <TouchableHighlight onPress={() => buttonClickedHandler()}>
                <Image style={{width: 350, height: 350}} source={Images.sos} />
            </TouchableHighlight>
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
