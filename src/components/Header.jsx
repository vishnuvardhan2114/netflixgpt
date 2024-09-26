import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect } from "react";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";

const Header = ({ browse }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  useEffect(() => {
   const unSubcribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => unSubcribe();
  }, []);
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        navigate("/error");
      });

    console.log("Sign out successful");
  };
  return (
    <>
      {browse && (
        <div className=" w-screen px-8 py-2 bg-gradient-to-b from-gray-900 z-10 flex justify-between fixed">
          <img
            className="w-[10%] cursor-pointer h-[10%] "
            src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
            alt="logo"
            href="/"
          />
          <div className="flex py-4 px-8">
            <img
              className="w-12 h-12 rounded-lg"
              src={user?.photoURL}
              alt="userIcon"
            />
            <button className="px-2" onClick={handleSignOut}>
              Sign out
            </button>
          </div>
        </div>
      )}
      {!browse && (
        <div className="absolute px-8 py-2 bg-gradient-to-b from-gray-900 z-10">
          <img
            className="w-72 cursor-pointer mx-[55%] "
            src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
            alt="logo"
            href="/"
          />
        </div>
      )}
    </>
  );
};

export default Header;
