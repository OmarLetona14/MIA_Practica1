import {Request, Response} from 'express';
import pool from '../config/database';
class TemporalController{

    public index(req:Request, res:Response){
        res.send("Temporal")
    }
    public async loadData(req:Request, res:Response){
        await pool.query(`create table temp(
            nombre_compania varchar(200) not null,
            contacto_compania varchar(200) not null,
            correo_compania varchar(200) not null,
            telefono_compania varchar(200) not null,
            tipo varchar(200) not null,
            nombre varchar(200) not null, 
            correo varchar(200) not null, 
            telefono varchar(200) not null,
            fecha_registro varchar(200) not null,
            direccion varchar(200) not null,
            ciudad varchar(200) not null, 
            codigo_postal varchar(100) not null,
            region varchar(200) not null, 
            producto varchar(200) not null,
            categoria_producto varchar(200) not null,
            cantidad varchar(200) not null,
            precio_unitario varchar(200) not null
        );
        
        LOAD DATA INFILE '/var/lib/mysql-files/DataCenterData.csv' 
        INTO TABLE temp 
        FIELDS TERMINATED BY ';' 
        LINES TERMINATED BY '\n'
        IGNORE 1 ROWS;
        `, function(err, result){
            if (err) throw err;
            res.json({"message":"Datos cargados correctamente"});
        });
    }

    public async deleteData(req:Request, res:Response){
        await pool.query(`drop table temp;`, function(err, result){
            if (err) throw err;
            res.json({"message":"Datos eliminados correctamente"});
        });
    }
}
const tempController = new TemporalController();
export default tempController;