const app = require('../app');
const passport = require ('passport');
const request = require('supertest');
const User = require('../models/user');
//const passportStub = require('passport-stub');


describe("Users API", () => {

    describe("DELETE /:id", () => {
        const userId = "6571d8262c8d4ec91f81ee53"; 
        const token = "04f9237d-646e-4e0d-90d2-504b1f7dcbc0";
        var dbDelete;
    
        beforeEach(() => {
            dbDelete = jest.spyOn(User, "deleteOne");
        });
    
        it("Should delete an existing user if everything is fine", async () => {
            dbDelete.mockImplementation(async () => {
                // Simula que se encuentra un usuario existente y se elimina correctamente
                return { deletedCount: 1 };
            });
    
            const response = await request(app)
                .delete(`/api/v1/auth/users/${userId}`)
                .set("Authorization", `Bearer ${token}`);
    
            expect(response.statusCode).toBe(200);
            expect(dbDelete).toBeCalledWith({ _id: userId });
        });
    
        it("Should return 400 if the ID is invalid", async () => {
            jest.clearAllMocks();
            const invalidUserId = "656c9f8c27";
    
            const response = await request(app)
                .delete(`/api/v1/auth/users/${invalidUserId}`)
                .set("Authorization", `Bearer ${token}`);
    
            expect(response.statusCode).toBe(400);
            expect(dbDelete).not.toBeCalled();
        });
    
        it("Should return 500 if there is a problem with the connection", async () => {
            dbDelete.mockImplementation(async () => {
                // Simula un error durante la eliminación
                throw new Error("Connection failed");
            });
    
            const response = await request(app)
                .delete(`/api/v1/auth/users/${userId}`)
                .set("Authorization", `Bearer ${token}`);
    
            expect(response.statusCode).toBe(500);
            expect(dbDelete).toBeCalledWith({ _id: userId });
        });
    });


    
});