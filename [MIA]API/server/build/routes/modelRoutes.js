"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const modelController_1 = __importDefault(require("../controllers/modelController"));
class ModelRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', modelController_1.default.index);
        this.router.post('/cargarModelo', modelController_1.default.cargarDatos);
        this.router.delete('/eliminarModelo', modelController_1.default.eliminarDatos);
    }
}
const modelRoutes = new ModelRoutes();
exports.default = modelRoutes.router;
