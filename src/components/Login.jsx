import React, { useRef, useState } from "react";
import Header from "./Header";
import checkvalidate from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import {PORFILE_IMAGE, PROFILE_LOGO_URL} from "../utils/constants"
const Login = () => {
  const [label, setLabel] = useState("Sign In");
  const [isSignUp, setIsSignUp] = useState(false);
  const [errorMessage, seterrorMessage] = useState("");
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const dispatch = useDispatch();
  const handleButtonClick = () => {
    const validate = checkvalidate(email.current.value, password.current.value);
    console.log(validate);
    seterrorMessage(validate);
    if (validate) return;

    if (isSignUp) {
      // Sign Up logic here
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: PORFILE_IMAGE,
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.error("Error creating user:", errorCode, errorMessage);
          seterrorMessage(errorMessage);
        });
    } else {
      // Sign In logic here
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
          seterrorMessage(errorMessage);
        });
    }
  };
  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src={PROFILE_LOGO_URL}
          alt="Logo"
          className="bg-gradient-to-b from-black"
        />
      </div>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-[28%] p-[4%] absolute bg-black my-[10%] mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80"
      >
        <h1 className="font-bold text-3xl py-4">{label}</h1>
        {label === "Sign Up" && (
          <input
            ref={name}
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
              className="font-semibold text-white text-xl hover:underline cursor-pointer"
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
              className="font-semibold text-white text-xl hover:underline cursor-pointer"
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
