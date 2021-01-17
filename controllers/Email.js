import nodemailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';


let transporter = nodemailer.createTransport(smtpTransport ({     
    service: 'gmail', 
    host: 'smtp.gmail.com', 
    
    
    port: 993,
    secure: true,
    auth: {         
         user: 'admonviajess@gmail.com',         
         pass: 'fotografia23'     
    } 
}));

transporter.verify((err, success) => {
    if (err) console.error("Error al verificar: " +err);
    else 
    console.log('La configuracion del correo es correcta');
});

const mailOptions = { 
    from: 'admonviajess@gmail.com', // dirección del remitente 
    to: 'agenciaadeviajess@gmail.com', // lista de destinatarios 
    subject: 'Restablecer la contraseña', // Línea de asunto 
    text: 'Usted solicito restablecer su contraseña, del sistema de administracion de viajes.\n  Su usuario es: Administrador Martinez' + '.\nSu contraseña es: aDM3456S' // cuerpo de texto plano 
  };


const paginaEmail =  (req,res) =>{
    transporter.sendMail (mailOptions, function (err, info) { 
        if (err) 
          console.log ("Hay error al enviar mensaje" +err) 
        else 
          console.log ('Email sent:' + info.response);       
     })
    res.render('login',{
      error: "Se ha enviado un correo con los datos de inicio de sesion."
    });
};

export {paginaEmail};