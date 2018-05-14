ALTER TABLE clientes
ADD CONSTRAINT fk_clientes_tipoclientes
FOREIGN KEY (id_tipocliente)
REFERENCES tipoclientes(id)

ALTER TABLE clientes
ADD CONSTRAINT fk_clientes_deptos
FOREIGN KEY (id_depto)
REFERENCES departamentos(id)

ALTER TABLE clientes
ADD CONSTRAINT fk_clientes_productos
FOREIGN KEY (id_producto)
REFERENCES productos(id)

ALTER TABLE camposextras
ADD CONSTRAINT fk_camposextras_clientes
FOREIGN KEY (id_cliente)
REFERENCES clientes(id)
ON DELETE CASCADE;

ALTER TABLE sucursales
ADD CONSTRAINT fk_sucursales_depto
FOREIGN KEY (id_depto)
REFERENCES departamentos(id)
ON DELETE CASCADE;

create index productos_categoria on productos(categoria);
create index productos_nombre on productos(nombre);
create index tipo_nombre on tipoclientes(nombre);
create index departamentos_nombre on departamentos(nombre);
