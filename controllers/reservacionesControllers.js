import { Reservaciones } from '../models/Reservaciones.js'
import { Viaje } from '../models/Viaje.js'

import nodemailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';

const guardarReservaciones = async (req, res) => {

    //validar cadenas vacias

    const { nombre, boletos, correo, destino,numero } = req.body;

    const codigo = makeid();

    const errores = [];
    var cBoletos = parseInt(boletos.trim());
    var exito;

    if (nombre.trim() === '') {
        errores.push({ mensaje: 'El nombre esta vacio. Favor de ingresarlo' });
    }
    if (boletos.trim() === '') {
        errores.push({ mensaje: 'La cantidad de boletos esta vacio. Favor de ingresarlo' });
    }
    if (correo.trim() === '') {
        errores.push({ mensaje: 'El correo esta vacio. Favor de ingresarlo' });
    }
    if (numero.trim() === '') {
        errores.push({ mensaje: 'El numero esta vacio. Favor de ingresarlo' });
    }

    
    if (cBoletos > 0) {
        try {
            const cb = await Viaje.findAll(
                { where: { titulo: destino } }
            );

            var cantidadDisponible;

            cb.find(function (element) {
                if (element.disponibles > 0)
                    cantidadDisponible = element.disponibles;
                else
                    cantidadDisponible = 0;
            });

            var boletosRestantes = cantidadDisponible - cBoletos;

            if (!(cantidadDisponible > 0 && boletosRestantes > 0))
                errores.push({ mensaje: 'No hay suficientes boletos' });
        } catch (error) {
            console.log("hay error" + error);
        }
    }

    const viajes = await Viaje.findAll({
        order: [['id', 'DESC']]
    });

    if (errores.length > 0) {
        res.render('reservacion', {
            errores,
            nombre, correo, boletos, destino, viajes, numero
        });
    } else {
        //Almacenar en la base de datos
        try {
            await Reservaciones.create({  //Insercion en LA BASE DE DATOS
                nombre,
                correo,
                destino,
                boletos,
                codigo,
                numero
            });

            await Viaje.update({ disponibles: boletosRestantes }, { where: { titulo: destino } })

            const id = await Reservaciones.findAll(
                { where: { destino: destino } }
            );

            var iden, email;

            id.find(function (element) {
                iden = element.id;
                email = element.correo;
            });

            const pre = await Viaje.findAll(
                { where: { titulo: destino } }
            );

            var precio;

            pre.find(function (element) {
                precio = element.precio;
            });

            let transporter = nodemailer.createTransport(smtpTransport({
                service: 'gmail',
                host: 'smtp.gmail.com',


                port: 993,
                secure: true,
                auth: {
                    user: 'admonviajess@gmail.com',
                    pass: 'fotografia23' 
                },
                tls: {
                    rejectUnauthorized: false
                }
            }));

            transporter.verify((err, success) => {
                if (err) console.error("Error al verificar: " + err);
                else
                    console.log('La configuracion del correo es correcta');
            });

            const mailOptions = {
                from: 'admonviajess@gmail.com', // direcci�n del remitente 
                to: email, // lista de destinatarios 
                subject: 'Proceso de pago', // L�nea de asunto 
                text: 'Hola ' + nombre+ '!!!. Usted ha solicitado una reservacion de vuelo mediante nuestra Pagina Web. \n Sus datos :\n ID: ' + iden + '\n Nombre: ' + nombre + '\n Destino: ' + destino + '\n Numero de Boletos: ' + boletos + '\n Codigo de Reservación:' + codigo +'\n Usted debe de pagar en la siguiente cuenta bancaria MX 13 2090 0000 29 0350000083 la cantidad de $' + (precio*boletos)// cuerpo de texto plano 
            };

            transporter.sendMail(mailOptions, function (err, info) {
                if (err)
                    console.log("Hay error al enviar mensaje" + err)
                else
                    console.log('Email sent:' + info.response);
            })

            exito = 'Se le ha enviado un correo donde se indica el proceso de pago';

            res.render('reservacion',{
                exito, viajes
            });
        } catch (error) {

        }
    }
    console.log(errores)

}



function makeid() { 
    var text = ""; 
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"; 
    for (var i = 0; i < 6; i++) 
        text += possible.charAt(Math.floor(Math.random() * possible.length)); 
    return text; 
} 

export { guardarReservaciones};
