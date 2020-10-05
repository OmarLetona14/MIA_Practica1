import {Router} from 'express'

import modelController from '../controllers/modelController'

class ModelRoutes{
    public router:Router = Router();

    constructor(){
        this.config()
    }

    config():void{
        this.router.get('/', modelController.index)
        this.router.post('/cargarModelo', modelController.cargarDatos)
        this.router.delete('/eliminarModelo', modelController.eliminarDatos)
    }
}

const modelRoutes = new ModelRoutes()
export default modelRoutes.router;