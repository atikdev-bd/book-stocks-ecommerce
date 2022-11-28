import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import GoogleIcon from "../../../Assets/icons/icons8-google-100.png";
import { AuthContext } from "../../../Context/AuthProvider/AuthProvider";
import useToken from "../../../Hooks/UseToken";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [loginUserEmail, setLoginUserEmail] = useState("");

  const from = location.state?.from?.pathname || "/";

  const [Token] = useToken(loginUserEmail);

  if (Token) {
    navigate(from, { replace: true });
  }

  const { emailAndPasswordLogin, googleLogin } = useContext(AuthContext);
  const { register, handleSubmit } = useForm();
  const loginInfo = (data) => {
    const { email, password } = data;

    emailAndPasswordLogin(email, password)
      .then((result) => {
        setLoginUserEmail(email);

         toast.success("Login successfully");
      })
      .catch((error) => {
        const err = error?.message;

        if (err === "Firebase: Error (auth/wrong-password).") {
          return toast.error("Wrong password");
        }
        if (err === "Firebase: Error (auth/user-not-found).") {
          return toast.error("User not found");
        }
        if (
          err ===
          "Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests)."
        ) {
          return toast.error(
            "Access to this account has been temporarily disabled due to many failed login attempts."
          );
        }
      });
  };

  const handleGoogle = () => {
    googleLogin()
      .then((res) => {

        toast.success('Login successfully')
        const email = res?.user?.email;

        setLoginUserEmail(email);
      })
      .catch((error) => {});
  };

  return (
    <div className="hero min-h-screen ">
      <div className="hero-content flex-col ">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
        </div>
        <form onSubmit={handleSubmit(loginInfo)}>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-zinc-100">
            <div className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  {...register("email")}
                  required
                  type="text"
                  placeholder="email"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  {...register("password")}
                  required
                  type="text"
                  placeholder="password"
                  className="input input-bordered"
                />
                <label className="label">
                  <Link href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </Link>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-accent">Login</button>
              </div>
              <div>
                <h1>
                  You have no account ?{" "}
                  <Link className="text-secondary" to="/register">
                    Create new account
                  </Link>
                </h1>
              </div>
              <div className="divider text-slate-900">OR</div>
              <div
                onClick={handleGoogle}
                id="login-id"
                className="flex mt-4 justify-center items-center border cursor-pointer bg-emerald-200 hover:bg-emerald-300  rounded-full"
              >
                <img className="w-12 " src={GoogleIcon} alt="" />
                <p className="px-4">continue with google</p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
