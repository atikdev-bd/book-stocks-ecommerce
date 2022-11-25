import { createBrowserRouter } from "react-router-dom";
import AddProducts from "../DashBoard/DashBoard/AddProducts/AddProducts";
import AllBuyers from "../DashBoard/DashBoard/AllBuyers/AllBuyers";
import AllSellers from "../DashBoard/DashBoard/AllSerllers/AllSellers";
import MyProducts from "../DashBoard/DashBoard/MyProdects/MyProducts";
import Orders from "../DashBoard/DashBoard/Orders/Orders";
import DashBoardLayout from "../Layout/DashBoardLayout";
import Main from "../Layout/Main";
import AllBooks from "../Pages/Home/AllBooks/AllBooks";
import Blogs from "../Pages/Home/Blogs/Blogs";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Home/Login/Login";
import Register from "../Pages/Home/Register/Register";
import ErrorElement from "../Pages/Shared/ErrorElement/ErrorElement";
import PrivetRoute from "../PrivetRoute/PrivetRoute";

export const router = createBrowserRouter([
    {
        path : '/',
        element : <Main></Main>,
        errorElement : <ErrorElement></ErrorElement>,
        children : [
            {
                path : '/',
                element : <Home></Home>
            },
           
            {
                path : '/category/:id',
                element : <AllBooks></AllBooks>
            },
            {
                path : '/login',
                element : <Login></Login>
            },
            {
                path : '/register',
                element : <Register></Register>
            },
            {
                path : '/blogs',
                element : <Blogs></Blogs>
            },
        ]
    },
    {
        path: "/dashboard",
        element: (
          <PrivetRoute>
           <DashBoardLayout></DashBoardLayout>
          </PrivetRoute>
        ),
        errorElement: <ErrorElement></ErrorElement>,
        children: [
          {
            path: "/dashboard/orders",
            element: <Orders></Orders>
          },
          {
            path: "/dashboard/add/products",
            element: <AddProducts></AddProducts>
          },
          {
            path: "/dashboard/Products",
            element: <MyProducts></MyProducts>
          },
          {
            path: "/dashboard/sellers",
            element: <AllSellers></AllSellers>
          },
          {
            path: "/dashboard/buyers",
            element: <AllBuyers></AllBuyers>
          },
         
        ],
      },
])