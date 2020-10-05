-- Carga de datos

LOAD DATA INFILE '/var/lib/mysql-files/DataCenterData.csv' 
INTO TABLE temp 
FIELDS TERMINATED BY ';' 
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

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
from temp as t where t.tipo = "P";