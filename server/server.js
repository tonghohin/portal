const express = require("express");
const app = express();

app.listen(process.env.PORT || 8000, () => {
  console.log("SERVER LISTENING!");
});

const connectMongo = require("./mongo/connectMongo");
connectMongo();

app.use(express.json());

// ------------------------------ Both ------------------------------
const Announcement = require("./route/announcement");
app.use(Announcement);

const Message = require("./route/message");
app.use(Message);

// ------------------------------ Admin ------------------------------
const Authenticate = require("./route/admin/authenticate");
app.use("/admin", Authenticate);

const Resident = require("./route/admin/residents");
app.use("/admin", Resident);

const Gym = require("./route/admin/gym");
app.use("/admin", Gym);

const Login = require("./route/admin/login");
app.use("/admin", Login);

const Register = require("./route/admin/register");
app.use("/admin", Register);

// ------------------------------ User ------------------------------
const UserAuthenticate = require("./route/user/authenticate");
app.use("/", UserAuthenticate);

const UserLogin = require("./route/user/login");
app.use("/", UserLogin);

const UserGym = require("./route/user/gym");
app.use("/", UserGym);

const UserResident = require("./route/user/residents");
app.use("/", UserResident);
