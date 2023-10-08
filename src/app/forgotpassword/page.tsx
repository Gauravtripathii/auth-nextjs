"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function ForgotPasswordPage() {
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [updated, setUpdated] = useState(false);

  const updatePassword = async () => {
    try {
      await axios.post("/api/users/updatepassword", {
        token,
        newPassword: password,
      });
      setUpdated(true);
    } catch (error: any) {
      setError(true);
      // console.log(error.response.data)
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1>Create a new password : </h1>
      <p>
        <input
          type="text"
          placeholder="enter new password"
          onChange={(e) => setPassword(e.target.value)}
          className="text-black"
        />
        <button onClick={updatePassword}>Update Password</button>
      </p>
      {updated ? (
          <h1>Password updated successfully</h1>
      ): ""}
      {error && (
          <h1>an error occurred!</h1>
      )}
    </div>
  );
}
