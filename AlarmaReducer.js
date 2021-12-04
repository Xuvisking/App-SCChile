import { combineReducers } from 'redux';
 
const INITIAL_STATE = {
  usuario:'token:holasoyeltoken123',
  estadoAlarma: 'Inactivo',
};
 
const alarmaReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    //cuando se llama a crear alamar, esta cambia el estado principal a activa
    case 'crear_alarma':
      //luego al momento de crear la alarma, podria enviar el token a la api y el estado de esta
      const {usuario,estadoAlarma}=state;
      const nuevoEstado='Activo';
      const newState = {usuario,nuevoEstado};
      return newState;

    case 'addUser':
      return {
        estadoAlarma:state.estadoAlarma,
        usuario:action.payload
      };
    default:
      return state
  }
};
 
export default combineReducers({
  alarma: alarmaReducer
});