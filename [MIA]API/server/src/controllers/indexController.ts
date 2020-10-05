import {Request, Response} from 'express';

class IndexController{

    public index(req:Request, res:Response){
        res.send("Index")
    }

}

const indexController = new IndexController();
export default indexController;