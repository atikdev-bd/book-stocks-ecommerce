import {
    createUserWithEmailAndPassword,
    getAuth,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
  } from "firebase/auth";
  import React, { createContext, useEffect, useState } from "react";
  import { useNavigate } from "react-router-dom";
  import { app } from "../firebase/firebase.config";
  
  export const AuthContext = createContext();
  const auth = getAuth(app);
  
  const AuthProvider = ({ children }) => {
     
    /// user State ///
    const [user, setUser] = useState("");
    const [loading, setLoading] = useState(true)
    
  
    const provider = new GoogleAuthProvider();
    ///create user with email and password ///
    const createUser = (email, password) => {
      setLoading(true)
      return createUserWithEmailAndPassword(auth, email, password);
    };
  
    //// login with email and password ///
    const emailAndPasswordLogin = (email, password) => {
      setLoading(true)
      return signInWithEmailAndPassword(auth, email, password);
    };
  
    /// on auth state change //
  
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        setLoading(false)
      });
      return () => unsubscribe();
    }, []);
  
    ///google login///
    const googleLogin = () => {
      setLoading(true)
     return signInWithPopup(auth, provider)
       
    };
  
    /// update user profile name ///
    const updateUser = (userInfo)=>{
       return updateProfile(auth.currentUser, userInfo)
  
    }
  
    /// sign out ///
    const logOut = ()=>{
      signOut(auth)
      .then(result =>{
  
      }).catch(error => {
        
      })
    }
  
    const info = {
      createUser,
      emailAndPasswordLogin,
      googleLogin,
      user,
      logOut,
      updateUser,
      loading
    };
  
    return <AuthContext.Provider value={info}>{children}</AuthContext.Provider>;
  };
  
  export default AuthProvider;