API REST para la gestión de usuarios en entornos de atención médica

Introducción

Hygeia Care Users es una API REST que proporciona funcionalidades para la administración de usuarios en entornos de atención médica. La API permite realizar operaciones como la creación, actualización, eliminación y recuperación de información relacionada con los usuarios.

Funcionalidades

Las principales funcionalidades de la API Hygeia Care Users son las siguientes:

  Registro de usuarios: Permite la creación de nuevos usuarios proporcionando información como nombre, correo electrónico, contraseña, apellidos, compañía sanitaria, tarjeta sanitaria y rol (Administrador o Usuario).
  Inicio de sesión y autenticación: Proporciona un mecanismo de inicio de sesión seguro mediante el uso de tokens JWT (JSON Web Token).
  Gestión de perfiles: Permite la recuperación de detalles de usuarios individuales y la actualización de la información del perfil de usuario.
  Eliminación de usuarios: Permite eliminar usuarios existentes.
  Verificación de token: Incluye un mecanismo para verificar la autenticidad de los tokens JWT utilizados en las solicitudes.

Tecnologías y herramientas utilizadas

La API Hygeia Care Users está construida sobre las siguientes tecnologías y herramientas:

  Node.js y Express: Utilizados para construir el backend de la aplicación y proporcionar servicios web.
  MongoDB: Base de datos NoSQL utilizada para almacenar y recuperar información de usuarios de manera eficiente.
  JWT (JSON Web Token): Mecanismo seguro para la autenticación y autorización de usuarios.
  Docker: Utilizado para contenizar la aplicación y simplificar su despliegue.

Despliegue

Para desplegar la API Hygeia Care Users, es necesario seguir los siguientes pasos:

  Clonar el repositorio de GitHub:
    git clone https://github.com/[nombre_usuario]/hygeia-care-users.git
  Acceder a la carpeta del proyecto:
    cd hygeia-care-users
  Instalar las dependencias:
    npm install
  Levantar la aplicación:
    npm start
    
La aplicación se desplegará en el puerto 3333.
