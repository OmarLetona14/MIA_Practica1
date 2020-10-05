import {Router} from 'express'

import consultaController from '../controllers/consultaController'

class ConsultaRoutes{
    public router:Router = Router();

    constructor(){
        this.config()
    }

    config():void{
        this.router.get('/', consultaController.index)
        this.router.get('/consulta1', consultaController.getConsulta1)
        this.router.get('/consulta2', consultaController.getConsulta2)
        this.router.get('/consulta3', consultaController.getConsulta3)
        this.router.get('/consulta4', consultaController.getConsulta4)
        this.router.get('/consulta5', consultaController.getConsulta5)
        this.router.get('/consulta6', consultaController.getConsulta6)
        this.router.get('/consulta7', consultaController.getConsulta7)
        this.router.get('/consulta8', consultaController.getConsulta8)
        this.router.get('/consulta9', consultaController.getConsulta9)
        this.router.get('/consulta10', consultaController.getConsulta10)
    }
}

const consultaRoutes = new ConsultaRoutes()
export default consultaRoutes.router;