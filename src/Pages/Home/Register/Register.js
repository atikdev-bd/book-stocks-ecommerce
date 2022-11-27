import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import GoogleIcon from "../../../Assets/icons/icons8-google-100.png";
import { AuthContext } from "../../../Context/AuthProvider/AuthProvider";
import useToken from "../../../Hooks/UseToken";

const Register = () => {
  const navigate = useNavigate();
  const [registerUserEmail, setRegisterUserEmail] = useState("");

  const [Token] = useToken(registerUserEmail);

  if (Token) {
    navigate("/");
  }

  const { register, handleSubmit } = useForm();
  const { createUser, updateUser } = useContext(AuthContext);

  const registerInfo = (data) => {
    const { email, password, name, users } = data;
    const userInfo = {
      displayName: name,
    };
    ////create user email and password //
    createUser(email, password)
      .then((result) => {
        ///update user name ????
        updateUser(userInfo)
          .then((result) => {
            setRegisterUserEmail(email);
            usersInfo(email, userInfo?.displayName, users);
          })
          .catch((error) => {});
      })
      .catch((error) => {});
  };

  //// create userInfo
  const usersInfo = (email, name, users) => {
    const user = {
      email,
      name,
      role: users,
    };

    /// get user info and post user info in backend to database ///
    fetch("https://assignment-12-server-side-atikdev-bd.vercel.app/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {});
  };

  return (
    <div>
      <div className="hero min-h-screen">
        <div className="hero-content flex-col">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Register Here !</h1>
          </div>

          <form
            onSubmit={handleSubmit(registerInfo)}
            className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-zinc-100"
          >
            <div className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  {...register("name")}
                  type="text"
                  name="name"
                  placeholder="full name"
                  className="input input-bordered"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  {...register("email")}
                  type="text"
                  name="email"
                  placeholder="email"
                  className="input input-bordered"
                  required
                />
              </div>
              <label className="label">
                <span className="label-text">Chose user</span>
              </label>
              <select
                {...register("users")}
                className="select select-bordered w-full"
              >
                <option value="buyer account">buyer account</option>
                <option value="seller account">seller account</option>
              </select>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="text"
                  {...register("password")}
                  name="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                />
              </div>

              <div className="form-control mt-6">
                <button className="btn btn-accent">Register</button>
              </div>
              <p>
                Already have an account :
                <button className="btn text-emerald-500 btn-active btn-link">
                  <Link to="/login">Login Here</Link>
                </button>
              </p>
              <div
                onClick={"googleLogin"}
                className="flex justify-center items-center cursor-pointer border bg-emerald-200 hover:bg-emerald-300 rounded-full"
              >
                <img className="w-12 " src={GoogleIcon} alt="" />
                <p className="px-4">continue with google</p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
