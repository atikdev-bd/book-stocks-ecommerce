import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { AuthContext } from "../Context/AuthProvider/AuthProvider";
import Footer from "../Pages/Shared/Footer/Footer";
import Loader from "../Pages/Shared/Loader/Loader";
import Navbar from "../Pages/Shared/Navbar/Navbar";
import "./DashBoardLayout.css";

const DashBoardLayout = () => {
  const { user, loading } = useContext(AuthContext);

  const [userInfo, setUserInfo] = useState([]);

  const info = userInfo[0];

  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch(
        `https://assignment-12-server-side-atikdev-bd.vercel.app/users?email=${user?.email}`
      );
      const data = await res.json();
      setUserInfo(data);

      return data;
    },
  });
  if (isLoading || loading) {
    return <Loader></Loader>;
  }
  return (
    <div>
      <Navbar></Navbar>
      <div className="drawer drawer-mobile">
        <input
          id="dashboard-drawer"
          type="checkbox"
          className="drawer-toggle"
        />
        <div className="drawer-content">
          <Outlet></Outlet>
        </div>
        <div className="drawer-side font-bold mr-4 bg-slate-100">
          <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80  text-base-content">
            {info?.role === "buyer account" && (
              <li>
                <Link to="/dashboard/orders">My Orders</Link>
              </li>
            )}
            <li className="mt-4">
              <>
                {info?.role === "seller account" && (
                  <>
                    <Link to="/dashboard/add/products">Add Products</Link>
                    <Link className="mt-4" to="/dashboard/products">
                      My Products
                    </Link>
                  </>
                )}

                {info?.role === "Admin" && (
                  <>
                    <Link className="mt-4" to="/dashboard/sellers">
                      All Sellers
                    </Link>
                    <Link className="mt-4" to="/dashboard/buyers">
                      All Buyers
                    </Link>
                  </>
                )}
              </>
            </li>
          </ul>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default DashBoardLayout;
