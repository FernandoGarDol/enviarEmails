import { Reservaciones } from '../models/Reservaciones.js'
import { Viaje } from '../models/Viaje.js'

const cancelar = async (req, res) => {

    //validar cadenas vacias

    const { codigo } = req.body;
    const errores = [];
    var exito;

    if (codigo.trim() === '') {
        errores.push({ mensaje: 'El codigo de Reservación esta vacio. Favor de ingresarlo' });
    }
    else {
        try {
            const iden = await Reservaciones.findAll(
                { where: { codigo: codigo } }
            );

            var flag = 0;

            iden.find(function (element) {
                if (element.codigo == codigo)
                    flag = 1;
            });
            console.log(flag);
            if (!(flag))
                errores.push({ mensaje: 'No existe el numero de identificacion' });

        } catch (error) {
            console.log("hay error" + error);
        }
    }
 
    if (errores.length > 0) {
        res.render('cancelar', {
            errores
        });
    }
    else {
        try {
            const cb = await Reservaciones.findAll(
                { where: { codigo: codigo } }
            );

            var TBoletos;
            var destino;

            cb.find(function (element) {
                if (element.boletos > 0) {
                    TBoletos = element.boletos;
                    destino = element.destino;
                } 
                else
                    TBoletos = 0;
            });

            const cd = await Viaje.findAll(
                { where: { titulo: destino } }
            );

            var cBoletos;

            cd.find(function (element) {
                if (element.disponibles > 0)
                    cBoletos = element.disponibles;
                else
                    cBoletos = 0;
            });

            var boletos = parseInt(TBoletos) + parseInt(cBoletos);

            await Viaje.update({ disponibles: boletos }, { where: { titulo: destino } })
        
            await Reservaciones.destroy({ where: { codigo: codigo } })

            exito = 'Se ha eliminado su reservacion';

            res.render('cancelar', {
                exito
            });
        } catch (error) {
            console.log("hay error" + error);
        }
    }
    console.log(errores)

}

export { cancelar };

