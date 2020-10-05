-- DDL sentences
create database Practica1;
use Practica1;

create table temp(
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

create table dato(
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