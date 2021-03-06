import React, { useState } from "react";
import { useHistory } from "react-router";
import { auth } from "./firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc, getFirestore } from "firebase/firestore";
import "./signup.css";
function Signup() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const Register = async (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        const db = getFirestore();
        await setDoc(doc(db, "user_spend", `${user.uid}`), {
          id: user.uid,
          spend: 0,
        });
        history.push("/homepage");
      })
      .catch((error) => alert(error.message));
  };
  return (
    <div>
      <div className="SignupContainer">
        <h1 className="header">
          Be members to save points and receive discount!
        </h1>
        <div className="FormContainer">
          <h2>Sign Up</h2>
          <form className="FormContain" onSubmit={Register}>
            <h5>E-mail</h5>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <h5>Password</h5>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button className="login_signinbutton" type="submit">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
