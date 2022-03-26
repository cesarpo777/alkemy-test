# Disney API 

## Tabla de contenidos

* Descripción

* Instalación

* Uso/Documentación

* Tecnologías

* Autor

--------

## Descripción

Este proyecto es una API que contiene personajes y películas de Disney junto con sus géneros. 

Permite registrarse y loguearse, para posteriormente mediante el envío de un token poder realizar CRUDS de personajes y películas.

------

## Instalación

Clonar el proyecto e instalar dependencias

```sh
  git clone https://github.com/cesarpo777/alkemy-test.git
```

```sh
  npm install
```

## Uso y Documentación

Crea un archivo .env  usando como ejemplo el .env.example

```sh
PORT= Puerto donde va a correr la app
 
PRIVATE_KEY= Clave para firmar los tokens

DB_USERNAME= Nombre de usuario de la base de datos

DB_PASS= Clave de la base de datos

DB_HOST= Host de tu base de datos

DB_NAME= Nombre de la base de datos

```

Ejecutar el siguiente comando

```sh
  npm start
```

Para ver documentacion y probar endpoints importar los archivos de la carpeta postman en software de postman

---

## Tecnologías y librerías

* Express
* Express validator
* bcrypt
* jsonwebtoken
* Sequelize
* mysql2
* cors
* dotenv

El proyecto actualmente esta alojado en:
```sh
https://alkemy-personajes-api.herokuapp.com/
```
---

## Autor

César Muzio

Donde encontrarme:

| Github | LinkedIn |
| ----- |-------|
| [Github](https://github.com/cesarpo777)  | [LinkedIn](https://www.linkedin.com/in/c%C3%A9sar-muzio/)|


