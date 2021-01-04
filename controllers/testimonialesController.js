import {Testimonial} from '../models/Testimoniales.js'

const guardarTestimoniales = async(req,res) => {

    //validar cadenas vacias

    const {nombre, mensaje, correo} = req.body;
    const errores = [];

    if(nombre.trim() === ''){
        errores.push({mensaje: 'El nombre esta vacio. Favor de ingresarlo.'});
    }    
    if(mensaje.trim() === ''){
        errores.push({mensaje: 'El mensaje esta vacio. Favor de ingresarlo'});
    }
    if(correo.trim() === ''){
        errores.push({mensaje: 'El correo esta vacio. Favor de ingresarlo'});
    }

    if (errores.length >0){
        //Consultar testimoniales existenctes
        const testimoniales = await Testimonial.findAll();
        res.render('testimoniales',{
            pagina: 'Testimoniales',
            errores,
            nombre,correo,mensaje,testimoniales
        });
    } else {
        //Almacenar en la base de datos
        try{
            await Testimonial.create({  //Insercion en LA BASE DE DATOS
                nombre,
                correo,
                mensaje
            });

            res.redirect('/testimoniales');
        }catch(error){

        }
    }
    console.log(errores)

}

const eliminarTestimonial = async(req, res, next) =>{
     const {id}= req.params;
    try {
        await Testimonial.destroy({where: {id : id}})    

        res.redirect("/testimonialesAdmin")
    } catch (error) {
        console.log("hay error" + error);
    }
    
}
/*
const paginaDetalleVIajes = async (req,res) =>{
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
*/

    

export {guardarTestimoniales,eliminarTestimonial };