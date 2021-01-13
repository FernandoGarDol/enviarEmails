import {Viaje}  from '../models/Viaje.js'
import { Testimonial } from '../models/Testimoniales.js'
import { Reservaciones } from '../models/Reservaciones.js'
import PassportLocals from 'passport-local'
import  serializeUser from 'passport';
var PassportLocal = PassportLocals.Strategy;
import passport from 'passport';


const paginaInicio= async (req, res) => {
    //consultar 3 viajes del modelo viaje

    try {
        const viajes = await Viaje.findAll({limit:3, order:[['id','DESC']]}  );


        const testimoniales = await Testimonial.findAll({limit:3, order:[['id','DESC']]}  );

        res.render('inicio',{
            pagina: 'Inicio',
            home: 'home',
            viajes,
            testimoniales

        });
    } catch (error) {
        console.log(error);
    }

   
}

const hola= 2+7;
const paginaNosotros =  (req, res) => {
    req.logout();
    res.render('nosotros', {
        pagina: 'Nosotros',
        hola : hola
    });

}

const paginaViajes =  async (req, res) => {
    req.logout();
    try {
        const viajes = await Viaje.findAll({
            order:[['id','DESC']]
        });
        console.log(viajes);
        res.render('viajes',{
            pagina: 'Proximos Viajes',
            viajes
        });
    } catch (error) {
        
    }    
}

const paginaTestimoniales = async (req, res) => {
    req.logout();
    try {
        const testimoniales = await Testimonial.findAll();
        res.render('testimoniales',{
            pagina: 'Testimoniales',
            testimoniales
            });
    }catch(error){
        console.log(error);
    }

    
}

const paginaDetalleVIajes = async (req,res) =>{
    req.logout();
    const {slug} = req.params;

    try{
        const viaje = await Viaje.findOne({where: {slug}})

        res.render('viaje', {
            pagina: 'Informacion Viaje',
            viaje
        })
    }catch(error){
        console.log("hay error" + error);
    }
}

const paginaLogout = (req, res) =>{
    req.logout();
    res.redirect('/login');
}

const paginaLoginGet = (req, res)=> {
    //Mostrar el formulario de login
    res.render('login')
}

const paginaLoginPost = passport.authenticate("local",   {
    successRedirect: "/admin",
    failureRedirect: "/login"    
});

const paginaAdmin = (req,res,next) =>{
    if(req.isAuthenticated()) res.render("admin");;

    res.redirect("/login");
}

const paginaAdmin2 = (req,res,next) =>{
    if(req.isAuthenticated()) res.render("admin2");;

    res.redirect("/login");
}

const paginaReservacionesAdmin = async (req, res) => {
    try {
        const reservaciones = await Reservaciones.findAll({
            order: [['id', 'ASC']]
        });
        console.log(reservaciones);
        if (req.isAuthenticated()) res.render("reservacionesAdmin", { pagina: 'Administracion de Reservaciones', reservaciones });

        res.redirect("/login");
    }
    catch (error) {

    }
}

const paginaReservaciones = (req, res) => {
    req.logout();
    res.render('reservaciones', {
        pagina: 'Reservaciones',
    });
}

const Reservacion = async (req, res) => {
    req.logout();

    try {
        const viajes = await Viaje.findAll({
            order: [['id', 'DESC']]
        });
        console.log(viajes);
        res.render('reservacion', {
            pagina: 'Reservaciones',
            viajes
        });
    } catch (error) {

    }
}

const cancelarReservaciones = (req, res) => {
    req.logout();
    res.render('cancelar', {
        pagina: 'Cancelar',
    });
}

const paginaTestimonialesAdmin = async (req,res,next) =>{
    if(req.isAuthenticated()) {
        //res.render("testimonialesAdmin");

        try {
            const testimoniales = await Testimonial.findAll();
            res.render('testimonialesAdmin',{
                pagina: 'Administracion de Testimoniales',
                testimoniales
                });
        }catch(error){
            console.log(error);
        }
    }

    res.redirect("/login");
}

const paginaViajesAdmin = async (req,res,next) =>{
    if(req.isAuthenticated()) {
        try {
            const viajes = await Viaje.findAll({
                order:[['id','DESC']]
            });
            //console.log(viajes);
            res.render('viajesAdmin',{
                pagina: 'Administracion Viajes',
                viajes
            });
        } catch (error) {
            console.log('Error al visitar la pagina viajes: '+error);
        }    
    } else        

    res.redirect("/login");
}

const eliminarViaje = async(req, res, next) =>{
    const {id}= req.params;
   try {
       await Viaje.destroy({where: {id : id}})    

       res.redirect("/viajesAdmin")
   } catch (error) {
       console.log("hay error" + error);
   }
   
}

const paginaRestablecer =  (req, res) => {    
    res.render('restablecer');
}



export{
    paginaInicio,
    paginaNosotros,    
    paginaViajes,
    paginaTestimoniales,
    paginaDetalleVIajes,
    paginaLogout,
    paginaLoginGet,
    paginaLoginPost,
    paginaAdmin,
    paginaAdmin2,
    paginaReservacionesAdmin,
    paginaReservaciones,
    paginaTestimonialesAdmin,
    paginaViajesAdmin,
    eliminarViaje,
    paginaRestablecer,
    Reservacion,
    cancelarReservaciones 
}


