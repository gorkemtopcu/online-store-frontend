import useUserStore from "context/UserStore";
import App from "./App";
import React, { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "lib/firebase";

const AppInit = () => {
  const { getUser } = useUserStore();

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      getUser(user?.uid);
    });
    return () => unSub();
  }, [getUser]);

  return (
    <>
      <App />
    </>
  );
};

export default AppInit;
