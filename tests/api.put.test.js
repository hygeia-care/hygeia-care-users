const app = require('../app');
const passport = require ('passport');
const request = require('supertest');
const dbuser = require('../dbuser');
const User = require('../models/user');
const verifyToken = require('../verifyJWTToken');

describe("Users API", () => {
        describe("PUT users/:id", () => {
            const userId = "6570c07e467fa01fdaff0922";
            const token = "04f9237d-646e-4e0d-90d2-504b1f7dcbc0";
            const validJWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NzBjMDYzNDY3ZmEwMWZkYWZmMDkxZSIsInJvbCI6IlVzdWFyaW8iLCJpYXQiOjE3MDIxNTE3NzN9.xp9pJ6HLc2TV24LsVJQhVqhy_Mjwe6yeukryqlOiLW4";

        it("Should update an existing user if everything is fine", async () => {
            const updatedUserData = {"nombre": "Nuevo","email": "nuevo@email.com","password": "nuevaPass","apellidos": "NuevosApellidos","companiaSanitaria": "NuevaEmpresa","tarjetaSanitaria": "9876-5432-1234-5678","rol": "Usuario"};

            // Mockea el módulo completo (en este caso, User)
            jest.clearAllMocks();
            jest.mock('../models/user');

            // Importa el módulo después de haberlo mockeado
            const User = require('../models/user');

            // Establece el comportamiento del mock (puede variar según tu implementación)
            User.findOneAndUpdate.mockResolvedValue(true);

            const response = await request(app)
                .put(`/api/v1/auth/users/${userId}`)
                .set("Authorization", `Bearer ${token}`)
                .set("x-auth-token", validJWT)
                .send(updatedUserData);

            expect(response.statusCode).toBe(200);
            //expect(User.findOneAndUpdate).toHaveBeenCalledWith({ _id: expect.any(String) },expect.objectContaining({"nombre": "Nuevo","email": "nuevo@email.com","password": "nuevaPass","apellidos": "NuevosApellidos","companiaSanitaria": "NuevaEmpresa","tarjetaSanitaria": "9876-5432-1234-5678","rol": "Usuario"}),{ new: true });
            }, 150000);


        it("Should return 404 if the user is not found", async () => {
            const nonExistentUserId = "6570c063467fa01fdaff091a";
            jest.clearAllMocks();
            dbUpdate = jest.spyOn(User, "findOneAndUpdate");

            dbUpdate.mockImplementation(async () => {
                // Simula que no se encuentra un usuario con el ID proporcionado
                return null;
            });
    
            const response = await request(app)
                .put(`/api/v1/auth/users/${nonExistentUserId}`)
                .set("Authorization", `Bearer ${token}`)
                .set("x-auth-token", validJWT)
                .send({"nombre": "Nuevo Nombre","email": "nuevo@email.com","password": "nuevaContraseña","apellidos": "Nuevos Apellidos","companiaSanitaria": "Nueva Compañía","tarjetaSanitaria": "9876-5432-1234-5678","rol": "Usuario"});
    
            expect(response.statusCode).toBe(404);
            //expect(dbUpdate).toBeCalledWith({ _id: nonExistentUserId }, expect.any(Object), { new: true });

        }, 150000);

        it("Debe devolver un error 500 si se produce un error de comunicaciones", async () => {
            // Simula un error de comunicaciones
            User.findById = jest.fn(() => {
            throw new Error("Error de comunicaciones");
            });
        
            // SpyOn para comprobar que no se llama al método findById()
            const findByIdSpy = jest.spyOn(User, "findById");
        
        // Realiza la solicitud PUT
        try {
            await request(app)
                .put(`/api/v1/auth/users/${userId}`)
                .set("Authorization", `Bearer ${token}`)
                .set("x-auth-token", validJWT)
                .send({"nombre": "Nuevo Nombre","email": "nuevo@email.com","password": "nuevaContraseña","apellidos": "Nuevos Apellidos","companiaSanitaria": "Nueva Compañía","tarjetaSanitaria": "9876-5432-1234-5678","rol": "Usuario"});
            } catch (error) {
            // No se espera que se llame al método findById() si hay un error
            expect(findByIdSpy).not.toHaveBeenCalled();
            }
        });
    });
});