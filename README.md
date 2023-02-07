# Tenant Potal

This is a portal designed for making communications between tenants and superintendents easier.

See it in action at https://portal.cyclic.app

See the TypeScript version here: https://github.com/tonghohin/ts-portal

See the JavaScript with Firebase version here: https://github.com/tonghohin/firebase-portal

## Features

- **Tenant Database** - Superintendents are able to read, add, update or delete any tenants from the database.
- **Announcement Board** - Superintendents can post announcements on the portal and the tenants will be able to read them after loggin in to the portal.
- **Private Message** - Tenants can leave private messages to superintendents and superintendents can manage all the received messages on the portal.
- **Gymroom Registration** - Tenants can use the portal for registering access to the gymroom.
- **Different Access Rights** - React Router is used for routing users with different access rights to different pages, e.g. tenants would not be able to see the superintendents' page.
- **Authentication** - JSON Web Tokens is used for handling authentication. Users are authenticated when they login. Unauthenticated users will not be able to access the portal.
- **User Accounts** - Both tenants and superintendents have to register an account and use the credentials for future login. The user credentials are store in a MongoDB database with the passwords encrypted.

## Built With

- JavaScript
- Tailwind CSS
- React
- React Router
- Redux Toolkit
- Express
- REST API
- MongoDB
- Mongoose
- JSON Web Tokens
- Cyclic

## Demo

### User

https://user-images.githubusercontent.com/103472449/217102779-a538f36c-074f-4fca-af0d-caca4927984f.mov

### Admin

https://user-images.githubusercontent.com/103472449/217102812-281659d0-e89f-413b-8631-c0e0bb3d6640.mov

## Contact

https://tonghohin.cyclic.app
