const request = require("supertest");
const dbusertest = require("../../dbusertest");
const jwt = require("jsonwebtoken");
const app = require("../../app");
const User = require("../../models/user");

jest.setTimeout(30000);

beforeAll((done) => {
  if (dbusertest.readyState == 1) {
    done();
  } else {
    dbusertest.on("connected", () => done());
  }
});

afterAll(async () => {
  if (dbusertest.readyState == 1) {
    await dbusertest.close();
  }
});

beforeEach(async () => {
  // Antes de cada prueba, limpiar la colección de usuarios
  // await db.collection('users').deleteMany({});
});

describe("Pruebas de integración para usuarios", () => {
  it("debería crear, leer, actualizar y eliminar un usuario con la API de usuarios", async () => {
    const newUser = {
      nombre: "Integrador",
      email: "integradorx@email.com",
      password: "integradorx35",
      apellidos: "Integrador",
      companiaSanitaria: "CAIXA",
      tarjetaSanitaria: "1211-1254-1114-1232",
      rol: "Usuario",
    };
    const token = "04f9237d-646e-4e0d-90d2-504b1f7dcbc0";
    const validJWT =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NzBjMDYzNDY3ZmEwMWZkYWZmMDkxZSIsInJvbCI6IlVzdWFyaW8iLCJpYXQiOjE3MDIxNTE3NzN9.xp9pJ6HLc2TV24LsVJQhVqhy_Mjwe6yeukryqlOiLW4";

    // Crear un nuevo usuario
    const createResponse = await request(app)
      .post("/api/v1/auth/users")
      .set("Authorization", `Bearer ${token}`)
      .send(newUser);

    expect(createResponse.status).toBe(201);

    //Hacer login con ese usuario
    const loginResponse = await request(app)
      .post("/api/v1/auth/users/login")
      .send({
        email: newUser.email,
        password: newUser.password,
      });

    expect(loginResponse.status).toBe(200);
    expect(loginResponse.body).toHaveProperty("token");

    authToken = loginResponse.body.token;

    // Leer información del usuario recién creado
    // Extraer el userId del token JWT
    const decodedToken = jwt.decode(authToken, { complete: true });
    const userId = decodedToken.payload.id;

    const readResponse = await request(app)
      .get(`/api/v1/auth/users/${userId}`)
      .set("Authorization", `Bearer ${token}`)
      .set("x-auth-token", authToken);

    expect(readResponse.status).toBe(200);

    // Actualizar información del usuario
    const updatedUserData = {
      nombre: "IntegradorTest",
      email: "integradorTest@email.com",
      password: "integradorx35",
      apellidos: "Integrador",
      companiaSanitaria: "CAIXA",
      tarjetaSanitaria: "1211-1254-1114-1232",
      rol: "Usuario",
    };
    const updateResponse = await request(app)
      .put(`/api/v1/auth/users/${userId}`)
      .set("Authorization", `Bearer ${token}`)
      .set("x-auth-token", authToken)
      .send(updatedUserData);

    expect(updateResponse.status).toBe(200);

    // Eliminar el usuario
    const deleteResponse = await request(app)
      .delete(`/api/v1/auth/users/${userId}`)
      .set("Authorization", `Bearer ${token}`)
      .set("x-auth-token", validJWT);

    expect(deleteResponse.status).toBe(200);

    // Verificar que el usuario se haya eliminado de la base de datos
    const deletedUserInDb = await dbusertest
      .collection("users")
      .findOne({ _id: userId });
    expect(deletedUserInDb).toBeNull();
  });

  it("debería crear, leer, actualizar y eliminar un usuario en la base de datos", async () => {
    const newUser = new User({
      nombre: "Integrador",
      email: "integradorx@email.com",
      password: "integradorx35",
      apellidos: "Integrador",
      companiaSanitaria: "CAIXA",
      tarjetaSanitaria: "1211-1254-1114-1232",
      rol: "Usuario",
    });

    await newUser.save();
    resultAdd = await User.find();

    resultRead = await User.findById(newUser._id);
    expect(resultRead.nombre).toEqual("Integrador");
    console.log(resultRead._id);

    await User.deleteOne(newUser._id);
    resultDelete = await User.findById(newUser._id);
    expect(resultDelete).toEqual(null);
  });
});
