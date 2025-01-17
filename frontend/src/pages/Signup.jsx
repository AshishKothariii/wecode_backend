import React from "react";
import { useRef } from "react";

const Signup = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleLogin = () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    // You can add your authentication logic here
    // For example, making an API call to validate the credentials
  };

  const handleCreateAccount = () => {
    // Redirect or open a create account form
    console.log("Redirecting to create account page...");
  };

  return (
    <div>
      <h2>Login</h2>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          ref={emailRef}
          placeholder="Enter your email"
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          ref={passwordRef}
          placeholder="Enter your password"
        />
      </div>
      <button onClick={handleLogin}>Login</button>
      <p>
        Dont have an account?
        <span onClick={handleCreateAccount}>Create Account</span>
      </p>
    </div>
  );
};

export default Signup;
