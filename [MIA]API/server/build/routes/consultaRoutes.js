"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const consultaController_1 = __importDefault(require("../controllers/consultaController"));
class ConsultaRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', consultaController_1.default.index);
        this.router.get('/consulta1', consultaController_1.default.getConsulta1);
        this.router.get('/consulta2', consultaController_1.default.getConsulta2);
        this.router.get('/consulta3', consultaController_1.default.getConsulta3);
        this.router.get('/consulta4', consultaController_1.default.getConsulta4);
        this.router.get('/consulta5', consultaController_1.default.getConsulta5);
        this.router.get('/consulta6', consultaController_1.default.getConsulta6);
        this.router.get('/consulta7', consultaController_1.default.getConsulta7);
        this.router.get('/consulta8', consultaController_1.default.getConsulta8);
        this.router.get('/consulta9', consultaController_1.default.getConsulta9);
        this.router.get('/consulta10', consultaController_1.default.getConsulta10);
    }
}
const consultaRoutes = new ConsultaRoutes();
exports.default = consultaRoutes.router;
