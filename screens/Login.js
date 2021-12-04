import React, { useState } from 'react';
import {Alert,
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
  TextComponent
} from 'react-native';
import { Block, Checkbox, Text, Button as GaButton, theme } from 'galio-framework';
//redux
import { connect } from 'react-redux';
import { addUsuario } from './../AlarmaAction';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, Icon, Input,} from '../components';
import { Images, nowTheme } from '../constants';
import { and } from 'react-native-reanimated';

const { width, height } = Dimensions.get('screen');

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>{children}</TouchableWithoutFeedback>
);

class Login extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = {
      usuario:'',
      clave:''
    }
  }
  Login = async () =>{
    try{
      //capatar los input
      const{usuario} = this.state;
      const{clave} = this.state;
      console.log(usuario,' // ',clave);

      //consulta login vecino
      const response= await fetch('http://20.121.32.18:4000/loginVecino',{
        method:'POST',
        //headers para contenidos de lo mensje
        headers:{
          'Accept':'application/json',
          'Content-type':'application/json'
        },
        body:JSON.stringify({id:usuario,password:clave})
      });

      const user= await response.json();
      

      if(user.msg){
        Alert.alert(user.msg);
      }else{
        console.log('respues servidor',user)
        await AsyncStorage.setItem('usuario', user.id);
        await AsyncStorage.setItem('token', user.token);
        if (clave==="12345" & user.ok ===true ) {
        this.props.navigation.navigate('PassChange');
        } else {
        this.props.navigation.navigate('Mainmenu');
        }
      }
      
      
    }catch (error){
      console.log(error);
    }
    //enviar todos los datos por pos ya que es un login 
  }

  render() {
    return (
      <DismissKeyboard>
        <Block flex middle>
          <ImageBackground
            source={Images.RegisterBackground}
            style={styles.imageBackgroundContainer}
            imageStyle={styles.imageBackground}
          >
            <Block flex middle>
              <Block style={styles.registerContainer}>
                <Block flex space="evenly">
                  <Block flex={0.4} middle style={styles.socialConnect}>
                    <Block flex={0.5} middle>
                      <Text
                        style={{
                          fontFamily: 'montserrat-regular',
                          textAlign: 'center'
                        }}
                        color="#333"
                        size={24}
                      >
                        Iniciar Sesión
                      </Text>
                    </Block>
                  </Block>
                  <Block flex={1} middle space="between">
                    <Block center flex={0.9}>
                      <Block flex space="between">
                        <Block>
                            <Text
                                style={{
                                    fontFamily: 'montserrat-regular',
                                    textAlign: 'left'
                                  }}
                                  color="#333"
                                  size={15}
                            >
                                Usuario
                            </Text>
                          <Block width={width * 0.8} style={{ marginBottom: 5 }}>
                            <Input
                              placeholder="Identificación del Usuario"
                              style={styles.inputs}
                              name="id"
                              onChangeText={usuario => this.setState({usuario})}
                              //onChange={handleInputChange}
                              iconContent={
                                <Icon
                                  size={16}
                                  color="#ADB5BD"
                                  name="profile-circle"
                                  family="NowExtra"
                                  style={styles.inputIcons}
                                />
                              }
                            />
                          </Block>
                          <Text
                                style={{
                                    fontFamily: 'montserrat-regular',
                                    textAlign: 'left'
                                  }}
                                  color="#333"
                                  size={15}
                            >
                                Contraseña
                            </Text>
                          <Block width={width * 0.8} style={{ marginBottom: 5 }}>
                            <Input
                              placeholder="Contraseña"
                              secureTextEntry={true}
                              onChangeText={clave => this.setState({clave})}
                              style={styles.inputs}
                              name="password"
                              //onChange={handleInputChange}
                              iconContent={
                                <Icon
                                  size={16}
                                  color="#ADB5BD"
                                  name="key-252x"
                                  family="NowExtra"
                                  style={styles.inputIcons}
                                />
                              }
                            />
                          </Block>
                        </Block>
                        <Block center>
                          <Button 
                            color="primary" 
                            round 
                            style={styles.createButton}
                            //,() => this.props.navigation.navigate('BotonAlerta')
                            onPress={this.Login}
                            //onPress={() => this.props.navigation.navigate('BotonAlerta')}
                            >
                            <Text
                              style={{ fontFamily: 'montserrat-bold' }}
                              size={14}
                              color={nowTheme.COLORS.WHITE}
                            >
                              Iniciar Sesión
                            </Text>
                          </Button>
                        </Block>
                      </Block>
                    </Block>
                  </Block>
                </Block>
              </Block>
            </Block>
          </ImageBackground>
        </Block>
      </DismissKeyboard>
    );
  }
}
//redux

const mapStateToProps = (state) => {
  const { alarma} = state
  return { alarma }
};
const mapDispatchToProps = {  
    // despacho de acciones simples
    addUsuario,
};

const styles = StyleSheet.create({
  imageBackgroundContainer: {
    width: width,
    height: height,
    padding: 0,
    zIndex: 1
  },
  imageBackground: {
    width: width,
    height: height
  },
  registerContainer: {
    marginTop: 55,
    width: width * 0.9,
    height: height < 812 ? height * 0.8 : height * 0.8,
    backgroundColor: nowTheme.COLORS.WHITE,
    borderRadius: 4,
    shadowColor: nowTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
    overflow: 'hidden'
  },
  socialConnect: {
    backgroundColor: nowTheme.COLORS.WHITE
    // borderBottomWidth: StyleSheet.hairlineWidth,
    // borderColor: "rgba(136, 152, 170, 0.3)"
  },
  socialButtons: {
    width: 120,
    height: 40,
    backgroundColor: '#fff',
    shadowColor: nowTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1
  },
  socialTextButtons: {
    color: nowTheme.COLORS.PRIMARY,
    fontWeight: '800',
    fontSize: 14
  },
  inputIcons: {
    marginRight: 12,
    color: nowTheme.COLORS.ICON_INPUT
  },
  inputs: {
    borderWidth: 1,
    borderColor: '#E3E3E3',
    borderRadius: 21.5
  },
  passwordCheck: {
    paddingLeft: 2,
    paddingTop: 6,
    paddingBottom: 15
  },
  createButton: {
    width: width * 0.5,
    marginTop: 25,
    marginBottom: 40
  },
  social: {
    width: theme.SIZES.BASE * 3.5,
    height: theme.SIZES.BASE * 3.5,
    borderRadius: theme.SIZES.BASE * 1.75,
    justifyContent: 'center',
    marginHorizontal: 10
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
