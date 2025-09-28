<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>


---

# ⚙️ Backend - Sistema de Gestión de Trámites de Tránsito

[![NestJS](https://img.shields.io/badge/NestJS-11-red?logo=nestjs)](https://nestjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![JWT](https://img.shields.io/badge/Auth-JWT-orange?logo=jsonwebtokens)](https://jwt.io/)

---

## 📖 Descripción

Este proyecto corresponde al **backend** del sistema de **gestión de trámites de tránsito**.
Es una API REST desarrollada en **NestJS** que soporta la lógica de negocio, autenticación, seguridad y comunicación con la base de datos.

### Funcionalidades principales

* 🔐 **Autenticación y autorización** con JWT y bcrypt.
* 👤 **Gestión de usuarios** con roles (`ADMIN`, `ASESOR`, `CIUDADANO`).
* 📑 **CRUD de trámites y tipos de trámites**.
* 🕑 **Gestión de turnos** mediante mallas semanales y calendario.
* 🛡️ **Middleware y Guards personalizados** para control de acceso.
* 🛠️ **Arquitectura modular** y escalable para facilitar mantenimiento.

---

## 🧑‍💻 Desarrollador

**Cristian Correa**
📧 Email: [camilomanco2005@gmail.com](mailto:camilomanco2005@gmail.com)
💼 GitHub: [cristianManco](https://github.com/cristianManco)

---

## 🏗️ Arquitectura

### 🔹 Tipo de arquitectura

* **Modular en capas (Domain Driven Design ligero con NestJS)**
* Módulos principales:

  * **Auth** → Login, register, guards.
  * **Users** → Gestión de usuarios y roles.
  * **Trámites** → CRUD de trámites y tipos.

### 🔹 Sustento

✔️ **Separación de responsabilidades** (auth, usuarios, trámites, turnos).
✔️ **Escalabilidad**: cada módulo puede crecer de forma independiente.
✔️ **Seguridad**: JWT + Guards + validaciones con `class-validator`.
✔️ **Mantenibilidad** gracias a TypeScript y NestJS.

---


## 📂 Estructura del proyecto

```
backend/
│── src/
│   ├── modules/
│   │   ├── auth/              # Autenticación (login, register, guards, strategy)
│   │   ├── users/             # CRUD usuarios y roles
│   │   ├── tramites/          # CRUD trámites y tipos de trámites
│   │   ├── turnos/            # Malla semanal de turnos
│   │   └── calendario/        # Fechas y semanas para turnos
│   ├── common/                # Guards, interceptores, decoradores
│   ├── config/                # Configuración (DB, JWT)
│   └── main.ts                # Punto de entrada
│── ormconfig.ts                # Configuración de TypeORM
│── package.json
│── tsconfig.json
│── README.md
```

---

## ⚙️ Instalación y ejecución

### 1️⃣ Clonar el repositorio

```bash
git clone https://github.com/cristianManco/tramites-transito.git
cd tramites-transito/backend
```

### 2️⃣ Instalar dependencias

```bash
npm install
# o con pnpm
pnpm install
```

### 3️⃣ Configurar variables de entorno

Crear archivo `.env` en la raíz del backend:

```env
# Puerto del servidor
PORT=3001

# Configuración base de datos
DB_HOST=localhost
DB_PORT=1433
DB_USERNAME=sa
DB_PASSWORD=yourStrong(!)Password
DB_NAME=tramites_db

# Configuración JWT
JWT_SECRET=supersecretkey
JWT_EXPIRES_IN=1d
```


### 5️⃣ Levantar servidor en desarrollo

```bash
npm run start:dev
```

Servidor disponible en 👉 [http://localhost:3001](http://localhost:3001)

---

## 🔑 Credenciales de prueba

Usuario administrador por defecto:

```
email: admin@test.com
password: 123456
```

---

## 🛠️ Pruebas

### Pruebas manuales con Postman

* Importar colección de endpoints (`/docs` o `/postman_collection.json`).
* Probar login, CRUD de usuarios, trámites y turnos.

### Pruebas unitarias (Jest)

```bash
npm run test
```

### Pruebas e2e

```bash
npm run test:e2e
```

---

## 🎨 Sustento de diseño

* **NestJS modular** → cada funcionalidad en su propio módulo.
* **TypeORM** → manejo de entidades, migraciones y relaciones con SQL Server.
* **JWT + Guards** → autenticación segura y escalable.
* **DTOs + Pipes** → validación estricta en entrada de datos.

---

## 📌 Próximos pasos

* Documentación de API con **Swagger** (`@nestjs/swagger`).
* Logs y monitoreo con **Winston** o **Pino**.
* Implementación de colas de trabajo para notificaciones.
* Pruebas E2E completas.

---
