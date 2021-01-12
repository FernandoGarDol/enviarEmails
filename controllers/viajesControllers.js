import {Viaje}  from '../models/Viaje.js'


const guardarViaje = async(req,res) => {

    const {titulo, precio, fecha_ida, fecha_vuelta, file, descripcion, disponibles, slug} = req.body;
    const errores = [];    
    let imagen;
    if(titulo.trim() === ''){
        errores.push({mensaje: 'El titulo esta vacio. Favor de ingresarlo.'});
    }        
    if(precio.trim() === ''){
        errores.push({mensaje: 'El precio esta vacio. Favor de ingresarlo.'});
    }        
    if(fecha_ida.trim() === ''){
        errores.push({mensaje: 'La fecha de ida  esta vacia. Favor de ingresarlo'});
    }
    if(fecha_vuelta.trim() === ''){
        errores.push({mensaje: 'La fecha de vuelta  esta vacia. Favor de ingresarlo'});
    }
    /*if(imagen.trim() === ''){
        errores.push({mensaje: 'La imagen esta vacia. Favor de ingresarlo'});
    }*/
    /*if(file == null){
        errores.push({mensaje: 'El archivo esta vacio. Favor de ingresarlo'});
    }*/
    if(descripcion.trim() === ''){
        errores.push({mensaje: 'La descripcion esta vacia. Favor de ingresarlo'});
    }
    if(disponibles.trim() === ''){
        errores.push({mensaje: 'La caja disponibles esta vacia. Favor de ingresarlo'});
    }
    if(slug.trim() === ''){
        errores.push({mensaje: 'La caja de slug esta vacia. Favor de ingresarlo'});
    }
    
    if (errores.length >0){
        //Consultar testimoniales existenctes
        const viajes = await Viaje.findAll();
        res.render('viajesAdmin',{
            pagina: 'Administracion Viajes',
            errores,
            titulo, precio,fecha_ida, fecha_vuelta,file, descripcion, disponibles, slug, viajes
        });                                                
    }else{



        let EDFile = req.files.file
        EDFile.mv(`./public/img/${EDFile.name}`,err => {
            try {
               // res.status(200).send({ message : 'File upload' })                
            } catch (error) {
                console.log(error);
            }
            
        })

        //Almacenar en la base de datos
        try{
            imagen=req.files.file.name;
            await Viaje.create({  //Insercion en LA BASE DE DATOS
                titulo, 
                precio,
                fecha_ida, 
                fecha_vuelta, 
                imagen,
                descripcion, 
                disponibles, 
                slug, 
                
            });
            console.log(imagen);
            
        }catch(error){
            console.log('Error al crear Vuelo :' + error);
        }
    }
    let viajes = await Viaje.findAll({
        order:[['id','DESC']]}
    );
    res.render('viajesAdmin',{
        pagina: 'Administracion Viajes',viajes
    })
    }


const eliminarViaje = async(req, res, next) =>{
    const {id}= req.params;
   try {
       await Viaje.destroy({where: {id : id}})    

       res.redirect("/viajesAdmin")
   } catch (error) {
       console.log("hay error al eliminar viaje" + error);
   }   
}

export{
    eliminarViaje,
    guardarViaje
}