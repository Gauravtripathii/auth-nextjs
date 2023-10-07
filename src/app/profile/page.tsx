"use client";

import React, {useState} from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ProfilePage() {
  const [data, setData] = useState("");
  const router = useRouter();

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      router.push("/login");
    } catch (error: any) {
      console.log(error);
    }
  };

  const getUserData = async () => {
      const user = await axios.get('/api/users/me');
      setData(user.data.data._id);
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen py-2">
      <h1 className="text-4xl m-2">Profile</h1>
      <p>User Profile</p>
      <h2>
        {!data ? "-" : <Link href={`/profile/${data}`}>Visit User</Link>}
      </h2>

      <button onClick={logout} className="mt-3 border-2 p-2">
        Logout
      </button>

      <button onClick={getUserData} className="mt-3 p-2 bg-green-800">
        Get User Details
      </button>
    </div>
  );
}
