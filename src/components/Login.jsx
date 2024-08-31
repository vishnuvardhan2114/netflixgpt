import React, { useState } from "react";
import Header from "./Header";

const Login = () => {
  const [label, setLabel] = useState("Sign In");
  const [isSignUp, setIsSignUp] = useState(false);
  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/dae1f45f-c2c5-4a62-8d58-6e1b0c6b2d8e/6d1fb8a4-5844-42a4-9b01-1c6c128acf19/IN-en-20240827-TRIFECTA-perspective_WEB_c292a608-cdc6-4686-8dc8-405bfcf753af_small.jpg"
          alt="Logo"
        />
      </div>

      <form className="w-3/12 p-12 absolute bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-85">
        <h1 className="font-bold text-3xl py-4">{label}</h1>
        {label === "Sign Up" && (
          <input
            type="text"
            placeholder="Username"
            className="p-4 my-2 w-full rounded-md bg-slate-700"
          />
        )}
        <input
          type="email"
          placeholder="Email"
          className="p-4 my-2 w-full rounded-md bg-slate-700"
        />
        <input
          type="password"
          placeholder="Password"
          className="p-4 my-4 w-full rounded-md bg-gray-700"
        />
        <button
          type="submit"
          className="w-full justify-center flex p-4 my-8 bg-red-700 rounded-lg text-2xl font-bold"
        >
          {label}
        </button>
        {!isSignUp && (
          <p className="font-semibold text-xl text-gray-400">
            New to Netflix?{" "}
            <a
              href="#"
              className="font-semibold text-white text-xl hover:underline"
              onClick={() => {
                setLabel("Sign Up");
                setIsSignUp(true);
              }}
            >
              Sign up now.
            </a>
          </p>
        )}
        {isSignUp && (
          <p className="font-semibold text-xl text-gray-400">
            Already have account!{" "}
            <a
              href="#"
              className="font-semibold text-white text-xl hover:underline"
              onClick={() => {
                setLabel("Sign In");
                setIsSignUp(false);
              }}
            >
              Sign In now.
            </a>
          </p>
        )}
      </form>
    </div>
  );
};

export default Login;
