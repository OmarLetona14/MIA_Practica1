"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tempController_1 = __importDefault(require("../controllers/tempController"));
class TempRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', tempController_1.default.index);
        this.router.post('/cargarTemporal', tempController_1.default.loadData);
        this.router.delete('/eliminarTemporal', tempController_1.default.deleteData);
    }
}
const temporalRoutes = new TempRoutes();
exports.default = temporalRoutes.router;
