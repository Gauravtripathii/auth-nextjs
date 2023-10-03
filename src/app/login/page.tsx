"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { axios } from "axios";

export default function LoginPage() {
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  const onLogin = async () => {};
  return (
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
        <button onClick={onLogin}>Login</button>
      </p>
    </div>
  );
}
