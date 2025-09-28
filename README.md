<p align="center">
  <a href="http://nestjs.com/" target="blank">
    <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" />
  </a>
</p>

# ⚙️ Backend - Sistema de Gestión de Trámites de Tránsito

[![NestJS](https://img.shields.io/badge/NestJS-11-red?logo=nestjs)](https://nestjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![TypeORM](https://img.shields.io/badge/ORM-TypeORM-green?logo=typeorm)](https://typeorm.io/)
[![PostgreSQL](https://img.shields.io/badge/DB-PostgreSQL-blue?logo=postgresql)](https://www.postgresql.org/)
[![JWT](https://img.shields.io/badge/Auth-JWT-orange?logo=jsonwebtokens)](https://jwt.io/)
[![Swagger](https://img.shields.io/badge/API-Swagger-brightgreen?logo=swagger)](https://swagger.io/)

---

## 📖 Descripción

Este proyecto corresponde al **backend** del sistema de **gestión de trámites de tránsito**.  
Es una **API REST** desarrollada en **NestJS** con **TypeORM** y **PostgreSQL**, que gestiona la lógica de negocio, autenticación, usuarios, trámites y turnos.

### ✨ Funcionalidades principales

* 🔐 **Autenticación y autorización** con JWT y bcrypt.  
* 👤 **Gestión de usuarios y roles** (`ADMIN`, `ASESOR`, `CIUDADANO`).  
* 📑 **CRUD de trámites y tipos de trámites**.  
* 🕑 **Gestión de turnos** (asignación y control básico).  
* 📜 **Documentación automática de endpoints con Swagger**.  

---

## 📂 Estructura del proyecto

```

src/
│── auth/               # Autenticación (login, register, guards, strategy)
│── common/             # Decoradores, interceptores, filtros globales
│── config/             # Configuración (DB, JWT, Swagger, env)
│── modules/            # Módulos principales de negocio
│   ├── users/          # CRUD de usuarios y roles
│   ├── tramites/       # CRUD de trámites
│   ├── tipos-tramites/ # Gestión de tipos de trámites
│   └── turnos/         # Gestión de turnos
│── app.module.ts       # Módulo raíz
│── main.ts             # Punto de entrada de la aplicación
test/                   # Pruebas unitarias y e2e

````

---

## ⚙️ Instalación y ejecución

### 1️⃣ Clonar el repositorio

```bash
git clone https://github.com/cristianManco/tramites-transito.git
cd tramites-transito/backend
````

### 2️⃣ Instalar dependencias

```bash
npm install
# o con pnpm
pnpm install
```

### 3️⃣ Configurar variables de entorno

Crea un archivo `.env` en la raíz del backend, basado en `.env.example`:

```env
# Puerto del servidor
PORT=3002

# Base de datos PostgreSQL
DATABASE_TYPE=postgres
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=yourStrongPassword
DATABASE_DB=tramites_db

# Configuración JWT
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=2h

# Entorno
NODE_ENV=development
```

⚠️ **Nota:**
Por defecto `synchronize: false` (recomendado para producción).
En desarrollo puedes habilitarlo cambiando en tu `ConfigModule` o `app.module.ts`:

```ts
synchronize: true
```

---

### 4️⃣ Levantar servidor en desarrollo

```bash
npm run start:dev
```

Servidor disponible en 👉 [http://localhost:3002](http://localhost:3002)

### 5️⃣ Documentación Swagger

* Producción: [https://tramites-transito-api.onrender.com/api/docs](https://tramites-transito-api.onrender.com/api/docs)
* Local: [http://localhost:3002/api/docs](http://localhost:3002/api/docs)

---

## 🔑 Credenciales de prueba

Puedes **registrar un usuario** o usar estas credenciales de ejemplo:

```
email: cristian@tramites.net
password: zxcvbnm
```

---

## 🛠️ Pruebas

### 🔹 Manuales con Swagger/Postman

1. Levanta el servidor en `localhost:3002`.
2. Accede a Swagger en `/api/docs`.
3. Prueba login, gestión de usuarios, trámites y turnos.

### 🔹 Unitarias (Jest)

```bash
npm run test
```

### 🔹 End-to-End

```bash
npm run test:e2e
```

---

## 🎨 Sustento de diseño

* **NestJS modular** → separación por módulos (auth, users, trámites, turnos).
* **TypeORM + PostgreSQL** → ORM sólido con migraciones y tipado fuerte.
* **JWT + Guards** → autenticación segura y escalable.
* **Swagger** → documentación clara para integraciones frontend.
* **DTOs + Pipes** → validación estricta de datos.

---

## 🧑‍💻 Desarrollador

**Cristian Correa**
📧 Email: [camilomanco2005@gmail.com](mailto:camilomanco2005@gmail.com)
💼 GitHub: [cristianManco](https://github.com/cristianManco)

```
