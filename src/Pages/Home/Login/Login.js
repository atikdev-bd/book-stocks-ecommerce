import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import GoogleIcon from "../../../Assets/icons/icons8-google-100.png";
import { AuthContext } from "../../../Context/AuthProvider/AuthProvider";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const { emailAndPasswordLogin, googleLogin } = useContext(AuthContext);
  const { register, handleSubmit } = useForm();
  const loginInfo = (data) => {
    const { email, password } = data;

    emailAndPasswordLogin(email, password)
      .then((result) => {

        navigate(from, { replace: true });
        toast.success('Login successfully')
       
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleGoogle = () => {
    googleLogin()
      .then((res) => {

        navigate(from, { replace: true });
        toast.success('Login successfully')
        
      })
      .catch((error) => {
        
      });
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
                  New to Doctors Portal?{" "}
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
      <Toaster></Toaster>
    </div>
  );
};

export default Login;
