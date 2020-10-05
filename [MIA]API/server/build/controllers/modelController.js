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
class ModelController {
    index(req, res) {
        res.send("Model");
    }
    eliminarDatos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query(`drop table venta;
        drop table compra;
        drop table cliente;
        drop table proveedor;
        drop table ubicacion;
        drop table compania;
        drop table contacto;
        drop table dato;
        drop table orden;
        drop table producto;
        drop table categoria_producto;
        `, function (err, result) {
                if (err)
                    throw err;
                res.json({ "Message": "Datos eliminados correctamente" });
            });
        });
    }
    cargarDatos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query(`create table dato(
            idDato int primary key not null auto_increment, 
            nombre varchar(100) not null, 
            correo varchar(100) not null, 
            telefono varchar(100) not null
        );
        
        
        create table contacto(
            idContacto int primary key not null auto_increment, 
            nombre_contacto varchar(100) not null
        );
        
        create table ubicacion(
            idUbicacion int primary key not null auto_increment, 
            ciudad varchar(100) not null, 
            direccion varchar(100) not null,
            codigo_postal varchar(50) not null, 
            region varchar(100) not null
        );
        
        create table compania(
            idCompania int primary key not null auto_increment,
            nombre_compania varchar(100) not null,
            correo_compania varchar(100) not null,
            telefono_compania varchar(100) not null,
            idContacto int,
            foreign key (idContacto) references contacto(idContacto) on delete cascade
        );
        
        create table cliente(
            idCliente int primary key not null auto_increment, 
            idDato int,
            fecha_registro date,
            idUbicacion int,
            foreign key (idDato) references dato(idDato) on delete cascade, 
            foreign key(idUbicacion) references ubicacion(idUbicacion) on delete cascade
        );
        
        create table proveedor(
            idProveedor int primary key not null auto_increment,
            idDato int,
            fecha_registro date,
            idUbicacion int,
            foreign key (idDato) references dato(idDato) on delete cascade,
            foreign key(idUbicacion) references ubicacion(idUbicacion) on delete cascade
        );
        
        create table categoria_producto(
            idCategoria_producto int primary key not null auto_increment,
            nombre_categoria varchar(100) not null
        );
        
        create table producto(
            idProducto int primary key not null auto_increment,
            nombre_producto varchar(100) not null, 
            precio_unitario decimal(10,2),
            idCategoria int,
            foreign key (idCategoria) references categoria_producto(idCategoria_producto) on delete cascade
        );
        
        create table orden(
            idOrden int primary key not null auto_increment,
            idProducto int,
            cantidad int,
            foreign key (idProducto) references producto(idProducto) on delete cascade
        );
        
        create table venta(
            idVenta int primary key not null auto_increment,
            idOrden int,
            idCliente int,
            foreign key (idOrden) references orden(idOrden) on delete cascade,
            foreign key (idCliente) references cliente(idCliente) on delete cascade
        );
        
        create table compra(
            idCompra int primary key not null auto_increment, 
            idOrden int, 
            idProveedor int,
            foreign key (idOrden) references orden(idOrden) on delete cascade,
            foreign key (idProveedor) references proveedor(idProveedor) on delete cascade
        );
        
        -- Insertar datos en las correspondientes tablas
        
        -- Insert dato
        insert into dato (nombre, correo, telefono)
        select distinct nombre, correo, telefono from temp;
        -- Conctacto
        insert into contacto (nombre_contacto)
        select distinct contacto_compania from temp;
        -- Insert ubicacion
        insert into ubicacion (ciudad, direccion, codigo_postal, region)
        select distinct ciudad, direccion, codigo_postal, region from temp;
        -- Insert compania
        insert into compania (nombre_compania, correo_compania, telefono_compania, idContacto)
        select distinct t.nombre_compania, t.correo_compania, t.telefono_compania, 
        (select idContacto from contacto where nombre_contacto = t.contacto_compania) from temp as t;
        -- Insert cliente
        insert into cliente (idDato, fecha_registro, idUbicacion) 
        select distinct (select idDato from dato as d where d.nombre = t.nombre and d.correo = t.correo and t.telefono = d.telefono),
        str_to_date(t.fecha_registro,'%d/%m/%Y'), 
        (select idUbicacion from ubicacion as u where u.ciudad = t.ciudad and u.direccion = t.direccion and u.codigo_postal = t.codigo_postal and u.region = t.region)  
        from temp as t where t.tipo = "C";
        -- Insert proveedor
        insert into proveedor (idDato, fecha_registro, idUbicacion) 
        select distinct (select idDato from dato as d where d.nombre = t.nombre and d.correo = t.correo and t.telefono = d.telefono),
        str_to_date(t.fecha_registro,'%d/%m/%Y'), 
        (select idUbicacion from ubicacion as u where u.ciudad = t.ciudad and u.direccion = t.direccion and u.codigo_postal = t.codigo_postal and u.region = t.region)  
        from temp as t where t.tipo = "P";
        -- Insert categoria producto
        insert into categoria_producto (nombre_categoria)
        select distinct (categoria_producto)
        from temp;
        -- Insert producto
        insert into producto (nombre_producto, precio_unitario, idCategoria)
        select distinct t.producto, t.precio_unitario, (select idCategoria_producto from categoria_producto as c where c.nombre_categoria = categoria_producto)
        from temp as t;
        -- Insert Orden
        insert into orden (idProducto, cantidad)
        select distinct (select idProducto from producto as p where p.nombre_producto = producto), cantidad
        from temp;
        -- Insert venta
        insert into venta (idOrden, idCliente)
        select distinct(select idOrden from orden as o inner join producto as p on o.idProducto = p.idProducto
        where t.producto = p.nombre_producto and t.precio_unitario = p.precio_unitario and o.cantidad = t.cantidad), 
        (select idCliente from cliente as c inner join dato as d on d.idDato = c.idDato
        inner join ubicacion as u on u.idUbicacion = c.idUbicacion
        where d.nombre = t.nombre and d.correo = t.correo and d.telefono = t.telefono and c.fecha_registro = str_to_date(t.fecha_registro,'%d/%m/%Y')
        and u.ciudad = t.ciudad and u.direccion = t.direccion and u.codigo_postal = t.codigo_postal and u.region = t.region)
        from temp as t where t.tipo = "C";
        -- Insert compra
        insert into compra (idOrden, idProveedor)
        select distinct (select idOrden from orden as o inner join producto as p on o.idProducto = p.idProducto
        where t.producto = p.nombre_producto and t.precio_unitario = p.precio_unitario and o.cantidad = t.cantidad),
        (select idProveedor from proveedor as pr inner join dato as d on d.idDato = pr.idDato
        inner join ubicacion as u on u.idUbicacion = pr.idUbicacion
        where d.nombre = t.nombre and d.correo = t.correo and d.telefono = t.telefono and pr.fecha_registro = str_to_date(t.fecha_registro,'%d/%m/%Y')
        and u.ciudad = t.ciudad and u.direccion = t.direccion and u.codigo_postal = t.codigo_postal and u.region = t.region)
        from temp as t where t.tipo = "P";`, function (err, result) {
                if (err)
                    throw err;
                res.json({ "Message": "Datos cargados correctamente" });
            });
        });
    }
}
const modelController = new ModelController();
exports.default = modelController;
