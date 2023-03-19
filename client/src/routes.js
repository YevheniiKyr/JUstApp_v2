import AdminPage from "./Pages/adminPage";
import {
    ADMIN_ROUTE,
    BASKET_ROUTE,
    LOGIN_ROUTE, ORDER_ROUTE,
    PRODUCT_ROUTE, PURCHASE_ROUTE,
    REGISTRATION_ROUTE,
    SHOP_ROUTE, SHOW_ORDERS_ROUTE
} from "./utils/constRoutes";
import mainPage from "./Pages/mainPage";
import authPage from "./Pages/authPage";
import productPage from "./Pages/productPage";
import basketPage from "./Pages/basketPage";
import orderPage from "./Pages/orderPage";
import purchasePage from "./Pages/purchasePage";
import manageOrdersPage from "./Pages/manageOrdersPage";

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: AdminPage
    },
    {
        path: BASKET_ROUTE + '/:id',
        Component: basketPage
    },
    {
        path: PURCHASE_ROUTE + '/:id' ,
        Component: purchasePage
    },
    {
        path: ORDER_ROUTE + '/:id' ,
        Component: orderPage
    },
 /*  {
       path: CHECK_ORDER_ROUTE + '/:id'
        Component
    }*/
    {
        path: SHOW_ORDERS_ROUTE  ,
        Component: manageOrdersPage
    }

]

export const publicRoutes = [

    {
        path: SHOP_ROUTE,
        Component: mainPage
    },

    {
        path: LOGIN_ROUTE,
        Component: authPage
    },
    {
        path: REGISTRATION_ROUTE,
        Component: authPage},
    {
        path: PRODUCT_ROUTE + '/:id',
        Component: productPage
    },


]