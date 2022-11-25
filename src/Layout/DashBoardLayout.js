import React from "react";
import { Link, Outlet } from "react-router-dom";
import Navbar from "../Pages/Shared/Navbar/Navbar";

const DashBoardLayout = () => {
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
            <li>
              <Link to="/dashboard/orders">My Orders</Link>
            </li>
            <li className="mt-4">
              <>
                <Link to="/dashboard/add/products">Add Products</Link>
                <Link className="mt-4" to="/dashboard/products">
                 My Products
                </Link>
                <Link className="mt-4" to="/dashboard/sellers">
                  All Sellers
                </Link>
                <Link className="mt-4" to="/dashboard/buyers">
                  All Buyers
                </Link>
              </>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashBoardLayout;
