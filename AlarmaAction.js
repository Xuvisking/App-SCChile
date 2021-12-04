export const addAlarma = (alarmaIndex) => (
    {
      type: 'crear_alarma',
      payload: alarmaIndex,
    }
);
export const addUsuario = (usuarioIndex) => (
    {
      type: 'addUser',
      payload: usuarioIndex,//tendra la token del usuario
    }
);