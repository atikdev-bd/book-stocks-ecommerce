import { createBrowserRouter } from "react-router-dom";
import DashBoardLayout from "../Layout/DashBoardLayout";
import Main from "../Layout/Main";
import AllBooks from "../Pages/Home/AllBooks/AllBooks";
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
            path: "/dashboard",
            element: ""
          },
         
        ],
      },
])