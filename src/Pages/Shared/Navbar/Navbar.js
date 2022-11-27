import React, { useContext } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import ProfileIcon from "../../../Assets/icons/icons8-account-64.png";
import TitleIcon from "../../../Assets/icons/icons8-literature-100.png";
import { AuthContext } from "../../../Context/AuthProvider/AuthProvider";
import "./Navbar.css";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  return (
    <div className=" navbar font-semibold">
      <div className="flex-1">
        <label
          htmlFor="dashboard-drawer"
          tabIndex={2}
          className="btn btn-ghost lg:hidden"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h8m-8 6h16"
            />
          </svg>
        </label>
        <Link to="/">
          {" "}
          <img className="w-14 title-icon" src={TitleIcon} alt="" />
        </Link>
        <Link to="/" className="flex items-center ml-4 hover:text-green-600">
          <span className="text-4xl font-bold">B</span>
          <span className="text-xl"> -Stocks</span>
        </Link>
      </div>
      <div className="link-div mr-28  font-bold hidden lg:block">
        {user?.uid ? (
          <>
            {" "}
            <div className="flex">
              <div>
                <Link to="/" className="mr-3">
                  Home
                </Link>
                <Link to="/blogs" className="mr-3 hover:text-blue-900">
                  Blogs
                </Link>
                <Link to="/dashboard" className="mr-3 hover:text-yellow-700">
                  Dashboard
                </Link>
              </div>
              <div className="ml-36 mt-1">
                <FaSignOutAlt
                  onClick={logOut}
                  className="hover:text-stone-400"
                ></FaSignOutAlt>
              </div>
            </div>
          </>
        ) : (
          <>
            <Link to="/" className="mr-3">
              Home
            </Link>
            <Link to="/blogs" className="mr-3 hover:text-blue-900">
              Blogs
            </Link>
            <Link to="/login" className="mr-3 hover:text-sky-700">
              Login
            </Link>
            <Link to="/register" className="mr-3 hover:text-green-500">
              Register
            </Link>
          </>
        )}
      </div>

      <div className="flex-none gap-2">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div title={user?.displayName} className="w-10 rounded-full">
              {user?.photoURL ? (
                <img src={user?.photoURL} alt="" />
              ) : (
                <img src={ProfileIcon} alt="" />
              )}
            </div>
          </label>
          <ul
            tabIndex={0}
            className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
          >
            <div className="lg:hidden block">
              {user?.uid ? (
                <>
                  {" "}
                  <li>
                    <Link to="/" className="mr-3">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/dashboard"
                      className="mr-3 hover:text-yellow-700"
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link to="/blogs" className="mr-3 hover:text-blue-900">
                      Blogs
                    </Link>
                  </li>
                  <li>
                    <Link onClick={logOut}>Logout</Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    {" "}
                    <Link to="/" className="mr-3">
                      Home
                    </Link>
                  </li>
                  <li>
                    {" "}
                    <Link to="/register" className="mr-3 hover:text-green-500">
                      Register
                    </Link>
                  </li>
                  <li>
                    <Link to="/login" className="mr-3 hover:text-sky-700">
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link to="/blogs" className="mr-3 hover:text-blue-900">
                      Blogs
                    </Link>
                  </li>
                </>
              )}
            </div>
            <li>
              <Link>Settings</Link>
            </li>
            <li>
              <Link>Profile</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
