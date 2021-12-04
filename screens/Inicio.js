import React, { useState, useEffect, Component } from 'react';
import { render } from 'react-dom';
import {View, Text, StyleSheet, TouchableOpacity,Alert} from 'react-native';

//redux
import { connect } from 'react-redux';

class Inicio extends Component{

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
      const usuario = this.props.alarma.usuario;

      //crear alarma
      const response= await fetch('http://52.188.69.248:4000/api/alarma/crearAlarma',{
        method:'POST',
        //headers para contenidos de lo mensje
        headers:{
          'x-token':usuario,
          'Accept': 'application/json, text/plain, *',
          'Content-type':'application/json'
        }
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
      <View style={styles.screen}>
        <TouchableOpacity
          onPress={buttonClickedHandler}
          //onPress={crearAlarma()}
          style={styles.roundButton}>
          <Text style={styles.texto}>Alarma</Text>
        </TouchableOpacity>
        <Text style={styles.textoMensaje}>{Mensaje}</Text>
      </View>
    );
  }
}
/// Just some styles
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  texto:{
    color:'white',
    fontSize:40
  },
  textoMensaje:{
    paddingTop:10,
    color:'black',
    fontSize:20,
    textAlign:'center'
  },
  roundButton: {
    color:'red',
    marginTop: 20,
    width: 300,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 300,
    backgroundColor:'red',
  },
});

//redux
const mapStateToProps = (state) => {
  const { alarma} = state
  return { alarma }
};

export default connect(mapStateToProps)(Inicio);
