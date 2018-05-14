const faker = require('faker')
const fs = require('fs')

var letters = [...Array(26)].map((val, i) => String.fromCharCode(i + 65));
let query = "";

for (var i = 0; i < 1500; i++) {
    let nombre = faker.name.lastName().replace("'","") + ", " + faker.random.arrayElement(letters) + ".";
    let genero = faker.random.arrayElement(["masculino", "femenino"]);
    let dateFaker = faker.date.between('1940-01-01', '2002-12-31');
    let fechanacimiento = dateFaker.getFullYear() + "-" + (dateFaker.getMonth() + 1) + "-" + dateFaker.getDate();
    let correo = faker.internet.email();
    let telefono = `${faker.random.number({min:3, max:7})}${faker.random.number(9)}${faker.random.number({min:10, max:99})}-${faker.random.number({min:1000, max:9999})}`;
    let direccion = `${faker.random.number(45)+1} ${faker.random.arrayElement(['calle', 'avenida'])} ${faker.random.number(45)}-${faker.random.number(99)} z.${faker.random.number(23)+1}`;
    let credito = faker.finance.amount(0,150,2);
    let twitter = faker.internet.userName().replace("'","");
    let tipocliente = faker.random.number(6)+1;
    let producto = faker.random.number({min: 13, max:38});
    let deptoRandom = faker.random.number(9);
    let depto = deptoRandom < 3 ? 8 : faker.random.number(21)+1;
    let dateFaker2 = faker.date.between('2016-01-01', '2018-05-13');
    let created = dateFaker2.getFullYear() + "-" + (dateFaker2.getMonth() + 1) + "-" + dateFaker2.getDate();
    let dateFaker3 = faker.date.between('2018-05-12', '2018-05-13');
    let updated = dateFaker3.getFullYear() + "-" + (dateFaker3.getMonth() + 1) + "-" + dateFaker3.getDate();

    query += `INSERT INTO clientes VALUES(DEFAULT, '${nombre}', '${genero}', '${fechanacimiento}', '${correo}', '${telefono}', '${direccion}', ${credito}, DEFAULT, '${twitter}', ${tipocliente}, ${producto}, ${depto}, '${created}', '${updated}');\n`;
}


fs.writeFileSync('./clientes.sql', query);
