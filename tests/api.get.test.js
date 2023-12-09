const app = require('../app');
const passport = require ('passport');
const request = require('supertest');
const User = require('../models/user');
const verifyToken = require('../verifyJWTToken');



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
            const validJWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NzBjMDYzNDY3ZmEwMWZkYWZmMDkxZSIsInJvbCI6IlVzdWFyaW8iLCJpYXQiOjE3MDIxNTE3NzN9.xp9pJ6HLc2TV24LsVJQhVqhy_Mjwe6yeukryqlOiLW4";

            // Realiza la solicitud con el token de autorización
            const response = await request(app)
                .get("/api/v1/auth/users")
                .set("Authorization", `Bearer ${token}`)
                .set("x-auth-token", validJWT);
    
            // Realiza las aserciones
            expect(response.statusCode).toBe(200);
            expect(response.body).toBeArrayOfSize(2);
            expect(dbFind).toBeCalled();
        }, 15000);
    });


    
});