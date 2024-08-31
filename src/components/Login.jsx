import React, { useRef, useState } from "react";
import Header from "./Header";
import checkvalidate from "../utils/validate";
const Login = () => {
  const [label, setLabel] = useState("Sign In");
  const [isSignUp, setIsSignUp] = useState(false);
  const [errorMessage, seterrorMessage] = useState("");
  const email = useRef(null);
  const password = useRef(null);
  const handleButtonClick = () => {
    console.log(email.current.value);
    console.log(password.current.value);
    const validate = checkvalidate(email.current.value,password.current.value)
    seterrorMessage(validate);
    
  }
  return (
    <div >
      <Header />
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/dae1f45f-c2c5-4a62-8d58-6e1b0c6b2d8e/6d1fb8a4-5844-42a4-9b01-1c6c128acf19/IN-en-20240827-TRIFECTA-perspective_WEB_c292a608-cdc6-4686-8dc8-405bfcf753af_small.jpg"
          alt="Logo"
          className="bg-gradient-to-b from-black"
        />
      </div>

      <form onSubmit={(e) => e.preventDefault } className="w-[28%] p-[4%] absolute bg-black my-[10%] mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80">
        <h1 className="font-bold text-3xl py-4">{label}</h1>
        {label === "Sign Up" && (
          <input
            type="text"
            placeholder="Username"
            className="p-6 my-2 w-full rounded-md bg-slate-700 bg-opacity-70"
          />
        )}
        <input
          ref={email}
          type="text"
          placeholder="Email"
          className="p-6 my-2 w-full rounded-md bg-slate-700 bg-opacity-70"
        />
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-6 my-4 w-full rounded-md bg-gray-700 bg-opacity-70"
        />
        {errorMessage && (
          <p className="text-red-500 font-semibold my-2">{errorMessage}</p>
        )}
        <button
          type="submit"
          className="w-full justify-center flex p-4 my-8 bg-red-700 rounded-lg text-2xl font-bold"
          onClick={handleButtonClick}
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
