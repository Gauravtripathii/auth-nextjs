"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function SignupPage() {
  const router = useRouter();

  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      // console.log("Signup success!", response.data);
      router.push("/login");
    } catch (error: any) {
      console.log("Signup failed!", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);
  return (
    <>
      {loading ? (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
          <h1>Processing...</h1>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
          <h1>Create your account</h1>
          <hr />
          <p className="m-2">
            <input
              className="text-black"
              type="text"
              id="username_"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              placeholder="username"
            />
          </p>
          <p className="m-2">
            <input
              className="text-black"
              type="text"
              id="email_"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              placeholder="email"
            />
          </p>
          <p className="m-2">
            <input
              className="text-black"
              type="password"
              id="password_"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              placeholder="password"
            />
          </p>
          <p className="m-2">
            Already have an account? <Link href="/login">Login</Link>
          </p>
          <p className="m-3">
            {/* <button
              onClick={onSignup}
              className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
            >
              Signup
            </button> */}
            <button
              onClick={onSignup}
              className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
            >
              {buttonDisabled ? "No signup" : "Signup"}
            </button>
          </p>
        </div>
      )}
    </>
  );
}
