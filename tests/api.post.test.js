const app = require('../app');
const passport = require ('passport');
const request = require('supertest');
const User = require('../models/user');
//const passportStub = require('passport-stub');



describe("Users API", () => {

    describe("POST users/", () => {
        const user = {"nombre": "Mario", "email": "mario@email.com", "password": "zxercxx", "apellidos": "García", "companiaSanitaria": "CAIXA", "tarjetaSanitaria": "1234-1234-1234-1235", "rol": "Usuario"};
        const token = "04f9237d-646e-4e0d-90d2-504b1f7dcbc0";
        var dbSave;

        beforeEach(() => {
            dbSave = jest.spyOn(User.prototype, "save");
        });

        it("Should add a new user if everything is fine", async () => {

            dbSave.mockImplementation(async () => Promise.resolve(true));

            const response = await request(app)
                .post("/api/v1/auth/users")
                .set("Authorization", `Bearer ${token}`);
                
            expect(response.statusCode).toBe(201);
            expect(dbSave).toBeCalled();
        });
    
        it("Should return 500 if there is a problem with the connection", async () => {

            dbSave.mockImplementation(async () => Promise.reject("Connection failed"));
            
            const response = await request(app)
                .post("/api/v1/auth/users")
                .set("Authorization", `Bearer ${token}`);
                
            expect(response.statusCode).toBe(500);
            expect(dbSave).toBeCalled();
            
        });
    });


    
});