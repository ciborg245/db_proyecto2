CREATE VIEW clientes_productos AS
SELECT clientes.id, clientes.nombre as "cliente_nombre", TRUNC((CURRENT_DATE - fechanacimiento) / 365) as "edad", genero, fechanacimiento, limitecredito, productos.nombre as "productos_nombre", precio, categoria
FROM clientes
JOIN productos ON (clientes.id_producto = productos.id)

CREATE VIEW clientes_departamentos AS
SELECT clientes.id, clientes.nombre as "cliente_nombre", TRUNC((CURRENT_DATE - fechanacimiento) / 365) as "edad", genero, fechanacimiento, limitecredito, clientes."createdAt", departamentos.nombre as "departamentos_nombre"
FROM clientes
JOIN departamentos ON (clientes.id_depto = departamentos.id)

CREATE VIEW clientes_tipoclientes AS
SELECT clientes.id, clientes.nombre as "cliente_nombre", TRUNC((CURRENT_DATE - fechanacimiento) / 365) as "edad", genero, fechanacimiento, limitecredito, tipoclientes.nombre as "tipo_nombre"
FROM clientes
JOIN tipoclientes ON (clientes.id_tipocliente = tipoclientes.id)

CREATE VIEW sucursales_departamentos AS
SELECT departamentos.nombre, sucursales.id
FROM sucursales
JOIN departamentos ON (sucursales.id_depto = departamentos.id)

CREATE VIEW clientes_productos_deptos AS
SELECT clientes.nombre as "cliente_nombre", TRUNC((CURRENT_DATE - fechanacimiento) / 365) as "edad", genero, fechanacimiento, limitecredito, productos.nombre as "productos_nombre", precio, categoria, departamentos.nombre as "departamentos_nombre"
FROM clientes
JOIN productos ON (clientes.id_producto = productos.id)
JOIN departamentos ON (clientes.id_depto = departamentos.id)

CREATE VIEW clientes_tipoclientes_deptos AS
SELECT clientes.id, clientes.nombre as "cliente_nombre", TRUNC((CURRENT_DATE - fechanacimiento) / 365) as "edad", genero, fechanacimiento, limitecredito, tipoclientes.nombre as "tipo_nombre", departamentos.nombre as "departamentos_nombre"
FROM clientes
JOIN tipoclientes ON (clientes.id_tipocliente = tipoclientes.id)
JOIN departamentos ON (clientes.id_depto = departamentos.id)

CREATE VIEW clientes_productos_tipos AS
SELECT clientes.nombre as "cliente_nombre", TRUNC((CURRENT_DATE - fechanacimiento) / 365) as "edad", genero, fechanacimiento, limitecredito, productos.nombre as "productos_nombre", precio, categoria, tipoclientes.nombre as "tipo_nombre"
FROM clientes
JOIN productos ON (clientes.id_producto = productos.id)
JOIN tipoclientes ON (clientes.id_tipocliente = tipoclientes.id)

CREATE VIEW clientes_view AS
SELECT *
FROM clientes

CREATE VIEW productos_view AS
SELECT *
FROM productos

CREATE VIEW sucursales_view AS
SELECT *
FROM sucursales
