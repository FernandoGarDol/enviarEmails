import Sequelize from 'sequelize';
import db from '../config/db.js'

export const Reservaciones = db.define('reservaciones', {
    nombre: {
        type: Sequelize.STRING
    },

    correo: {
        type: Sequelize.STRING
    },

    destino: {
        type: Sequelize.STRING
    },

    boletos: {
        type: Sequelize.STRING
    },
    codigo :{
        type: Sequelize.STRING
    },
    numero :{
        type: Sequelize.STRING
    }
});

