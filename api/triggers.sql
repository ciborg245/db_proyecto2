-- trigger 1
-- cuando se borra un cliente, borra todos los campos extras de ese cliente
CREATE OR REPLACE FUNCTION del_extrafields() RETURNS trigger AS $$
    BEGIN
        DELETE FROM camposextras
        WHERE id_cliente = OLD.id;
        RETURN OLD;
    END;
$$ LANGUAGE plpgsql

CREATE TRIGGER del_extrafields_trigger
AFTER DELETE ON clientes
FOR EACH ROW
EXECUTE PROCEDURE del_extrafields();


-- trigger 2
-- al crear un cliente menor de edad, set limite credito en cero
CREATE OR REPLACE FUNCTION limcredito_menor() RETURNS trigger AS $$
BEGIN
    IF DATE('now') - 6570 < NEW.fechanacimiento THEN
        NEW.limitecredito = 0;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql

CREATE TRIGGER limcredito_menor_trigger
BEFORE INSERT ON clientes
FOR EACH ROW
EXECUTE PROCEDURE limcredito_menor()

-- trigger 3
-- Si el tipo de cliente es estudiante set limiteCredito max 50
CREATE OR REPLACE FUNCTION limcredito_estudiante() RETURNS trigger AS $$
BEGIN
    IF NEW.id_tipocliente = 1 AND NEW.limitecredito > 50 THEN
        NEW.limitecredito = 50;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql

CREATE TRIGGER limcredito_estudiante_trigger
BEFORE INSERT ON clientes
FOR EACH ROW
EXECUTE PROCEDURE limcredito_estudiante()

-- trigger 4
-- max credito de 150 si vive en la capital
CREATE OR REPLACE FUNCTION limcredito_capital() RETURNS trigger AS $$
BEGIN
    IF NEW.id_depto = 8 AND NEW.limitecredito > 150 THEN
        NEW.limitecredito = 150;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql

CREATE TRIGGER limcredito_capital_trigger
BEFORE INSERT ON clientes
FOR EACH ROW
EXECUTE PROCEDURE limcredito_capital()

-- trigger 5
-- max credito de 100 si vive en el interior
CREATE OR REPLACE FUNCTION limcredito_interior() RETURNS trigger AS $$
BEGIN
    IF NEW.id_tipocliente <> 8 AND NEW.limitecredito > 100 THEN
        NEW.limitecredito = 100;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql

CREATE TRIGGER limcredito_interior_trigger
BEFORE INSERT ON clientes
FOR EACH ROW
EXECUTE PROCEDURE limcredito_interior()

-- trigger 6
-- si el credito es menor a cero cuando se crea un cliente, ponerlo como cero
CREATE OR REPLACE FUNCTION limcredito_menorcero() RETURNS trigger AS $$
BEGIN
    IF NEW.limitecredito < 0 THEN
        NEW.limitecredito = 0;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql

CREATE TRIGGER limcredito_menorcero_trigger
BEFORE INSERT ON clientes
FOR EACH ROW
EXECUTE PROCEDURE limcredito_menorcero()

-- trigger 7
-- si el credito es menor a cero cuando se crea un cliente, ponerlo como cero
CREATE TRIGGER limcredito_menorcero_update_trigger
BEFORE UPDATE ON clientes
FOR EACH ROW
EXECUTE PROCEDURE limcredito_menorcero()

-- trigger 8
-- al actualizar un cliente menor de edad, set limite credito en cero
CREATE TRIGGER limcredito_menor_update_trigger
BEFORE UPDATE ON clientes
FOR EACH ROW
EXECUTE PROCEDURE limcredito_menor()

--trigger 9
-- Si el tipo de cliente es estudiante set limiteCredito max 50, update
CREATE TRIGGER limcredito_estudiante_update_trigger
BEFORE UPDATE ON clientes
FOR EACH ROW
EXECUTE PROCEDURE limcredito_estudiante()

-- trigger 10
-- max credito de 150 si vive en la capital, update
CREATE TRIGGER limcredito_capital_update_trigger
BEFORE UPDATE ON clientes
FOR EACH ROW
EXECUTE PROCEDURE limcredito_capital()

-- trigger 11
-- max credito de 100 si vive en el interior, update
CREATE TRIGGER limcredito_interior_update_trigger
BEFORE UPDATE ON clientes
FOR EACH ROW
EXECUTE PROCEDURE limcredito_interior()
