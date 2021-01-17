
import express from 'express';
import router from './routes/index.js';
import morgan from 'morgan';
import db from './config/db.js';
import session from 'express-session';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import PassportLocals from 'passport-local'
import  serializeUser from 'passport';
var PassportLocal = PassportLocals.Strategy;
import fileUpload from 'express-fileupload';





import {Viaje}  from './models/Viaje.js'

const app = express();
app.use(express.urlencoded({extended: true}));
app.use(fileUpload()); 
//Define port
const port = process.env.PORT || 4500;

//conectar db 
db.authenticate()
.then ( () => console.log('Base de datos conectada'))
.catch ( error => console.log(error))   ;



//Habilita Pug
app.set('view engine', 'pug');

//Obteniedo año actual (variables Globales)
app.use((req, res, next ) =>{
    const year = new Date();
    res.locals.actualYear = year.getFullYear();  //Agrega las variables actual year a las vistas pug
    res.locals.nombreSitio = "Agencia De Viajes"
    return next();  
})


//Definir la carpeta publica
app.use(express.static('public'));




//----------------------- Inicio de Sesion
app.use(session({
    secret: 'secreto',
    resave: true,
    saveUninitialized: true
 }));




/// Nodemailer




/////////////////////////////


 //configurar passport

 app.use(passport.initialize());
 app.use(passport.session());


passport.use(new PassportLocal(function(usenarme,password,done){
    if(usenarme === "Administrador Martinez" && password === "aDM3456S"){
        return done (null, {id:1 , name: "Fernando"}); //El usuarui Fernando Inicio Sesion    
    }

    done(null,false); //No se paso la autenticacion de los datos
}));

//Serializacion
passport.serializeUser(function(user,done){
    done(null,user.id);
})

passport.deserializeUser(function(id,done){
    done(null,{id: 1, name: "Fernando"});
})

//Definir la carpeta publica
app.use(express.static('public'));  




//DEfine rutas
app.use('/', router);




app.listen(port, () =>{
    console.log(`El servidor esta corriendo en el puesto ${port}`)
})



