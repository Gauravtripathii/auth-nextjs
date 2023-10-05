"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function LoginPage() {
  const router = useRouter();

  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = React.useState(false);
  const [buttonDisabled, setButtonDisabled] = React.useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      // console.log("Login success!", response.data);
      router.push("/profile");
    } catch (error: any) {
      console.log("Login failed!", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
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
          <h1>Login to your account</h1>
          <hr />
          <p className="m-2">
            <input
              className="text-black"
              type="text"
              id="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              placeholder="email"
            />
          </p>
          <p className="m-2">
            <input
              className="text-black"
              type="password"
              id="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              placeholder="password"
            />
          </p>
          <p className="m-2">
            Don't have an account? <Link href="/signup">Signup</Link>
          </p>
          <p className="m-3">
            <button onClick={onLogin}>
              {buttonDisabled ? "no Login" : "Login"}
            </button>
          </p>
        </div>
      )}
    </>
  );
}
