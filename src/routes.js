/*!

=========================================================
* Argon Dashboard React - v1.2.4
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2024 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import Maps from "views/examples/Maps.js";
import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
import Tables from "views/examples/Tables.js";
import Icons from "views/examples/Icons.js";
import UserManagement from "views/examples/UserManagement.js";
import ForgotPassword from "views/examples/ForgotPassword.js";
import QRLogin from "views/examples/QRLogin.js";
import QRRegister from "views/examples/QRRegister.js";
import CreateUser from "views/examples/CreateUser.js";
import EditUser from "views/examples/EditUser.js";
import SectionManagement from "views/examples/SectionManagement.js";
import CreateSection from "views/examples/CreateSection.js";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: <Index />,
    layout: "/admin",
  },
  {
    path: "/user-management",
    name: "User Management",
    icon: "ni ni-settings-gear-65 text-blue",
    component: <UserManagement />,
    layout: "/admin",
  },
  {
    path: "/section-management",
    name: "Section Management",
    icon: "ni ni-books text-green",
    component: <SectionManagement />,
    layout: "/admin",
  },
  {
    path: "/maps",
    name: "Maps",
    icon: "ni ni-pin-3 text-orange",
    component: <Maps />,
    layout: "/admin",
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: <Profile />,
    layout: "/admin",
  },
  {
    path: "/tables",
    name: "Tables",
    icon: "ni ni-bullet-list-67 text-red",
    component: <Tables />,
    layout: "/admin",
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: <Login />,
    layout: "/auth",
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: <Register />,
    layout: "/auth",
  },
  {
    path: "/",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: <Register />,
    layout: "/auth",
  },
  {
    path: "/forgot-password",
    name: "Forgot Password",
    icon: "ni ni-key-25 text-info",
    component: <ForgotPassword />,
    layout: "/auth",
  },
  {
    path: "/qr-login",
    name: "QR Login",
    icon: "ni ni-camera-compact text-info",
    component: <QRLogin />,
    layout: "/auth",
  },
  {
    path: "/qr-register",
    name: "QR Register",
    icon: "ni ni-camera-compact text-info",
    component: <QRRegister />,
    layout: "/auth",
  },
  {
    path: "/create-user",
    name: "Create User",
    icon: "ni ni-fat-add text-primary",
    component: <CreateUser />,
    layout: "/admin",
  },
  {
    path: "/edit-user/:id",
    name: "Edit User",
    icon: "ni ni-single-02 text-primary",
    component: <EditUser />,
    layout: "/admin",
  },
  {
    path: "/create-section",
    name: "Create Section",
    icon: "ni ni-fat-add text-primary",
    component: <CreateSection />,
    layout: "/admin",
  },
];
export default routes;
