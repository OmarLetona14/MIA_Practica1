import {Router} from 'express'

import tempController from '../controllers/tempController'

class TempRoutes{
    public router:Router = Router();

    constructor(){
        this.config()
    }

    config():void{
        this.router.get('/', tempController.index)
        this.router.post('/cargarTemporal', tempController.loadData)
        this.router.delete('/eliminarTemporal', tempController.deleteData)
    }
}

const temporalRoutes = new TempRoutes()
export default temporalRoutes.router;