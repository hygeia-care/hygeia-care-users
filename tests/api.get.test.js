const app = require('../app');
const passport = require ('passport');
const request = require('supertest');
const User = require('../models/user');
//const passportStub = require('passport-stub');



describe("Users API", () => {

    describe("GET /", () => {
        it("Should return an HTML document", () => {
            return request(app).get("/").then((response) => {
                expect(response.status).toBe(200);
                expect(response.type).toEqual(expect.stringContaining("html"));
                expect(response.text).toEqual(expect.stringContaining("h1"));
            })
        })
    });

    describe("GET users/", () => {

        it("Should return all users", async () => {
            const users = [
                new User({"nombre": "José", "email": "joseguerrero@email.com", "password": "zxercxx", "apellidos": "Ramirezx", "companiaSanitaria": "CAIXA", "tarjetaSanitaria": "1234-1234-1234-1235", "rol": "Usuario"}),
                new User({"nombre": "Manuel", "email": "manuel@email.com", "password": "zxercxx", "apellidos": "Morales", "companiaSanitaria": "SANITOS", "tarjetaSanitaria": "3333-1234-1234-1235", "rol": "Usuario"})
        ];
            const dbFind = jest.spyOn(User, "find");
            dbFind.mockImplementation(async () => Promise.resolve(users));
            // Simula la generación de un token de acceso (puede variar según tu implementación)
            const token = "04f9237d-646e-4e0d-90d2-504b1f7dcbc0";
            // Realiza la solicitud con el token de autorización
            const response = await request(app)
                .get("/api/v1/auth/users")
                .set("Authorization", `Bearer ${token}`);
    
            // Realiza las aserciones
            expect(response.statusCode).toBe(200);
            expect(response.body).toBeArrayOfSize(2);
            expect(dbFind).toBeCalled();
        }, 15000);
    });


    
});