import Admin from "./pages/Admin";
import Auth from "./pages/Auth";
import NewsPage from "./pages/NewsPage";
import Registration from "./pages/Registration";
import Shop from "./pages/Shop";
import { ADMIN_ROUTE, LOGIN_ROUTE, NEWS_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from "./utils/consts";

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
]

export const publicRoutes = [
    {
        path: SHOP_ROUTE,
        Component: Shop
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Registration
    },
    {
        path: NEWS_ROUTE,
        Component: NewsPage
    },
]