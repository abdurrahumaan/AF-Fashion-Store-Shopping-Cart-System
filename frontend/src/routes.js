import Dashboard from "views/Dashboard.jsx";
import UserProfile from "views/UserProfile.jsx";
import ShopUser from "views/ShopUser.jsx";


const dashboardRoutes = [{
        path: "/dashboard",
        name: "Add Categories",
        icon: "pe-7s-graph",
        component: Dashboard,
        layout: "/admin"
    },
    {
        path: "/user",
        name: "User List",
        icon: "pe-7s-user",
        component: UserProfile,
        layout: "/admin"
    },
    {
        path: "/shopuser",
        name: "Shop User List",
        icon: "pe-7s-user",
        component: ShopUser,
        layout: "/admin"
    }

];

export default dashboardRoutes;
