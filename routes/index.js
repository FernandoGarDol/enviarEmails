import express from 'express';
import  {paginaAdmin,paginaAdmin2, paginaInicio, paginaLoginGet, paginaLoginPost, paginaLogout, paginaReservacionesAdmin, paginaRestablecer, paginaTestimonialesAdmin, paginaViajesAdmin} from '../controllers/paginaControllers.js'
import  {paginaNosotros} from '../controllers/paginaControllers.js'
import  {paginaViajes} from '../controllers/paginaControllers.js'
import  {paginaTestimoniales} from '../controllers/paginaControllers.js'
import  {paginaDetalleVIajes} from '../controllers/paginaControllers.js'
import  {eliminarTestimonial, guardarTestimoniales} from '../controllers/testimonialesController.js'
import {eliminarViaje, guardarViaje} from '../controllers/viajesControllers.js'
import {paginaEmail} from '../controllers/Email.js'
//import {paginaAdmin} from '../controllers/paginaControllers.js'


 const router = express.Router();
 
router.get('/', paginaInicio);
router.get('/nosotros',paginaNosotros );
router.get('/viajes',paginaViajes); 
router.get('/viajes/:slug',paginaDetalleVIajes); 
router.get('/testimoniales', paginaTestimoniales);
router.post('/testimoniales', guardarTestimoniales); // POST Sirve Para los formularios
router.get('/logout', paginaLogout);
router.get('/login', paginaLoginGet)
router.post('/login', paginaLoginPost);
router.get('/admin',paginaAdmin);
router.get('/admin2',paginaAdmin2);
router.get('/testimonialesAdmin', paginaTestimonialesAdmin);
router.get('/reservacionesAdmin',paginaReservacionesAdmin);
router.get('/viajesAdmin', paginaViajesAdmin);
router.get('/deleteTestimonial/:id', eliminarTestimonial);
router.get('/deleteViaje/:id', eliminarViaje);
router.post('/upload',guardarViaje);
router.post('/restablecer',paginaRestablecer);
router.post('/email',paginaEmail);

export default router;  