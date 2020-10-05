"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../config/database"));
class TemporalController {
    index(req, res) {
        res.send("Temporal");
    }
    loadData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query(`create table temp(
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
        `, function (err, result) {
                if (err)
                    throw err;
                res.json({ "message": "Datos cargados correctamente" });
            });
        });
    }
    deleteData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query(`drop table temp;`, function (err, result) {
                if (err)
                    throw err;
                res.json({ "message": "Datos eliminados correctamente" });
            });
        });
    }
}
const tempController = new TemporalController();
exports.default = tempController;
