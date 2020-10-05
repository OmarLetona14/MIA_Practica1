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
class ConsultaController {
    index(req, res) {
        res.send("Consulta");
    }
    getConsulta1(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query(`select d.nombre, d.telefono, max(o.cantidad*p.precio_unitario) as total from compra as c
        inner join orden as o on c.idOrden = o.idOrden
        inner join producto as p on p.idProducto = o.idProducto
        inner join proveedor as pro on pro.idProveedor = c.idProveedor
        inner join dato as d on d.idDato = pro.idDato
        group by d.nombre, d.telefono order by total desc limit 1;`, function (err, result) {
                if (err)
                    throw err;
                res.json(result);
            });
        });
    }
    getConsulta2(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query(`select v.idCliente, d.nombre as total_compra, count(o.cantidad) as compras from venta as v
        inner join orden as o on v.idOrden = o.idOrden
        inner join producto as p on p.idProducto = o.idProducto
        inner join cliente as c on c.idCliente = v.idCliente
        inner join dato as d on d.idDato = c.idDato
        group by v.idCliente, d.nombre order by compras desc limit 1`, function (err, result) {
                if (err)
                    throw err;
                res.json(result);
            });
        });
    }
    getConsulta3(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query(`(select u.direccion, u.region, u.ciudad, u.codigo_postal, count(idOrden) as ordenes from venta as v 
        inner join cliente as c on c.idCliente = v.idCliente
        inner join ubicacion as u on u.idUbicacion = c.idUbicacion
        group by u.direccion, u.region, u.ciudad, u.codigo_postal order by ordenes desc limit 1)
        union all
        (select u.direccion, u.region, u.ciudad, u.codigo_postal, count(idOrden) as ordenes from venta as v 
        inner join cliente as c on c.idCliente = v.idCliente
        inner join ubicacion as u on u.idUbicacion = c.idUbicacion
        group by u.direccion, u.region, u.ciudad, u.codigo_postal order by ordenes asc limit 1);`, function (err, result) {
                if (err)
                    throw err;
                res.json(result);
            });
        });
    }
    getConsulta4(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query(`select c.idCliente, d.nombre, count(v.idOrden) as ordenes, sum(p.precio_unitario*o.cantidad) as total from venta as v
        inner join orden as o on o.idOrden = v.idOrden
        inner join producto as p on p.idProducto = o.idProducto
        inner join cliente as c on c.idCliente = v.idCliente
        inner join dato as d on d.idDato = c.idDato
        inner join categoria_producto as cp on cp.idCategoria_producto = p.idCategoria
        where cp.nombre_categoria = "Cheese"
        group by c.idCliente, d.nombre order by ordenes desc limit 5;`, function (err, result) {
                if (err)
                    throw err;
                res.json(result);
            });
        });
    }
    getConsulta5(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query(`(select date_format(c.fecha_registro, '%m') as Mes_registrado, d.nombre, sum(p.precio_unitario*o.cantidad) as total from venta as v
        inner join orden as o on o.idOrden = v.idOrden
        inner join producto as p on p.idProducto = o.idProducto
        inner join cliente as c on c.idCliente = v.idCliente
        inner join dato as d on d.idDato = c.idDato
        group by c.fecha_registro, d.nombre order by total desc limit 10)
        union all
        (select date_format(c.fecha_registro, '%m') as Mes_registrado, d.nombre, sum(p.precio_unitario*o.cantidad) as total from venta as v
        inner join orden as o on o.idOrden = v.idOrden
        inner join producto as p on p.idProducto = o.idProducto
        inner join cliente as c on c.idCliente = v.idCliente
        inner join dato as d on d.idDato = c.idDato
        group by c.fecha_registro, d.nombre order by total asc limit 10);`, function (err, result) {
                if (err)
                    throw err;
                res.json(result);
            });
        });
    }
    getConsulta6(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query(`(select c.nombre_categoria, sum(o.cantidad*p.precio_unitario) as total_vendido , count(c.idCategoria_producto) as cantidad_vendida from venta as v
        inner join orden as o on o.idOrden = v.idOrden
        inner join producto as p on p.idProducto = o.idProducto
        inner join categoria_producto as c on c.idCategoria_producto = p.idCategoria
        group by c.nombre_categoria order by cantidad_veces desc limit 1)
        union all
        (select c.nombre_categoria, sum(o.cantidad*p.precio_unitario) as total_vendido , count(c.idCategoria_producto) as cantidad_veces from venta as v
        inner join orden as o on o.idOrden = v.idOrden
        inner join producto as p on p.idProducto = o.idProducto
        inner join categoria_producto as c on c.idCategoria_producto = p.idCategoria
        group by c.nombre_categoria order by cantidad_veces asc limit 1);`, function (err, result) {
                if (err)
                    throw err;
                res.json(result);
            });
        });
    }
    getConsulta7(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query(`-- Consulta 7
        select d.nombre, d.correo, d.telefono, p.fecha_registro, sum(o.cantidad*pr.precio_unitario) as total_venta from compra as c
        inner join proveedor as p on c.idProveedor = p.idProveedor
        inner join dato as d on d.idDato = p.idDato
        inner join orden as o on o.idOrden = c.idOrden
        inner join producto as pr on pr.idProducto = o.idProducto
        inner join categoria_producto as cp on cp.idCategoria_producto = pr.idCategoria
        where cp.nombre_categoria = 'Fresh Vegetables'
        group by d.nombre, d.correo, d.telefono, p.fecha_registro order by total_venta desc limit 5;`, function (err, result) {
                if (err)
                    throw err;
                res.json(result);
            });
        });
    }
    getConsulta8(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query(`(select u.direccion, u.region, u.ciudad, u.codigo_postal, sum(o.cantidad*pr.precio_unitario) as total_comprado from venta as v
        inner join cliente as c on c.idCliente = v.idCliente
        inner join ubicacion as u on u.idUbicacion = c.idUbicacion
        inner join orden as o on o.idOrden = v.idOrden
        inner join producto as pr on pr.idProducto = o.idProducto
        group by c.idCliente order by total_comprado desc limit 1)
        union all
        (select u.direccion, u.region, u.ciudad, u.codigo_postal, sum(o.cantidad*pr.precio_unitario) as total_comprado from venta as v
        inner join cliente as c on c.idCliente = v.idCliente
        inner join ubicacion as u on u.idUbicacion = c.idUbicacion
        inner join orden as o on o.idOrden = v.idOrden
        inner join producto as pr on pr.idProducto = o.idProducto
        group by c.idCliente order by total_comprado asc limit 1);`, function (err, result) {
                if (err)
                    throw err;
                res.json(result);
            });
        });
    }
    getConsulta9(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query(`select d.nombre, d.telefono, o.idOrden, (o.cantidad*pr.precio_unitario), o.cantidad as total from compra as c
        inner join proveedor as p on p.idProveedor = c.idProveedor
        inner join dato as d on d.idDato = p.idDato
        inner join orden as o on o.idOrden = c.idOrden
        inner join producto as pr on pr.idProducto = o.idProducto
        group by d.nombre, d.telefono, o.idOrden order by o.cantidad asc limit 1;`, function (err, result) {
                if (err)
                    throw err;
                res.json(result);
            });
        });
    }
    getConsulta10(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query(`-- Consulta 10
        select d.nombre, d.telefono, d.correo, sum(o.cantidad) as ordenes from venta as v
        inner join cliente as c on c.idCliente = v.idCliente
        inner join dato as d on d.idDato = c.idDato
        inner join orden as o on o.idOrden = v.idOrden
        inner join producto as pr on pr.idProducto = o.idProducto
        inner join categoria_producto as cp on cp.idCategoria_producto = pr.idCategoria
        where cp.nombre_categoria = 'Seafood'
        group by d.nombre, d.telefono, d.correo order by ordenes desc limit 10;
        `, function (err, result) {
                if (err)
                    throw err;
                res.json(result);
            });
        });
    }
}
const consultaController = new ConsultaController();
exports.default = consultaController;
