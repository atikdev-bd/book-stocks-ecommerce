import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { AuthContext } from "../Context/AuthProvider/AuthProvider";
import Navbar from "../Pages/Shared/Navbar/Navbar";

const DashBoardLayout = () => {
  const { user } = useContext(AuthContext);
 
  const [userInfo, setUserInfo] = useState([]);

  const info = userInfo[0];

  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:5000/users?email=${user?.email}`
      );
      const data = await res.json();
      setUserInfo(data);
      return data;
    },
  });

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
        <div className="drawer-side">
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

                    <Link to="/dashboard/orders">My Orders</Link>

                    <Link to="/dashboard/add/products">Add Products</Link>
                    <Link className="mt-4" to="/dashboard/products">
                      My Products
                    </Link>
                  </>
                )}
              </>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashBoardLayout;
